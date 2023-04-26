type PrefData = {
  prefCode: number
  prefName: string
}

type PopulationData = {
  prefCode: number
  data: [
    {
      label: string
      data: PopulationItem[]
    },
    {
      label: string
      data: PopulationCategorizedItem[]
    },
    {
      label: string
      data: PopulationCategorizedItem[]
    },
    {
      label: string
      data: PopulationCategorizedItem[]
    }
  ]
}

type PopulationItem = {
  year: number
  value: number
}

type PopulationCategorizedItem = {
  year: number
  value: number
  rate: number
}
