import {emptyApi as api} from './emptyApi'

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getHsPrice: build.query<GetHsPriceApiResponse, GetHsPriceApiArg>({
      query: queryArg => ({
        url: `/hs/hsprice/`,
        params: {
          key: queryArg.key,
          number: queryArg['number'],
          brand: queryArg.brand,
          analogues: queryArg.analogues,
          info: queryArg.info,
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export {injectedRtkApi as favoritPriceApi}
export type GetHsPriceApiResponse =
  /** status 200 Успешный ответ содержит массив `goods`.
При ошибке возвращается объект `error`.
 */ GoodsResponse | ErrorResponse
export type GetHsPriceApiArg = {
  /** Уникальный ключ покупателя. */
  key: string
  /** Номер детали. Спецсимволы URL-encode. */
  number: string
  /** Производитель. Необязательный параметр. Спецсимволы URL-encode. */
  brand?: string
  /** Если `"on"` и заполнен `brand` — вернуть аналоги детали. */
  analogues?: 'on'
  /** Если `"on"` — вернуть признак невозвратных позиций `notRefund`. */
  info?: 'on'
}
export type Warehouse = {
  /** Сокращённое наименование склада.
    Имеется не у всех складов.
     */
  code?: string
  /** Внутренний идентификатор склада. */
  id: string
  /** Товар находится на нашем складе. */
  own: boolean
  /** Дата и время. Дата — дата отгрузки товара.
    Время — до какого часа можно заказать,
    чтобы товар отгрузили в эту дату.
     */
  shipmentDate?: string
  /** Цена на этом складе. */
  price: number
  /** Остаток на этом складе. */
  stock: number
  /** Невозвратная позиция. */
  notRefund?: boolean
  /** Поле присутствует в примерах ответа PDF, но не описано
    в таблице полей склада. Оставлено необязательным
    для совместимости.
     */
  warehouseShipping?: string
}
export type Goods = {
  /** Идентификатор товара. */
  goodsID: string
  /** Производитель. */
  brand: string
  /** Номер детали. */
  number: string
  /** Наименование детали. */
  name: string
  /** Остаток на всех складах. */
  count: number
  /** НЕ ИСПОЛЬЗОВАТЬ. Цену нужно брать из конкретного склада
    (`warehouses[].price`). Оставлено для совместимости.
     */
  price: number
  /** Кратность. */
  rate: number
  /** Массив аналогов. Возвращается, если переданы
    `analogues=on` и `brand`.
     */
  analogues?: Goods[]
  /** Склады, на которых имеется товар. */
  warehouses: Warehouse[]
  /** Признак невозвратной позиции.
    Возвращается при `info=on`.
     */
  notRefund?: boolean
}
export type GoodsResponse = {
  goods: Goods[]
}
export type ErrorResponse = {
  /** Описание ошибки. Возможные значения:
    `Empty key!`, `Invalid key client!`, `Empty number goods!`,
    `Request quota exceeded!`.
     */
  error: string
}
export const {useGetHsPriceQuery} = injectedRtkApi
