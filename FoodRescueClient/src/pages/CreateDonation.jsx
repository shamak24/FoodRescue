import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'

import ErrorMessage from '../components/ErrorMessage'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { createDonation } from '../api/donationApi'
import { getErrorMessage } from '../lib/error'

export default function CreateDonation() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    foodName: '',
    description: '',
    quantity: 1,
    unit: 'meals',
    pickUpLocation: '',
    expiryDate: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const payload = {
        ...form,
        quantity: Number(form.quantity),
        expiryDate: form.expiryDate,
      }
      const response = await createDonation(payload)
      navigate(`/donations/${response.data.donationId}`)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="overflow-hidden border-[hsl(var(--border))]/90">
        <div className="border-b border-[hsl(var(--border))] bg-[linear-gradient(120deg,rgba(20,88,57,0.08),rgba(255,255,255,0.95))] p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">Create a donation</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Share surplus food with your community</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-white">
              <PlusCircle className="h-4 w-4" />
              Provider flow
            </div>
          </div>
        </div>
        <CardContent className="p-8">
          <form className="grid gap-6 lg:grid-cols-2" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="foodName">Food name</Label>
                <Input id="foodName" value={form.foodName} onChange={(event) => setForm((prev) => ({ ...prev, foodName: event.target.value }))} placeholder="e.g. Fresh vegetable boxes" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} placeholder="Add details about the food, condition, and pickup notes" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" min="1" value={form.quantity} onChange={(event) => setForm((prev) => ({ ...prev, quantity: event.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" value={form.unit} onChange={(event) => setForm((prev) => ({ ...prev, unit: event.target.value }))} placeholder="meals, boxes, kg" required />
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="pickUpLocation">Pickup location</Label>
                <Input id="pickUpLocation" value={form.pickUpLocation} onChange={(event) => setForm((prev) => ({ ...prev, pickUpLocation: event.target.value }))} placeholder="Where should the food be collected?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry date</Label>
                <Input id="expiryDate" type="datetime-local" value={form.expiryDate} onChange={(event) => setForm((prev) => ({ ...prev, expiryDate: event.target.value }))} required />
                <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">Set a date that gives the recipient enough time to collect the food.</p>
              </div>
              {error ? <ErrorMessage title="Unable to create donation" message={error} /> : null}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Posting donation…' : 'Create donation'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
