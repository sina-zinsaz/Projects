"use client";

export default function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-xl border px-3 py-2 text-sm dark:border-gray-700"
    >
      <span className="dark:hidden">🌙 تاریک</span>
      <span className="hidden dark:inline">☀️ روشن</span>
    </button>
  );
}