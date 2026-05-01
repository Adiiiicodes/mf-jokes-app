"use client";

import { useEffect, useState } from "react";

type Joke = {
  setup: string;
  punchline: string;
};

export default function Home() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      if (!response.ok) {
        throw new Error("Failed to load a joke.");
      }
      const data = (await response.json()) as Joke;
      setJoke(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJoke();
  }, []);

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <header className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
            Microfrontends Lab
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-semibold text-[var(--text)] sm:text-5xl">
                Joke Stream
              </h1>
              <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg">
                A steady feed of one-liners and punchlines. Reload to keep the
                team smiling.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-[var(--panel-2)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              Micro APP URL : https://jokesappmf.vercel.app/jokes
            </div>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-[var(--panel)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              <span>Live Joke</span>
              <span>{loading ? "Loading" : "Ready"}</span>
            </div>

            {error ? (
              <p className="mt-8 text-sm text-red-400">{error}</p>
            ) : (
              <div className="mt-8 space-y-6">
                <p className="text-2xl font-semibold text-[var(--text)]">
                  {joke?.setup ?? ""}
                </p>
                <p className="text-lg text-[var(--accent)]">
                  {joke?.punchline ?? ""}
                </p>
              </div>
            )}

            <button
              className="mt-10 w-full rounded-xl border border-white/10 bg-[var(--accent)]/10 px-4 py-3 text-sm font-semibold text-[var(--accent)] hover:border-[var(--accent)]/40"
              onClick={loadJoke}
              disabled={loading}
            >
              {loading ? "Fetching..." : "Give me another"}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-[var(--panel)] p-6">
              <h2 className="text-lg font-semibold text-[var(--text)]">
                How it works
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Powered by the Official Joke API. Each refresh fetches a new
                random entry with setup and punchline.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[var(--panel-2)] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Soundbite
              </p>
              <p className="mt-3 text-sm text-[var(--text)]">
                Keep this microfrontend running in a sidebar to lighten the day.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
