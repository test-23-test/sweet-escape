export default function OrderLoading() {
  return (
    <div className="pt-32 pb-24">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="h-4 w-48 animate-pulse rounded-full bg-[var(--color-linen)]" />
        <div className="mt-5 h-16 w-[75%] max-w-lg animate-pulse rounded-2xl bg-[var(--color-linen)]" />
        <div className="mt-5 h-5 w-[55%] max-w-md animate-pulse rounded-full bg-[var(--color-linen)]" />
      </header>
      <div className="mx-auto mt-16 max-w-[1400px] px-6 md:px-10">
        <div className="flex gap-2 mb-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-[var(--color-linen)]" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-[28px] bg-[var(--color-linen)]" />
          ))}
        </div>
      </div>
    </div>
  );
}
