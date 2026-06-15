"use client";

import { useEffect, useState } from "react";
import { getEnergyMix } from "@/lib/api";
import { DailyMix } from "@/lib/types";
import { CLEAN_FUELS, FUEL_COLORS } from "@/lib/fuels";
import DayMixChart from "./DayMixChart";

export default function EnergyMixSection() {
  const [days, setDays] = useState<DailyMix[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEnergyMix()
      .then(setDays)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>;
  }

  if (!days) {
    return <p className="text-zinc-500">Ladowanie miksu energetycznego…</p>;
  }

  const fuels = Object.keys(FUEL_COLORS);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Miks energetyczny (UK) — 3 dni</h2>

      <div className="grid gap-5 md:grid-cols-3">
        {days.map((day) => (
          <DayMixChart key={day.date} day={day} />
        ))}
      </div>

      {/* czyste oznaczone gwiazdka */}
      <div className="flex flex-wrap gap-3 text-sm">
        {fuels.map((fuel) => (
          <span key={fuel} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: FUEL_COLORS[fuel] }}
            />
            {fuel}
            {CLEAN_FUELS.includes(fuel) && (
              <span className="text-green-600" title="czysta energia">★</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}