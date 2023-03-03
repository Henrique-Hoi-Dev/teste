export function extractDayFromDate(dateString: string) {
  const date = new Date(dateString);

  return date.getDate() + 1;
}
