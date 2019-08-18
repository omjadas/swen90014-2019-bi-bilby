/**
 * Generate list of possible start time (every half an hour from 9 - 4)
 */
export function generateTimesForDay(year: number, month: number, day: number): Date[] {
  const times = [];

  let firstTimeSlot = 9;
  let minutes = 0;

  for (let i = 0; i < 15; i++) {
    const d = new Date(year, month, day, firstTimeSlot, minutes);
    times.push(d);

    if (minutes === 30) {
      minutes = 0;
      firstTimeSlot += 1;
    } else {
      minutes = 30;
    }
  }
  return (times);
}
