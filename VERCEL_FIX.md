# Vercel 部署错误修复

## 问题

Vercel 部署出现 404: NOT_FOUND 错误。

## 原因

`api/auth/` 空目录可能与 `api/auth.js` 文件冲突，导致 Vercel 无法正确识别 Serverless Function。

## 已修复

- [x] 删除了 `api/auth/` 空目录
- [x] 确认 `api/auth.js` 文件存在且正确

## 重新部署

在终端执行：

```bash
cd /Users/xinyi/blog
vercel --prod
```

或者通过 Vercel Dashboard：
1. 访问：https://vercel.com/dashboard
2. 找到项目 `blog-cms-oauth`
3. 点击 "Redeploy" 或等待自动重新部署

## 验证

部署成功后，测试 OAuth 端点：
- 访问：`https://blog-cms-oauth.vercel.app/api/auth?provider=github`
- 应该会重定向到 GitHub 登录页面（如果环境变量已配置）

## 如果仍然失败

检查：
1. Vercel 环境变量是否已配置
2. `api/auth.js` 文件格式是否正确
3. Vercel Dashboard 中的部署日志

