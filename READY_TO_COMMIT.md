# 准备提交 - 配置检查

## ✅ 已完成的配置修改

### 代码文件
- [x] `api/auth.js` - OAuth 代理服务（已更新）
- [x] `vercel.json` - Vercel 配置
- [x] `.vercelignore` - 忽略文件

### CMS 配置
- [x] `public/admin/config.yml`
  - [x] base_url: `https://blog-cms-oauth.vercel.app` ✅

### Vercel 项目
- [x] 项目已创建：`blog-cms-oauth`
- [x] 项目 URL：`https://blog-cms-oauth.vercel.app`

## ⚠️ 提交前检查

### 1. 确认 base_url 已更新

检查 `public/admin/config.yml` 第 11 行应该是：
```yaml
base_url: https://blog-cms-oauth.vercel.app
```

### 2. 准备提交

```bash
# 查看更改
git status

# 添加所有更改
git add .

# 提交
git commit -m "完成 OAuth 配置：更新 base_url 和添加相关文件"

# 推送
git push origin main
```

## 🔑 提交后还需要完成

### 1. 配置 Vercel 环境变量（必须）

在 Vercel Dashboard → Settings → Environment Variables 添加：

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `OAUTH_REDIRECT_URI` = `https://blog-cms-oauth.vercel.app/api/auth?provider=github`
- `ADMIN_URL` = `https://xinyi-jane.github.io/blog/admin/`

### 2. 创建 GitHub OAuth App（必须）

访问：https://github.com/settings/developers

创建 OAuth App，回调 URL：`https://blog-cms-oauth.vercel.app/api/auth?provider=github`

## ✅ 完成后的验证

1. 等待 GitHub Actions 部署完成
2. 访问：https://xinyi-jane.github.io/blog/admin/
3. 测试登录功能

