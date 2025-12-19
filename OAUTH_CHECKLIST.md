# OAuth 配置检查清单

## ✅ 准备阶段

- [ ] 已阅读 `QUICK_START_OAUTH.md`
- [ ] 准备好 GitHub 账号
- [ ] 准备好 Vercel 账号（可以用 GitHub 登录）

## 📝 配置步骤

### 1. GitHub OAuth App

- [ ] 访问 https://github.com/settings/developers
- [ ] 创建新的 OAuth App
- [ ] 填写 Application name: `Blog CMS`
- [ ] 填写 Homepage URL: `https://xinyi-jane.github.io/blog/`
- [ ] 填写 Authorization callback URL（临时地址，稍后更新）
- [ ] 保存并记录 **Client ID**
- [ ] 生成并保存 **Client Secret**（只显示一次！）

### 2. Vercel 部署

- [ ] 安装 Vercel CLI: `npm install -g vercel`
- [ ] 登录 Vercel: `vercel login`
- [ ] 部署项目: `vercel --prod`
- [ ] 记录 Vercel 应用 URL（例如：`https://blog-cms-oauth.vercel.app`）

### 3. Vercel 环境变量

在 Vercel 项目设置中添加：
- [ ] `GITHUB_CLIENT_ID`: 你的 Client ID
- [ ] `GITHUB_CLIENT_SECRET`: 你的 Client Secret
- [ ] `OAUTH_REDIRECT_URI`: `https://your-app.vercel.app/api/auth?provider=github`
- [ ] `ADMIN_URL`: `https://xinyi-jane.github.io/blog/admin/`

### 4. 更新 GitHub OAuth App

- [ ] 回到 GitHub OAuth App 设置
- [ ] 更新 Authorization callback URL 为你的 Vercel URL
- [ ] 保存更改

### 5. 更新博客配置

- [ ] 编辑 `public/admin/config.yml`
- [ ] 更新 `base_url` 为你的 Vercel 应用地址
- [ ] 保存文件

### 6. 提交代码

```bash
git add public/admin/config.yml
git commit -m "配置 OAuth"
git push origin main
```

- [ ] 已提交更改
- [ ] 已推送到 GitHub

### 7. 测试

- [ ] 等待 GitHub Actions 部署完成
- [ ] 访问 https://xinyi-jane.github.io/blog/admin/
- [ ] 看到 "Login with GitHub" 按钮
- [ ] 点击登录，成功授权
- [ ] 看到 CMS 界面
- [ ] 能看到 "New 文章" 和 "New 动态" 按钮
- [ ] 尝试创建一篇测试文章
- [ ] 文章成功保存并发布

## 🎉 完成

所有步骤完成后，你的 OAuth 配置就完成了！

## 📚 相关文档

- `QUICK_START_OAUTH.md` - 详细配置步骤
- `OAUTH_CONFIG_STEPS.md` - 完整配置指南
- `ADMIN_TROUBLESHOOTING.md` - 问题排查

