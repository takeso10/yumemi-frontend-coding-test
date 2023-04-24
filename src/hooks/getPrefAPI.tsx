import axios from 'axios'
import { useEffect, useState } from 'react'
import { apiKey, apiUrl } from '../const'

const usePrefecturesAPI = () => {
  const [prefecturesList, setPrefecturesList] = useState([] as PrefData[])
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
        alert(err)
      })
  }, [])
  return prefecturesList
}
export default usePrefecturesAPI
