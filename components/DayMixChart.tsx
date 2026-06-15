"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { DailyMix } from "@/lib/types";
import { FUEL_COLORS } from "@/lib/fuels";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function DayMixChart({ day }: { day: DailyMix }) {
  const hasData = day.generationMix.length > 0;

  return (
    <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-sm font-medium capitalize text-zinc-500 dark:text-zinc-400">
        {formatDate(day.date)}
      </h3>
      <p className="mt-1 mb-1 text-2xl font-semibold text-green-600 dark:text-green-400">
        {day.cleanEnergyPercentage.toFixed(2)}%
        <span className="ml-1 text-sm font-normal text-zinc-500">czystej energii</span>
      </p>
      {hasData ? (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={day.generationMix}
              dataKey="perc"
              nameKey="fuel"
              cx="50%"
              cy="50%"
              outerRadius={85}
            >
              {day.generationMix.map((share) => (
                <Cell key={share.fuel} fill={FUEL_COLORS[share.fuel] ?? "#cccccc"} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="flex h-[240px] items-center text-sm text-zinc-400">
          Brak danych dla tego dnia
        </p>
      )}
    </div>
  );
}