# Household Account Book App

## 📌 概要

このアプリは、React と TypeScript を用いて作成した家計簿管理アプリです。収支の記録・編集・削除、月別レポート表示、カレンダーによる視覚的な確認機能を備えています。

Firebase Firestore を使用してリアルタイムにデータ管理を行い、UIは Material UI で構築。フォーム入力には React Hook Form + Zod によるバリデーションを取り入れ、型安全かつユーザーフレンドリーな操作性を実現しています。

## 🎯 目的

- フルスタックに近い形でのアプリ開発経験の習得
- 型安全と状態管理を意識した設計
- 実務で通用するような UI/UX・機能の追求

## 🔧 使用技術

- **React**
- **TypeScript**
- **Firebase Firestore**（データベース）
- **React Hook Form**（フォーム）
- **Zod**（バリデーション）
- **React Router**
- **MUI (Material UI)**（UIライブラリ）
- **FullCalendar**（カレンダーUI）
- **date-fns**（日付操作）
- **ESLint**

## 🛠 主な機能

- 取引（支出・収入）の登録・編集・削除
- 月別の取引一覧表示
- カテゴリ別支出チャート表示
- FullCalendar による日別収支カレンダー
- 月の切り替えによるデータフィルタリング
- バリデーションつきフォーム（Zod）

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
