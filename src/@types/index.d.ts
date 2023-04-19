type PrefData = {
    prefCode: number
    prefName: string
  }
  
  type PopulationData = {
    prefCode: number
    data: [
      {
        label: string
        data: [YearData1]
      },
      {
        label: string
        data: [YearData2]
      },
      {
        label: string
        data: [YearData2]
      },
      {
        label: string
        data: [YearData2]
      }
    ]
  }
  
  type YearData1 = {
    year: number
    value: number
  }
  
  type YearData2 = {
    year: number
    value: number
    rate: number
  }