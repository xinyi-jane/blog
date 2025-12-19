# 个人博客

基于 Astro 构建的双频道个人博客，支持生活和工作两个模块，包含动态更新功能和在线发布能力。

## 功能特性

- ✅ **双频道结构**：生活（Life）和工作（Work）两个独立频道
- ✅ **动态更新**：支持发布短内容和图片的动态模块
- ✅ **在线发布**：通过 Decap CMS 在网页端直接发布内容
- ✅ **图片支持**：支持封面图和图片集
- ✅ **RSS 订阅**：自动生成 RSS feed
- ✅ **GitHub Pages 部署**：通过 GitHub Actions 自动部署

## 项目结构

```
blog/
├── src/
│   ├── content/
│   │   ├── posts/          # 文章内容（Markdown）
│   │   ├── updates/         # 动态内容（Markdown）
│   │   └── config.ts        # Content Collections 配置
│   ├── layouts/
│   │   └── Layout.astro     # 基础布局
│   └── pages/
│       ├── index.astro      # 首页
│       ├── about.astro      # 关于页
│       ├── life/            # 生活频道
│       ├── work/            # 工作频道
│       ├── updates/         # 动态列表
│       └── rss.xml.ts       # RSS feed
├── public/
│   ├── admin/               # Decap CMS 后台
│   └── images/              # 图片资源
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 部署配置
└── api/
    └── auth.js              # OAuth 代理服务（用于 Vercel）
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式

```bash
npm run dev
```

访问 http://localhost:4321 查看网站。

### 3. 构建

```bash
npm run build
```

### 4. 预览构建结果

```bash
npm run preview
```

## 配置说明

### 1. 更新站点 URL

编辑 `astro.config.mjs`，修改 `site` 字段为你的 GitHub Pages URL：

```js
site: 'https://yourusername.github.io',
```

如果仓库名不是 `username.github.io`，还需要设置 `base`：

```js
base: '/your-repo-name/',
```

### 2. 配置 Decap CMS

编辑 `public/admin/config.yml`：

1. 更新 `repo` 为你的 GitHub 仓库路径（格式：`username/repo-name`）
2. 更新 `base_url` 为你的 OAuth 代理服务地址（见下方 OAuth 配置）

### 3. 配置 OAuth 代理服务

由于 GitHub Pages 不能运行后端服务，需要单独部署 OAuth 代理。

#### 选项 A：使用 Vercel（推荐）

1. 在 Vercel 创建新项目，连接你的 GitHub 仓库
2. 在 Vercel 项目设置中添加环境变量：
   - `GITHUB_CLIENT_ID`：GitHub OAuth App 的 Client ID
   - `GITHUB_CLIENT_SECRET`：GitHub OAuth App 的 Client Secret
   - `OAUTH_REDIRECT_URI`：OAuth 回调地址（通常是 `https://your-vercel-app.vercel.app/api/auth?provider=github`）

3. 在 GitHub 创建 OAuth App：
   - 访问 https://github.com/settings/developers
   - 点击 "New OAuth App"
   - Authorization callback URL 设置为：`https://your-vercel-app.vercel.app/api/auth?provider=github`

4. 更新 `public/admin/config.yml` 中的 `base_url` 为你的 Vercel 应用地址

#### 选项 B：使用 Cloudflare Workers

类似地，可以将 `api/auth.js` 部署到 Cloudflare Workers。

### 4. 配置 GitHub Actions

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择 "GitHub Actions" 作为部署源
3. 确保仓库有 `pages: write` 权限

## 使用说明

### 发布文章

1. 访问 `/admin` 进入 Decap CMS 后台
2. 使用 GitHub 账号登录
3. 选择 "文章" 或 "动态" 集合
4. 点击 "New [文章/动态]"
5. 填写内容并上传图片
6. 点击 "Publish" 发布

发布后，GitHub Actions 会自动构建并部署到 GitHub Pages。

### 本地写作

你也可以直接在 `src/content/posts/` 或 `src/content/updates/` 目录下创建 Markdown 文件。

文章 frontmatter 示例：

```yaml
---
title: 文章标题
date: 2024-01-15
channel: life  # 或 work
tags: [标签1, 标签2]
description: 文章描述
draft: false
cover: /images/life/article-slug/cover.jpg
gallery: [/images/life/article-slug/img1.jpg, /images/life/article-slug/img2.jpg]
---
```

动态 frontmatter 示例：

```yaml
---
date: 2024-01-20T10:00:00
title: 动态标题（可选）
images: [/images/updates/2024-01/img1.jpg]
draft: false
---
```

## 图片管理

图片建议存放在 `public/images/` 目录下，按以下结构组织：

- `public/images/life/<slug>/` - 生活文章图片
- `public/images/work/<slug>/` - 工作文章图片
- `public/images/updates/<yyyy-mm>/` - 动态图片

在 Markdown 中引用图片：

```markdown
![描述](/images/life/article-slug/image.jpg)
```

## 部署

### GitHub Pages（推荐）

详细的部署步骤请查看 **[DEPLOY.md](./DEPLOY.md)** 文件。

**快速步骤：**
1. 在 GitHub 创建仓库
2. 初始化本地 Git 并推送代码
3. 在仓库设置中启用 GitHub Pages（选择 GitHub Actions）
4. 等待自动部署完成

### 其他平台

你也可以将构建后的 `dist/` 目录部署到任何静态网站托管服务（Vercel、Netlify、Cloudflare Pages 等）。

## 技术栈

- [Astro](https://astro.build/) - 静态站点生成器
- [Decap CMS](https://decapcms.org/) - 内容管理系统
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [GitHub Pages](https://pages.github.com/) - 静态网站托管
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## 许可证

MIT

