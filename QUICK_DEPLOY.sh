#!/bin/bash

# 快速部署脚本
# 使用方法: ./QUICK_DEPLOY.sh

echo "🚀 开始部署到 GitHub Pages..."
echo ""

# 检查是否已初始化 git
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    echo "✅ Git 仓库初始化完成"
    echo ""
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 检测到未提交的更改，正在添加..."
    git add .
    echo ""
    read -p "请输入提交信息 (默认: Update blog): " commit_msg
    commit_msg=${commit_msg:-"Update blog"}
    git commit -m "$commit_msg"
    echo "✅ 更改已提交"
    echo ""
fi

# 检查远程仓库
if ! git remote | grep -q "origin"; then
    echo "⚠️  未检测到远程仓库"
    echo ""
    read -p "请输入你的 GitHub 仓库地址 (例如: https://github.com/username/repo.git): " repo_url
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo "✅ 远程仓库已添加"
        echo ""
    else
        echo "❌ 未提供仓库地址，退出"
        exit 1
    fi
fi

# 检查分支
current_branch=$(git branch --show-current)
if [ -z "$current_branch" ]; then
    git branch -M main
    current_branch="main"
fi

echo "📤 推送到 GitHub..."
git push -u origin "$current_branch"

echo ""
echo "✅ 代码已推送到 GitHub！"
echo ""
echo "📋 下一步："
echo "1. 访问你的 GitHub 仓库"
echo "2. 进入 Settings > Pages"
echo "3. 在 Source 中选择 'GitHub Actions'"
echo "4. 等待自动部署完成（通常 2-5 分钟）"
echo ""
echo "🌐 部署完成后，访问: https://yourusername.github.io"
echo ""

