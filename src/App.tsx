import React, { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


type PrefData={
  "prefCode":number,
  "prefName":string
}

type PopulationData={
  "prefCode":number,
  "data":[  
    {
      "label":string,
      "data":[YearData1]
    },{
      "label":string,
      "data":[YearData2],
    },{
      "label":string,
      "data":[YearData2],
    },{
      "label":string,
      "data":[YearData2],
   }
  ]
}

type YearData1 = {
  "year":number,
  "value":number
}

type YearData2={
  "year":number,
  "value":number,
  "rate":number
}
function App() {
  const [prefecturesList, setPrefecturesList] = useState<PrefData[]>([])
  const [populationData, setPopulationData]= useState<PopulationData[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(()=>{
    //[都道府県一覧」APIから都道府県の情報を取得
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures",{
        headers:{
          "X-API-KEY":"l0IqsxcC0V9h8SzOvylx2WMUOK8vOhFO33pIUfJT",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then((res) => {
        console.log(res.data.result)
        setPrefecturesList(res.data.result)
      })
      .catch((err)=>{
        setErrorMessage(`リストの取得に失敗しました。${err}`)
      })
  },[])

  const onChangePref=(e:any)=>{
    console.log(e.target.value)
    axios
      .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${e.target.value}`,{
        headers:{
          "X-API-KEY":"l0IqsxcC0V9h8SzOvylx2WMUOK8vOhFO33pIUfJT",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then((res)=>{
        console.log(res.data)
        setPopulationData([...populationData,{prefCode:e.targetvalue,data:res.data.result.data}])
      })
  }
  
  
  return <div className="App">
    <div className="header">
      <h1>都道府県別人口推移</h1>
    </div>
    <div className="main">
      <div className="prefecture-form">
        <h2>都道府県一覧</h2>
        <form>
          {prefecturesList.map((item)=>{
            return(
              <div key={item.prefCode}>
                <input id={item.prefName} type="checkbox" value={item.prefCode} onChange={onChangePref}/>
                <label htmlFor={item.prefName}>{item.prefName}</label>
              </div>
            )
          })}
        </form>
      </div>
      <div className="gragh">
        <></>
      </div>
    </div>
  </div>;
}

export default App;
