# OAuth 配置 - 最后步骤

## 当前状态

✅ Vercel 项目已创建：`blog-cms-oauth`
✅ `config.yml` 中的 `base_url` 已更新为 `https://blog-cms-oauth.vercel.app`
✅ 代码文件已准备好

## 需要完成的最后步骤

### 步骤 1：配置 Vercel 环境变量（重要！）

在 Vercel Dashboard 中：

1. 进入项目 `blog-cms-oauth`
2. 点击 **Settings** → **Environment Variables**
3. 添加以下 4 个环境变量：

   | 变量名 | 值 | 说明 |
   |--------|-----|------|
   | `GITHUB_CLIENT_ID` | 你的 Client ID | 从 GitHub OAuth App 获取 |
   | `GITHUB_CLIENT_SECRET` | 你的 Client Secret | 从 GitHub OAuth App 获取 |
   | `OAUTH_REDIRECT_URI` | `https://blog-cms-oauth.vercel.app/api/auth?provider=github` | OAuth 回调地址 |
   | `ADMIN_URL` | `https://xinyi-jane.github.io/blog/admin/` | Admin 页面地址 |

4. **重要**：确保所有环境变量都添加到 **Production** 环境
5. 保存后，Vercel 会自动重新部署

### 步骤 2：创建 GitHub OAuth App（如果还没创建）

1. 访问：https://github.com/settings/developers
2. 点击 **"OAuth Apps"** → **"New OAuth App"**
3. 填写：
   - **Application name**: `Blog CMS`
   - **Homepage URL**: `https://xinyi-jane.github.io/blog/`
   - **Authorization callback URL**: `https://blog-cms-oauth.vercel.app/api/auth?provider=github`
4. 点击 **"Register application"**
5. **保存 Client ID 和 Client Secret**（Secret 只显示一次！）
6. 将这两个值添加到 Vercel 环境变量中

### 步骤 3：验证部署

1. 等待 Vercel 重新部署完成（添加环境变量后会自动触发）
2. 测试 OAuth 端点：
   - 访问：`https://blog-cms-oauth.vercel.app/api/auth?provider=github`
   - 应该会重定向到 GitHub 登录页面

### 步骤 4：提交代码更改

```bash
git add .
git commit -m "完成 OAuth 配置"
git push origin main
```

### 步骤 5：测试 Admin 页面

1. 等待 GitHub Actions 部署完成（2-5 分钟）
2. 访问：https://xinyi-jane.github.io/blog/admin/
3. 应该看到 **"Login with GitHub"** 按钮
4. 点击登录，完成授权
5. 应该能看到 CMS 界面，可以创建新文章

## ✅ 完成检查清单

- [ ] Vercel 环境变量已配置（4 个变量）
- [ ] GitHub OAuth App 已创建
- [ ] OAuth App 回调 URL 已设置为 Vercel URL
- [ ] Vercel 重新部署成功（无错误）
- [ ] 代码已提交到 GitHub
- [ ] Admin 页面可以正常登录
- [ ] 可以创建新文章

## 🎉 完成！

所有步骤完成后，你就可以通过 `/admin` 页面在线发布文章了！

