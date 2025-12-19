# OAuth 配置完成检查清单

## 📋 配置状态

### ✅ 已完成的代码配置

- [x] `api/auth.js` - OAuth 代理服务代码
- [x] `vercel.json` - Vercel 配置文件
- [x] `.vercelignore` - Vercel 忽略文件
- [x] `public/admin/config.yml` - CMS 配置
  - [x] GitHub backend 已配置
  - [x] repo: `xinyi-jane/blog`
  - [x] branch: `main`
  - [x] auth_endpoint: `api/auth`
  - [ ] ⚠️ `base_url` 需要确认是否为 `https://blog-cms-oauth.vercel.app`

### ⚠️ 需要完成的配置

#### 1. Vercel 环境变量（必须）

在 Vercel Dashboard → Settings → Environment Variables 添加：

- [ ] `GITHUB_CLIENT_ID` = 你的 GitHub Client ID
- [ ] `GITHUB_CLIENT_SECRET` = 你的 GitHub Client Secret
- [ ] `OAUTH_REDIRECT_URI` = `https://blog-cms-oauth.vercel.app/api/auth?provider=github`
- [ ] `ADMIN_URL` = `https://xinyi-jane.github.io/blog/admin/`

**重要**：确保添加到 **Production** 环境

#### 2. GitHub OAuth App（必须）

- [ ] 已创建 GitHub OAuth App
- [ ] Application name: `Blog CMS`
- [ ] Homepage URL: `https://xinyi-jane.github.io/blog/`
- [ ] Authorization callback URL: `https://blog-cms-oauth.vercel.app/api/auth?provider=github`
- [ ] 已保存 Client ID 和 Client Secret

#### 3. 确认 base_url

- [ ] `public/admin/config.yml` 第 11 行：
  ```yaml
  base_url: https://blog-cms-oauth.vercel.app
  ```
  确保这是你的实际 Vercel 应用地址

#### 4. 提交代码

```bash
git add .
git commit -m "完成 OAuth 配置"
git push origin main
```

- [ ] 已提交所有更改
- [ ] 已推送到 GitHub

#### 5. 验证测试

- [ ] Vercel 部署成功（无错误）
- [ ] 访问 `https://blog-cms-oauth.vercel.app/api/auth?provider=github` 能重定向到 GitHub
- [ ] 访问 `https://xinyi-jane.github.io/blog/admin/` 能看到登录按钮
- [ ] 可以成功登录
- [ ] 能看到 CMS 界面
- [ ] 可以创建新文章

## 🎯 当前进度

根据你的 Vercel Dashboard，项目已创建。现在需要：

1. **配置环境变量**（最重要！）
2. **创建 GitHub OAuth App**
3. **确认 base_url 配置**
4. **提交代码**

完成这些步骤后，OAuth 配置就完成了！

