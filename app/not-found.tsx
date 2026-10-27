import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[70vh] max-w-[720px] flex-col justify-center gap-6 px-4 sm:px-8">
      <p className="m-0 font-mono text-sm text-grey">404</p>
      <h1 className="m-0 font-sora text-[clamp(40px,6vw,72px)] leading-none font-bold tracking-[-0.04em]">This page doesn’t exist.</h1>
      <Link href="/" className="self-start rounded-full bg-ink px-5 py-3 font-semibold text-bg no-underline">Back home</Link>
    </main>
  );
}
