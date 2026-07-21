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

Netlifyでは `netlify.toml` の設定により `dist` が公開されます。独自ドメインで本番公開するときは、同ファイルの `X-Robots-Tag` を削除し、`index.html` と `sitemap.xml` に本番URLを設定してください。

## 更新箇所

- 記事リンクと件数: `index.html`
- デザイン: `styles.css`
- 絞り込みとモバイルメニュー: `script.js`
