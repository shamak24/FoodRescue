import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarDays, MapPin, Package, UserCircle2 } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import ClaimStatusBadge from '../components/ClaimStatusBadge'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { getClaimById, cancelClaim } from '../api/claimApi'
import { getErrorMessage } from '../lib/error'
import { formatDateTime } from '../lib/formatters'

export default function ClaimDetails() {
  const { claimId } = useParams()
  const navigate = useNavigate()
  const [claim, setClaim] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelling, setCancelling] = useState(false)

  async function loadClaim() {
    setLoading(true)
    setError('')
    try {
      const response = await getClaimById(claimId)
      setClaim(response.data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClaim()
  }, [claimId])

  async function handleCancel() {
    setCancelling(true)
    try {
      await cancelClaim(claimId)
      navigate('/my-claims')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setCancelling(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <LoadingSpinner label="Loading claim details…" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <ErrorMessage title="Unable to load claim" message={error} onRetry={loadClaim} />
      </div>
    )
  }

  const donation = claim?.donation || {}

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-6 px-0">
        <Link to="/my-claims">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to claims
        </Link>
      </Button>
      <Card className="overflow-hidden border-[hsl(var(--border))]/90">
        <div className="border-b border-[hsl(var(--border))] bg-[linear-gradient(120deg,rgba(20,88,57,0.08),rgba(255,255,255,0.95))] p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">Claim details</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">{donation.foodName || 'Donation claim'}</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">Claimed by {donation.provider.username || 'Anonymous'}</p>
            </div>
            <ClaimStatusBadge status={claim.claimStatus} />
          </div>
        </div>
        <CardContent className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]">
                  <Package className="h-4 w-4" />
                  Quantity
                </div>
                <p className="mt-3 text-lg font-semibold text-[hsl(var(--foreground))]">{donation.quantity ?? 0} {donation.unit || 'items'}</p>
              </div>
              <div className="rounded-[1.25rem] border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]">
                  <CalendarDays className="h-4 w-4" />
                  Claimed on
                </div>
                <p className="mt-3 text-lg font-semibold text-[hsl(var(--foreground))]">{formatDateTime(claim.claimedAt)}</p>
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-[hsl(var(--border))] bg-white/70 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]">
                <MapPin className="h-4 w-4" />
                Pickup location
              </div>
              <p className="mt-3 text-lg font-semibold text-[hsl(var(--foreground))]">{donation.pickUpLocation || 'Pickup location not provided'}</p>
            </div>
            <div className="rounded-[1.25rem] border border-[hsl(var(--border))] bg-white/70 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]">
                <UserCircle2 className="h-4 w-4" />
                Provider
              </div>
              <p className="mt-3 text-lg font-semibold text-[hsl(var(--foreground))]">{claim.volunteer.username || 'Provider not provided'}</p>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-6">
            <CardHeader className="px-0 pb-2">
              <CardTitle>Claim actions</CardTitle>
              <CardDescription>Review the claim details below and cancel it if needed.</CardDescription>
            </CardHeader>
            <Button type="button" variant="destructive" className="w-full" onClick={handleCancel} disabled={cancelling || claim?.claimStatus === 'CANCELLED'}>
              {cancelling ? 'Cancelling claim…' : 'Cancel claim'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
