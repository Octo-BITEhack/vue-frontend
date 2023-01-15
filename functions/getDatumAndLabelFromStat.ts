import { Stats } from '~~/@types/stats'

export default function getDatumAndLabelFromStat(
  stats: Stats & { timestamp: Date },
  prop: keyof Stats
): { x: string; y: Date } {
  return { x: String(typeof stats[prop] === 'boolean' ? +stats[prop] : stats[prop]), y: stats.timestamp } as {
    x: string
    y: Date
  }
}
