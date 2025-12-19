#!/bin/bash

# OAuth 配置辅助脚本
# 这个脚本会引导你完成 OAuth 配置

echo "🚀 OAuth 配置向导"
echo "=================="
echo ""

# 检查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "📋 配置步骤："
echo ""
echo "1. 创建 GitHub OAuth App"
echo "   - 访问: https://github.com/settings/developers"
echo "   - 点击 'New OAuth App'"
echo "   - 填写以下信息："
echo "     * Application name: Blog CMS"
echo "     * Homepage URL: https://xinyi-jane.github.io/blog/"
echo "     * Authorization callback URL: (稍后填写，先填临时地址)"
echo ""
read -p "按 Enter 继续..."

echo ""
echo "2. 记录 OAuth 凭证"
echo "   - 保存 Client ID"
echo "   - 生成并保存 Client Secret"
echo ""
read -p "请输入你的 GitHub Client ID: " CLIENT_ID
read -p "请输入你的 GitHub Client Secret: " CLIENT_SECRET

echo ""
echo "3. 部署到 Vercel"
echo "   正在启动 Vercel 部署..."
echo ""

# 检查是否已登录 Vercel
if ! vercel whoami &> /dev/null; then
    echo "请先登录 Vercel..."
    vercel login
fi

# 部署
echo "开始部署..."
vercel --prod --yes

# 获取部署后的 URL
VERCEL_URL=$(vercel ls | grep -o 'https://[^ ]*\.vercel\.app' | head -1)

if [ -z "$VERCEL_URL" ]; then
    echo "⚠️  无法自动获取 Vercel URL，请手动输入："
    read -p "请输入你的 Vercel 应用 URL (例如: https://blog-cms-oauth.vercel.app): " VERCEL_URL
fi

echo ""
echo "✅ Vercel 部署完成: $VERCEL_URL"
echo ""

# 设置环境变量
echo "4. 配置 Vercel 环境变量"
echo "   访问: https://vercel.com/dashboard"
echo "   在项目设置中添加以下环境变量："
echo "   - GITHUB_CLIENT_ID: $CLIENT_ID"
echo "   - GITHUB_CLIENT_SECRET: $CLIENT_SECRET"
echo "   - OAUTH_REDIRECT_URI: $VERCEL_URL/api/auth?provider=github"
echo "   - ADMIN_URL: https://xinyi-jane.github.io/blog/admin/"
echo ""
read -p "配置完环境变量后，按 Enter 继续..."

# 更新 GitHub OAuth App 回调 URL
echo ""
echo "5. 更新 GitHub OAuth App 回调 URL"
echo "   - 访问: https://github.com/settings/developers"
echo "   - 编辑你的 OAuth App"
echo "   - 更新 Authorization callback URL 为: $VERCEL_URL/api/auth?provider=github"
echo ""
read -p "更新完成后，按 Enter 继续..."

# 更新 config.yml
echo ""
echo "6. 更新 config.yml"
sed -i.bak "s|base_url: https://your-vercel-app.vercel.app|base_url: $VERCEL_URL|g" public/admin/config.yml

echo "✅ 已更新 public/admin/config.yml"
echo ""

# 显示下一步
echo "📝 下一步："
echo "1. 检查 public/admin/config.yml 中的 base_url 是否正确"
echo "2. 提交更改:"
echo "   git add public/admin/config.yml"
echo "   git commit -m '配置 OAuth base_url'"
echo "   git push origin main"
echo ""
echo "3. 等待部署完成后，访问: https://xinyi-jane.github.io/blog/admin/"
echo "   测试登录功能"
echo ""

