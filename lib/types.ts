export interface FuelShare {
  fuel: string;
  perc: number;
}

export interface DailyMix {
  date: string;
  generationMix: FuelShare[];
  cleanEnergyPercentage: number;
}

export interface ChargingWindow {
  start: string;
  end: string;
  averageCleanEnergyPercentage: number;
}