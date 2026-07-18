import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="none">
            <rect
                x="5"
                y="5"
                width="30"
                height="30"
                rx="10"
                stroke="currentColor"
                strokeWidth="2.5"
            />
            <path
                d="M11 21h5.5l2.8-5.4 4.8 10 2.9-5.1H29"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 12v5M17.5 14.5h5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
        </svg>
    );
}
