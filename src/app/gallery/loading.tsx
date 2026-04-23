export default function GalleryLoading() {
  return (
    <div className="pt-32 pb-24">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="h-4 w-40 animate-pulse rounded-full bg-[var(--color-linen)]" />
        <div className="mt-5 h-16 w-[70%] max-w-md animate-pulse rounded-2xl bg-[var(--color-linen)]" />
        <div className="mt-12 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-20 animate-pulse rounded-full bg-[var(--color-linen)]" />
          ))}
        </div>
      </header>
      <div className="mx-auto mt-10 max-w-[1400px] px-6 md:px-10">
        <div className="h-[min(78vh,860px)] animate-pulse rounded-[32px] bg-[var(--color-linen)]" />
      </div>
    </div>
  );
}
