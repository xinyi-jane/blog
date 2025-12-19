# OAuth 设置指南

由于 GitHub Pages 是纯静态托管，无法运行后端服务，因此需要单独部署 OAuth 代理服务来支持 Decap CMS 的 GitHub 认证。

## 方案选择

### 方案 1：使用 Netlify（最简单）

如果你使用 Netlify 部署，可以直接使用 Netlify Identity，无需额外配置。

### 方案 2：使用 Vercel（推荐）

1. **创建 Vercel 项目**
   - 在 Vercel 创建新项目
   - 连接你的 GitHub 仓库
   - 项目根目录设置为 `blog/`（如果仓库根目录就是博客项目）

2. **配置环境变量**
   在 Vercel 项目设置中添加：
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `OAUTH_REDIRECT_URI`（例如：`https://your-app.vercel.app/api/auth?provider=github`）

3. **创建 GitHub OAuth App**
   - 访问 https://github.com/settings/developers
   - 点击 "New OAuth App"
   - Application name: 你的应用名称
   - Homepage URL: 你的博客 URL
   - Authorization callback URL: `https://your-app.vercel.app/api/auth?provider=github`
   - 保存后记录 Client ID 和 Client Secret

4. **更新 CMS 配置**
   编辑 `public/admin/config.yml`：
   ```yaml
   backend:
     name: github
     repo: yourusername/your-repo
     branch: main
     base_url: https://your-app.vercel.app
     auth_endpoint: api/auth
   ```

### 方案 3：使用 Cloudflare Workers

类似 Vercel，将 `api/auth.js` 适配为 Cloudflare Workers 格式。

## 注意事项

- OAuth 代理服务必须与你的博客部署在不同的域名（因为 GitHub Pages 不能运行后端）
- 确保 OAuth App 的回调 URL 与代理服务的地址匹配
- Decap CMS 使用 GitHub backend 时，会通过代理服务进行认证

## 测试

1. 访问 `/admin`
2. 点击 "Login with GitHub"
3. 应该会重定向到 GitHub 进行授权
4. 授权后返回 CMS 后台

如果遇到问题，检查：
- 环境变量是否正确配置
- OAuth App 的回调 URL 是否正确
- 代理服务的 URL 是否可访问

