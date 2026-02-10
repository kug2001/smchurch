'use client';

import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="mx-auto max-w-[1024px] px-5 py-10 md:px-10 md:py-14">
        {/* Church Name */}
        <h3 className="mb-6 text-lg font-bold tracking-tight text-white">
          제주서문교회
        </h3>

        {/* Contact Info */}
        <div className="flex flex-col gap-3 text-sm leading-relaxed md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-zinc-500" />
            <span>제주시 용문로 17길 23-6</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 flex-shrink-0 text-zinc-500" />
            <a
              href="tel:064-712-5593"
              className="transition-colors hover:text-white"
            >
              Tel (064)712-5593
            </a>
          </div>
          <span className="hidden text-zinc-600 md:inline">|</span>
          <span className="text-sm">Fax (064)712-5592</span>
          <span className="hidden text-zinc-600 md:inline">|</span>
          <a
            href="tel:064-712-5591"
            className="text-sm transition-colors hover:text-white"
          >
            목사관 (064)712-5591
          </a>
        </div>

        <Separator className="my-6 bg-zinc-800" />

        {/* Copyright */}
        <p className="text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} 제주서문교회. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
