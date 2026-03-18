# 一般ルール（課題要件より）

## 提出物（手を付ける前に確認）
提出時に必要なファイル:
- `documentation.pdf` — アプリの説明、起動手順、AI 使用記録
- `api-documentation.json` — Postman のエクスポート
- `database-setup.sql` — DB 再構築用 SQL
- `project/` フォルダ（express/ + react/ + .gitignore）
- ※ `node_modules/` と `.parcel-cache/` は**削除してから提出**

## package.json
- `express/` と `react/` の両方に `start` スクリプトを必ず定義する
- 使用するすべての依存パッケージを `package.json` に記録する

## ファイル管理
- `.gitignore` に以下を含める: `node_modules`, `.env`, `.parcel-cache`
- `.env` ファイルはコミットしない
- `express/database/research.db`（SQLite ファイル）は提出物に含める

## コード品質
- コードは読みやすくフォーマットする
- 抽象化・モジュール化・カプセル化の原則に従う
- ファイル名・変数名はわかりやすく一貫性を持たせる

## 機能制限
- ユーザーログイン・認証システムは**実装しない**（要件外、複雑になるだけ）
- ユーザー識別が必要な場合はメールアドレスのみ使う（パスワード不要）
- 授業で扱っていないライブラリは教授の承認なしに追加しない

## AI 使用の記録（重要）
- AI（Claude Code）を使った箇所はすべて `documentation` ファイルに記録する
- 記録内容: 解決しようとした問題、使用したモデル、プロンプト、ルールファイル
- ファイル名と行番号まで明記する
