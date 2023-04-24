import React, { useState } from 'react'
import PrefForm from './PrefForm'
import Graph from './Graph'
import { apiKey, apiUrl } from '../const'
import axios from 'axios'
import usePrefecturesAPI from '../hooks/getPrefAPI'
import usePopulationDataAPI from '../hooks/getPopulationDataAPI'

const Main = () => {
  const [populationData, setPopulationData] = useState<PopulationData[]>([])

  //都道府県一覧を取得
  const prefectures = usePrefecturesAPI()
  
  //人口データを取得するAPI処理
  const getPopulationDataAPI = (value: string) => {
    axios
      .get(
        `${apiUrl}population/composition/perYear?cityCode=-&prefCode=${value}`,
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
          { prefCode: Number(value), data: res.data.result.data },
        ]) //県ごとのデータをpopulationData配列に入れる
      })
      .catch((err) => {
        alert(err)
      })
  }

  //チェックされた都道府県の人口データをAPIで取得
  const onChangePref = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      //チェックされた時
      getPopulationDataAPI(e.target.value)
      //setPopulationData(usePopulationDataAPI(e.target.value))
    } else {
      setPopulationData(
        populationData.filter(
          (data) => data.prefCode !== Number(e.target.value)
        )
      )
    } //チェックが外されたとき、populationData配列から削除
  }

  return (
    <div className="main">
      <PrefForm prefecturesList={prefectures} onChange={onChangePref} />
      <Graph populationData={populationData} prefecturesList={prefectures} />
    </div>
  )
}

export default Main
