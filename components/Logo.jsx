/**
 * Professional SkillChain Logo
 * Clean minimalist design - interlocked S and C forming a chain link
 */
export default function Logo({ size = 32, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Outer ring / chain link */}
            <rect
                x="2"
                y="2"
                width="28"
                height="28"
                rx="8"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
            />

            {/* Inner S shape representing "Skill" */}
            <path
                d="M11 10.5C11 10.5 13 9 16 9C19 9 21 10.5 21 12.5C21 14.5 19 15.5 16 16C13 16.5 11 17.5 11 19.5C11 21.5 13 23 16 23C19 23 21 21.5 21 21.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}

/**
 * Logo with text wordmark
 */
export function LogoWithText({ size = 32, className = '' }) {
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <Logo size={size} />
            <span className="font-semibold text-lg tracking-tight">SkillChain</span>
        </div>
    );
}
