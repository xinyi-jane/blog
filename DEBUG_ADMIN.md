# 管理界面调试指南

## 问题：登录后仍然显示登录界面

### 调试步骤

1. **打开浏览器开发者工具（F12）**

2. **检查 Console 标签**
   - 查看是否有 "Token found in URL" 或 "Token saved to localStorage" 的日志
   - 查看是否有任何错误信息

3. **检查 Application/存储标签**
   - 查看 Local Storage
   - 查找 `netlify-cms-user` 键
   - 如果存在，查看其值是否为：`{"token":"xxx","backend":"github"}`

4. **检查 Network 标签**
   - 刷新页面
   - 查看是否有失败的请求
   - 特别关注 `/admin/config.yml` 的请求

5. **手动测试 token 保存**
   在浏览器控制台执行：
   ```javascript
   // 检查当前 token
   const user = localStorage.getItem('netlify-cms-user');
   console.log('Current user:', user);
   
   // 如果有 token，尝试手动设置
   const testToken = 'YOUR_TOKEN_HERE'; // 从 URL 参数中获取
   localStorage.setItem('netlify-cms-user', JSON.stringify({
     token: testToken,
     backend: 'github'
   }));
   window.location.reload();
   ```

6. **检查 URL 参数**
   - 登录后，查看 URL 是否包含 `?token=...`
   - 如果包含，复制 token 值
   - 手动在控制台执行上面的代码

### 可能的问题

1. **Token 没有从 URL 中读取**
   - 检查 OAuth 回调是否正确重定向
   - 检查 URL 中是否包含 token

2. **Token 格式不正确**
   - Decap CMS 期望的格式：`{"token":"xxx","backend":"github"}`
   - 确保 JSON 格式正确

3. **Decap CMS 没有读取 token**
   - 可能需要特定的初始化方式
   - 检查 Decap CMS 版本

4. **CORS 或安全策略问题**
   - 检查浏览器控制台的 CORS 错误
   - 检查是否有 Content Security Policy 错误

### 临时解决方案

如果上述方法都不行，可以尝试：

1. **使用代理模式（仅用于测试）**
   在 `config.yml` 中临时切换到代理模式：
   ```yaml
   backend:
     name: proxy
     proxy_url: http://localhost:8081/api/v1
   ```
   然后运行：`npx decap-server`

2. **检查 Vercel 部署**
   - 确认 OAuth 代理服务正常运行
   - 检查 Vercel 日志是否有错误

3. **检查 GitHub OAuth App 配置**
   - 确认回调 URL 正确
   - 确认 Client ID 和 Secret 正确

