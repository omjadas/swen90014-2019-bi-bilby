export enum dayOfWeek {
  MON = "monday",
  TUE = "tuesday",
  WED = "wednesday",
  THU = "thursday",
  FRI = "friday",
  SAT = "saturday",
  SUN = "sunday"
}

export interface Availability {
  availableFrom: Date,
  availableUntil: Date,
  dayOfWeek: dayOfWeek,
}

export interface SpecificUnavailability {
  date: Date,
  notes: string,
}
