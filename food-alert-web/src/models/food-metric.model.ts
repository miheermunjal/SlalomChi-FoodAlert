import { round } from 'lodash';

export interface FoodMetricInterface {
  timestamp: string;
  weight: number;
}

export class FoodMetric implements FoodMetricInterface {
  timestamp: string;
  weight: number;

  constructor(config: FoodMetricInterface) {
    this.timestamp = config.timestamp;
    this.weight = config.weight;
  }

  get formattedDate(): string {
    const date = new Date(this.timestamp);
    return date.toLocaleTimeString();
  }

  get percentage(): number {
    return round(this.weight / 20, 0);
  }
}
