"use client";

import { FormEvent, useState } from "react";
import { getChargingWindow } from "@/lib/api";
import { ChargingWindow } from "@/lib/types";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("pl-PL", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChargingWindowSection() {
  const [hours, setHours] = useState(3);
  const [result, setResult] = useState<ChargingWindow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await getChargingWindow(hours));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wystapil blad");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-xl font-semibold">Optymalne okno ladowania auta</h2>
      <p className="text-sm text-zinc-500">
        Podaj czas ladowania (1–6 godzin). Wyznaczymy przedzial z najwyzszym udzialem czystej energii
        w ciagu najblizszych dwoch dni.
      </p>

      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Czas ladowania (godziny)
          <select
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
          >
            {[1, 2, 3, 4, 5, 6].map((h) => (
              <option key={h} value={h}>
                {h}h
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Liczenie…" : "Wyznacz okno"}
        </button>
      </form>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {result && (
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/40">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Start: <strong>{formatDateTime(result.start)}</strong>
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Koniec: <strong>{formatDateTime(result.end)}</strong>
          </p>
          <p className="mt-2 text-lg font-semibold text-green-700 dark:text-green-400">
            {result.averageCleanEnergyPercentage.toFixed(2)}% czystej energii
          </p>
        </div>
      )}
    </section>
  );
}