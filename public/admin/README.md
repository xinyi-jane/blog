# 内容管理后台使用说明

## 访问地址
访问 `/admin` 进入内容管理后台。

## 首次使用

### 1. 配置 GitHub OAuth（必须）

Decap CMS 使用 GitHub 作为后端，需要先配置 OAuth 才能使用。

**步骤：**
1. 在 GitHub 创建 OAuth App：https://github.com/settings/developers
2. 设置 Authorization callback URL 为你的 OAuth 代理地址
3. 部署 OAuth 代理服务（见项目根目录的 `OAUTH_SETUP.md`）
4. 更新 `config.yml` 中的 `repo` 和 `base_url`

### 2. 登录

1. 访问 `/admin`
2. 点击 "Login with GitHub"
3. 授权后即可使用

### 3. 创建内容

登录后，你会看到：
- **文章** 集合：点击 "New 文章" 按钮创建新文章
- **动态** 集合：点击 "New 动态" 按钮创建新动态

## 本地开发模式（可选）

如果你只是想测试 CMS 界面，可以临时使用 `proxy_backend`：

在 `config.yml` 中替换 backend 配置为：
```yaml
backend:
  name: proxy
  proxy_url: http://localhost:8081/api/v1
```

然后运行：
```bash
npx decap-server
```

## 常见问题

**Q: 看不到"新增"按钮？**
A: 需要先登录 GitHub。如果已登录但仍看不到，检查：
- `config.yml` 中的 `create: true` 是否设置
- 浏览器控制台是否有错误
- OAuth 配置是否正确

**Q: 登录失败？**
A: 检查 OAuth 代理服务是否正常运行，以及 `base_url` 配置是否正确。

