# 🚀 OAuth 配置 - 从这里开始

## 快速执行（3 步）

### 第 1 步：创建 GitHub OAuth App（5 分钟）

1. **打开浏览器**，访问：https://github.com/settings/developers
2. 点击 **"OAuth Apps"** → **"New OAuth App"**
3. 填写信息：
   ```
   Application name: Blog CMS
   Homepage URL: https://xinyi-jane.github.io/blog/
   Authorization callback URL: https://blog-cms-oauth.vercel.app/api/auth?provider=github
   ```
   ⚠️ 注意：回调 URL 是临时的，部署 Vercel 后可能需要更新
4. 点击 **"Register application"**
5. **保存这两个值**（稍后需要）：
   - **Client ID**: `_________________`
   - **Client Secret**: `_________________`（点击 "Generate a new client secret" 生成）

### 第 2 步：部署到 Vercel（10 分钟）

**在终端执行：**

```bash
cd /Users/xinyi/blog

# 如果还没登录 Vercel，先登录
vercel login

# 部署项目
vercel --prod
```

**按照提示操作：**
- 项目名称：输入 `blog-cms-oauth`（或任何你喜欢的名称）
- 其他选项：直接按 Enter 使用默认值

**部署完成后，记录你的 Vercel URL**（例如：`https://blog-cms-oauth.vercel.app`）

### 第 3 步：配置环境变量和更新设置（5 分钟）

#### 3.1 在 Vercel 设置环境变量

1. 访问：https://vercel.com/dashboard
2. 找到你的项目（`blog-cms-oauth`）
3. 进入 **Settings** → **Environment Variables**
4. 添加以下 4 个环境变量：

   | 变量名 | 值 |
   |--------|-----|
   | `GITHUB_CLIENT_ID` | 你的 Client ID（从步骤 1） |
   | `GITHUB_CLIENT_SECRET` | 你的 Client Secret（从步骤 1） |
   | `OAUTH_REDIRECT_URI` | `https://你的vercel应用.vercel.app/api/auth?provider=github` |
   | `ADMIN_URL` | `https://xinyi-jane.github.io/blog/admin/` |

5. 保存所有环境变量

#### 3.2 更新 GitHub OAuth App 回调 URL

1. 回到：https://github.com/settings/developers
2. 点击你的 OAuth App
3. 更新 **Authorization callback URL** 为：
   ```
   https://你的vercel应用.vercel.app/api/auth?provider=github
   ```
4. 保存更改

#### 3.3 更新博客配置

编辑 `public/admin/config.yml`，将第 11 行：
```yaml
base_url: https://your-vercel-app.vercel.app
```

替换为你的实际 Vercel URL：
```yaml
base_url: https://blog-cms-oauth.vercel.app
```

#### 3.4 提交更改

```bash
git add public/admin/config.yml
git commit -m "配置 OAuth base_url"
git push origin main
```

### 第 4 步：测试（2 分钟）

1. 等待 GitHub Actions 部署完成（2-5 分钟）
2. 访问：https://xinyi-jane.github.io/blog/admin/
3. 应该看到 **"Login with GitHub"** 按钮
4. 点击登录，授权后应该能看到 CMS 界面
5. 尝试创建一篇测试文章

## ✅ 完成！

如果所有步骤都完成了，你就可以通过 `/admin` 页面在线发布文章了！

## 📚 需要帮助？

- 查看 [ADMIN_TROUBLESHOOTING.md](./ADMIN_TROUBLESHOOTING.md) 排查问题
- 查看 [README.md](./README.md) 了解完整项目信息

