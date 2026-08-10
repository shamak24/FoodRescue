import api from './http'

export function getAvailableDonations() {
  return api.get('/api/donations/available')
}

export function getDonationById(donationId) {
  return api.get(`/api/donations/${donationId}`)
}

export function getMyDonations() {
  return api.get('/api/donations/my')
}

export function createDonation(payload) {
  return api.post('/api/donations/create', payload)
}

export function cancelDonation(donationId) {
  return api.patch(`/api/donations/${donationId}/cancel`)
}