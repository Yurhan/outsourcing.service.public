export function calculateTimeDuration(fromDateTime: Date, toDateTime: Date): number {
  return Math.round((toDateTime.getTime() - fromDateTime.getTime()) / 1000);
}
