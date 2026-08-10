import { CalendarDays, MapPin, Package, UserCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import DonationStatusBadge from './DonationStatusBadge'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { formatDateTime } from '../lib/formatters'

export default function DonationCard({ donation, actionLabel, onAction, actionDisabled, actionLoading, actionVariant = 'default' }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <CardTitle className="truncate text-xl">{donation.foodName}</CardTitle>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              {donation.description}
            </p>
          </div>
          <DonationStatusBadge status={donation.status} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm text-[hsl(var(--foreground))]">
        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
          <Package className="h-4 w-4 text-[hsl(var(--primary))]" />
          <span>
            {donation.quantity} {donation.unit}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
          <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
          <span>{donation.pickUpLocation}</span>
        </div>
        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
          <CalendarDays className="h-4 w-4 text-[hsl(var(--primary))]" />
          <span>Expires {formatDateTime(donation.expiryDate)}</span>
        </div>
        {donation.providerUsername ? (
          <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
            <UserCircle2 className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span>{donation.providerUsername}</span>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3 border-t border-[hsl(var(--border))] bg-black/1 pt-4">
        <Button asChild variant="outline" size="sm">
          <Link to={`/donations/${donation.donationId}`}>View details</Link>
        </Button>
        {onAction ? (
          <Button
            type="button"
            size="sm"
            variant={actionVariant}
            onClick={() => onAction(donation)}
            disabled={actionDisabled || actionLoading}
          >
            {actionLoading ? 'Working…' : actionLabel}
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}