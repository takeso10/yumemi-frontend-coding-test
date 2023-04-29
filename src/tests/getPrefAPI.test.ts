/**
 * @jest-environment jsdom
 */
import axios from 'axios';
import { renderHook, waitFor } from '@testing-library/react';
import usePrefecturesAPI from '../hooks/getPrefAPI';

// axiosをモック化する
jest.mock('axios');

describe('usePrefecturesAPI', () => {
  test('fetches prefectures data and returns an array of objects', async () => {
    jest.clearAllMocks()
    // axios.getメソッドが返すデータを指定する
    const mockData = {
      data: {
        result: [
          {
            prefCode: 1,
            prefName: '北海道',
          },
          {
            prefCode: 2,
            prefName: '青森県',
          },
          // ...
        ],
      },
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(mockData);

    // usePrefecturesAPIフックをレンダリングする
    const { result } = renderHook(() => usePrefecturesAPI());

    // usePrefecturesAPIフックが初めて呼び出される前にresult.currentが空の配列になっていることを確認する
    expect(result.current).toEqual([]);

    // usePrefecturesAPIフックが非同期にprefecturesListを更新するまで待つ
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1)
    })
    // prefecturesListがmockData.data.resultと等しいことを確認する
    expect(result.current).toEqual(mockData.data.result);
  });


  test('handles error when fetching prefectures data', async () => {
    jest.clearAllMocks()
    window.alert = jest.fn();

    // axios.getメソッドがエラーを返すようにする
    const errorMessage = 'Failed to fetch prefectures data';
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error(errorMessage));

    // usePrefecturesAPIフックをレンダリングする
    const { result } = renderHook(() => usePrefecturesAPI());

    // usePrefecturesAPIフックが初めて呼び出される前にresult.currentが空の配列になっていることを確認する
    expect(result.current).toEqual([]);

    // usePrefecturesAPIフックが非同期にエラーをハンドルするまで待つ
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1)
    })

    // prefecturesListが空のままであることを確認する
    expect(result.current).toEqual([]);

    // alertが呼び出されていることを確認する
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(new Error(errorMessage));
  });
});

