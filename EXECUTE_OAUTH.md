# OAuth 配置执行步骤

## 当前状态检查

✅ Vercel CLI 已安装
✅ Git 仓库已配置: xinyi-jane/blog
✅ OAuth 代码已准备好

## 需要执行的步骤

### 步骤 1：创建 GitHub OAuth App（必须在浏览器中完成）

**这一步需要你在 GitHub 网站上操作：**

1. 打开浏览器，访问：https://github.com/settings/developers
2. 点击 "OAuth Apps" → "New OAuth App"
3. 填写：
   - **Application name**: `Blog CMS`
   - **Homepage URL**: `https://xinyi-jane.github.io/blog/`
   - **Authorization callback URL**: `https://blog-cms-oauth.vercel.app/api/auth?provider=github`
     - ⚠️ 注意：这个 URL 是临时的，部署 Vercel 后可能需要更新
4. 点击 "Register application"
5. **重要**：保存显示的 **Client ID**
6. 点击 "Generate a new client secret"，**保存 Client Secret**（只显示一次！）

**完成后，告诉我你的 Client ID 和 Client Secret，我继续下一步。**

### 步骤 2：部署到 Vercel

如果你已经登录 Vercel，我可以帮你部署。如果没有，需要先登录：

```bash
vercel login
```

然后运行：
```bash
vercel --prod
```

### 步骤 3：配置环境变量

部署完成后，需要在 Vercel 项目设置中添加环境变量。

## 快速执行命令

如果你想自己执行，可以运行：

```bash
# 1. 确保已登录 Vercel
vercel login

# 2. 部署（会提示输入项目名称等）
vercel --prod

# 3. 部署完成后，在 Vercel 网站设置环境变量
```

## 或者使用自动化脚本

运行：
```bash
./setup-oauth.sh
```

脚本会引导你完成所有步骤。

