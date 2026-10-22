# Chen3776 的个人主页

站点：[chen3776.github.io](https://chen3776.github.io/)

参考用户提供的 [Feng Hong 学术主页](https://feng-hong.github.io/research/) 的简洁排版：浅色背景、衬线正文、居中窄版、News 与 Research 两个分节。没有复制参考网站的文字、照片或论文内容。

目前保留昵称与 GitHub 链接，个人简介、照片、动态和研究内容均留空。页面仅使用 HTML 和 CSS，无脚本、外部字体或构建依赖。

## 修改内容

直接编辑 `index.html` 即可，文件中已标注各内容位置：

- `h1`：姓名或昵称。
- `biography`：个人简介，每段使用 `<p>内容</p>`。
- `contact`：联系方式与个人链接。
- `portrait-slot`：需要添加照片时，移除该元素的 `hidden` 属性，并放入 `<img src="./photo.jpg" alt="个人照片">`，将照片放在同目录。
- `news-list`：个人动态。
- `research-list`：论文或研究项目。

例如，News 中的一组真实动态可以使用：

```html
<div class="news-group">
  <div class="news-year">2026</div>
  <ul><li>在这里填写你的动态。</li></ul>
</div>
```

Research 中的一项真实成果可以使用：

```html
<h3 class="research-year">2026</h3>
<article class="publication">
  <h3>论文或项目标题</h3>
  <p>作者信息</p>
  <p class="venue">发表信息</p>
</article>
```

这些示例仅出现在说明文档中，没有添加到页面。

## 查看与更新

双击 `index.html` 可在浏览器中查看；或者在本目录运行 `python -m http.server 8000` 后访问 `http://localhost:8000`。

提交更新至 GitHub 仓库的 `main` 分支后，GitHub Pages 会重新发布。发布源保持为 **Deploy from a branch → main → /(root)**。

## 文件

- `index.html`：页面结构与个人内容。
- `styles.css`：布局与排版。
- `favicon.svg`：网页图标。
- `.nojekyll`：静态页面标记。

旧博客版本保留在 Git 提交历史中。
