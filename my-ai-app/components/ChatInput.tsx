"use client";
import { useRef } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  image: string | null;
  onImageChange: (img: string | null) => void;
  disabled?: boolean;
};

export default function ChatInput({
  value,
  onChange,
  onSend,
  image,
  onImageChange,
  disabled,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert("حجم عکس باید کمتر از ۴ مگابایت باشه");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onImageChange(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="mt-3">
      {image && (
        <div className="mb-2 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="پیش‌نمایش" className="h-16 rounded-lg" />
          <button
            onClick={() => onImageChange(null)}
            className="text-sm text-red-500"
          >
            حذف عکس
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFile}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={disabled}
          aria-label="آپلود عکس"
          className="rounded-xl border px-3 dark:border-gray-700"
        >
          📎
        </button>
        <input
          className="flex-1 rounded-xl border bg-transparent p-3 outline-none focus:border-blue-600 dark:border-gray-700"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="پیامت رو بنویس..."
          disabled={disabled}
        />
        <button
          onClick={onSend}
          disabled={disabled}
          className="rounded-xl bg-blue-600 px-5 text-white disabled:opacity-50"
        >
          ارسال
        </button>
      </div>
    </div>
  );
}