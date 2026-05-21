# AI PM Notes

中文个人博客静态站，域名 [aipmnotes.com](https://aipmnotes.com)。

记录 AI 产品经理的工具、方法、案例、Agent、工作流与个人项目。

## 开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出 dist/，可部署到任意静态托管
npm run preview
```

## 写文章

在 `src/content/blog/` 新建 Markdown，frontmatter 示例：

```yaml
---
title: 文章标题
description: 摘要
pubDate: 2026-05-20
category: ai-pm          # ai-pm | vibe-coding | ai-workflow | analysis
tags: [标签1, 标签2]
draft: false
---
```

## 部署

构建后将 `dist/` 目录上传至 Cloudflare Pages、Vercel、Netlify 等，并绑定域名 `aipmnotes.com`。

## 结构

- `src/pages/` — 页面路由
- `src/content/blog/` — Markdown 文章
- `src/components/` — 首页与通用组件
- `src/config/site.ts` — 导航、项目、站点信息
