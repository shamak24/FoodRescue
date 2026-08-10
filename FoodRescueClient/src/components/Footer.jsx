export default function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-white/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-[hsl(var(--muted-foreground))] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-black text-[hsl(var(--foreground))]">FoodRescue</p>
          <p>Connecting surplus food with the people and organizations that need it most.</p>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <p>Dedicated to reducing food waste and supporting local communities.</p>
          <p>© 2026 FoodRescue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}