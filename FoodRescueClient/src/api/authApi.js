import { redirect } from 'react-router'
import api from './http'

export function login(credentials) {
  return api.post('/api/auth/login', credentials)
}

export function signup(payload) {
  return api.post('/api/auth/signup', payload)
}

export function logout() {
  redirect('/login')
  return api.post('/api/auth/logout')
}