import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, UserRoundPlus } from 'lucide-react'

import ErrorMessage from '../components/ErrorMessage'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select } from '../components/ui/select'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../lib/contracts'
import { getErrorMessage } from '../lib/error'

export default function Signup() {
  const navigate = useNavigate()
  const { signup, login } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '', role: ROLES.BENEFICIARY })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await signup({
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
      })
      await login({ username: form.username, password: form.password })
      navigate('/dashboard', { replace: true })
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
                  <UserRoundPlus className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold">Join FoodRescue</h2>
                  <p className="mt-3 text-sm leading-7 text-white/85">
                    Create an account as a provider to share food or as a beneficiary to claim available donations.
                  </p>
                </div>
              </div>
              <div className="rounded-[1.25rem] border border-white/20 bg-white/10 p-4 text-sm text-white/85">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <Sparkles className="h-4 w-4" />
                  <span>Provider or beneficiary access</span>
                </div>
                <p className="mt-2">Choose the role that matches the way you intend to use the platform.</p>
              </div>
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <CardHeader className="px-0 pb-6">
              <CardTitle className="text-2xl">Create account</CardTitle>
              <CardDescription>Enter your account details to get started.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={form.username}
                    onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
                    placeholder="Choose a username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                    placeholder="Choose a strong password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    id="role"
                    value={form.role}
                    onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                  >
                    <option value={ROLES.BENEFICIARY}>Beneficiary</option>
                    <option value={ROLES.PROVIDER}>Provider</option>
                  </Select>
                </div>
                {error ? <ErrorMessage title="Registration failed" message={error} /> : null}
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Creating account…' : 'Create account'}
                </Button>
              </form>
              <div className="mt-6 text-sm text-[hsl(var(--muted-foreground))]">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-[hsl(var(--primary))]">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}
