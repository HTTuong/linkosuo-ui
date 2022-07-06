export const SearchIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
    <svg className={className} width={width} height={height} role="presentation" viewBox="0 0 21 21">
        <g
            transform="translate(1 1)"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="square"
        >
            <path d="M18 18l-5.7096-5.7096"></path>
            <circle cx="7.2" cy="7.2" r="7.2"></circle>
        </g>
    </svg>
);

export const CloseIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
    <svg className={className} width={width} height={height} role="presentation" viewBox="0 0 16 14">
        <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fillRule="evenodd"></path>
    </svg>
);
