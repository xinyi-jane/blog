# OAuth 配置完整指南

## 📋 所有相关文档

1. **`START_HERE.md`** ⭐ - **从这里开始**，最简洁的 3 步指南
2. **`QUICK_START_OAUTH.md`** - 快速配置指南（详细版）
3. **`OAUTH_CHECKLIST.md`** - 配置检查清单
4. **`OAUTH_CONFIG_STEPS.md`** - 完整配置步骤
5. **`ADMIN_TROUBLESHOOTING.md`** - 问题排查
6. **`setup-oauth.sh`** - 自动化配置脚本

## 🎯 推荐阅读顺序

1. 先看 **`START_HERE.md`**（最简洁）
2. 如果遇到问题，查看 **`OAUTH_CHECKLIST.md`**
3. 需要详细说明时，参考 **`QUICK_START_OAUTH.md`**

## ⚡ 快速命令

```bash
# 查看快速指南
cat START_HERE.md

# 运行自动化脚本
./setup-oauth.sh

# 部署到 Vercel
vercel --prod
```

## 🔑 关键信息

- **GitHub 仓库**: `xinyi-jane/blog`
- **博客 URL**: `https://xinyi-jane.github.io/blog/`
- **Admin URL**: `https://xinyi-jane.github.io/blog/admin/`
- **OAuth 回调 URL 格式**: `https://your-vercel-app.vercel.app/api/auth?provider=github`

## ✅ 配置完成后

- 可以通过 `/admin` 页面在线发布文章
- 支持上传图片
- 自动触发 GitHub Actions 部署

