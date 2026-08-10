import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'

import ClaimCard from '../components/ClaimCard'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { getMyClaims, cancelClaim } from '../api/claimApi'
import { getErrorMessage } from '../lib/error'

export default function MyClaims() {
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancellingId, setCancellingId] = useState(null)

  async function loadClaims() {
    setLoading(true)
    setError('')
    try {
      const response = await getMyClaims()
      setClaims(response.data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClaims()
  }, [])

  async function handleCancel(claim) {
    setCancellingId(claim.claimId)
    try {
      await cancelClaim(claim.claimId)
      await loadClaims()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setCancellingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 flex flex-col gap-4 rounded-4xl border border-[hsl(var(--border))] bg-white/80 p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">My claims</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Track donations you have claimed</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            Keep an eye on pickup progress and cancel any claim that no longer applies.
          </p>
        </div>
        <Button variant="outline" onClick={loadClaims} disabled={loading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </section>

      {loading ? (
        <div className="rounded-[1.75rem] border border-[hsl(var(--border))] bg-white/70 p-8">
          <LoadingSpinner label="Loading your claims…" />
        </div>
      ) : null}

      {error ? (
        <div className="mb-6">
          <ErrorMessage title="Unable to load your claims" message={error} onRetry={loadClaims} />
        </div>
      ) : null}

      {!loading && !error && claims.length === 0 ? (
        <Card className="border-[hsl(var(--border))]/90">
          <CardHeader>
            <CardTitle>No claims yet</CardTitle>
            <CardDescription>Visit the donations page to claim food that matches your needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/donations">Browse donations</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {!loading && !error && claims.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {claims.map((claim) => (
            <ClaimCard key={claim.claimId} claim={claim} onCancel={handleCancel} canceling={cancellingId === claim.claimId} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
