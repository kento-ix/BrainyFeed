# PROJECT.md

## アプリ名
BrainyFeed

## 概要
学術論文の Abstract を一般向けにわかりやすく要約して提供する Web アプリ。
Semantic Scholar API でレビュー論文を検索し、専門家向けの Abstract を一般の人でも理解できる言葉に要約して表示する。
「今どんな研究が行われているか」「その研究がどう進んでいるか」を誰でも把握できることを目指す。

## 想定ユーザー
- 研究者ではない一般の人
- 最新の研究トレンドに興味があるが、論文を直接読む知識がない人

## 主な機能
- キーワードでレビュー論文を検索（Semantic Scholar API 経由）
- 専門的な Abstract を一般向けにわかりやすく要約して表示（独自ロジックで実装、AI API は使用しない）
- 最近のレビュー論文を一覧表示（DB から取得）
- （予定）論文を保存する POST 機能

## 技術スタック
| 役割 | 技術 |
|------|------|
| バックエンド | Express 5, Node.js ESM |
| フロントエンド | React 19, Parcel 2 |
| データベース | SQLite（Node.js 組み込み `node:sqlite`） |
| 外部 API | Semantic Scholar Graph API |

## API エンドポイント（現在）
| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/v1/papers/search?topic=` | キーワードでレビュー論文を検索 |
| GET | `/api/v1/papers/reviews` | DB からレビュー論文を一覧取得 |
| POST | （未実装） | 論文の保存など |

## DB テーブル構成
- `Categories` — 論文カテゴリ
- `Papers` — 論文データ（CategoryID で Categories に FK）
- `PaperRelations` — レビュー論文と個別論文の関係（中間テーブル）
- `SavedPapers` — ユーザーが保存した論文（※ Users テーブルは削除予定）
- `Users` — （削除予定：課題でログイン不要と指定されている）

## 提出前チェックリスト
- [ ] `CLAUDE.md` を削除
- [ ] `.claude/` を削除
- [ ] `.github/` を削除
- [ ] `research.db` を `express/database/` に追加
- [ ] `node_modules/` と `.parcel-cache/` を削除
- [ ] `documentation.pdf` を作成
- [ ] `api-documentation.json`（Postman エクスポート）を用意

## 課題の締め切り
- Oral Exam & Code Review: 2026-04-08
- Final Hand In: 2026-04-08 終日

## 現在の状態（2026-03-19）

### ✅ 完了済み
#### API
- GET `/api/v1/papers/search?topic=` — Semantic Scholar API で論文検索
- GET `/api/v1/papers/saved?email=&limit=&offset=` — 保存済み論文取得（ページネーション付き）
- POST `/api/v1/papers/save` — 論文の保存
- HATEOAS リンク（配列形式）全エンドポイントに実装済み
- ミドルウェアバリデーション（sanitizeSearchQuery, validateSaveBody, sanitizeEmailQuery）
- routing / controller / model 3層分離
- 適切な HTTP ステータスコード（200, 201, 400, 404, 500）

#### DB
- Papers テーブル（PK, CHECK 制約複数）
- SavedPapers テーブル（複合 PK, FK, CHECK 制約）
- SELECT with LIMIT / OFFSET ✅
- INSERT ✅
- WHERE ✅
- JOIN ✅
- スターターデータ（3件の論文 + 2件の保存済み）

#### React
- SPA（React Router 不使用）
- コンポーネント分割: App, SearchForm, PaperList, EmailForm, SavedPaperList
- コントロールドフォーム: SearchForm, EmailForm
- ローディング表示、エラーメッセージ、成功メッセージ
- ページネーション（Prev/Next ボタン、LIMIT=3）
- CSS スタイリング（Material Design）

#### その他
- `start` スクリプト: express ✅ / react ✅
- `.gitignore`: .env, express/public/, react/dist/ ✅

---

## ❌ 残りタスク

### 必須（提出に必要）
- [ ] `documentation.pdf` — Google Docs で作成中、PDF でエクスポートして提出
- [ ] `api-documentation.json` — Postman で全エンドポイントをテスト後エクスポート
- [ ] Render デプロイ — 教授のチュートリアル待ち、完了後 URL を documentation に記載

### コード修正
- [x] `.gitignore` を root に統合済み（node_modules, .env, .parcel-cache, *.db）
- [ ] `research.db` を初期化済みにして提出物に含める（`db-setup.sql` を実行）
- [x] `app.js` のポートを 3000 に統一（現在 3002）

### 提出前クリーンアップ
- [ ] `node_modules/` を削除してから zip
- [ ] `.parcel-cache/` を削除してから zip
