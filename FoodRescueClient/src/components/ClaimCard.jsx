import { CalendarDays, MapPin, Package, UserCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import ClaimStatusBadge from './ClaimStatusBadge'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { formatDateTime } from '../lib/formatters'

export default function ClaimCard({ claim, onCancel, canceling = false }) {
  const donation = claim.donation || {}

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <CardTitle className="truncate text-xl">{donation.foodName || 'Donation claim'}</CardTitle>
            <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              Claim #{claim.claimId}
            </p>
          </div>
          <ClaimStatusBadge status={claim.claimStatus} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm text-[hsl(var(--foreground))]">
        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
          <Package className="h-4 w-4 text-[hsl(var(--primary))]" />
          <span>
            {donation.quantity ?? 0} {donation.unit || 'items'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
          <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
          <span>{donation.pickUpLocation || 'Pickup location not provided'}</span>
        </div>
        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
          <CalendarDays className="h-4 w-4 text-[hsl(var(--primary))]" />
          <span>Claimed {formatDateTime(claim.claimedAt)}</span>
        </div>
        {claim.volunteer?.username ? (
          <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
            <UserCircle2 className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span>{claim.volunteer.username}</span>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3 border-t border-[hsl(var(--border))] bg-black/1 pt-4">
        <Button asChild variant="outline" size="sm">
          <Link to={`/claims/${claim.claimId}`}>View claim</Link>
        </Button>
        {onCancel ? (
          <Button type="button" size="sm" variant="destructive" onClick={() => onCancel(claim)} disabled={canceling}>
            {canceling ? 'Cancelling…' : 'Cancel claim'}
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}