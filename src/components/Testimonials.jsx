import { Quote } from 'lucide-react'
import { siteData } from '../data/siteData.js'
import { Reveal, SectionHeading } from './ui/Reveal.jsx'

const { testimonials } = siteData

/** Depoimentos — exemplos de layout, claramente identificados como fictícios. */
export function Testimonials() {
  return (
    <section id="depoimentos" className="section-y relative bg-carbon">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div className="container-x">
        <SectionHeading title={testimonials.title}>
          <Reveal
            delay={0.08}
            className="mt-6 flex max-w-xl gap-3 rounded-[3px] border border-white/10 bg-black/40 p-4"
          >
            <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright" />
            <p className="t-small text-mist">{testimonials.notice}</p>
          </Reveal>
        </SectionHeading>

        <ul className="snap-row -mx-5 mt-14 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {testimonials.items.map((item, index) => (
            <Reveal
              as="li"
              key={index}
              delay={index * 0.08}
              className="flex w-[84%] shrink-0 snap-start flex-col rounded-md border border-white/[0.08] bg-graphite p-6 sm:w-[60%] sm:p-8 md:w-auto"
            >
              <div className="flex items-center justify-between">
                <Quote aria-hidden="true" className="h-6 w-6 text-accent-bright" strokeWidth={1.5} />
                <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[0.75rem] text-steel">
                  {testimonials.badge}
                </span>
              </div>
              <blockquote className="mt-6 flex-1 text-[1.0625rem] leading-relaxed text-ice">“{item.quote}”</blockquote>
              <div className="mt-8 border-t border-white/[0.08] pt-5">
                <p className="font-semibold text-ice [font-stretch:106%]">{item.author}</p>
                <p className="t-small mt-0.5 text-steel">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
