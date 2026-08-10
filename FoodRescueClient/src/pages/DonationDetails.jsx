import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarDays, MapPin, Package, UserCircle2 } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import DonationStatusBadge from '../components/DonationStatusBadge'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { getDonationById } from '../api/donationApi'
import { claimDonation } from '../api/claimApi'
import { useAuth } from '../context/AuthContext'
import { getErrorMessage } from '../lib/error'
import { formatDateTime } from '../lib/formatters'
import { ROLES } from '../lib/contracts'

export default function DonationDetails() {
  const { donationId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [donation, setDonation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [claiming, setClaiming] = useState(false)

  async function loadDonation() {
    setLoading(true)
    setError('')
    try {
      const response = await getDonationById(donationId)
      setDonation(response.data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDonation()
  }, [donationId])

  async function handleClaim() {
    setClaiming(true)
    try {
      await claimDonation(donationId)
      navigate('/my-claims')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setClaiming(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <LoadingSpinner label="Loading donation details…" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <ErrorMessage title="Unable to load donation" message={error} onRetry={loadDonation} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-6 px-0">
        <Link to="/donations">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to donations
        </Link>
      </Button>
      <Card className="overflow-hidden border-[hsl(var(--border))]/90">
        <div className="border-b border-[hsl(var(--border))] bg-[linear-gradient(120deg,rgba(20,88,57,0.08),rgba(255,255,255,0.95))] p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">Donation details</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">{donation.foodName}</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">{donation.description}</p>
            </div>
            <DonationStatusBadge status={donation.status} />
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
                <p className="mt-3 text-lg font-semibold text-[hsl(var(--foreground))]">{donation.quantity} {donation.unit}</p>
              </div>
              <div className="rounded-[1.25rem] border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]">
                  <CalendarDays className="h-4 w-4" />
                  Expires on
                </div>
                <p className="mt-3 text-lg font-semibold text-[hsl(var(--foreground))]">{formatDateTime(donation.expiryDate)}</p>
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-[hsl(var(--border))] bg-white/70 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]">
                <MapPin className="h-4 w-4" />
                Pickup location
              </div>
              <p className="mt-3 text-lg font-semibold text-[hsl(var(--foreground))]">{donation.pickUpLocation}</p>
            </div>
            <div className="rounded-[1.25rem] border border-[hsl(var(--border))] bg-white/70 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]">
                <UserCircle2 className="h-4 w-4" />
                Provider
              </div>
              <p className="mt-3 text-lg font-semibold text-[hsl(var(--foreground))]">{donation.providerUsername}</p>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-6">
            <CardHeader className="px-0 pb-2">
              <CardTitle>Ready to claim?</CardTitle>
              <CardDescription>Only available donations can be claimed.</CardDescription>
            </CardHeader>
            <Button type="button" className="w-full" onClick={handleClaim} disabled={claiming || user?.role === ROLES.PROVIDER || donation?.status !== 'AVAILABLE'}>
              {claiming ? 'Submitting claim…' : 'Claim donation'}
            </Button>
            {user?.role === ROLES.PROVIDER ? <p className="text-sm text-[hsl(var(--muted-foreground))]">Providers cannot claim donations.</p> : null}
            {donation?.status !== 'AVAILABLE' ? <p className="text-sm text-[hsl(var(--muted-foreground))]">Only available donations can be claimed.</p> : null}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
