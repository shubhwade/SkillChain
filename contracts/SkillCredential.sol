// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SkillCredential
 * @dev ERC721 NFT contract for issuing verified skill credentials
 * 
 * Each token represents a verified skill that a user has demonstrated.
 * Only the contract owner (the SkillChain backend) can mint credentials,
 * ensuring that all credentials have been evaluated by the AI system.
 */
contract SkillCredential is ERC721, Ownable {
    /// @dev Counter for generating unique token IDs
    uint256 public nextTokenId;
    
    /// @dev Mapping from token ID to metadata URI (IPFS or other)
    mapping(uint256 => string) public tokenMetadataURI;
    
    /// @dev Mapping from token ID to skill name
    mapping(uint256 => string) public skillName;
    
    /// @dev Mapping from token ID to timestamp when credential was issued
    mapping(uint256 => uint256) public issuedAt;

    /// @dev Emitted when a new skill credential is minted
    event SkillIssued(
        address indexed to, 
        uint256 indexed tokenId, 
        string skill, 
        string metadataURI
    );

    /**
     * @dev Constructor sets the token name and symbol
     * The deployer becomes the initial owner
     */
    constructor() ERC721("SkillChain Credential", "SKL") Ownable(msg.sender) {}

    /**
     * @dev Mints a new skill credential to the specified address
     * @param to The recipient address
     * @param skill Human-readable name of the skill
     * @param metadataURI URI pointing to the credential metadata (IPFS)
     * @return tokenId The ID of the newly minted token
     * 
     * Requirements:
     * - Caller must be the contract owner
     */
    function mintCredential(
        address to, 
        string calldata skill, 
        string calldata metadataURI
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = ++nextTokenId;
        
        _safeMint(to, tokenId);
        
        tokenMetadataURI[tokenId] = metadataURI;
        skillName[tokenId] = skill;
        issuedAt[tokenId] = block.timestamp;
        
        emit SkillIssued(to, tokenId, skill, metadataURI);
        
        return tokenId;
    }

    /**
     * @dev Returns the metadata URI for a token
     * @param tokenId The token ID to query
     * @return The metadata URI string
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // Ensure token exists
        _requireOwned(tokenId);
        return tokenMetadataURI[tokenId];
    }

    /**
     * @dev Batch query function to get all credential data for a token
     * @param tokenId The token ID to query
     * @return owner The token owner
     * @return skill The skill name
     * @return uri The metadata URI
     * @return timestamp When the credential was issued
     */
    function getCredentialData(uint256 tokenId) external view returns (
        address owner,
        string memory skill,
        string memory uri,
        uint256 timestamp
    ) {
        owner = ownerOf(tokenId);
        skill = skillName[tokenId];
        uri = tokenMetadataURI[tokenId];
        timestamp = issuedAt[tokenId];
    }
}
