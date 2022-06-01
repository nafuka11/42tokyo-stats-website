# 42tokyo-stats-website

42Tokyoの統計情報を表示するウェブサイトです。

## 必要物

- [42 API](https://api.intra.42.fr/apidoc)

## 設定項目

### 環境変数（.env.local）

FT_CLIENT_ID

- 42 APIのuid

FT_CLIENT_SECRET

- 42 APIのsecret

NEXTAUTH_SECRET

- JWTの暗号化に使われるキー
- 以下のコマンドで生成できます（参考：[Options \| NextAuth\.js](https://next-auth.js.org/configuration/options#secret)）

  ```bash
  openssl rand -base64 32
  ```

FIREBASE_SERVICE_ACCOUNT_BASE64

- サービスアカウントキーが含まれるJSONファイルをbase64変換したもの
  ```bash
  cat service-account-file.json | tr -d "\n" | base64
  ```

BUCKET_NAME

- Cloud Storageのバケット名
