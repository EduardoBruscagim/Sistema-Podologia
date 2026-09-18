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
    description:
      'Cuidado integral para unhas dos pés e das mãos na mesma visita, com corte correto, cutilagem suave e esmaltação.',
    features: [
      'Corte correto e alívio de cantos de unhas',
      'Cutilagem e esmaltação completa',
      'Alicates esterilizados em autoclave e descartáveis',
      'Secagem rápida com cabine UV sem custo extra',
    ],
    icon: 'sparkles',
  },
  {
    id: 'cuidado-dos-pes',
    title: 'Cuidado dos Pés',
    badge: 'Podologia Clínica',
    isFeatured: false,
    duration: 'Duração média de 1h',
    price: 45,
    priceSuffix: 'sessão',
    description:
      'Foco clínico em corte anatômico de unhas, desbaste de calosidades plantares e alívio de desconfortos.',
    features: [
      'Corte correto para evitar unhas encravadas',
      'Desbaste suave de calosidades',
      'Hidratação podológica e esmaltação',
      'Esterilização hospitalar e descartáveis',
    ],
    icon: 'footprints',
  },
  {
    id: 'cuidado-das-maos',
    title: 'Cuidado das Mãos',
    badge: 'Manicure Cuidadosa',
    isFeatured: false,
    duration: 'Duração média de 40min',
    price: 35,
    priceSuffix: 'sessão',
    description:
      'Manicure tradicional e cutilagem cuidadosa com materiais 100% esterilizados para a sua total segurança.',
    features: [
      'Corte anatômico e lixamento técnico',
      'Cutilagem suave e hidratação das cutículas',
      'Esmaltação de alta durabilidade',
      'Materiais individuais e descartáveis',
    ],
    icon: 'hand',
  },
]
