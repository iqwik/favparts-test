import {useMemo, useState} from 'react'
import {CUSTOMER_KEY} from '@/api/constants'
import {type GoodsResponse, useGetHsPriceQuery} from '@/api/favoritPriceApi'
import {OffersTable} from '@/entities/goods'
import {PartNumberSearch} from '@/features/search-by-number'
import {BrandList} from '@/features/select-brand'
import {EMPTY_GOODS_ID} from '@/shared/constants'
import {encodePartParam} from '@/shared/lib/url'

export function PriceCalculator() {
  const [number, setNumber] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const handleSearch = (value: string) => {
    setNumber(value)
    setSelectedBrand(null)
  }

  // Этап 1
  const step1 = useGetHsPriceQuery(
    {key: CUSTOMER_KEY, number: encodePartParam(number)},
    {skip: number.length < 2},
  )

  // Этап 2
  const step2 = useGetHsPriceQuery(
    {
      key: CUSTOMER_KEY,
      number: encodePartParam(number),
      brand: encodePartParam(selectedBrand ?? ''),
      analogues: 'on',
      info: 'on',
    },
    {skip: !number || !selectedBrand},
  )

  // Агрегация брендов
  const brands = useMemo(() => {
    if (!isDataWithGoods(step1.data)) return []

    const map = new Map<string, number>()
    for (const g of step1.data.goods) {
      if (g.brand && g.goodsID !== EMPTY_GOODS_ID) {
        map.set(g.brand, (map.get(g.brand) ?? 0) + (g.count ?? 0))
      }
    }

    return Array.from(map, ([brand, stock]) => ({brand, stock}))
  }, [step1.data])

  return (
    <section>
      <PartNumberSearch onSearch={handleSearch} isLoading={step1.isFetching} />

      {step1.error && <div className="alert alert-danger">Ошибка сети</div>}
      {step1.data && 'error' in step1.data && (
        <div className="alert alert-warning">
          Ошибка API: {step1.data.error}
        </div>
      )}

      {brands.length > 0 && (
        <BrandList
          brands={brands}
          selectedBrand={selectedBrand}
          onSelect={setSelectedBrand}
        />
      )}

      {selectedBrand && step2.isFetching && (
        <div className="d-flex align-items-center gap-2 text-primary mb-3">
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
          <span>Загрузка аналогов...</span>
        </div>
      )}

      {selectedBrand && isDataWithGoods(step2.data) && (
        <OffersTable goods={step2.data.goods} />
      )}
    </section>
  )
}

function isDataWithGoods(v: unknown): v is GoodsResponse {
  return !!v && typeof v === 'object' && 'goods' in v && Array.isArray(v.goods)
}
