import type { ReactNode } from 'react'

export type PillTone = 'neutral' | 'blue' | 'gold' | 'green' | 'amber' | 'red' | 'seal'

const PILL_TONES: Record<PillTone, { bg: string; fg: string }> = {
  neutral: { bg: '#EAEFF4', fg: '#364555' },
  blue: { bg: '#E7F5FC', fg: '#0479B0' },
  gold: { bg: '#FEF6E4', fg: '#A06800' },
  green: { bg: '#E4F5EE', fg: '#1E9E6A' },
  amber: { bg: '#FBF0DC', fg: '#D98A0B' },
  red: { bg: '#F8E5E2', fg: '#C0392B' },
  seal: { bg: '#F3DCDD', fg: '#8E2125' },
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: PillTone }) {
  const { bg, fg } = PILL_TONES[tone] ?? PILL_TONES.neutral
  return (
    <span className="pill" style={{ background: bg, color: fg }}>
      {children}
    </span>
  )
}
