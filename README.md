# 42tokyo-stats-website

## 概要

42Tokyoの統計情報を表示するウェブサイトです。

学生の進捗を知るために作成しました。

### URL

| 対象             | URL                                                          |
| ---------------- | ------------------------------------------------------------ |
| 42の学生         | https://42tokyo-stats.vercel.app/                            |
| 42の学生以外の方 | https://42tokyo-stats.vercel.app/demo (デモページを見ることができます) |

## スタートガイド

### 必要物

- [42 API](https://api.intra.42.fr/apidoc)
  - Redirect URI
    - 少なくとも、以下のURLが必要です
      - `http://localhost:3000/api/auth/callback/42-school`
      - `<デプロイ先URL>/api/auth/callback/42-school`
  - Scopes
    - 「Access the user public data」のみチェックを入れてください。
- Google Cloudのサービスアカウントキー
  - サービスアカウントには「Cloud Storage for Firebase サービス エージェント」のロールが必要です。
- Google Cloud Storageのバケット
  - [nafuka11/42tokyo\-stats\-data\-collector](https://github.com/nafuka11/42tokyo-stats-data-collector) を使ってデータを収集しているバケットを指定ください。
- Vercelの [Deploy Hook](https://vercel.com/docs/concepts/git/deploy-hooks)
  - 定期デプロイをする場合、必要です。

### 手順

#### ローカル

1. このリポジトリをcloneもしくはforkします。

   以下の場合はforkしてください。

   - GitHub Actionsを用いた定期デプロイを行いたい場合
   - ソースコード内の [定数](https://github.com/nafuka11/42tokyo-stats-website/tree/main/src/constants) を変更したい場合（例：リポジトリURL、タイムゾーン）

1. `.env.example` を `.env.local` としてコピーします。

1. `.env.local` を編集し、環境変数の値を設定します。

   | 環境変数名            | 説明                                                         |
   | --------------------- | ------------------------------------------------------------ |
   | FT_CLIENT_ID          | 42 APIのuid                                                  |
   | FT_CLIENT_SECRET      | 42 APIのsecret                                               |
   | NEXTAUTH_SECRET       | JWTの暗号化に使われるキー<br />`openssl rand -base64 32` で生成できます（参考：[Options \| NextAuth\.js](https://next-auth.js.org/configuration/options#secret)） |
   | FIREBASE_PROJECT_ID   | サービスアカウントキーの `project_id`                        |
   | FIREBASE_CLIENT_EMAIL | サービスアカウントキーの `client_email`                      |
   | FIREBASE_PRIVATE_KEY  | サービスアカウントキーの `private_key`<br />Vercelのwebエディタで設定する場合は、JSONの値そのままではなく、改行（`\n`）を実際の改行に置き換えてください<br />macOSかつjqコマンドが使える場合 `cat service-account-file.json \| jq -jr '.private_key' \| pbcopy` でwebエディタ用にクリップボードへprivate_keyをコピーできます |
   | BUCKET_NAME           | Cloud Storageのバケット名                                    |

1. Cloud Storageからcursus_usersのファイルを取得し、 `contents/` 下にデータを保存します。保存したデータはログイン後の画面で表示されるデータとなります。

   ```bash
   yarn build:contents
   ```

1. 開発サーバを起動します。

   ```bash
   yarn dev
   ```
   `http://localhost:3000` にアクセスすると、ログイン画面が表示されるはずです。

#### デプロイ

この項目ではVercel + GitHub Actionsを用いた定期デプロイについて説明します。

1. GitHubでリポジトリをforkします。

   ローカルの手順で既にfork済みの場合、forkは不要です。

1. [Vercel](https://vercel.com/) でforkしたリポジトリをimportします。

1. Vercelにて環境変数を設定します。

   Projectの「Settings」→「Environment Variables」から追加します。追加する環境変数は [ローカル](####ローカル) の項目を確認ください。

1. VercelのDeploy Hookを作成します。

   VercelのProjectの「Settings」→「Git」→「Deploy Hooks」→「Create Hook」から作成します。

1. GitHubのforkしたリポジトリの「Settings」→「Secrets」→「Actions」から、GitHub ActionsのSecretを設定します。

   | Secret名          | 説明                                                         |
   | ----------------- | ------------------------------------------------------------ |
   | VERCEL_DEPLOY_URL | Vercelの [Deploy Hook](https://vercel.com/docs/concepts/git/deploy-hooks) |

以上で、00:05〜00:50 JSTにGitHub ActionsからDeploy Hookが叩かれ、定期的にデプロイが行われるはずです。

（workflowファイルでは00:05に設定していますが、GitHub Actionsのcronはタイムラグが発生します）

## 開発者向け情報

### アーキテクチャ図

### ディレクトリ構成

```
.
├── README.md
├── README.nextjs.md
├── contents
├── next-env.d.ts
├── next.config.js
├── package.json
├── public
├── src
│   ├── builder
│   ├── components
│   ├── constants
│   ├── pages
│   ├── repositories
│   ├── services
│   ├── styles
│   ├── types
│   └── utils
├── tsconfig.builder.json
├── tsconfig.json
└── yarn.lock
```

| ディレクトリ      | 内容物                                                       |
| ----------------- | ------------------------------------------------------------ |
| .github/workflows | GitHub Actions用のworkflowファイル                           |
| contents          | `yarn build:contents` で生成したファイル                     |
| public            | 静的ファイル                                                 |
| src/builder       | `yarn build:contents` のコード。Google Cloud Storageから情報を取得・集計し、`contents/` に保存します |
| src/components    | コンポーネント。ページ共通のコンポーネントは `/common` に配置し、それ以外は機能ごとにディレクトリ名をつけます |
| src/constants     | 定数が定義されたファイル                                     |
| src/pages         | ルーティング用のファイル。 `/api` 下はAPIとして公開されます  |
| src/repositories  | Google Cloud Storage、ローカルのファイルを操作する関数のファイル |
| src/services      | repositoriesで取得したデータを集計する関数のファイル         |
| src/styles        | CSSファイル                                                  |
| src/types         | 型定義ファイル                                               |
