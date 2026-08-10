import { Link } from 'react-router-dom'
import { ClipboardList, HandHeart, PlusCircle, Search } from 'lucide-react'

import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../lib/contracts'

const providerCards = [
  {
    title: 'Create a donation',
    description: 'Share surplus food with a clear pickup plan and expiry details.',
    href: '/create-donation',
    icon: PlusCircle,
  },
  {
    title: 'Manage my donations',
    description: 'Review all of your current listings and cancel ones that are no longer needed.',
    href: '/my-donations',
    icon: ClipboardList,
  },
]

const beneficiaryCards = [
  {
    title: 'Browse donations',
    description: 'Find food that is currently available and claim the ones you need.',
    href: '/donations',
    icon: Search,
  },
  {
    title: 'Track my claims',
    description: 'Follow your current claims and keep the pickup timeline up to date.',
    href: '/my-claims',
    icon: HandHeart,
  },
]

export default function Dashboard() {
  const { user } = useAuth()
  const cards = user?.role === ROLES.PROVIDER ? providerCards : beneficiaryCards

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 overflow-hidden rounded-4xl border border-[hsl(var(--border))] bg-white/80 p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Welcome back, {user?.username || 'there'}.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
              The dashboard highlights the actions most relevant to your role so you can jump straight into the next step.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/donations">Browse all donations</Link>
          </Button>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="border-[hsl(var(--border))]/90">
              <CardHeader>
                <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to={card.href}>Open</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6 border-[hsl(var(--border))]/90">
        <CardHeader>
          <CardTitle>Need a quick start?</CardTitle>
          <CardDescription>Use the donations page to browse what is available right now, or create a new listing if you are sharing food.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
