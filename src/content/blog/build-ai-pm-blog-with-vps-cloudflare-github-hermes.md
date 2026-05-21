---
title: 从 0 到 1 搭建 AI 产品经理个人博客：Cloudflare + VPS + GitHub + Hermes
description: 记录我搭建 aipmnotes.com 的全过程，包括域名选择、VPS 配置、Nginx 部署、GitHub Actions 自动化和 Hermes AI 集成。
pubDate: 2026-05-21
tags: [VPS, Cloudflare, Nginx, GitHub Actions, Hermes, AI产品经理]
draft: false
---

## 为什么要做 aipmnotes.com

作为一名 AI 产品经理，日常会接触大量工具、方法和案例。零散的笔记和收藏夹很难系统化整理，也不方便分享给同行。

年初时突然意识到：与其在各种平台收藏别人的内容，不如自己搭建一个「数字花园」，记录自己的思考和实践。于是开始研究域名，发现 `aipmnotes.com` 还没人注册——这简直是为我量身定制的域名！

- **AI PM** = AI 产品经理
- **Notes** = 笔记、记录

这个域名既好记又能体现定位，立刻就下单了。

## 技术选型：为什么是这一套组合

最开始考虑过 Vercel、Netlify 这些全托管方案，但最终选择了自建方案：

| 组件 | 选择 | 理由 |
|------|------|------|
| 域名 | Cloudflare | 免费 SSL、CDN、DNS 解析都很方便 |
| 服务器 | 阿里云轻量应用服务器 | 性价比高，国内访问快 |
| Web 服务器 | Nginx | 稳定、配置灵活 |
| CI/CD | GitHub Actions | 代码提交自动部署，免费额度足够 |
| AI 搜索 | Hermes | 自己开发的 AI 语义搜索工具 |

## 1. Cloudflare：域名与安全管家

### 购买域名

在 Cloudflare Registrar 注册了 `aipmnotes.com`，年费用不到 10 美元。Cloudflare 的优势在于：

- **免费 SSL 证书**：自动签发 Let's Encrypt 证书
- **CDN 加速**：全球节点缓存静态资源
- **DNS 解析**：支持多种记录类型，配置灵活
- **安全防护**：默认开启基础 DDoS 防护

### DNS 配置

关键记录配置：

```text
A 记录  @ → 服务器公网 IP
A 记录  www → 服务器公网 IP
CNAME  _acme-challenge → 用于 SSL 验证
```

开启「始终使用 HTTPS」和「自动 HTTPS 重定向」，确保所有请求都走 HTTPS。

## 2. VPS：自己掌握服务器

选择了阿里云轻量应用服务器，2核4G配置，年付约300元。

### 初始化配置

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 创建部署用户
sudo useradd -m deploy
sudo usermod -aG sudo deploy

# 禁用 root 登录（安全考虑）
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart sshd
```

## 3. Nginx：Web 服务器配置

### 安装 Nginx

```bash
sudo apt install nginx -y
```

### 创建站点配置

在 `/etc/nginx/sites-available/` 创建 `aipmnotes.com`：

```nginx
server {
    listen 80;
    server_name aipmnotes.com www.aipmnotes.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name aipmnotes.com www.aipmnotes.com;
    
    ssl_certificate /etc/letsencrypt/live/aipmnotes.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/aipmnotes.com/privkey.pem;
    
    root /var/www/aipmnotes.com/dist;
    index index.html index.htm;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

启用站点并测试配置：

```bash
sudo ln -s /etc/nginx/sites-available/aipmnotes.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 4. GitHub Actions：自动化部署

这是整个流程最爽的部分——代码提交后自动部署。

### 创建 SSH 密钥

在服务器上生成密钥对，将公钥添加到 `~/.ssh/authorized_keys`，私钥保存为 GitHub Secrets。

### 编写 Workflow

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to VPS
        uses: easingthemes/ssh-deploy@main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          SOURCE: dist/
          REMOTE_HOST: ${{ secrets.VPS_HOST }}
          REMOTE_USER: deploy
          TARGET: /var/www/aipmnotes.com/
```

### 添加 Secrets

在 GitHub 仓库设置中添加以下 Secrets：

- `SSH_PRIVATE_KEY`：服务器私钥
- `VPS_HOST`：服务器 IP 地址

## 5. Hermes：AI 语义搜索集成

作为 AI 产品经理，怎么能少了 AI 功能？我开发了 Hermes，一个基于大语言模型的语义搜索工具。

### 功能定位

Hermes 负责：
- 对博客文章进行向量化
- 支持自然语言搜索
- 返回相关文章片段

### 集成方式

在博客中添加搜索组件，调用 Hermes API 实现语义搜索。

## 踩坑记录

搭建过程中遇到的一些问题：

1. **SSL 证书问题**：最初手动配置 Let's Encrypt 总是失败，后来改用 Cloudflare Origin CA 一键解决
2. **权限问题**：部署时文件权限不正确导致 403，需要设置正确的 `www-data` 权限
3. **构建缓存**：GitHub Actions 缓存配置需要优化，否则每次构建都要重新安装依赖

## 总结

这套方案的优势：

- **低成本**：域名 + 服务器年费用不到 500 元
- **高可控**：完全掌握自己的数据和配置
- **自动化**：代码提交即部署，无需手动操作
- **可扩展**：后续可以轻松添加更多功能

如果你也想搭建个人博客，这套方案值得参考。关键是动手开始，先跑通最小可用版本，再逐步优化。