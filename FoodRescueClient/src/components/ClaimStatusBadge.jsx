import { Badge } from './ui/badge'
import { CLAIM_STATUS, formatClaimStatus } from '../lib/contracts'

const variants = {
  [CLAIM_STATUS.CLAIMED]: 'success',
  [CLAIM_STATUS.PICKED_UP]: 'default',
  [CLAIM_STATUS.CANCELLED]: 'destructive',
}

export default function ClaimStatusBadge({ status }) {
  return <Badge variant={variants[status] || 'outline'}>{formatClaimStatus(status)}</Badge>
}