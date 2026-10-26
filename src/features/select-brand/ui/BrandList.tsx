type Brand = {brand: string; stock: number}

type BrandListProps = {
  brands: Brand[]
  selectedBrand: string | null
  onSelect: (brand: string) => void
}

export function BrandList({brands, selectedBrand, onSelect}: BrandListProps) {
  if (brands.length === 0) {
    return (
      <div className="alert alert-secondary" role="alert">
        По этому артикулу производители не найдены.
      </div>
    )
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h5 card-title mb-3">
          Этап 2. Выберите производителя
          <span className="badge text-bg-primary ms-2">{brands.length}</span>
        </h2>
        <div className="list-group">
          {brands.map(({brand, stock}) => {
            const active = selectedBrand === brand
            return (
              <button
                key={brand}
                type="button"
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  active ? 'active' : ''
                }`}
                onClick={() => onSelect(brand)}
              >
                <span className="fw-semibold">{brand}</span>
                <span
                  className={`badge ${active ? 'text-bg-light' : 'text-bg-secondary'}`}
                >
                  {stock > 0 ? `${stock} шт.` : 'нет в наличии'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
