# 課題ルール（必ず読むこと）

詳細なルールは `.claude/rules/` を参照:
- `.claude/rules/api-rules.md` — API・REST 規約・セキュリティ
- `.claude/rules/database-rules.md` — DB 設計・必須 SQL・プリペアドステートメント
- `.claude/rules/react-rules.md` — React コンポーネント・フォーム・禁止事項
- `.claude/rules/general-rules.md` — 提出物・ファイル管理・AI 記録義務
- `.claude/rules/design-rules.md` — CSS スタイリング・カラー・レイアウト規約

**タスクが完了したら必ず `.claude/PROJECT.md` の該当項目を更新すること。**
- 完了したタスク: `[ ]` → `[x]`
- 新しく判明した残タスクは `❌ 残りタスク` セクションに追加する

---

# プロジェクト概要

Express バックエンドと React フロントエンドのフルスタックアプリ。
React のビルド成果物は Parcel によって `express/public/` に出力され、Express が静的ファイルとして配信する構成。

---

# 技術スタック

| 役割 | 技術 |
|------|------|
| バックエンド | Express 5 (Node.js ESM) |
| フロントエンド | React 19 + Parcel 2 |
| データベース | SQLite（Node.js 組み込みの `node:sqlite`） |

---

# ディレクトリ構成

```
project/
├── express/                  # バックエンド
│   ├── app.js                # エントリーポイント（ポート 3000）
│   ├── routes/               # ルーティング（/api/v1）
│   ├── controllers/          # コントローラー
│   ├── models/               # モデル
│   ├── middleware/           # ミドルウェア
│   ├── database/
│   │   ├── db.js             # SQLite 接続（DatabaseSync）
│   │   └── research.db       # SQLite データベースファイル
│   └── public/               # Parcel のビルド出力先（自動生成）
├── react/                    # フロントエンド
│   └── src/
│       ├── index.js          # エントリーポイント
│       ├── components/       # React コンポーネント
│       └── services/         # API 通信（paperService.js など）
└── db-setup.sql              # DB 初期化 SQL
```

---

# コマンド

### バックエンド起動
```bash
cd express && npm run dev
```

### フロントエンド（Parcel ウォッチ）
```bash
cd react && npm run dev
```
> ビルド結果は `express/public/` に自動出力される。両方同時に起動すること。

### DB 初期化
```bash
cd express && node --input-type=module < ../db-setup.sql
# または psql 相当のツールで db-setup.sql を実行
```

---

# コーディング規約

- **モジュール形式**: ESM（`import` / `export`）を使う。`require()` は使わない
- **非同期処理**: `.then()` を使う（講義のスタイルに合わせる）
- **DB アクセス**: `node:sqlite` の `DatabaseSync` 経由（`express/database/db.js` をインポート）
- **API パス**: `/api/v1/` プレフィックスを必ず付ける
- **命名規則**:
  - DB カラム: スネークケース（`created_at`）
  - JS 変数・関数: キャメルケース（`createdAt`）
  - React コンポーネントファイル: パスカルケース（`PaperList.js`）

---

# useEffect のルール（React 公式ドキュメントより）

- **1つの useEffect に1つの目的**: 複数の独立した処理は useEffect を分ける
- **依存配列を正確に書く**: useEffect 内で使う変数・props はすべて依存配列に含める
  ```js
  useEffect(() => { ... }, [props.query]); // props.query を使うなら必ず入れる
  ```
- **データフェッチは useEffect 内で行う**: props や state が変わったときに fetch を再実行する場合
  ```js
  useEffect(() => {
      if (!props.query) return;
      fetchData(props.query).then(data => setState(data));
  }, [props.query]);
  ```
- **クリーンアップ関数を返す**: タイマーやイベントリスナーなど、後処理が必要なものは `return` でクリーンアップする
  ```js
  useEffect(() => {
      const id = setInterval(...);
      return () => clearInterval(id); // クリーンアップ
  }, []);
  ```
- **空の依存配列 `[]` はマウント時のみ実行**: コンポーネントが最初に表示されたときだけ動かしたい処理に使う
- **派生 state に useEffect を使わない**: 既存の state や props から計算できる値は useEffect + setState ではなく、レンダリング中に直接計算する

---

# 注意事項

- `.env` ファイルは**絶対にコミットしない**（`.gitignore` に含まれている）
- `express/public/` は Parcel の自動生成物なので**手動編集しない**
- `research.db` はバイナリなので**コミット対象か確認してから扱う**
- フロントエンドの API 呼び出しは `react/src/services/` に集約する
