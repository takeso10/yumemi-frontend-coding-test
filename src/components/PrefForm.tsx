import React from 'react'

type Props = {
  prefecturesList: PrefData[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage: string
}

type PrefData = {
  prefCode: number
  prefName: string
}

const PrefForm = (props: Props) => {
  return (
    <div className="prefecture-form">
      <p>{props.errorMessage}</p>
      <h2>都道府県一覧</h2>
      <form>
        {props.prefecturesList.map((item) => {
          return (
            <div key={item.prefCode} className="input-item">
              <input
                id={item.prefName}
                type="checkbox"
                value={item.prefCode}
                onChange={props.onChange}
              />
              <label htmlFor={item.prefName}>{item.prefName}</label>
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default PrefForm
