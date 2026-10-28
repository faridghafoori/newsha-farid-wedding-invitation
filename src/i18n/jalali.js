function readPersian(date) {
  const parts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    numberingSystem: "latn",
  }).formatToParts(date);
  const num = (type) => Number(parts.find((part) => part.type === type)?.value);
  return { year: num("year"), month: num("month"), day: num("day") };
}

export function jalaliMonthOf(year, monthIndex, day) {
  const anchor = new Date(year, monthIndex, day);
  const current = readPersian(anchor);
  const first = new Date(year, monthIndex, day - (current.day - 1));
  let daysInMonth = current.month <= 6 ? 31 : 30;

  while (
    readPersian(new Date(first.getFullYear(), first.getMonth(), first.getDate() + daysInMonth - 1))
      .month !== current.month
  ) {
    daysInMonth -= 1;
  }

  return {
    year: current.year,
    month: current.month,
    day: current.day,
    firstWeekday: first.getDay(),
    daysInMonth,
  };
}
