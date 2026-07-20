# TxPPIE website redesign

TxPPIEの事業内容が初めての訪問者にも伝わるよう、トップページを再設計したローカル版です。旧サイトの配信CSSは、ニュースページ互換用に `legacy.css` として残しています。

```sh
npm start
```

ブラウザで `http://localhost:4173` を開いてください。主要な編集対象は `index.html`、`styles.css`、`script.js` です。

## Netlifyでテスト公開

Netlifyの管理画面でこのプロジェクトを接続してください。`netlify.toml` により、ビルドコマンドは `npm run build`、公開ディレクトリは `dist` に設定されます。手動確認する場合は次を実行します。

```sh
npm run build
SITE_ROOT=dist PORT=4174 npm start
```

`dist` には公開に必要なファイルだけが入ります。事業概要PDF、ローカルサーバー、編集用ファイルは配信されません。テスト中は `X-Robots-Tag` で検索登録を抑止しています。`txp.co.jp` をNetlifyの本番ドメインに切り替える際は、`netlify.toml` の `X-Robots-Tag` 行を削除してください。

## 更新時の確認箇所

- ニュースの一覧データは `news/news-data.json` に集約しています。記事ページは `news/<記事ID>/index.html` にあります。
- 山崎修平・三宅智也のメンバー表示は、`script.js` 冒頭の `OPTIONAL_MEMBER_VISIBILITY` で切り替えます。初期値はともに `false` です。
- 会社情報・所在地・連絡先を変更する場合は、会社概要、ポリシー、全ページ共通フッターも同時に更新してください。
- SNS共有画像は `assets/og-txppie.png`（1200×630px）です。
