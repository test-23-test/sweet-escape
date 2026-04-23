"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          background: "#F7EFE2",
          color: "#2F1F14",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,4rem)", margin: 0 }}>
            Something broke badly.
          </h1>
          <p style={{ marginTop: "1rem", opacity: 0.7, maxWidth: "28rem" }}>
            The root layout failed. This page uses no external styles to ensure
            you always see something.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              border: "none",
              background: "#2F1F14",
              color: "#F7EFE2",
              cursor: "pointer",
              fontSize: "0.85rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
