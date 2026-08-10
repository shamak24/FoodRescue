import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { login as loginRequest, logout as logoutRequest, signup as signupRequest } from '../api/authApi'
import { registerUnauthorizedHandler } from '../api/http'

const AUTH_STORAGE_KEY = 'foodrescue.auth.user'

const AuthContext = createContext(null)

function readStoredUser() {
  try {
    const serialized = sessionStorage.getItem(AUTH_STORAGE_KEY)
    return serialized ? JSON.parse(serialized) : null
  } catch {
    return null
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    registerUnauthorizedHandler(() => {
      setUser(null)
      sessionStorage.removeItem(AUTH_STORAGE_KEY)
    })
  }, [])

  const persistUser = (nextUser) => {
    setUser(nextUser)
    if (nextUser) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }

  const login = async (credentials) => {
    setLoading(true)
    try {
      const response = await loginRequest(credentials)
      persistUser(response.data)
      return response.data
    } finally {
      setLoading(false)
    }
  }

  const signup = async (payload) => {
    setLoading(true)
    try {
      const response = await signupRequest(payload)
      return response.data
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await logoutRequest()
    } catch {
      // Clear client state even if the backend session is already gone.
    } finally {
      persistUser(null)
      setLoading(false)
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login,
      signup,
      logout,
    }),
    [loading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
export default AuthProvider