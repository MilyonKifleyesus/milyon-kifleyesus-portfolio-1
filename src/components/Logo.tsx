"use client"

import React from 'react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform hover:scale-105"
      >
        {/* Background Circle with gradient */}
        <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />
        
        {/* M Letter */}
        <path
          d="M14 32V16L19 26L24 16L29 26L34 16V32"
          stroke="#0A0A0A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* K Letter - integrated with M */}
        <path
          d="M34 16V32M34 24L40 16M34 24L40 32"
          stroke="#0A0A0A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0C9081" />
            <stop offset="100%" stopColor="#0A7D71" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}