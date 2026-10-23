# Pengyi Chen 的个人主页

站点：[chen3776.github.io](https://chen3776.github.io/)

沿用简洁的学术主页排版：个人简介与照片、News、Research。页面仅使用 HTML 和 CSS，无脚本、外部字体或构建依赖。

## 内容维护

直接编辑 `index.html`：

- `profile`：姓名、简介、教育经历、实习经历、邮箱和 GitHub。
- `news-list`：按年份分组的动态。
- `research-list`：在投稿件、已发表论文和参与项目。
- `footer`：最后更新时间。

照片位于 `assets/portrait.jpg`，版式在 `styles.css` 中调整。保留图片的替代文字和宽高属性。

2026 年 10 月的更新依据个人提供的最新简历，已发表论文另以 CVF 正式论文核对。两篇在投稿件标为 `Under review`；署名采用简写，不提供尚未确认的公开稿件链接。Innovator 作为参与项目展示。

## 查看与发布

双击 `index.html` 可预览。也可在本目录运行 `python -m http.server 8000`，访问 `http://localhost:8000`。

提交至 GitHub 仓库的 `main` 分支后，GitHub Pages 会重新发布。发布源为 **Deploy from a branch → main → /(root)**。

## 文件

- `index.html`：页面结构与个人内容。
- `styles.css`：布局与排版。
- `assets/portrait.jpg`：个人照片。
- `favicon.svg`：网页图标。
- `.nojekyll`：静态页面标记。

旧版本保留在 Git 提交历史中。
