import api from './http'

export function claimDonation(donationId) {
  return api.post(`/api/claims/${donationId}`)
}

export function getMyClaims() {
  return api.get('/api/claims/my')
}

export function getClaimById(claimId) {
  return api.get(`/api/claims/${claimId}`)
}

export function cancelClaim(claimId) {
  return api.patch(`/api/claims/${claimId}/cancel`)
}

export const claimApi = {
  claimDonation,
  getMyClaims,
  getClaimById,
  cancelClaim,
}

export default claimApi