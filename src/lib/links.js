import { siteData } from '../data/siteData.js'
import { fillTemplate, formatPrice, installment, vehicleName } from './format.js'

const { contact, whatsappMessages, financing, brand } = siteData

/** Monta o link do WhatsApp com mensagem automática. */
export function whatsappUrl(message = '') {
  const number = String(contact.whatsapp.number).replace(/\D/g, '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${text}`
}

/** Link do WhatsApp usando um dos modelos de mensagem do siteData. */
export function whatsappFor(key, values = {}) {
  const template = whatsappMessages[key] || whatsappMessages.general
  return whatsappUrl(fillTemplate(template, { loja: brand.name, ...values }))
}

/** Mensagem específica de um veículo ("Tenho interesse"). */
export function vehicleWhatsapp(vehicle) {
  const template = vehicle.whatsappMessage || whatsappMessages.vehicleInterest
  return whatsappUrl(
    fillTemplate(template, {
      loja: brand.name,
      veiculo: vehicleName(vehicle),
      preco: formatPrice(vehicle.price),
    }),
  )
}

export function defaultInstallment(price) {
  const principal = price * (1 - financing.defaultDownPayment)
  return installment(principal, financing.monthlyRate, financing.defaultTerm)
}

export function fullAddress() {
  const a = contact.address
  return `${a.street}, ${a.district}, ${a.city} - ${a.state}, ${a.zip}`
}

export function routeUrl() {
  if (contact.routeUrl) return contact.routeUrl
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress())}`
}

/** Propriedades para links que abrem em nova aba. */
export const external = { target: '_blank', rel: 'noopener noreferrer' }
