/**
 * Contorno lateral de um cupê esportivo genérico, desenhado em SVG.
 * Usado na introdução (com animação de traçado) e no fallback das imagens.
 * Área de desenho: 800 x 260.
 */
export const CAR_VIEWBOX = '0 0 800 260'

export const CAR = {
  body:
    'M 104 196 L 156 196 A 44 44 0 0 1 244 196 L 568 196 A 44 44 0 0 1 656 196 L 722 196 ' +
    'C 740 196 750 189 753 177 L 756 165 C 757 155 751 149 739 147 C 702 139 652 131 602 125 ' +
    'L 574 121 C 543 105 508 85 478 72 C 442 60 382 57 330 61 C 278 65 232 82 200 100 ' +
    'C 178 111 150 115 118 117 L 100 119 C 92 123 90 133 91 146 L 92 172 C 92 187 96 196 104 196 Z',
  window:
    'M 552 124 C 526 108 500 92 474 82 C 438 70 384 68 338 72 C 300 76 266 90 238 108 C 300 113 470 119 552 124 Z',
  pillar: 'M 401 70 L 409 117',
  shoulder: 'M 124 141 C 300 131 520 133 738 153',
  sill: 'M 252 185 C 380 188 470 188 560 185',
  mirror: 'M 538 118 C 543 110 553 109 559 114 L 556 121 L 541 121 Z',
  headlight: 'M 724 152 C 737 151 748 156 752 163 L 732 161 C 728 159 725 156 724 152 Z',
  taillight: 'M 95 124 L 121 121 L 119 131 L 94 134 Z',
  ground: 'M 24 231 L 776 231',
  wheels: [
    { cx: 200, cy: 196 },
    { cx: 612, cy: 196 },
  ],
}

/** Coordenadas (em %) dos faróis e lanternas, para posicionar os brilhos. */
export const LAMPS = {
  front: { x: (744 / 800) * 100, y: (157 / 260) * 100 },
  frontFar: { x: (752 / 800) * 100, y: (152 / 260) * 100 },
  rear: { x: (106 / 800) * 100, y: (128 / 260) * 100 },
}

/** Versão estática (sem animação), usada no fallback das imagens. */
export function CarOutline({ className = '', strokeWidth = 1.2 }) {
  return (
    <svg viewBox={CAR_VIEWBOX} fill="none" className={className} aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round">
        <path d={CAR.ground} opacity="0.5" />
        <path d={CAR.body} />
        <path d={CAR.window} opacity="0.7" />
        <path d={CAR.pillar} opacity="0.7" />
        <path d={CAR.shoulder} opacity="0.45" />
        <path d={CAR.sill} opacity="0.45" />
        <path d={CAR.mirror} opacity="0.7" />
        <path d={CAR.headlight} />
        <path d={CAR.taillight} />
        {CAR.wheels.map((w) => (
          <g key={w.cx}>
            <circle cx={w.cx} cy={w.cy} r="34" />
            <circle cx={w.cx} cy={w.cy} r="22" opacity="0.6" />
            <circle cx={w.cx} cy={w.cy} r="5" opacity="0.6" />
          </g>
        ))}
      </g>
    </svg>
  )
}
