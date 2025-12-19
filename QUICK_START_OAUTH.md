# OAuth 快速配置指南

## 一键配置（推荐）

运行配置脚本：
```bash
./setup-oauth.sh
```

脚本会引导你完成所有步骤。

## 手动配置步骤

### 步骤 1：创建 GitHub OAuth App（5分钟）

1. 访问：https://github.com/settings/developers
2. 点击 "OAuth Apps" → "New OAuth App"
3. 填写：
   - **Application name**: `Blog CMS`
   - **Homepage URL**: `https://xinyi-jane.github.io/blog/`
   - **Authorization callback URL**: `https://blog-cms-oauth.vercel.app/api/auth?provider=github`
     - ⚠️ 注意：这个 URL 需要等 Vercel 部署后再更新
4. 点击 "Register application"
5. **保存 Client ID 和 Client Secret**（Secret 只显示一次！）

### 步骤 2：部署 OAuth 代理到 Vercel（10分钟）

#### 方法 A：使用 Vercel CLI（推荐）

```bash
# 安装 Vercel CLI（如果还没安装）
npm install -g vercel

# 登录
vercel login

# 在项目目录下部署
cd /Users/xinyi/blog
vercel --prod
```

按照提示操作：
- 项目名称：`blog-cms-oauth`（或任何你喜欢的名称）
- 其他选项保持默认

部署完成后，记录你的 Vercel URL（例如：`https://blog-cms-oauth.vercel.app`）

#### 方法 B：通过 Vercel 网站

1. 访问：https://vercel.com
2. 使用 GitHub 登录
3. 点击 "Add New" → "Project"
4. 导入 `blog` 仓库
5. 项目设置：
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: （留空）
   - Output Directory: （留空）
6. 添加环境变量：
   - `GITHUB_CLIENT_ID`: 你的 Client ID
   - `GITHUB_CLIENT_SECRET`: 你的 Client Secret
   - `OAUTH_REDIRECT_URI`: `https://your-app.vercel.app/api/auth?provider=github`
   - `ADMIN_URL`: `https://xinyi-jane.github.io/blog/admin/`
7. 点击 "Deploy"

### 步骤 3：更新 GitHub OAuth App 回调 URL

1. 回到 GitHub OAuth App 设置页面
2. 更新 **Authorization callback URL** 为你的 Vercel URL：
   ```
   https://your-vercel-app.vercel.app/api/auth?provider=github
   ```
3. 保存更改

### 步骤 4：更新博客配置

编辑 `public/admin/config.yml`，将：
```yaml
base_url: https://your-vercel-app.vercel.app
```

替换为你的实际 Vercel URL：
```yaml
base_url: https://blog-cms-oauth.vercel.app
```

### 步骤 5：提交并部署

```bash
git add public/admin/config.yml
git commit -m "配置 OAuth base_url"
git push origin main
```

### 步骤 6：测试

1. 等待 GitHub Actions 部署完成（2-5分钟）
2. 访问：https://xinyi-jane.github.io/blog/admin/
3. 应该看到 "Login with GitHub" 按钮
4. 点击登录，授权后应该能看到 CMS 界面
5. 尝试创建新文章测试

## 故障排查

### 问题：无法登录
- 检查 Vercel 环境变量是否正确
- 检查 GitHub OAuth App 回调 URL 是否匹配
- 查看浏览器控制台错误

### 问题：登录后无法发布
- 检查仓库权限（确保有写入权限）
- 检查 `repo` 配置是否正确

## 完成！

配置完成后，你就可以通过 `/admin` 页面在线发布文章了！🎉

