import React, { useEffect, useRef, useState } from 'react'
import './App.scss'
import axios from 'axios'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

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

function App() {
  const [prefecturesList, setPrefecturesList] = useState<PrefData[]>([])
  const [populationData, setPopulationData] = useState<PopulationData[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [category, setCategory] = useState<category>({
    index: 0,
    name: '総人口',
  })

  useEffect(() => {
    //[都道府県一覧」APIから都道府県の情報を取得
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: {
          'X-API-KEY': 'l0IqsxcC0V9h8SzOvylx2WMUOK8vOhFO33pIUfJT',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((res) => {
        console.log(res.data.result)
        setPrefecturesList(res.data.result)
      })
      .catch((err) => {
        setErrorMessage(`都道府県データの取得に失敗しました。${err}`)
      })
  }, [])

  //チェックされた都道府県の人口データをAPIで取得
  const onChangePref = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(typeof e)
    console.log(e.target.value)
    console.log(e.target.checked)
    e.target.checked //チェックされた時
      ? axios
          .get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${e.target.value}`,
            {
              headers: {
                'X-API-KEY': 'l0IqsxcC0V9h8SzOvylx2WMUOK8vOhFO33pIUfJT',
                'Content-Type': 'application/json;charset=UTF-8',
              },
            }
          )
          .then((res) => {
            setPopulationData([
              ...populationData,
              { prefCode: Number(e.target.value), data: res.data.result.data },
            ]) //県ごとのデータをpopulationData配列に入れる
          })
          .catch((err) => {
            setErrorMessage(`都道府県別人口データの取得に失敗しました。${err}`)
          })
      : setPopulationData(
          populationData.filter(
            (data) => data.prefCode !== Number(e.target.value)
          )
        ) //チェックが外されたとき、populationData配列から削除
    console.log(populationData)
  }

  const categoryList: string[] = [
    '総人口',
    '年少人口',
    '生産年齢人口',
    '老年人口',
  ]

  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.id)
    setCategory({ index: Number(e.target.value), name: e.target.id })
  }

  //Highchartsグラフの値をリストして作成
  const series: Highcharts.SeriesOptionsType[] = []
  const yearList: string[] = []
  if (populationData.length !== 0) {
    populationData.forEach((prefData) => {
      const valueList: number[] = []
      prefData.data[category.index].data.forEach((obj) => {
        valueList.push(obj.value)
        yearList.push(String(obj.year))
      })
      const prefName = prefecturesList[prefData.prefCode - 1].prefName //都道府県一覧データから都道府県名を取得
      series.push({
        name: prefName,
        type: 'line',
        data: valueList,
      })
    })
    console.log(populationData[0].data[0])
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
      populationData.length === 0
        ? [{ type: 'line', name: category.name, data: [] }]
        : series,
  }

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

  return (
    <div className="App">
      <div className="header">
        <h1>都道府県別人口推移</h1>
      </div>
      <div className="main">
        <div className="prefecture-form">
          <p>{errorMessage}</p>
          <h2>都道府県一覧</h2>
          <form>
            {prefecturesList.map((item) => {
              return (
                <div key={item.prefCode} className="input-item">
                  <input
                    id={item.prefName}
                    type="checkbox"
                    value={item.prefCode}
                    onChange={onChangePref}
                  />
                  <label htmlFor={item.prefName}>{item.prefName}</label>
                </div>
              )
            })}
          </form>
        </div>
        <div className="gragh">
          <form>
            {categoryList.map((item, index) => {
              return (
                <div key={item}>
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
      </div>
    </div>
  )
}

export default App
