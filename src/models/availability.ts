export enum dayOfWeek {
  SUN = 0,
  MON = 1,
  TUE = 2,
  WED = 3,
  THU = 4,
  FRI = 5,
  SAT = 6
}

export interface Availability {
  availableFrom: Date,
  availableUntil: Date,
  dayOfWeek: dayOfWeek,
}

export interface Unavailability {
  notAvailableFrom: Date,
  notAvailableUntil: Date,
  notes: string,
}
