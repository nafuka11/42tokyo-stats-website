# 42tokyo-stats-website

42Tokyoの統計情報を表示するウェブサイトです。

## 必要物

- [42 API](https://api.intra.42.fr/apidoc)
- Google Cloudのサービスアカウントキー
  - サービスアカウントには「Cloud Storage for Firebase サービス エージェント」のロールが必要です
- Cloud Storageのバケット
- Vercelの [Deploy Hook](https://vercel.com/docs/concepts/git/deploy-hooks)
  - 定時デプロイをする場合

## 設定項目

### 環境変数（.env.local）

1. `.env.example` を `.env.local` としてコピーします。

   ```
   cp .env.example .env.local
   ```

1. 環境変数を設定します。

   | 環境変数名                      | 説明                                                         |
   | ------------------------------- | ------------------------------------------------------------ |
   | FT_CLIENT_ID                    | 42 APIのuid                                                  |
   | FT_CLIENT_SECRET                | 42 APIのsecret                                               |
   | NEXTAUTH_SECRET                 | JWTの暗号化に使われるキー<br />`openssl rand -base64 32` で生成できます（参考：[Options \|NextAuth\.js](https://next-auth.js.org/configuration/options#secret)） |
   | FIREBASE_SERVICE_ACCOUNT_BASE64 | サービスアカウントキーが含まれるJSONファイルをbase64変換したもの<br />`cat service-account-file.json | tr -d "\n" | base64` で生成できます |
   | BUCKET_NAME                     | Cloud Storageのバケット名                                    |

### GitHub ActionsのSecrets

| Secret名          | 説明                                                         |
| ----------------- | ------------------------------------------------------------ |
| VERCEL_DEPLOY_URL | Vercelの [Deploy Hook](https://vercel.com/docs/concepts/git/deploy-hooks) |
