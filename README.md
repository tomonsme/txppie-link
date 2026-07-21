# TxPPIE Press Room

TxPPIE株式会社と代表・一二三晴也のメディア掲載、受賞、採択、登壇実績をまとめた独立サイトです。

```sh
npm run dev
```

`http://localhost:4173` で確認できます。

## 公開ビルド

```sh
npm run build
```

Netlifyでは `netlify.toml` の設定により `dist` が公開されます。NetlifyではサイトURLを使って canonical URL、OG URL、`robots.txt`、`sitemap.xml` が自動生成されます。他の環境で本番ビルドするときは次のように公開URLを指定してください。

```sh
SITE_URL=https://example.com npm run build
```

## 更新箇所

- 記事リンクと件数: `index.html`
- デザイン: `styles.css`
- 絞り込みとモバイルメニュー: `script.js`
