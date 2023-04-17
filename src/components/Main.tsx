import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PrefForm from './PrefForm'
import Gragh from './Gragh'

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

const Main = () => {
  const [prefecturesList, setPrefecturesList] = useState<PrefData[]>([])
  const [populationData, setPopulationData] = useState<PopulationData[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

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
        setPrefecturesList(res.data.result)
      })
      .catch((err) => {
        setErrorMessage(`都道府県データの取得に失敗しました。${err}`)
      })
  }, [])

  //チェックされた都道府県の人口データをAPIで取得
  const onChangePref = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }
  return (
    <div className="main">
      <PrefForm
        prefecturesList={prefecturesList}
        onChange={onChangePref}
        errorMessage={errorMessage}
      />
      <Gragh
        populationData={populationData}
        prefecturesList={prefecturesList}
      />
    </div>
  )
}

export default Main
