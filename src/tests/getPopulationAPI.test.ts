import axios from 'axios'
import usePopulationDataAPI from '../hooks/getPopulationDataAPI'
import { apiKey, apiUrl } from '../const'

jest.mock('axios')

describe('usePopulationDataAPI', () => {
  it('should return population data', async () => {
    const data = {
      result: {
        data: [
          { year: 2015, value: 100 },
          { year: 2016, value: 200 },
        ],
      },
    }
    ;(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data,
    })

    const result = await usePopulationDataAPI('13')

    expect(result.prefCode).toEqual(13)
    expect(result.data).toEqual(data.result.data)
    expect(axios.get).toHaveBeenCalledWith(
      `${apiUrl}population/composition/perYear?cityCode=-&prefCode=13`,
      {
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    )
  })
})
