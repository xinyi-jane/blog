# 更新 OAuth 配置

## 快速更新步骤

### 1. 获取你的 Vercel 应用 URL

如果你已经部署了 OAuth 代理服务到 Vercel，你的应用 URL 应该是：
- `https://your-app-name.vercel.app` 或
- `https://blog-cms-oauth.vercel.app`（如果你使用了这个名称）

### 2. 更新 config.yml

编辑 `public/admin/config.yml`，取消注释并填入你的 Vercel URL：

```yaml
backend:
  name: github
  repo: xinyi-jane/blog
  branch: main
  base_url: https://your-vercel-app.vercel.app  # 替换为你的实际 URL
  auth_endpoint: api/auth
```

### 3. 提交更改

```bash
git add public/admin/config.yml
git commit -m "更新 OAuth 配置"
git push origin main
```

## 如果还没有部署 Vercel 应用

请先按照 `OAUTH_CONFIG_STEPS.md` 的步骤部署 OAuth 代理服务。

