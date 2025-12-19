# OAuth 配置步骤（详细版）

## 步骤 1：创建 GitHub OAuth App

1. **访问 GitHub 开发者设置**
   - 打开：https://github.com/settings/developers
   - 点击左侧 "OAuth Apps"
   - 点击 "New OAuth App"

2. **填写 OAuth App 信息**
   - **Application name**: `Blog CMS`（或任何你喜欢的名称）
   - **Homepage URL**: `https://xinyi-jane.github.io/blog/`
   - **Authorization callback URL**: `https://blog-cms-oauth.vercel.app/api/auth?provider=github`
     - ⚠️ 注意：这个 URL 需要等 Vercel 部署后才能确定，可以先填一个临时地址，稍后更新
   - 点击 "Register application"

3. **记录凭证**
   - 保存页面显示的 **Client ID**
   - 点击 "Generate a new client secret" 生成并保存 **Client Secret**
   - ⚠️ Client Secret 只显示一次，请妥善保存

## 步骤 2：部署 OAuth 代理到 Vercel

### 方法 A：使用 Vercel CLI（推荐）

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署 OAuth 代理**
   ```bash
   cd /Users/xinyi/blog
   vercel --prod
   ```
   - 按照提示操作
   - 项目名称建议：`blog-cms-oauth`
   - 记录部署后的 URL（例如：`https://blog-cms-oauth.vercel.app`）

### 方法 B：通过 Vercel 网站

1. **访问 Vercel**
   - 打开：https://vercel.com
   - 使用 GitHub 账号登录

2. **创建新项目**
   - 点击 "Add New" → "Project"
   - 导入你的 `blog` 仓库
   - 项目名称：`blog-cms-oauth`（或任何你喜欢的名称）

3. **配置项目**
   - Framework Preset: Other
   - Root Directory: `./`（保持默认）
   - Build Command: 留空（不需要构建）
   - Output Directory: 留空

4. **添加环境变量**
   在项目设置中添加：
   - `GITHUB_CLIENT_ID`: 你的 Client ID
   - `GITHUB_CLIENT_SECRET`: 你的 Client Secret
   - `OAUTH_REDIRECT_URI`: `https://blog-cms-oauth.vercel.app/api/auth?provider=github`
   - `ADMIN_URL`: `https://xinyi-jane.github.io/blog/admin/`

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成
   - 记录部署后的 URL

## 步骤 3：更新 GitHub OAuth App 回调 URL

1. 回到 GitHub OAuth App 设置页面
2. 更新 **Authorization callback URL** 为你的 Vercel 应用 URL：
   ```
   https://your-vercel-app.vercel.app/api/auth?provider=github
   ```
3. 保存更改

## 步骤 4：更新博客配置

1. **更新 `public/admin/config.yml`**
   ```yaml
   backend:
     name: github
     repo: xinyi-jane/blog
     branch: main
     base_url: https://your-vercel-app.vercel.app
     auth_endpoint: api/auth
   ```
   将 `your-vercel-app.vercel.app` 替换为你的实际 Vercel 应用地址

2. **提交并推送**
   ```bash
   git add public/admin/config.yml
   git commit -m "配置 OAuth for CMS"
   git push origin main
   ```

## 步骤 5：测试

1. **等待部署完成**（通常 2-5 分钟）

2. **访问 Admin 页面**
   - 打开：https://xinyi-jane.github.io/blog/admin/

3. **登录测试**
   - 应该看到 "Login with GitHub" 按钮
   - 点击后重定向到 GitHub 授权页面
   - 授权后返回 CMS 后台
   - 应该能看到 "New 文章" 和 "New 动态" 按钮

## 故障排查

### 问题 1：无法加载 config.yml
- 检查文件路径是否正确
- 确保已提交并推送到 GitHub

### 问题 2：OAuth 认证失败
- 检查 Vercel 环境变量是否正确设置
- 检查 GitHub OAuth App 的回调 URL 是否匹配
- 查看浏览器控制台的错误信息

### 问题 3：登录后无法发布
- 检查 GitHub 仓库权限（确保有写入权限）
- 检查 `repo` 配置是否正确（格式：`username/repo-name`）

## 完成！

配置完成后，你就可以通过 `/admin` 页面在线发布文章了！🎉

