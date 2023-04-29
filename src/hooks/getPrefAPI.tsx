import axios from 'axios'
import { useEffect, useState } from 'react'
import { apiKey, apiUrl } from '../const'

//都道府県一覧データを取得
const usePrefecturesAPI = () => {
  /*{
  const response = await axios.get(
    `${apiUrl}prefectures`,
    {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
  )
  const population:PrefData[] = response.data.result
  console.log(population)
  return population
  }*/
  const [prefecturesList, setPrefecturesList] = useState<PrefData[]>([])
  useEffect(() => {
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
        console.log(err)
        alert(err)
      })
  }, [])
  return prefecturesList
}
export default usePrefecturesAPI
