import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole, UserRound } from 'lucide-react'

import ErrorMessage from '../components/ErrorMessage'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuth } from '../context/AuthContext'
import { getErrorMessage } from '../lib/error'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, loading } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from?.pathname || '/dashboard'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [from, isAuthenticated, navigate])

  if (isAuthenticated) {
    return null
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(form)
      navigate(from, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl overflow-hidden border-[hsl(var(--border))]/90">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[linear-gradient(135deg,rgba(20,88,57,0.94),rgba(86,151,109,0.95))] p-8 text-white">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <LockKeyhole className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold">Welcome back</h2>
                  <p className="mt-3 text-sm leading-7 text-white/85">
                    Sign in to view donations, claim rescued food, or manage your provider listings.
                  </p>
                </div>
              </div>
              <div className="rounded-[1.25rem] border border-white/20 bg-white/10 p-4 text-sm text-white/85">
                <p className="font-semibold text-white">Ready to get started</p>
                <p className="mt-2">Sign in to browse available food listings, manage your donations, and support a more sustainable community.</p>
              </div>
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <CardHeader className="px-0 pb-6">
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>Sign in to manage your rescued food listings, donations, and claims.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <Input
                      id="username"
                      value={form.username}
                      onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
                      className="pl-11"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {error ? <ErrorMessage title="Sign in failed" message={error} /> : null}
                <Button type="submit" className="w-full" disabled={submitting || loading}>
                  {submitting ? 'Signing in…' : 'Sign in'}
                </Button>
              </form>
              <div className="mt-6 text-sm text-[hsl(var(--muted-foreground))]">
                New here?{' '}
                <Link to="/signup" className="font-semibold text-[hsl(var(--primary))]">
                  Create an account
                </Link>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}
