"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  categories: string[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function FilterBar({ categories, activeCategory, onCategoryChange }: FilterBarProps) {
  const [active, setActive] = useState(activeCategory ?? "Todos");

  function handleClick(cat: string) {
    setActive(cat);
    onCategoryChange?.(cat);
  }

  const all = ["Todos", ...categories];

  return (
    <div className="sticky top-16 z-40 border-b border-[var(--color-border)] bg-[var(--color-base)]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto scroll-hide py-3">
          {all.map((cat) => (
            <button
              key={cat}
              onClick={() => handleClick(cat)}
              className={cn(
                "flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                active === cat
                  ? "bg-[var(--color-text-primary)] text-[var(--color-text-inverse)]"
                  : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-elevated)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
