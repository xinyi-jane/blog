# 部署检查清单

## ✅ 已完成的配置

- [x] Astro 项目配置正确
- [x] `base` 路径已设置为 `/blog/`（仓库名不是 username.github.io 时需要）
- [x] `site` URL 已设置为 `https://xinyi-jane.github.io`
- [x] GitHub Actions 工作流文件已创建
- [x] 构建测试通过（`npm run build` 成功）
- [x] Git 仓库已初始化
- [x] 远程仓库已配置

## 📋 部署前检查

### 1. 确认仓库信息
- 仓库名：`blog`
- GitHub 用户名：`xinyi-jane`
- 网站 URL：`https://xinyi-jane.github.io/blog/`

### 2. 确认配置
```js
// astro.config.mjs
site: 'https://xinyi-jane.github.io',
base: '/blog/',  // ✅ 已正确配置（末尾有斜杠）
```

### 3. 推送代码到 GitHub
```bash
git add .
git commit -m "准备部署"
git push origin main
```

### 4. 启用 GitHub Pages
1. 访问：https://github.com/xinyi-jane/blog/settings/pages
2. 在 "Source" 部分选择：**GitHub Actions**（不是 "Deploy from a branch"）
3. 保存设置

### 5. 检查部署状态
1. 访问：https://github.com/xinyi-jane/blog/actions
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待构建完成（通常 2-5 分钟）

### 6. 验证网站
部署成功后访问：
- 主页：https://xinyi-jane.github.io/blog/
- 生活频道：https://xinyi-jane.github.io/blog/life/
- 工作频道：https://xinyi-jane.github.io/blog/work/
- 动态：https://xinyi-jane.github.io/blog/updates/

## ⚠️ 常见问题

### 问题 1：404 错误
**原因**：`base` 路径配置错误
**解决**：确保 `base: '/blog/'`（末尾有斜杠）

### 问题 2：样式不显示
**原因**：资源路径错误
**解决**：检查 `base` 配置，确保所有资源路径正确

### 问题 3：构建失败
**原因**：依赖问题或配置错误
**解决**：
1. 检查 GitHub Actions 日志
2. 本地运行 `npm run build` 测试
3. 确保 `package.json` 中的依赖都正确

### 问题 4：GitHub Pages 显示 "Deploy from a branch"
**解决**：必须选择 "GitHub Actions"，否则不会自动部署

## 🎯 部署后验证

- [ ] 网站可以正常访问
- [ ] 所有页面都能正常显示
- [ ] 样式和图片正常加载
- [ ] 导航链接正常工作
- [ ] RSS feed 可以访问：https://xinyi-jane.github.io/blog/rss.xml

## 📝 后续更新

每次更新内容后：
```bash
git add .
git commit -m "更新内容"
git push origin main
```

GitHub Actions 会自动重新构建并部署。

