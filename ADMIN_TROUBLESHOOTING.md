# Admin 后台问题排查

## 无法发布新文章的原因

### 1. 当前配置问题

你的 `config.yml` 使用的是 **proxy 模式**，这只适用于本地开发。部署到 GitHub Pages 后，需要使用 **GitHub backend**。

### 2. 解决方案

#### 方案 A：配置 GitHub OAuth（推荐，用于生产环境）

1. **创建 GitHub OAuth App**
   - 访问：https://github.com/settings/developers
   - 点击 "New OAuth App"
   - Application name: 你的应用名称
   - Homepage URL: `https://xinyi-jane.github.io/blog/`
   - Authorization callback URL: `https://your-oauth-proxy.vercel.app/api/auth?provider=github`
   - 保存后记录 Client ID 和 Client Secret

2. **部署 OAuth 代理服务**
   - 按照 `OAUTH_SETUP.md` 的说明部署到 Vercel
   - 设置环境变量：
     - `GITHUB_CLIENT_ID`
     - `GITHUB_CLIENT_SECRET`
     - `OAUTH_REDIRECT_URI`

3. **更新 config.yml**
   ```yaml
   backend:
     name: github
     repo: xinyi-jane/blog
     branch: main
     base_url: https://your-oauth-proxy.vercel.app
     auth_endpoint: api/auth
   ```

4. **提交并推送**
   ```bash
   git add public/admin/config.yml
   git commit -m "配置 GitHub backend for CMS"
   git push origin main
   ```

#### 方案 B：本地开发模式（仅用于测试）

如果你想在本地测试 CMS 界面：

1. **启动 decap-server**
   ```bash
   npx decap-server
   ```

2. **使用 proxy 配置**
   在 `config.yml` 中使用：
   ```yaml
   backend:
     name: proxy
     proxy_url: http://localhost:8081/api/v1
   ```

3. **访问本地 admin**
   - http://localhost:4321/blog/admin/

**注意**：proxy 模式只能预览界面，无法真正保存到 GitHub。

### 3. 常见错误

**错误：无法加载 config.yml**
- 确保文件路径正确：`public/admin/config.yml`
- 检查 base 路径是否正确

**错误：Authentication failed**
- 检查 OAuth 配置是否正确
- 确保 OAuth 代理服务正常运行
- 检查浏览器控制台的错误信息

**错误：Repository not found**
- 检查 `repo` 配置是否正确（格式：`username/repo-name`）
- 确保你有仓库的写入权限

### 4. 验证步骤

1. 访问：https://xinyi-jane.github.io/blog/admin/
2. 应该看到登录界面（如果使用 GitHub backend）
3. 点击 "Login with GitHub"
4. 授权后应该能看到 CMS 界面
5. 尝试创建新文章

### 5. 临时解决方案

如果暂时无法配置 OAuth，你可以：

1. **直接在本地编辑文件**
   - 在 `src/content/posts/` 创建新的 `.md` 文件
   - 按照示例格式填写 frontmatter

2. **提交到 GitHub**
   ```bash
   git add src/content/posts/your-new-post.md
   git commit -m "添加新文章"
   git push origin main
   ```

3. **等待自动部署**
   - GitHub Actions 会自动构建并部署

## 需要帮助？

如果遇到问题，请检查：
1. 浏览器控制台的错误信息
2. GitHub Actions 的构建日志
3. OAuth 代理服务的日志（如果使用）

