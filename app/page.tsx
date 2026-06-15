import EnergyMixSection from "@/components/EnergyMixSection";
import ChargingWindowSection from "@/components/ChargingWindowSection";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Miks energetyczny UK & ładowanie EV
        </h1>
      </header>

      <EnergyMixSection />
      <ChargingWindowSection />
    </main>
  );
}