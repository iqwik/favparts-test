import {PriceCalculator} from '@/widgets/price-calculator'

export function MainPage() {
  return (
    <div className="bg-light min-vh-100 py-5">
      <main className="container" style={{maxWidth: 840}}>
        <header className="mb-4 text-center">
          <h1 className="display-6 fw-semibold mb-2">Проценка запчастей</h1>
          <p className="text-muted mb-0">
            Поиск деталей и аналогов через сервис Favorit Parts.
          </p>
        </header>
        <PriceCalculator />
      </main>
    </div>
  )
}
