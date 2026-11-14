"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export default function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("vid-dle-theme", next);
    } catch {
      /* localStorage tidak tersedia */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ganti tema terang/gelap"
      className={`grid size-10 place-items-center rounded-full border border-stone-300 text-ink transition hover:bg-bg-soft dark:border-white/10 ${className ?? ""}`}
    >
      <span className="dark:hidden">
        <SunIcon size={18} weight="bold" />
      </span>
      <span className="hidden dark:block">
        <MoonIcon size={18} weight="bold" />
      </span>
    </button>
  );
}
