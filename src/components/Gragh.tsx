import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useRef, useState } from 'react'
import '../styles/Gragh.scss'

type Props = {
  populationData: PopulationData[]
  prefecturesList: PrefData[]
}

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

type category = {
  index: number
  name: string
}

const Gragh = (props: Props) => {
  const [category, setCategory] = useState<category>({
    index: 0,
    name: '総人口',
  })

  const categoryList: string[] = [
    '総人口',
    '年少人口',
    '生産年齢人口',
    '老年人口',
  ]

  //選択したデータの種類を取得
  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ index: Number(e.target.value), name: e.target.id })
  }

  //Highchartsグラフの値をリストして作成
  const series: Highcharts.SeriesOptionsType[] = []
  const yearList: string[] = []
  if (props.populationData.length !== 0) {
    props.populationData.forEach((prefData) => {
      const valueList: number[] = []
      prefData.data[category.index].data.forEach((obj) => {
        valueList.push(obj.value)
        yearList.push(String(obj.year))
      })
      const prefName = props.prefecturesList[prefData.prefCode - 1].prefName //都道府県一覧データから都道府県名を取得
      series.push({
        name: prefName,
        type: 'line',
        data: valueList,
      })
    })
    console.log(props.populationData[0].data[0])
  }

  //HighChartsの設定
  const options: Highcharts.Options = {
    title: {
      text: `都道府県別${category.name}データ`,
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },

    xAxis: {
      title: {
        text: '年度',
      },
      categories: yearList,
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series:
      props.populationData.length === 0
        ? [{ type: 'line', name: category.name, data: [] }]
        : series,
  }

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

  return (
    <div className="gragh">
      <form>
        {categoryList.map((item, index) => {
          return (
            <div className="category-item" key={item}>
              <input
                id={item}
                type="radio"
                value={index}
                onChange={onChangeCategory}
                name="category"
                checked={category.name === item}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          )
        })}
      </form>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  )
}

export default Gragh
