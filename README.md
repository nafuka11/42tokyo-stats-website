# 42tokyo-stats-website

42Tokyoの統計情報を表示するウェブサイトです。

## 必要物

- [42 API](https://api.intra.42.fr/apidoc)
- Google Cloudのサービスアカウントキー
  - サービスアカウントには「Cloud Storage for Firebase サービス エージェント」のロールが必要です。
- Cloud Storageのバケット
- Vercelの [Deploy Hook](https://vercel.com/docs/concepts/git/deploy-hooks)
  - 定期デプロイをする場合、必要です。

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
   | FIREBASE_SERVICE_ACCOUNT_BASE64 | サービスアカウントキーが含まれるJSONファイルをbase64変換したもの<br />`cat service-account-file.json \| jq -c . \| base64` で生成できます |
   | BUCKET_NAME                     | Cloud Storageのバケット名                                    |

注意点

- Vercelのデプロイ時には環境変数のサイズが4KBに制限されています。制限を超えるとデプロイが失敗します。
- 環境変数のサイズが制限ギリギリなため、デプロイに失敗する可能性があります。以下を試して環境変数のサイズを小さくすることを試みてください。
  - 環境変数名や値を短いものに変更する。
  - 「Automatically expose System Environment Variables」をOFFにして、手動で環境変数を設定する。
  - 参考：[Limits – Vercel Docs](https://vercel.com/docs/concepts/limits/overview#environment-variables)

### GitHub ActionsのSecrets

| Secret名          | 説明                                                         |
| ----------------- | ------------------------------------------------------------ |
| VERCEL_DEPLOY_URL | Vercelの [Deploy Hook](https://vercel.com/docs/concepts/git/deploy-hooks) |
