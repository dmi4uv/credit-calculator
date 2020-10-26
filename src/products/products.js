const Products = [
  {
    Title: 'Новые автомобили',
    minAmount: 200000,
    maxAmount: 3000000,
    minTerm: 14,
    maxTerm: 52,
    DefaultPercent: 10
  },
  {
    Title: 'Б/у автомобили',
    minAmount: 200000,
    maxAmount: 4000000,
    minTerm: 14,
    maxTerm: 52,
    DefaultPercent: 11
  },
  {
    Title: 'Мото новые',
    minAmount: 10000,
    maxAmount: 1000000,
    minTerm: 6,
    maxTerm: 12,
    DefaultPercent: 12
  },
  {
    Title: 'Мото Б/у ',
    minAmount: 100000,
    maxAmount: 2000000,
    minTerm: 3,
    maxTerm: 40,
    DefaultPercent: 13
  },
  {
    Title: 'Рассрочка',
    minAmount: 60000,
    maxAmount: 1200000,
    minTerm: 5,
    maxTerm: 24,
    Term: ["--",3,6,9,12,18,24],
    DefaultPercent: 4
  }
]

export default Products;