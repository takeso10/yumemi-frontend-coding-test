import React, { useEffect, useRef, useState } from "react";
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
        console.log(res.data.result.data)
        setPopulationData([...populationData,{prefCode:e.target.value,data:res.data.result.data}])
      })
  }

  const series: Highcharts.SeriesOptionsType[] = [];
  const valueList:number[] = [] 

  if(populationData.length!==0){
  populationData[0].data[0].data.forEach(key=>
      valueList.push(key.value),
      series.push({
        name:"総人口",
        type:"line",
        data:valueList
      })
  )
  console.log(populationData[0].data[0])
  } 

  const options: Highcharts.Options ={
    title:{
      text:"都道府県別人口推移"
    },
    yAxis:{
      title:{
        text:"人口数"
      }
    },

    xAxis: {
      accessibility:{
        //rangeDescription: `Range: ${populationData[0].data[0].data[0].year} to ${populationData[0].data[0].data.slice(-1)[0].year}`
        rangeDescription: `Range: 1980 to 2045`
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
          label: {
              connectorAllowed: false
          },
          pointStart: 2010
      }
    },

    series:
      populationData.length === 0
      ? [{type:"line",
          name: "総人口",
          data: []}]
      : series    
    }


  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  
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
        <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}/>
      </div>
    </div>
  </div>;
}

export default App;


