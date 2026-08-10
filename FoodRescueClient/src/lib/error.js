export function getErrorMessage(error) {
  const status = error?.response?.status
  const payload = error?.response?.data

  let message = ''
  if (typeof payload === 'string') {
    message = payload
  } else if (payload && typeof payload === 'object') {
    message = payload.message || payload.error || ''
  }

  if (!message) {
    message = error?.message || 'Something went wrong. Please try again.'
  }

  if (status === 401) {
    return 'Your session has expired. Please sign in again.'
  }

  if (status === 403) {
    return "You don't have permission to perform this action."
  }

  if (status === 404) {
    return 'The requested resource was not found.'
  }

  if (status >= 500) {
    return 'The server encountered an error. Please try again later.'
  }

  return message
}

export function isUnauthorizedError(error) {
  return error?.response?.status === 401
}