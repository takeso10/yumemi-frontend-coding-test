import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useRef, useState } from 'react'
import '../styles/Graph.scss'

type Props = {
  populationData: PopulationData[]
  prefecturesList: PrefData[]
}

type category = {
  index: number
  name: string
}

const Graph = (props: Props) => {
  const [category, setCategory] = useState<category>({
    index: 0,
    name: '総人口',
  })//初期値として総人口を選択

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
    props.populationData[0].data[0].data.forEach((pref) => {
      //年度の配列を作るために、総人口データを使う
      yearList.push(String(pref.year))
    })
    props.populationData.forEach((prefData) => {
      const valueList: number[] = []
      prefData.data[category.index].data.forEach((obj) => {
        valueList.push(obj.value)
      })
      const prefName = props.prefecturesList[prefData.prefCode - 1].prefName //都道府県一覧データから都道府県名を取得、都道府県コードとindexが1ずれているため-1をしている
      series.push({
        name: prefName,
        type: 'line',
        data: valueList,
      })
    })
  }

  //HighChartsの設定
  const options: Highcharts.Options = {
    title: {
      text: `都道府県別${category.name}データ`,
    },
    yAxis: {
      title: {
        text: '人口数(人)',
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
      },
    },

    series:
      props.populationData.length === 0
        ? [{ type: 'line', name: category.name, data: [] }]
        : series,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 340,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  }

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

  return (
    <div className="graph">
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
      <div className="graph-item">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
          className="highcharts"
        />
      </div>
    </div>
  )
}

export default Graph
