# Chen3776 的个人博客

一个可以直接部署到 GitHub Pages 的中文博客。暖白与森林绿配色，支持手机浏览、深浅色切换、文章分类、正文搜索、独立文章链接及随记。没有外部字体、跟踪器、第三方脚本或依赖安装。

按照当前要求，文章和随记均为空，不包含虚构经历，也尚未放入简历。页面中的插图由 SVG 绘制。

## 本地查看

双击 `index.html` 即可打开。也可以在本目录打开终端，运行 `python -m http.server 8000`，然后访问 `http://localhost:8000`。

## 发布到 GitHub Pages

站点地址：**https://chen3776.github.io/**。代码仓库：[Chen3776/chen3776.github.io](https://github.com/Chen3776/chen3776.github.io)。以下说明可用于初次部署或之后重新配置。

1. 登录 GitHub 账号 `Chen3776`，创建公开仓库，仓库名填写 **`chen3776.github.io`**。如果你已有同名仓库，先查看并保留其中现有内容。
2. 将本文件夹里面的文件上传到仓库根目录，保证根目录有 `index.html`、`styles.css`、`script.js`、`site-data.js` 和 `favicon.svg`。**不要把 `personal-website` 整个文件夹套在外面。**
3. `.nojekyll` 是随包提供的空文件。如果网页上传界面没显示它，可以在 GitHub 的 Add file → Create new file 中手动创建，文件名填 `.nojekyll`，内容留空或填一个换行。
4. 打开仓库 **Settings → Pages**。
5. 在 **Build and deployment** 下，将 **Source** 设为 **Deploy from a branch**。
6. 将 **Branch** 设为 **main**，目录设为 **/(root)**，点击 **Save**。
7. 等待发布完成，点击 Pages 页面中的 **Visit site**。以 GitHub 显示的实际部署结果为准，更新可能需要约 10 分钟。

这是分支发布方式，无需自行编写 GitHub Actions 工作流。GitHub Free 的 Pages 可用于公开仓库；公开仓库里的源码也会公开。本站使用相对资源路径，同样可以放在普通项目仓库的子路径下。

官方说明：[创建站点](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) · [启用 HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

## 修改介绍和联系方式

编辑 `site-data.js`：

- `name`：名字或昵称。
- `title` / `description`：浏览器标题和页面简介。
- `intro` / `about`：首页文案与关于介绍；`\n` 表示换行。
- `github`：GitHub 个人页地址。
- `email`：邮箱；留空时隐藏邮件入口。
- `resume`：简历路径；需要公开简历时把 PDF 放到 `assets/resume.pdf`，再填写 `"./assets/resume.pdf"`。目前没有附带简历文件。
- `categories`：文章分类。

页头的主标题与插图文字在 `index.html` 中修改；配色和排版在 `styles.css` 中修改。

## 添加文章

把 `site-data.js` 中的 `posts: []` 换成下面的结构，或在数组内继续增加文章对象。以下仅为写法示例，没有加入实际页面。

```js
posts: [
  {
    id: "my-first-post", // 每篇文章的 id 必须唯一，建议使用英文和短横线
    title: "我的第一篇文章",
    date: "2026-10-22", // YYYY-MM-DD；文章按日期从新到旧排列
    category: "思考",
    excerpt: "一句简短的文章摘要。",
    tags: ["记录", "开始"],
    content: [
      "这是第一段正文。直接输入文字即可。",
      { type: "heading", text: "一个小标题" },
      "这是第二段正文。",
      { type: "quote", text: "一段想记下的话。" },
      { type: "list", items: ["第一点", "第二点"] },
      { type: "code", text: "console.log('Hello, world!');" },
      { type: "link", text: "参考链接", url: "https://github.com/Chen3776" }
    ]
  }
],
```

每篇文章支持分享链接，例如 `https://chen3776.github.io/#post/my-first-post`。读取链接会直接打开文章；按 Esc、点关闭按钮或点击遮罩可返回。标题、摘要、分类、标签与正文都可搜索。

正文目前使用上面的结构化文本格式，不解析 Markdown 或 HTML；链接请使用 `type: "link"`。这是面向轻量个人博客的静态实现，文章没有单独生成的 HTML 页面或独立社交分享卡片。

## 添加随记

```js
notes: [
  { date: "2026-10-22", text: "今天想记下的一件小事。" }
]
```

更新后保存文件，在 GitHub 提交到 `main` 分支，等待 Pages 重新发布即可。若新增文章后没有出现，先检查英文引号、逗号和括号是否成对。

## 文件说明

```text
index.html          页面结构
styles.css          主题与响应式布局
script.js           搜索、筛选、阅读与主题交互
site-data.js        介绍、文章和随记内容
favicon.svg         网站图标
.nojekyll           GitHub Pages 静态文件标记
README.md           使用与发布说明
```
