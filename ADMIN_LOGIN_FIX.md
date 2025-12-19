# 管理界面登录问题修复

## 已修复的问题

1. ✅ **图片路径修复**
   - `public_folder` 从 `/images` 改为 `/blog/images`
   - 确保图片路径与 base URL 匹配

2. ✅ **简化 admin 页面**
   - 移除了可能干扰的 token 处理代码
   - 让 Decap CMS 自动处理 OAuth token

## 如果登录后仍然显示登录界面

### 步骤 1：清除浏览器缓存和存储

1. 打开浏览器开发者工具（按 `F12`）
2. 进入 **Application**（Chrome）或 **存储**（Firefox）标签
3. 清除以下内容：
   - **Local Storage** - 删除所有项
   - **Session Storage** - 删除所有项
   - **Cookies** - 删除所有项
4. 刷新页面（`Ctrl+F5` 或 `Cmd+Shift+R` 强制刷新）

### 步骤 2：检查浏览器控制台

1. 打开开发者工具（`F12`）
2. 进入 **Console** 标签
3. 查看是否有红色错误信息
4. 常见错误：
   - `Failed to load config.yml` - 检查文件路径
   - `Authentication failed` - 检查 OAuth 配置
   - `Repository not found` - 检查 repo 配置

### 步骤 3：验证 OAuth 配置

1. **检查 Vercel 环境变量**
   - 访问：https://vercel.com/dashboard
   - 选择项目 `blog-cms-oauth`
   - 进入 Settings → Environment Variables
   - 确认以下变量已设置：
     - `GITHUB_CLIENT_ID`
     - `GITHUB_CLIENT_SECRET`
     - `OAUTH_REDIRECT_URI`（可选）
     - `ADMIN_URL`（可选）

2. **检查 GitHub OAuth App**
   - 访问：https://github.com/settings/developers
   - 确认 OAuth App 的回调 URL 为：
     ```
     https://blog-cms-oauth.vercel.app/api/auth?provider=github
     ```

3. **检查 config.yml**
   - 文件路径：`public/admin/config.yml`
   - 确认以下配置正确：
     ```yaml
     backend:
       name: github
       repo: xinyi-jane/blog
       branch: main
       base_url: https://blog-cms-oauth.vercel.app
       auth_endpoint: api/auth
     ```

### 步骤 4：测试 OAuth 流程

1. 访问：`https://blog-cms-oauth.vercel.app/api/auth?provider=github`
2. 应该会重定向到 GitHub 登录页面
3. 登录后应该会重定向回 admin 页面，URL 中应该包含 `?token=...`

### 步骤 5：检查网络请求

1. 打开开发者工具（`F12`）
2. 进入 **Network** 标签
3. 尝试登录
4. 查看是否有失败的请求（红色）
5. 特别关注：
   - `/admin/config.yml` - 应该返回 200
   - OAuth 相关的请求

## 常见问题

### Q: 登录后立即跳回登录界面

**可能原因：**
- Token 没有正确保存
- config.yml 路径错误
- OAuth 配置错误

**解决方案：**
1. 清除浏览器存储（见步骤 1）
2. 检查浏览器控制台错误
3. 确认 config.yml 可以正常访问

### Q: 看不到 "Login with GitHub" 按钮

**可能原因：**
- Decap CMS 没有正确加载
- config.yml 无法访问

**解决方案：**
1. 检查浏览器控制台是否有错误
2. 确认 `/admin/config.yml` 可以正常访问
3. 检查网络请求是否成功

### Q: 点击登录后没有反应

**可能原因：**
- OAuth 代理服务未运行
- base_url 配置错误

**解决方案：**
1. 测试 OAuth 端点：`https://blog-cms-oauth.vercel.app/api/auth?provider=github`
2. 检查 Vercel 部署状态
3. 确认 base_url 配置正确

## 需要帮助？

如果以上步骤都无法解决问题，请提供：
1. 浏览器控制台的错误信息
2. Network 标签中的失败请求
3. 当前使用的浏览器和版本

