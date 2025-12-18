require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        // Local development
        hardhat: {
            chainId: 31337
        },
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        // Polygon Mumbai Testnet
        mumbai: {
            url: process.env.RPC_URL || "https://rpc-mumbai.maticvigil.com",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 80001
        },
        // Polygon Amoy Testnet (newer)
        amoy: {
            url: process.env.RPC_URL || "https://rpc-amoy.polygon.technology",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 80002
        },
        // Sepolia Testnet
        sepolia: {
            url: process.env.RPC_URL || "https://rpc.sepolia.org",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 11155111
        }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    // Etherscan verification (optional)
    etherscan: {
        apiKey: {
            polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
            sepolia: process.env.ETHERSCAN_API_KEY || ""
        }
    }
};
