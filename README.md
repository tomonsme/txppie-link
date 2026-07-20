# TxPPIE website redesign

TxPPIEの事業内容が初めての訪問者にも伝わるよう、トップページを再設計したローカル版です。旧サイトの配信CSSは、ニュースページ互換用に `legacy.css` として残しています。

```sh
npm start
```

ブラウザで `http://localhost:4173` を開いてください。主要な編集対象は `index.html`、`styles.css`、`script.js` です。

## 更新時の確認箇所

- ニュースの一覧データは `news/news-data.json` に集約しています。記事ページは `news/<記事ID>/index.html` にあります。
- 山崎修平・三宅智也のメンバー表示は、`script.js` 冒頭の `OPTIONAL_MEMBER_VISIBILITY` で切り替えます。初期値はともに `false` です。
- 会社情報・所在地・連絡先を変更する場合は、会社概要、ポリシー、全ページ共通フッターも同時に更新してください。
- SNS共有画像は `assets/og-txppie.png`（1200×630px）です。
