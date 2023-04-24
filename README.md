# ゆめみフロントエンドコーディング試験

公開 URL：https://yumemi-frontend-coding-test-wheat.vercel.app/

API:https://opendata.resas-portal.go.jp/docs/api/v1/index.html

## 仕様環境

・React.js：v18.2.0  
・Typescript：v4.9.5  
・Highcharts：v10.3.3  
・cypress：v12.10.0  
・jest：v27.5.1  
・sass：v1.62.0  
・axios：v1.3.5  
・ESlint：v8.38.0  
・prettier：v2.8.7

## 参考記事

Vercel:https://zenn.dev/tbsten/books/c6544795e6b36b/viewer/0a21a6
cypress:https://docs.cypress.io/guides/overview/why-cypress
Highcharts:https://www.highcharts.com/blog/tutorials/highcharts-wrapper-for-react-101/

総作業時間：約 30 時間

## 環境変数

REACT_APP_API_URL = https://opendata.resas-portal.go.jp/api/v1/ 　 RESASAPI の URL  
REACT_APP_API_KEY = l0IqsxcC0V9h8SzOvylx2WMUOK8vOhFO33pIUfJT 　利用するために必要な API キー

### `npm start`

・ローカル環境でのサーバー起動
・http://localhost:3000/

### `npm test`

### `npm run build`

・アプリを build し、./build フォルダに生成する。

### `npm run cypresss:open`

・e2e テスト

### `npm run fix`

・ESlint,prettier を起動し、修正する。
