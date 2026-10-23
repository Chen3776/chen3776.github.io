# Pengyi Chen 的个人主页

站点：[chen3776.github.io](https://chen3776.github.io/)

沿用简洁的学术主页排版：个人简介、News、Research，照片暂时留空。页面仅使用 HTML 和 CSS，无脚本、外部字体或构建依赖。

## 内容维护

直接编辑 `index.html`：

- `profile`：姓名、简介、教育经历、实习经历、邮箱和 GitHub。
- `news-list`：按年份分组的动态。
- `research-list`：在投稿件、已发表论文和参与项目。
- `footer`：最后更新时间。

照片区域 `portrait-slot` 当前隐藏且为空；以后添加照片时，移除 `hidden` 并加入图片元素。版式在 `styles.css` 中调整。

2026 年 10 月的更新依据个人提供的最新简历，已发表论文另以 CVF 正式论文核对。两篇在投稿件标为 `Under review`；署名采用简写，不提供尚未确认的公开稿件链接。Innovator 作为参与项目展示。

## 查看与发布

双击 `index.html` 可预览。也可在本目录运行 `python -m http.server 8000`，访问 `http://localhost:8000`。

提交至 GitHub 仓库的 `main` 分支后，GitHub Pages 会重新发布。发布源为 **Deploy from a branch → main → /(root)**。

## 文件

- `index.html`：页面结构与个人内容。
- `styles.css`：布局与排版。
- `favicon.svg`：网页图标。
- `.nojekyll`：静态页面标记。

旧版本保留在 Git 提交历史中。
