export function concatFirstAndLastName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`
}

export const convertTime = (date: string) => {
  const dateObj = new Date(date)
  const hours = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')
  const isToday = new Date().toDateString() === dateObj.toDateString()
  const myDate = isToday ? 'Today' : dateObj.toLocaleDateString()
  return `${myDate} at ${hours}:${minutes}`
}

/**
 * Check if the file type is allowed
 * @param fileName - The name of the file
 * @param allowedTypes - The allowed file types
 * @returns - A boolean indicating if the file type is allowed
 *
 * @example
 * checkFileType('image.jpg', ['jpg', 'png']) // true
 */
export const checkFileType = (fileName: string, allowedTypes: string[]) => {
  const extension = fileName.split('.').pop()
  if (!extension) return false
  return allowedTypes.includes(extension)
}
