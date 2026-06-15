import { ChargingWindow, DailyMix } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function getEnergyMix(): Promise<DailyMix[]> {
  const res = await fetch(`${BASE_URL}/api/energy-mix`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Nie udalo sie pobrac miksu energetycznego (HTTP ${res.status})`);
  }
  return res.json();
}

export async function getChargingWindow(hours: number): Promise<ChargingWindow> {
  const res = await fetch(`${BASE_URL}/api/charging-window?hours=${hours}`, { cache: "no-store" });
  if (!res.ok) {
    let message = `Nie udalo sie wyznaczyc okna ladowania (HTTP ${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
    }
    throw new Error(message);
  }
  return res.json();
}