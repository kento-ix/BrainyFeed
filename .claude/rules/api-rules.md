# API ルール（課題要件より）

## エンドポイント
- GET を最低 2 つ、POST を最低 1 つ実装する
- すべてのパスは `/api/v1/` で始める（URL バージョニング必須）
- リソースベースのパス名を使う（例: `/api/v1/papers`）
- 単一リソースはパスパラメータで識別する（例: `/api/v1/papers/:id`）

## REST 規約
- 適切な HTTP ステータスコードを返す（200, 201, 400, 404, 500 など）
- GET のフィルタリングは URL クエリパラメータで行う（例: `?topic=ai`）
- レスポンスは必ず JSON 形式にする
- レスポンスに HATEOAS スタイルのリンクを含める
  ```json
  {
    "data": { ... },
    "links": { "self": "/api/v1/papers/1" }
  }
  ```

## ミドルウェア・バリデーション
- クライアントからのすべての入力（クエリパラメータ・リクエストボディ）をミドルウェアでバリデートする
- 不正な入力には 400 を返す
- 存在しないリソースには 404 を返す

## クライアント側の URL エンコード禁止
- `react/src/services/` の fetch 呼び出しで `encodeURIComponent()` を使わない
- クエリパラメータのサニタイズ・正規化はすべてサーバー側のミドルウェアで行う
- 各エンドポイントに対応するミドルウェアを `express/middleware/sanitizeQuery.js` に定義する
  ```js
  // ✅ クライアント側はそのまま渡す
  fetch(`/api/v1/papers/saved?email=${email}`)

  // ❌ クライアント側でエンコードしない
  fetch(`/api/v1/papers/saved?email=${encodeURIComponent(email)}`)
  ```
- ミドルウェアの命名規則: `sanitize` + リソース名 + `Query`（例: `sanitizeEmailQuery`, `sanitizeSearchQuery`）

## アーキテクチャ
- routing / controller / model の 3 層に分離する
- `routes/` にルーティングのみ、`controllers/` にロジック、`models/` に DB アクセスを書く
- ロジックをルートファイルに直接書かない

## Controller の書き方
- クエリパラメータの数値変換は単項 `+` 演算子を使う（`parseInt()` は使わない）
  ```js
  const limit = +req.query.limit || 10;   // ✅
  const limit = parseInt(req.query.limit) || 10;  // ❌
  const limit = req.query.limit || 10;             // ❌ 文字列のまま
  ```

## Model の書き方
- 関数のデフォルト値はモデルに書かない。デフォルト値はコントローラー側で決める
  ```js
  // ✅ model はパラメータをそのまま受け取る
  export const getReviewPapers = (limit, offset) => { ... }

  // ❌ model にデフォルト値を書かない
  export const getReviewPapers = (limit = 10, offset = 0) => { ... }
  ```

## セキュリティ
- DB クエリにユーザー入力を埋め込む際は必ずプリペアドステートメントを使う
- 文字列連結で SQL を組み立てない（SQLインジェクション対策）
