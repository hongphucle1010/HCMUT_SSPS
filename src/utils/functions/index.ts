export function concatFirstAndLastName(
  firstName: string,
  lastName: string
): string {
  return `${firstName} ${lastName}`;
}

export const convertTime = (date: string) => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const isToday = new Date().toDateString() === dateObj.toDateString();
  const myDate = isToday ? "Today" : dateObj.toLocaleDateString();
  return `${myDate} at ${hours}:${minutes}`;
};
