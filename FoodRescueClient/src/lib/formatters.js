export function formatDateTime(value) {
  if (!value) {
    return 'N/A'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function formatCurrencyLikeCount(value, singularLabel, pluralLabel) {
  if (value === 1) {
    return `1 ${singularLabel}`
  }

  return `${value} ${pluralLabel}`
}