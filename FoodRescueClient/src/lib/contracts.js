export const API_CONTRACT = {
  auth: {
    signup: 'POST /api/auth/signup',
    login: 'POST /api/auth/login',
    logout: 'POST /api/auth/logout',
  },
  donations: {
    create: 'POST /api/donations/create',
    available: 'GET /api/donations/available',
    byId: 'GET /api/donations/{donationId}',
    my: 'GET /api/donations/my',
    cancel: 'PATCH /api/donations/{donationId}/cancel',
  },
  claims: {
    claim: 'POST /api/claims/{donationId}',
    my: 'GET /api/claims/my',
    byId: 'GET /api/claims/{claimId}',
  },
}

export const ROLES = {
  PROVIDER: 'PROVIDER',
  BENEFICIARY: 'BENEFICIARY',
}

export const DONATION_STATUS = {
  AVAILABLE: 'AVAILABLE',
  CLAIMED: 'CLAIMED',
  COMPLETED: 'COMPLETED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
}

export const CLAIM_STATUS = {
  CLAIMED: 'CLAIMED',
  PICKED_UP: 'PICKED_UP',
  CANCELLED: 'CANCELLED',
}

export const roleLabelMap = {
  [ROLES.PROVIDER]: 'Provider',
  [ROLES.BENEFICIARY]: 'Beneficiary',
}

export const donationStatusLabelMap = {
  [DONATION_STATUS.AVAILABLE]: 'Available',
  [DONATION_STATUS.CLAIMED]: 'Claimed',
  [DONATION_STATUS.COMPLETED]: 'Completed',
  [DONATION_STATUS.EXPIRED]: 'Expired',
  [DONATION_STATUS.CANCELLED]: 'Cancelled',
}

export const claimStatusLabelMap = {
  [CLAIM_STATUS.CLAIMED]: 'Claimed',
  [CLAIM_STATUS.PICKED_UP]: 'Picked up',
  [CLAIM_STATUS.CANCELLED]: 'Cancelled',
}

export function formatRole(role) {
  return roleLabelMap[role] ?? role ?? 'Unknown'
}

export function formatDonationStatus(status) {
  return donationStatusLabelMap[status] ?? status ?? 'Unknown'
}

export function formatClaimStatus(status) {
  return claimStatusLabelMap[status] ?? status ?? 'Unknown'
}