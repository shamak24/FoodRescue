import { Badge } from './ui/badge'
import { DONATION_STATUS, formatDonationStatus } from '../lib/contracts'

const variants = {
  [DONATION_STATUS.AVAILABLE]: 'success',
  [DONATION_STATUS.CLAIMED]: 'warning',
  [DONATION_STATUS.COMPLETED]: 'default',
  [DONATION_STATUS.EXPIRED]: 'muted',
  [DONATION_STATUS.CANCELLED]: 'destructive',
}

export default function DonationStatusBadge({ status }) {
  return <Badge variant={variants[status] || 'outline'}>{formatDonationStatus(status)}</Badge>
}