/**
 * Estrutura representativa de um procedimento clínico/estético de podologia ou manicure.
 */

export interface ServiceItem {
  /** Identificador único do procedimento (usado como chave React e âncora/slug). */
  id: string
  /** Nome comercial exibido no card do serviço (ex: 'Pé e Mão Completo'). */
  title: string
  /** Rótulo/etiqueta destacada (ex: 'Mais Procurado', 'Podologia', 'Manicure'). */
  badge: string
  /** Define se o procedimento deve receber ênfase visual (borda iluminada e destaque editorial). */
  isFeatured?: boolean
  /** Tempo estimado para a realização completa do atendimento no domicílio. */
  duration: string
  /** Valor nominal em reais (BRL). */
  price: number
  /** Sufixo explicativo do valor (ex: 'sessão completa', 'sessão'). */
  priceSuffix: string
  /** Resumo claro do escopo do procedimento. */
  description: string
  /** Lista ordenada dos passos e itens de cuidado inclusos no atendimento. */
  features: string[]
  /** Identificador do ícone Lucide associado ao serviço. */
  icon: 'sparkles' | 'footprints' | 'hand'
}

/**
 * Catálogo canônico dos procedimentos oferecidos por Angélica Eduarda em Mococa/SP.
 *
 * Todos os valores incluem deslocamento gratuito em qualquer bairro da cidade,
 * uso de instrumentais esterilizados em autoclave e insumos 100% descartáveis.
 */

export const SERVICES: ServiceItem[] = [
  {
    id: 'pe-e-mao-completo',
    title: 'Pé e Mão Completo',
    badge: 'Mais Procurado',
    isFeatured: false,
    duration: 'Duração média de 1h30',
    price: 75,
    priceSuffix: 'sessão completa',
    description: 'Faço o pé e a mão na mesma visita, com toda a calma.',
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
    description: 'Cuido da saúde e da beleza dos seus pés.',
    features: [
      'Corte correto para evitar unhas encravadas',
      'Prevenção e cuidado seguro com Pé Diabético',
      'Remoção cuidadosa de calosidades',
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
    description: 'Faço as unhas das mãos com muito cuidado.',
    features: [
      'Corte e lixamento das unhas',
      'Cutilagem e hidratação',
      'Esmaltação',
      'Secagem em cabine UV',
    ],
    icon: 'hand',
  },
]
