import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="absolute top-4 start-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold">دستیار هوشمند من 🤖</h1>
      <p className="max-w-md text-gray-600 dark:text-gray-400">
        یه چت‌بات با Next.js، React، TypeScript و Tailwind که به هوش مصنوعی وصله.
      </p>
      <Link
        href="/chat"
        className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        شروع چت
      </Link>
    </main>
  );
}