import { useEffect, useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import DonationCard from '../components/DonationCard'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../context/AuthContext'
import { getAvailableDonations } from '../api/donationApi'
import { claimDonation } from '../api/claimApi'
import { getErrorMessage } from '../lib/error'
import { ROLES } from '../lib/contracts'

export default function Donations() {
  const { user } = useAuth()
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [claimingId, setClaimingId] = useState(null)

  async function loadDonations() {
    setLoading(true)
    setError('')

    try {
      const response = await getAvailableDonations()
      setDonations(response.data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDonations()
  }, [])

  async function handleClaim(donation) {
    setClaimingId(donation.donationId)
    try {
      await claimDonation(donation.donationId)
      await loadDonations()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setClaimingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 flex flex-col gap-4 rounded-4xl border border-[hsl(var(--border))] bg-white/80 p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">Available donations</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Find food that still needs a home</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            Browse the current list of available donations and claim one if it fits your needs.
          </p>
        </div>
        {user?.role === ROLES.PROVIDER ? (
          <Button asChild variant="outline">
            <Link to="/create-donation">
              <PlusCircle className="h-4 w-4" />
              Create donation
            </Link>
          </Button>
        ) : null}
      </section>

      {loading ? (
        <div className="rounded-[1.75rem] border border-[hsl(var(--border))] bg-white/70 p-8">
          <LoadingSpinner label="Loading available donations…" />
        </div>
      ) : null}

      {error ? (
        <div className="mb-6">
          <ErrorMessage title="Unable to load donations" message={error} onRetry={loadDonations} />
        </div>
      ) : null}

      {!loading && !error && donations.length === 0 ? (
        <Card className="border-[hsl(var(--border))]/90">
          <CardHeader>
            <CardTitle>No donations are available right now</CardTitle>
            <CardDescription>Check back later for newly rescued food.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link to={user?.role === ROLES.PROVIDER ? '/create-donation' : '/dashboard'}>
                {user?.role === ROLES.PROVIDER ? 'Create a donation' : 'Return to dashboard'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {!loading && !error && donations.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {donations.map((donation) => (
            <DonationCard
              key={donation.donationId}
              donation={donation}
              actionLabel="Claim donation"
              onAction={handleClaim}
              actionLoading={claimingId === donation.donationId}
              actionDisabled={user?.role === ROLES.PROVIDER}
              actionVariant="default"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
