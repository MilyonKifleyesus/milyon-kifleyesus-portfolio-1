"use client"

import React from 'react';
import Image from 'next/image';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative w-12 h-12 transition-transform hover:scale-105">
        <svg
          width="48"
          height="48"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <rect width="200" height="200" rx="20" fill="url(#mkGradient)" />
          <text
            x="100"
            y="130"
            fontFamily="Arial, sans-serif"
            fontSize="120"
            fontWeight="bold"
            fill="#E5E7EB"
            textAnchor="middle"
            style={{ letterSpacing: '-8px' }}
          >
            MK
          </text>
          <defs>
            <linearGradient id="mkGradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-xl font-bold tracking-tight hidden sm:block">
        Milyon <span className="text-primary">Kifleyesus</span>
      </span>
    </div>
  );
}