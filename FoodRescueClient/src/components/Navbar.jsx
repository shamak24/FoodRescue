import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, LogIn, LogOut, Menu, PlusCircle, Salad, UserPlus, ClipboardList, LayoutDashboard, X } from 'lucide-react'

import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { cn } from '../lib/utils'
import { ROLES, formatRole } from '../lib/contracts'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, isAuthenticated, logout, loading } = useAuth()
  const [open, setOpen] = useState(false)

  const authenticatedLinks = [
    { to: '/donations', label: 'Donations' },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ...(user?.role === ROLES.PROVIDER ? [
      { to: '/my-donations', label: 'My Donations', icon: ClipboardList },
      { to: '/create-donation', label: 'Create Donation', icon: PlusCircle },
    ] : []),
    ...(user?.role === ROLES.BENEFICIARY ? [{ to: '/my-claims', label: 'My Claims', icon: ClipboardList }] : []),
  ]

  const unauthenticatedLinks = [
    { to: '/', label: 'Home' },
    { to: '/login', label: 'Login', icon: LogIn },
    { to: '/signup', label: 'Sign Up', icon: UserPlus },
  ]

  const navLinks = isAuthenticated ? authenticatedLinks : unauthenticatedLinks

  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--border))] bg-[hsla(var(--background)/0.8)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--primary))] text-white shadow-lg shadow-emerald-900/20">
            <Salad className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold tracking-tight text-[hsl(var(--foreground))]">FoodRescue</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Reduce waste. Feed people.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-[hsl(var(--primary))] text-white'
                    : 'text-[hsl(var(--foreground))] hover:bg-black/5',
                )
              }
            >
              {link.icon ? <link.icon className="h-4 w-4" /> : null}
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-white/80 px-3 py-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--secondary))] text-xs font-bold text-[hsl(var(--secondary-foreground))]">
                  {(user?.username || '?').slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user?.username}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline">{formatRole(user?.role)}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={logout} disabled={loading}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : null}
        </div>

        <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen((next) => !next)}>
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {open ? (
        <div className="border-t border-[hsl(var(--border))] bg-white/95 px-4 py-4 shadow-sm lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold',
                    isActive ? 'bg-[hsl(var(--primary))] text-white' : 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]',
                  )
                }
              >
                <span className="flex items-center gap-2">
                  {link.icon ? <link.icon className="h-4 w-4" /> : null}
                  {link.label}
                </span>
                <ChevronDown className="h-4 w-4 opacity-60" />
              </NavLink>
            ))}

            {isAuthenticated ? (
              <Button variant="outline" onClick={logout} disabled={loading}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}