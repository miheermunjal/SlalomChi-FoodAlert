export interface Bandit {
  label?: string;
  timestamp: string;
  image: string;
}

export class FoodBandit implements Bandit {
  label?: string;
  timestamp: string;
  image: string;

  constructor(config: Bandit) {
    this.timestamp = config.timestamp;
    this.image = config.image;
    this.label = config.label;
  }

  get formattedDate(): string {
    const date = new Date(this.timestamp);
    return date.toLocaleTimeString();
  }
}
