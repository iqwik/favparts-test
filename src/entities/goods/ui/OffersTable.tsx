import type {Goods} from '@/api/favoritPriceApi'
import {EMPTY_GOODS_ID} from '@/shared/constants'
import {pickBestWarehouse} from '../model/lib'

/** Разворачивает основную позицию и её аналоги в плоский список. */
function flattenOffers(goods: Goods[]): Goods[] {
  const result: Goods[] = []
  for (const g of goods) {
    if (!g.goodsID || g.goodsID === EMPTY_GOODS_ID) continue
    result.push(g)
    for (const a of g.analogues ?? []) {
      if (!a.goodsID || a.goodsID === EMPTY_GOODS_ID) continue
      result.push(a)
    }
  }
  return result
}

type OffersTableProps = {goods: Goods[]}

export function OffersTable({goods}: OffersTableProps) {
  const offers = flattenOffers(goods)

  if (offers.length === 0) {
    return (
      <div className="alert alert-secondary" role="alert">
        Предложения не найдены.
      </div>
    )
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title mb-3">
          Этап 3. Аналоги и предложения
          <span className="badge text-bg-primary ms-2">{offers.length}</span>
        </h2>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col" style={{width: '50%'}}>
                  Наименование / Производитель
                </th>
                <th scope="col" className="text-end">
                  Стоимость
                </th>
                <th scope="col" className="text-end">
                  Остаток на складе
                </th>
              </tr>
            </thead>
            <tbody>
              {offers.map(g => {
                const best = pickBestWarehouse(g)
                return (
                  <tr key={g.goodsID}>
                    <td>
                      <div className="fw-semibold">
                        {g.name || <span className="text-muted">—</span>}
                        {g.notRefund && (
                          <span className="badge text-bg-warning ms-2">
                            Невозврат
                          </span>
                        )}
                      </div>
                      <div className="small text-muted mt-1">
                        <span className="badge text-bg-secondary me-2">
                          {g.brand}
                        </span>
                        <span className="font-monospace">{g.number}</span>
                      </div>
                    </td>
                    <td className="text-end">
                      {best ? (
                        <span className="fw-semibold text-success">
                          {best.price.toLocaleString('ru-RU')} ₽
                        </span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td
                      className="text-end"
                      title={`Всего на всех складах: ${g.count} шт.`}
                    >
                      {best ? (
                        <>
                          {best.stock} шт.
                          {best.code && (
                            <div className="small text-muted">{best.code}</div>
                          )}
                        </>
                      ) : (
                        <span className="text-muted">0</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
