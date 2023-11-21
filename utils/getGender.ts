export const getGender = (gender: number): string => {
  if (gender === 1) return 'Female'
  if (gender === 2) return 'Male'
  return 'N/A'
}
