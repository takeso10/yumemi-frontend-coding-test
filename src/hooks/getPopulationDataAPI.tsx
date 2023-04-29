import axios from 'axios'
import { apiKey, apiUrl } from '../const'

//選択した都道府県の人口データを取得
const usePopulationDataAPI = async (value: string) => {
  const response = await axios.get(
    `${apiUrl}population/composition/perYear?cityCode=-&prefCode=${value}`,
    {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
  )
  console.log(response)
  const population = response.data.result.data
  return { prefCode: Number(value), data: population }
}
export default usePopulationDataAPI
