export interface Clima {
  date: string;
  temperature: number;
  humidity: number;
  temperature_max: number;
  temperature_min: number;
  text: string;
}

export interface Tiempo {
  day1: Clima;
  day2: Clima;
  day3: Clima;
  day4: Clima;
  day5: Clima;
  day6: Clima;
  day7: Clima;
  hour_hour: any;
}
