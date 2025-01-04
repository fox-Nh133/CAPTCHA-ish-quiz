# CAPTCHA風クイズ
画像を使ったCAPTCHA認証風のクイズのサンプルコード

## 使い方
**問題文の設定**
`./index.html`の`captcha-instruction`クラスのテキストで問題文を設定する。
**画像の登録**
`./assets/img`ディレクトリ配下に問題となる`image1.jpg`から`image9.jpg`を格納する。
**バックエンドのデプロイ**
正解の判定はバックエンド関数で実装

`./backend/gcloud-functions.js`内の`predefineSet`で正解を定義する。

Google CloudのCloud Run関数としてデプロイ。

デプロイ後、`./script.js`の`ENDPOINT-URL`をRun関数のエンドポイントに書き換える。

## LICENSE
MIT
