export default function StoryLoading() {
  return (
    <div className="pt-32 pb-24">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="h-4 w-36 animate-pulse rounded-full bg-[var(--color-linen)]" />
        <div className="mt-5 h-16 w-[65%] max-w-md animate-pulse rounded-2xl bg-[var(--color-linen)]" />
        <div className="mt-5 h-5 w-[50%] max-w-sm animate-pulse rounded-full bg-[var(--color-linen)]" />
      </header>
      <div className="mx-auto mt-20 flex max-w-[1400px] flex-col gap-16 px-6 md:px-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 md:flex-row md:gap-10">
            <div className="h-64 flex-1 animate-pulse rounded-3xl bg-[var(--color-linen)]" />
            <div className="flex flex-1 flex-col gap-3">
              <div className="h-8 w-48 animate-pulse rounded-xl bg-[var(--color-linen)]" />
              <div className="h-4 w-full animate-pulse rounded-full bg-[var(--color-linen)]" />
              <div className="h-4 w-[85%] animate-pulse rounded-full bg-[var(--color-linen)]" />
              <div className="h-4 w-[70%] animate-pulse rounded-full bg-[var(--color-linen)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
