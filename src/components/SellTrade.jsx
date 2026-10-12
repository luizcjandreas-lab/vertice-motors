import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheck, ImagePlus, Info, RotateCcw, X } from 'lucide-react'
import { siteData } from '../data/siteData.js'
import { cx, fillTemplate } from '../lib/format.js'
import { external, whatsappUrl } from '../lib/links.js'
import { WhatsAppIcon } from './icons/BrandIcons.jsx'
import { Button } from './ui/Button.jsx'
import { EASE, Reveal, SectionHeading } from './ui/Reveal.jsx'
import { SmartImage } from './ui/SmartImage.jsx'

const { sellTrade, images, whatsappMessages, brand } = siteData
const T = sellTrade.fields
const MAX_PHOTOS = 8
const EMPTY = { name: '', whatsapp: '', brand: '', model: '', year: '', km: '', message: '' }

const digits = (value) => value.replace(/\D/g, '')

function maskPhone(value) {
  const d = digits(value).slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function maskKm(value) {
  const d = digits(value).slice(0, 7)
  return d ? Number(d).toLocaleString('pt-BR') : ''
}

function validate(values) {
  const errors = {}
  const currentYear = new Date().getFullYear()
  if (values.name.trim().length < 2) errors.name = sellTrade.errors.name
  const phone = digits(values.whatsapp)
  if (phone.length < 10 || phone.length > 11) errors.whatsapp = sellTrade.errors.whatsapp
  if (!values.brand.trim()) errors.brand = sellTrade.errors.brand
  if (!values.model.trim()) errors.model = sellTrade.errors.model
  const year = Number(values.year)
  if (!/^\d{4}$/.test(values.year) || year < 1950 || year > currentYear + 1) errors.year = sellTrade.errors.year
  return errors
}

export function SellTrade() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done
  const formRef = useRef(null)

  const set = (key, transform) => (event) => {
    const raw = event.target.value
    const value = transform ? transform(raw) : raw
    setValues((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstError = Object.keys(found)[0]
    if (firstError) {
      formRef.current?.querySelector(`[name="${firstError}"]`)?.focus()
      return
    }
    // DEMONSTRAÇÃO: aqui entra a integração (API, e-mail, CRM). Nada é enviado.
    setStatus('sending')
    window.setTimeout(() => setStatus('done'), 900)
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  const whatsappMessage = fillTemplate(whatsappMessages.evaluation, {
    loja: brand.name,
    nome: values.name,
    marca: values.brand,
    modelo: values.model,
    ano: values.year,
    km: values.km || '-',
    mensagem: values.message || '-',
  })

  const field = (key, label, props = {}) => (
    <div className={props.wrapperClass}>
      <label htmlFor={`avaliacao-${key}`} className="field-label">
        {label}
      </label>
      <input
        id={`avaliacao-${key}`}
        name={key}
        value={values[key]}
        onChange={set(key, props.mask)}
        aria-invalid={errors[key] ? 'true' : undefined}
        aria-describedby={errors[key] ? `avaliacao-${key}-erro` : undefined}
        className="field-input"
        type={props.type || 'text'}
        inputMode={props.inputMode}
        autoComplete={props.autoComplete || 'off'}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
      {errors[key] && (
        <p id={`avaliacao-${key}-erro`} className="field-error">
          {errors[key]}
        </p>
      )}
    </div>
  )

  return (
    <section id="venda-troca" className="section-y relative bg-carbon">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading title={sellTrade.title} text={sellTrade.text} />

          <ol className="mt-12 grid gap-0">
            {sellTrade.steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={0.08 * index}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-white/[0.08] py-5"
              >
                <span className="t-num pt-0.5 text-[0.875rem] font-semibold text-accent-bright">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-semibold text-ice [font-stretch:106%]">{step.title}</span>
                  <span className="mt-1 block text-[0.9375rem] text-mist">{step.text}</span>
                </span>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1} className="mt-10 hidden lg:block">
            {/* TROCAR ESTA IMAGEM: siteData.images.sellTrade */}
            <SmartImage
              image={images.sellTrade}
              sizes="40vw"
              className="aspect-[4/3] w-full rounded-md border border-white/[0.08]"
            />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-md border border-white/10 bg-graphite p-5 sm:p-8 lg:p-10">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />

            <div className="mb-8 flex gap-3 rounded-[3px] border border-white/10 bg-black/40 p-4">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright" />
              <p className="t-small text-mist">{sellTrade.notice}</p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {status === 'done' ? (
                <motion.div
                  key="sucesso"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex flex-col items-start py-6"
                  role="status"
                >
                  <CircleCheck aria-hidden="true" className="h-10 w-10 text-accent-bright" strokeWidth={1.5} />
                  <h3 className="t-h3 mt-5 text-[1.5rem]">{sellTrade.successTitle}</h3>
                  <p className="mt-3 max-w-[52ch] text-mist">{sellTrade.successText}</p>
                  <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Button href={whatsappUrl(whatsappMessage)} {...external} iconLeft={WhatsAppIcon} size="lg">
                      {sellTrade.successWhatsapp}
                    </Button>
                    <Button as="button" variant="ghost" size="lg" iconLeft={RotateCcw} onClick={reset}>
                      {sellTrade.successReset}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="formulario"
                  ref={formRef}
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  {field('name', T.name, { autoComplete: 'name', wrapperClass: 'sm:col-span-2' })}
                  {field('whatsapp', T.whatsapp, {
                    type: 'tel',
                    inputMode: 'tel',
                    autoComplete: 'tel-national',
                    mask: maskPhone,
                    placeholder: '(00) 00000-0000',
                    wrapperClass: 'sm:col-span-2',
                  })}
                  {field('brand', T.brand)}
                  {field('model', T.model)}
                  {field('year', T.year, {
                    inputMode: 'numeric',
                    mask: (v) => digits(v).slice(0, 4),
                    placeholder: '2020',
                  })}
                  {field('km', T.km, { inputMode: 'numeric', mask: maskKm, placeholder: '45.000' })}

                  <div className="sm:col-span-2">
                    <label htmlFor="avaliacao-message" className="field-label">
                      {T.message}
                    </label>
                    <textarea
                      id="avaliacao-message"
                      name="message"
                      value={values.message}
                      onChange={set('message')}
                      placeholder={T.messagePlaceholder}
                      className="field-input"
                      rows={4}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <PhotoDrop />
                  </div>

                  <div className="sm:col-span-2">
                    <Button
                      as="button"
                      type="submit"
                      size="lg"
                      block
                      disabled={status === 'sending'}
                      className="sm:w-auto"
                    >
                      {status === 'sending' ? sellTrade.submitting : sellTrade.submit}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Área demonstrativa de envio de fotos: mostra prévias locais, não envia nada. */
function PhotoDrop() {
  const [photos, setPhotos] = useState([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)
  const photosRef = useRef(photos)
  photosRef.current = photos

  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), [])

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((file) => file.type.startsWith('image/'))
    if (!files.length) return
    setPhotos((current) => {
      const room = MAX_PHOTOS - current.length
      const added = files.slice(0, Math.max(room, 0)).map((file) => ({
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        url: URL.createObjectURL(file),
      }))
      return [...current, ...added]
    })
  }

  const remove = (id) =>
    setPhotos((current) => {
      const target = current.find((p) => p.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return current.filter((p) => p.id !== id)
    })

  return (
    <div>
      <p className="field-label">{T.photos}</p>
      <label
        htmlFor="avaliacao-fotos"
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          addFiles(event.dataTransfer.files)
        }}
        className={cx(
          'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[3px] border border-dashed px-5 py-8 text-center transition-colors duration-300',
          dragging ? 'border-accent-bright bg-accent/10' : 'border-white/20 bg-black/30 hover:border-white/40',
        )}
      >
        <ImagePlus aria-hidden="true" className="h-7 w-7 text-steel" strokeWidth={1.5} />
        <span className="max-w-[40ch] text-[0.9375rem] text-mist">{T.photosHint}</span>
        <span className="t-small text-steel">{T.photosDemo}</span>
        <input
          ref={inputRef}
          id="avaliacao-fotos"
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(event) => {
            addFiles(event.target.files)
            event.target.value = ''
          }}
        />
      </label>

      {photos.length > 0 && (
        <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
          <AnimatePresence initial={false}>
            {photos.map((photo) => (
              <motion.li
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="relative aspect-square overflow-hidden rounded-[3px] border border-white/10"
              >
                <img src={photo.url} alt={photo.name} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => remove(photo.id)}
                  aria-label={`${T.removePhoto}: ${photo.name}`}
                  className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-black/70 text-ice"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}
