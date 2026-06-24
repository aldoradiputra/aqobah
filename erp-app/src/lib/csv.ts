// Minimal RFC-4180-ish CSV parser. Handles quoted fields, escaped quotes ("")
// and commas / newlines inside quotes. Reusable across modules (customers now,
// jemaah later). Returns rows of string cells.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  const s = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else {
      field += c
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  // Drop fully-empty rows (blank lines).
  return rows.filter((r) => r.some((c) => c.trim() !== ''))
}

// First row = headers; the rest = data rows.
export function parseCsvRecords(text: string): { headers: string[]; rows: string[][] } {
  const all = parseCsv(text)
  if (all.length === 0) return { headers: [], rows: [] }
  const [headers, ...rows] = all
  return { headers: headers.map((h) => h.trim()), rows }
}
