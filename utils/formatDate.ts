const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleString('en-US', options)
}
