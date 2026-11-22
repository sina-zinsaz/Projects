export type Msg = {
  role: "user" | "assistant";
  content: string;
  image?: string; // data URL مثل data:image/png;base64,...
};

export default function ChatMessage({ role, content, image }: Msg) {
  return (
    <div
      className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 ${
        role === "user"
          ? "me-auto bg-blue-600 text-white"
          : "ms-auto bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
      }`}
    >
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt="تصویر آپلود شده"
          className="mb-2 max-h-64 rounded-xl"
        />
      )}
      {content || (!image && "…")}
    </div>
  );
}