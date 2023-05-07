import React, { useState } from 'react'
import PrefForm from './PrefForm'
import Graph from './Graph'
import usePrefecturesAPI from '../hooks/getPrefAPI'
import getPopulationDataAPI from '../repositories/getPopulationDataAPI'

const Main = () => {
  const [populationDataList, setPopulationDataList] = useState<
    PopulationData[]
  >([])

  //都道府県一覧を取得
  const prefectures = usePrefecturesAPI()

  //チェックされた都道府県の人口データをAPIで取得
  const onChangePref = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      //チェックされた時
      const data: PopulationData = await getPopulationDataAPI(e.target.value)
      if (data !== undefined) {
        setPopulationDataList([...populationDataList, data])
      }
    } else {
      setPopulationDataList(
        populationDataList.filter(
          (popData) => popData.prefCode !== Number(e.target.value)
        )
      )
    } //チェックが外されたとき、populationData配列から削除
  }

  return (
    <div className="main">
      <PrefForm prefecturesList={prefectures} onChange={onChangePref} />
      <Graph
        populationDataList={populationDataList}
        prefecturesList={prefectures}
      />
    </div>
  )
}

export default Main
