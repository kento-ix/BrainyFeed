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

## 現在の状態（2026-03-17）
- 基本的な検索機能は動作している
- 以下が未対応：
  - POST エンドポイント
  - DB の CHECK 制約・スターターデータ
  - HATEOAS リンク
  - エラーハンドリング（React・Express 両方）
  - APIキーの .env 移動
