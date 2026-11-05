import React from "react";
import { BRAND_ICONS } from "./brandIcons";

/**
 * Authentic official brand SVG icons for the Software & QA marquee:
 * Next.js, React, Jira, Postman, Azure DevOps, PostgreSQL, Docker,
 * Host / AS400, DBeaver, Tailwind CSS, Figma, GitHub, SQL Developer, Photoshop
 */
export default function SoftwareIcon({ name, className = "w-7 h-7" }) {
  const key = String(name).toLowerCase().replace(/[^a-z0-9]/g, "");

  switch (key) {
    case "nextjs":
    case "next":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="64" fill="#000000" stroke="#333" strokeWidth="2" />
          <path
            d="M86.6 96.5L44.8 41.6H36v44.8h8V52.8l38.2 50.1c1.5-1.9 3-4 4.4-6.4z"
            fill="#ffffff"
          />
          <path d="M83.2 41.6h8.8v28.8h-8.8z" fill="url(#nextGrad)" />
          <defs>
            <linearGradient id="nextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "react":
      return (
        <svg viewBox="0 0 115 102" className={className}>
          <circle cx="57.5" cy="51" r="12" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="4.5" fill="none">
            <ellipse cx="57.5" cy="51" rx="54" ry="21" />
            <ellipse cx="57.5" cy="51" rx="54" ry="21" transform="rotate(60 57.5 51)" />
            <ellipse cx="57.5" cy="51" rx="54" ry="21" transform="rotate(120 57.5 51)" />
          </g>
        </svg>
      );

    case "jira":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <defs>
            <linearGradient id="jiraBlue1" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#0052CC" />
              <stop offset="100%" stopColor="#2684FF" />
            </linearGradient>
            <linearGradient id="jiraBlue2" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#2684FF" />
              <stop offset="100%" stopColor="#0052CC" />
            </linearGradient>
          </defs>
          <path
            d="M62.9 6.2c-15.6 15.6-15.6 41 0 56.6l31.2-31.2c-8.6-8.6-22.6-25.4-31.2-25.4z"
            fill="url(#jiraBlue1)"
          />
          <path
            d="M34.7 34.4c-15.6 15.6-15.6 41 0 56.6L66 59.8c-8.6-8.6-22.7-25.4-31.3-25.4z"
            fill="url(#jiraBlue2)"
          />
          <path
            d="M6.5 62.6c-15.6 15.6-15.6 41 0 56.6l31.2-31.2c-8.6-8.6-22.6-25.4-31.2-25.4z"
            fill="url(#jiraBlue1)"
          />
        </svg>
      );

    case "postman":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="64" fill="#FF6C37" />
          <path
            d="M83.8 38.6c-1.5-.7-3.3-.4-4.5.7L54.7 61.5c-.8.8-1.3 1.8-1.4 2.9l-.6 6.5-5.9 4.8c-.8.7-1.3 1.7-1.4 2.8l-.5 6.2c-.1 1.4.6 2.7 1.8 3.3.6.3 1.2.4 1.8.4.8 0 1.6-.3 2.2-.8l6.1-5.1 6.5-.6c1.1-.1 2.1-.6 2.9-1.4l22.2-24.6c1.1-1.2 1.4-3 .7-4.5l-5.6-12.8z"
            fill="#FFFFFF"
          />
          <circle cx="75" cy="48" r="4.5" fill="#FF6C37" />
        </svg>
      );

    case "azuredevops":
    case "azure":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M26.4 100.8l43.2 20.8V92.8l28.8-11.2 17.6-32L83.2 16 57.6 30.4v24L26.4 72z"
            fill="#0078D4"
          />
          <path
            d="M26.4 100.8l31.2-46.4V30.4L26.4 46.4z"
            fill="#2899F5"
          />
          <path
            d="M57.6 54.4l41.6 38.4v-44L83.2 16l-25.6 14.4z"
            fill="#005A9E"
          />
          <path
            d="M99.2 48.8l16.8 33.6-16.8 10.4z"
            fill="#106EBE"
          />
        </svg>
      );

    case "postgresql":
    case "postgres":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52S92.7 12 64 12z"
            fill="#336791"
          />
          <path
            d="M64 26c-18.2 0-33 14.8-33 33 0 12.8 7.3 23.9 18 29.4V76c-3-2-5-5.5-5-9.5 0-6.4 5.1-11.5 11.5-11.5s11.5 5.1 11.5 11.5c0 4-2 7.5-5 9.5v12.4c10.7-5.5 18-16.6 18-29.4 0-18.2-14.8-33-33-33z"
            fill="#FFFFFF"
          />
          <circle cx="53" cy="54" r="3.5" fill="#336791" />
          <circle cx="75" cy="54" r="3.5" fill="#336791" />
          <path d="M57 76c-3 4-5 9-1 12 3 2 7-1 8-5z" fill="#E2E8F0" />
          <path d="M71 76c3 4 5 9 1 12-3 2-7-1-8-5z" fill="#E2E8F0" />
        </svg>
      );

    case "docker":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M121.2 56.5c-2.4-1.8-7.8-1.5-12 .6-1.5-8.5-7.5-13.4-7.5-13.4s-4.3 6.6-1.7 15.6c-4.3 2.5-9.5 2.7-14.5 2.7H8c-4.4 0-8 3.6-8 8 0 19.8 11.9 36.8 45.4 36.8 38.6 0 57.6-21.2 62.1-42.6 5.5.6 11.2-.6 13.7-7.7z"
            fill="#2496ED"
          />
          <rect x="52.8" y="32" width="12" height="10" rx="1.5" fill="#2496ED" stroke="#0D2E5C" strokeWidth="2" />
          <rect x="67.2" y="32" width="12" height="10" rx="1.5" fill="#2496ED" stroke="#0D2E5C" strokeWidth="2" />
          <rect x="38.4" y="44.8" width="12" height="10" rx="1.5" fill="#2496ED" stroke="#0D2E5C" strokeWidth="2" />
          <rect x="52.8" y="44.8" width="12" height="10" rx="1.5" fill="#2496ED" stroke="#0D2E5C" strokeWidth="2" />
          <rect x="67.2" y="44.8" width="12" height="10" rx="1.5" fill="#2496ED" stroke="#0D2E5C" strokeWidth="2" />
          <rect x="81.6" y="44.8" width="12" height="10" rx="1.5" fill="#2496ED" stroke="#0D2E5C" strokeWidth="2" />
          <rect x="24" y="57.6" width="12" height="10" rx="1.5" fill="#2496ED" stroke="#0D2E5C" strokeWidth="2" />
          <rect x="38.4" y="57.6" width="12" height="10" rx="1.5" fill="#2496ED" stroke="#0D2E5C" strokeWidth="2" />
          <rect x="52.8" y="57.6" width="12" height="10" rx="1.5" fill="#2496ED" stroke="#0D2E5C" strokeWidth="2" />
          <rect x="67.2" y="57.6" width="12" height="10" rx="1.5" fill="#2496ED" stroke="#0D2E5C" strokeWidth="2" />
          <circle cx="28" cy="80" r="3.5" fill="#FFFFFF" />
        </svg>
      );

    case "figma":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M42.7 12.8h21.3v21.3H42.7c-5.9 0-10.7-4.8-10.7-10.7s4.8-10.6 10.7-10.6z" fill="#F24E1E" />
          <path d="M64 12.8h21.3c5.9 0 10.7 4.8 10.7 10.7s-4.8 10.7-10.7 10.7H64V12.8z" fill="#FF7262" />
          <path d="M42.7 34.1h21.3v21.3H42.7c-5.9 0-10.7-4.8-10.7-10.7 0-5.8 4.8-10.6 10.7-10.6z" fill="#A259FF" />
          <circle cx="74.7" cy="44.8" r="10.7" fill="#1ABCFE" />
          <path d="M42.7 55.5h21.3v21.3c0 5.9-4.8 10.7-10.7 10.7s-10.7-4.8-10.7-10.7c.1-5.9 4.9-10.6 10.8-10.6z" fill="#0ACF83" />
        </svg>
      );

    case "github":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="64" fill="#181717" stroke="#444" strokeWidth="2" />
          <path
            d="M64 22c-23.2 0-42 18.8-42 42 0 18.6 12 34.3 28.7 39.9 2.1.4 2.9-.9 2.9-2v-7.1c-11.7 2.5-14.2-5.6-14.2-5.6-1.9-4.9-4.7-6.2-4.7-6.2-3.8-2.6.3-2.6.3-2.6 4.2.3 6.4 4.3 6.4 4.3 3.8 6.4 9.9 4.6 12.3 3.5.4-2.7 1.5-4.6 2.7-5.6-9.3-1.1-19.1-4.7-19.1-20.8 0-4.6 1.6-8.3 4.3-11.3-.4-1.1-1.9-5.3.4-11.1 0 0 3.5-1.1 11.5 4.3 3.3-.9 6.9-1.4 10.5-1.4s7.2.5 10.5 1.4c8-5.4 11.5-4.3 11.5-4.3 2.3 5.8.8 10 .4 11.1 2.7 2.9 4.3 6.7 4.3 11.3 0 16.2-9.8 19.7-19.2 20.7 1.5 1.3 2.9 3.9 2.9 7.9v11.7c0 1.1.8 2.4 2.9 2C94 98.3 106 82.6 106 64c0-23.2-18.8-42-42-42z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "tailwindcss":
    case "tailwind":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M64 24C42.7 24 32 34.7 32 56c5.3-8 13.3-10.7 24-8 6.1 1.5 10.5 5.9 15.3 10.8C79.1 66.8 88.5 76.3 106.7 76.3c21.3 0 32-10.7 32-32-5.3 8-13.3 10.7-24 8-6.1-1.5-10.5-5.9-15.3-10.8C91.6 33.5 82.1 24 64 24zM32 56C10.7 56 0 66.7 0 88c5.3-8 13.3-10.7 24-8 6.1 1.5 10.5 5.9 15.3 10.8C47.1 98.8 56.5 108.3 74.7 108.3c21.3 0 32-10.7 32-32-5.3 8-13.3 10.7-24 8-6.1-1.5-10.5-5.9-15.3-10.8C59.6 65.5 50.1 56 32 56z"
            fill="#38BDF8"
          />
        </svg>
      );

    case "dbeaver":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="64" fill="#382216" />
          <ellipse cx="64" cy="68" rx="42" ry="46" fill="#8B4513" stroke="#D4A373" strokeWidth="4" />
          <circle cx="34" cy="38" r="14" fill="#5C2C16" />
          <circle cx="94" cy="38" r="14" fill="#5C2C16" />
          <circle cx="48" cy="56" r="7" fill="#000000" />
          <circle cx="50" cy="54" r="2.5" fill="#FFFFFF" />
          <circle cx="80" cy="56" r="7" fill="#000000" />
          <circle cx="82" cy="54" r="2.5" fill="#FFFFFF" />
          <ellipse cx="64" cy="74" rx="20" ry="14" fill="#FAEDCD" />
          <circle cx="64" cy="70" r="6" fill="#000000" />
          <rect x="59" y="80" width="10" height="9" rx="2" fill="#FFFFFF" stroke="#8B4513" strokeWidth="2" />
        </svg>
      );

    case "hostas400":
    case "as400":
    case "cleopatra":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect x="8" y="16" width="112" height="84" rx="10" fill="#1A1A1A" stroke="#444" strokeWidth="4" />
          <rect x="18" y="26" width="92" height="64" rx="6" fill="#052E16" />
          <text x="24" y="52" fill="#22C55E" fontSize="19" fontFamily="monospace" fontWeight="900">
            AS/400
          </text>
          <text x="24" y="74" fill="#4ADE80" fontSize="13" fontFamily="monospace">
            BDS·CLEO:OK
          </text>
          <path d="M48 100h32l8 16H40l8-16z" fill="#333" />
        </svg>
      );

    case "sqldeveloper":
    case "sql":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="64" fill="#C74634" />
          <ellipse cx="64" cy="36" rx="42" ry="15" fill="#F87171" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M22 36v28c0 8.3 18.8 15 42 15s42-6.7 42-15V36" fill="none" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M22 64v28c0 8.3 18.8 15 42 15s42-6.7 42-15V64" fill="none" stroke="#FFFFFF" strokeWidth="4" />
          <text x="64" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
            SQL DEV
          </text>
        </svg>
      );

    case "photoshop":
    case "ps":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect x="4" y="4" width="120" height="120" rx="26" fill="#001E36" stroke="#31A8FF" strokeWidth="5" />
          <text x="64" y="84" textAnchor="middle" fill="#31A8FF" fontSize="64" fontFamily="sans-serif" fontWeight="900">
            Ps
          </text>
        </svg>
      );

    default: {
      const brand = BRAND_ICONS[key];
      if (brand) {
        return (
          <svg viewBox="0 0 24 24" className={className} role="img" aria-label={brand.title}>
            <path d={brand.path} fill={brand.color} />
          </svg>
        );
      }
      return (
        <div className={`${className} rounded-lg bg-[#3aa1d8] flex items-center justify-center text-xs font-black text-black shadow-md`}>
          {String(name).slice(0, 2).toUpperCase()}
        </div>
      );
    }
  }
}
