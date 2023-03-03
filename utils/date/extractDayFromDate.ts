export const dictionary = {
  1: "janeiro",
  2: "fervereiro",
  3: "março",
  4: "abril",
  5: "maio",
  6: "junho",
  7: "julho",
  8: "agosto",
  9: "setembro",
  10: "outubro",
  11: "novembro",
  12: "dezembro",
};

export function extractMonthFromDate(dateString: string) {
  const date = new Date(dateString);

  const monthIndex: number = date.getMonth() + 1;

  return dictionary[monthIndex as keyof typeof dictionary];
}
