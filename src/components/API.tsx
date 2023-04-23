import axios from "axios"
import { apiKey, apiUrl } from "../const"
import React,{ useState } from "react"

//[都道府県一覧」を取得する処理
export const getPrefecturesAPI = () => {
    const [prefecturesList, setPrefecturesList] = useState<PrefData[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    axios
      .get(`${apiUrl}prefectures`, {
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((res) => {
        setPrefecturesList(res.data.result)
        console.log(res.data)
      })
      .catch((err) => {
        setErrorMessage(`都道府県データの取得に失敗しました。${err}`)
        })
    
}

//人口データを取得するAPI処理
export const getPopulationDataAPI = (value: string) => {
    const [populationData, setPopulationData] = useState<PopulationData[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    
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
        setErrorMessage(`都道府県別人口データの取得に失敗しました。${err}`)
      })
}