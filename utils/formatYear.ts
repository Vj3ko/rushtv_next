const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
}

export const formatYear = (date: string): string => {
  return new Date(date).toLocaleString('en-US', options)
}
