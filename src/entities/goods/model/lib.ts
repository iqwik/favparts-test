import type {Goods, Warehouse} from '@/api/favoritPriceApi'

export const pickBestWarehouse = (goods: Goods): Warehouse | undefined =>
  goods.warehouses.filter(w => w.stock > 0).sort((a, b) => a.price - b.price)[0]
