import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "#FBFBFB" }}
    >
      {/* 404 Number */}
      <div className="relative select-none">
        <p
          className="text-[180px] font-bold leading-none"
          style={{ color: "#1E71BB", opacity: 0.08 }}
        >
          404
        </p>
        <p
          className="absolute inset-0 flex items-center justify-center text-7xl font-bold"
          style={{ color: "#1E71BB" }}
        >
          404
        </p>
      </div>

      {/* Text */}
      <h1 className="mt-6 text-2xl font-semibold" style={{ color: "#1C1C1E" }}>
        Page Not Found
      </h1>

       

      <p
        className="mt-3 text-sm leading-relaxed max-w-xs"
        style={{ color: "#ABABAF" }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#1E71BB" }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}