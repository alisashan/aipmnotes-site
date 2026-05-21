---
title: AI产品经理博客搭建记录
description: 使用 Astro 搭建 aipmnotes.com 静态博客的选型、目录结构与部署说明。
pubDate: 2026-05-18
category: vibe-coding
tags: [Astro, 静态站, 博客]
---

## 为什么选 Astro

- 默认输出静态 HTML，适合个人博客部署到 CDN
- Content Collections 原生支持 Markdown
- 页面可按需 hydration，首页保持轻量

## 项目结构

```text
src/
├── content/blog/     # Markdown 文章
├── components/       # 首页模块组件
├── layouts/          # 页面布局
├── pages/            # 路由
└── config/site.ts    # 站点配置
```

## 本地开发

```bash
npm run dev    # http://localhost:4321
npm run build  # 输出 dist/
npm run preview
```

## 部署建议

构建产物在 `dist/`，可部署至 Cloudflare Pages、Vercel、Netlify 或任意静态托管。绑定域名 `aipmnotes.com` 后，在托管平台配置 HTTPS 即可。

## 后续计划

- RSS 订阅
- 文章搜索
- 深色/浅色主题切换（当前默认深色科技风）
