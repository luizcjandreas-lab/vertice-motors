const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})
const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })
const percent = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 0 })

export const formatPrice = (value) => currency.format(Math.round(value || 0))
export const formatNumber = (value) => number.format(Math.round(value || 0))
export const formatKm = (value) => `${number.format(value || 0)} km`
export const formatPercent = (value) => percent.format(value || 0)

/** Parcela pela tabela Price. */
export function installment(principal, monthlyRate, months) {
  if (!months || principal <= 0) return 0
  if (!monthlyRate) return principal / months
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
}

/** Substitui {chave} pelo valor correspondente. */
export function fillTemplate(template = '', values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => (values[key] ?? '').toString())
}

export const vehicleName = (v) => `${v.brand} ${v.model} ${v.version} ${v.yearLabel}`
export const vehicleShortName = (v) => `${v.brand} ${v.model}`

export const cx = (...classes) => classes.filter(Boolean).join(' ')
