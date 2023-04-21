import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PrefForm from './PrefForm'
import Graph from './Graph'
import { apiUrl, apiKey } from '../const'

const Main = () => {
  const [prefecturesList, setPrefecturesList] = useState<PrefData[]>([])
  const [populationData, setPopulationData] = useState<PopulationData[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    //[都道府県一覧」APIから都道府県の情報を取得
    axios
      .get(`${apiUrl}prefectures`, {
        headers: {
          'X-API-KEY': apiKey,
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
            `${apiUrl}population/composition/perYear?cityCode=-&prefCode=${e.target.value}`,
            {
              headers: {
                'X-API-KEY': apiKey,
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
      <Graph
        populationData={populationData}
        prefecturesList={prefecturesList}
      />
    </div>
  )
}

export default Main
