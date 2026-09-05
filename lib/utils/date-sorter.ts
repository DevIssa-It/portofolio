const MONTH_MAP: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
}

/**
 * Extracts a numeric chronological score (YYYYMM) from a date/period string.
 * Supports:
 * - "Dec 2025 - May 2026" => 202605
 * - "Sep 2025" => 202509
 * - "2024 - Present" => 99999999 (Current/Ongoing)
 */
export function parseDateScore(periodStr?: string): number {
  if (!periodStr) return 0
  const normalized = periodStr.toLowerCase().trim()

  if (
    normalized.includes('present') ||
    normalized.includes('sekarang') ||
    normalized.includes('current')
  ) {
    return 99999999
  }

  const years = Array.from(normalized.matchAll(/\b(20\d{2}|19\d{2})\b/g)).map((m) =>
    parseInt(m[1], 10)
  )

  if (years.length === 0) return 0

  const latestYear = Math.max(...years)

  const monthMatches = Array.from(
    normalized.matchAll(
      /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/g
    )
  )

  let monthValue = 1
  if (monthMatches.length > 0) {
    const lastMonthStr = monthMatches[monthMatches.length - 1][1].slice(0, 3)
    monthValue = MONTH_MAP[lastMonthStr] || 1
  }

  return latestYear * 100 + monthValue
}

/**
 * Sorts items chronologically descending (newest to oldest)
 */
export function sortChronologically<T extends { year?: string; period?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const scoreA = parseDateScore(a.year || a.period)
    const scoreB = parseDateScore(b.year || b.period)
    return scoreB - scoreA
  })
}
