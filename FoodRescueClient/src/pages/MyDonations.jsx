import { useEffect, useState } from 'react'
import { PlusCircle, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'

import DonationCard from '../components/DonationCard'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { getMyDonations, cancelDonation } from '../api/donationApi'
import { getErrorMessage } from '../lib/error'

export default function MyDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancellingId, setCancellingId] = useState(null)

  async function loadDonations() {
    setLoading(true)
    setError('')
    try {
      const response = await getMyDonations()
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

  async function handleCancel(donation) {
    setCancellingId(donation.donationId)
    try {
      await cancelDonation(donation.donationId)
      await loadDonations()
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
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">My donations</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Manage the food you have posted</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
            Track the current status of your posted donations and cancel ones that are no longer needed.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={loadDonations} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button asChild>
            <Link to="/create-donation">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create donation
            </Link>
          </Button>
        </div>
      </section>

      {loading ? (
        <div className="rounded-[1.75rem] border border-[hsl(var(--border))] bg-white/70 p-8">
          <LoadingSpinner label="Loading your donations…" />
        </div>
      ) : null}

      {error ? (
        <div className="mb-6">
          <ErrorMessage title="Unable to load your donations" message={error} onRetry={loadDonations} />
        </div>
      ) : null}

      {!loading && !error && donations.length === 0 ? (
        <Card className="border-[hsl(var(--border))]/90">
          <CardHeader>
            <CardTitle>No donations posted yet</CardTitle>
            <CardDescription>Share surplus food with your community by creating your first donation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/create-donation">Create a donation</Link>
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
              actionLabel="Cancel donation"
              onAction={handleCancel}
              actionLoading={cancellingId === donation.donationId}
              actionVariant="destructive"
              actionDisabled={donation.status !== 'AVAILABLE'}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
