# 配置更新模板

## 更新 config.yml 中的 OAuth 配置

当你部署了 Vercel OAuth 代理服务后，需要更新 `public/admin/config.yml`：

### 步骤 1：找到你的 Vercel 应用 URL

部署完成后，Vercel 会给你一个 URL，例如：
- `https://blog-cms-oauth.vercel.app`
- `https://your-project-name.vercel.app`

### 步骤 2：更新配置

编辑 `public/admin/config.yml`，将：
```yaml
base_url: https://your-vercel-app.vercel.app
```

替换为你的实际 Vercel URL：
```yaml
base_url: https://blog-cms-oauth.vercel.app
```

### 步骤 3：提交并推送

```bash
git add public/admin/config.yml
git commit -m "更新 OAuth base_url 配置"
git push origin main
```

### 步骤 4：验证

1. 等待 GitHub Actions 部署完成（2-5 分钟）
2. 访问：https://xinyi-jane.github.io/blog/admin/
3. 应该能看到 "Login with GitHub" 按钮
4. 点击登录测试

## 当前配置状态

- ✅ GitHub backend 已配置
- ✅ repo 已设置为 `xinyi-jane/blog`
- ⚠️ `base_url` 需要更新为你的 Vercel 应用地址
- ✅ `auth_endpoint` 已设置为 `api/auth`

