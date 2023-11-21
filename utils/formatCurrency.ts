export const formatCurrency = (currency: number): string => {
  return `$ ${currency.toLocaleString('en-US')}`
}
