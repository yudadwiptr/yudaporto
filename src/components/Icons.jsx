import React from "react";

// Lightweight inline SVG icon set (replaces emoji / unicode glyphs).
// Icons inherit `currentColor` and default to 1em so they scale with text.
function Svg({ className = "", strokeWidth = 2, children, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`inline-block w-[1em] h-[1em] shrink-0 ${className}`}
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (p) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Svg>
);

export const ArrowRight = (p) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const ArrowLeft = (p) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M19 12H5" />
    <path d="m11 6-6 6 6 6" />
  </Svg>
);

export const CloseIcon = (p) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </Svg>
);

export const CheckIcon = (p) => (
  <Svg strokeWidth={2.8} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const LockIcon = (p) => (
  <Svg {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </Svg>
);

export const ExpandIcon = (p) => (
  <Svg {...p}>
    <path d="M14 4h6v6" />
    <path d="M20 4l-7 7" />
    <path d="M10 20H4v-6" />
    <path d="M4 20l7-7" />
  </Svg>
);

export const ChatIcon = (p) => (
  <Svg {...p}>
    <path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.5L3.5 20.5l1.4-4.5a8.4 8.4 0 1 1 15.6-4.4Z" />
    <path d="M8.5 10.5h7" />
    <path d="M8.5 13.5h4.5" />
  </Svg>
);

export const GlobeIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3Z" />
  </Svg>
);

export const InviteIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
    <path d="M12 16.2s-2.2-1.3-2.2-2.7c0-.8.6-1.3 1.2-1.3.5 0 .8.3 1 .6.2-.3.5-.6 1-.6.6 0 1.2.5 1.2 1.3 0 1.4-2.2 2.7-2.2 2.7Z" fill="currentColor" stroke="none" />
  </Svg>
);

export const CartIcon = (p) => (
  <Svg {...p}>
    <path d="M3 4h2.2l2.3 11h10.2l2.1-7.5H6.6" />
    <circle cx="9.5" cy="19.5" r="1.4" />
    <circle cx="16.5" cy="19.5" r="1.4" />
  </Svg>
);

export const BoltIcon = (p) => (
  <Svg {...p}>
    <path d="M13.5 2.5 4.5 13.5h6.5l-1 8 9-11h-6.5l1-8Z" />
  </Svg>
);

export const DownloadIcon = (p) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M12 4v11" />
    <path d="m7 10.5 5 5 5-5" />
    <path d="M5 20h14" />
  </Svg>
);

// Small round bullet separator (replaces "•")
export const Dot = ({ className = "" }) => (
  <span
    aria-hidden="true"
    className={`inline-block w-1 h-1 rounded-full bg-current align-middle shrink-0 ${className}`}
  />
);
