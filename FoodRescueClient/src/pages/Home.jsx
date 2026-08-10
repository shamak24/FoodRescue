import { Link } from 'react-router-dom'
import { ArrowRight, HeartHandshake, Leaf, Sparkles } from 'lucide-react'

import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../context/AuthContext'

const highlights = [
  {
    title: 'Provider-led sharing',
    description: 'Providers can publish donations with quantity, location, and expiry details in a single flow.',
    icon: HeartHandshake,
  },
  {
    title: 'Fast claim flow',
    description: 'Beneficiaries can claim and follow donations through the same session-driven experience.',
    icon: Sparkles,
  },
  {
    title: 'Waste reduction',
    description: 'The experience is designed to keep food moving quickly and responsibly before it expires.',
    icon: Leaf,
  },
]

export default function Home() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="overflow-hidden rounded-4xl border border-[hsl(var(--border))] bg-white/80 p-8 shadow-[0_20px_80px_rgba(16,39,28,0.10)] backdrop-blur md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
              FoodRescue
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl lg:text-6xl">
                Rescue food, connect neighbors, and reduce waste.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
                FoodRescue is a platform that connects providers and beneficiaries to share, discover, and claim surplus food with ease.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to={isAuthenticated ? '/donations' : '/signup'}>
                  {isAuthenticated ? 'Browse donations' : 'Create account'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={isAuthenticated ? '/dashboard' : '/login'}>
                  {isAuthenticated ? 'Open dashboard' : 'Sign in'}
                </Link>
              </Button>
            </div>
            {isAuthenticated ? (
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-4 text-sm text-[hsl(var(--muted-foreground))]">
                Signed in as <span className="font-semibold text-[hsl(var(--foreground))]">{user?.username}</span> with role <span className="font-semibold text-[hsl(var(--foreground))]">{user?.role}</span>.
              </div>
            ) : null}
          </div>
          <div className="rounded-[1.75rem] border border-[hsl(var(--border))] bg-[linear-gradient(135deg,rgba(20,88,57,0.96),rgba(86,151,109,0.95))] p-6 text-white shadow-lg">
            <div className="space-y-5">
              <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Live flows</div>
              <div className="space-y-3">
                <p className="text-2xl font-semibold">Available actions</p>
                <ul className="space-y-2 text-sm leading-7 text-white/90">
                  <li>• Create donations for providers</li>
                  <li>• Browse and detail available donations</li>
                  <li>• Claim a donation and track it</li>
                  <li>• Review provider and beneficiary dashboards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="border-[hsl(var(--border))]/80">
              <CardHeader>
                <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
