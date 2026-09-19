export interface ServiceItem {
  id: string
  title: string
  badge: string
  isFeatured?: boolean
  duration: string
  price: number
  priceSuffix: string
  description: string
  features: string[]
  icon: 'sparkles' | 'footprints' | 'hand'
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'pe-e-mao-completo',
    title: 'Pé e Mão Completo',
    badge: 'Mais Procurado',
    isFeatured: true,
    duration: 'Duração média de 1h30',
    price: 75,
    priceSuffix: 'sessão completa',
    description: 'Atendimento para pés e mãos na mesma visita.',
    features: [
      'Corte correto das unhas',
      'Cutilagem e esmaltação',
      'Lixamento e hidratação',
      'Secagem em cabine UV',
    ],
    icon: 'sparkles',
  },
  {
    id: 'cuidado-dos-pes',
    title: 'Cuidado dos Pés',
    badge: 'Podologia',
    isFeatured: false,
    duration: 'Duração média de 1h',
    price: 45,
    priceSuffix: 'sessão',
    description: 'Cuidados para a saúde e higiene dos pés.',
    features: [
      'Corte correto para evitar unhas encravadas',
      'Remoção de calosidades',
      'Lixamento plantar e hidratação',
      'Esmaltação (opcional)',
    ],
    icon: 'footprints',
  },
  {
    id: 'cuidado-das-maos',
    title: 'Cuidado das Mãos',
    badge: 'Manicure',
    isFeatured: false,
    duration: 'Duração média de 40min',
    price: 35,
    priceSuffix: 'sessão',
    description: 'Manicure tradicional com corte, lixamento e esmaltação.',
    features: [
      'Corte e lixamento das unhas',
      'Cutilagem e hidratação',
      'Esmaltação',
      'Secagem em cabine UV',
    ],
    icon: 'hand',
  },
]
