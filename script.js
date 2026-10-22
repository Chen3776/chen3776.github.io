(() => {
  "use strict";

  const data = window.SITE_DATA || {};
  const $ = (selector) => document.querySelector(selector);
  const text = (selector, value) => { if (value != null) $(selector).textContent = value; };
  const node = (tag, className, value) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value != null) element.textContent = value;
    return element;
  };
  const safeUrl = (value, allowRelative = false) => {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      if (url.protocol === "https:" || url.protocol === "http:") return url.href;
      if (allowRelative && url.protocol === "file:" && /^\.\//.test(value)) return url.href;
    } catch { /* Invalid optional URLs remain hidden. */ }
    return null;
  };
  const formatDate = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return value || "";
    const [year, month, day] = value.split("-");
    return `${year}.${month}.${day}`;
  };
  const dated = (value) => {
    const element = node("time", "", formatDate(value));
    if (/^\d{4}-\d{2}-\d{2}$/.test(value || "")) element.dateTime = value;
    return element;
  };
  const blocksText = (blocks) => (blocks || []).map((block) => typeof block === "string" ? block : [block.text || "", ...(block.items || [])].join(" ")).join(" ");
  const posts = (Array.isArray(data.posts) ? data.posts : []).filter(post => post && post.id && post.title).sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  const notes = (Array.isArray(data.notes) ? data.notes : []).filter(note => note && note.text).sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

  document.title = data.title || "Chen3776 · 个人博客";
  if (data.description) $('meta[name="description"]').content = data.description;
  ["#brand", "#person-name", "#footer-name"].forEach(selector => text(selector, data.name));
  text("#intro", data.intro);
  text("#about-description", data.about);
  text("#year", new Date().getFullYear());
  const githubUrl = safeUrl(data.github);
  if (githubUrl) document.querySelectorAll('a[href="https://github.com/Chen3776"]').forEach(link => { link.href = githubUrl; });
  const resumeUrl = safeUrl(data.resume, true);
  if (resumeUrl) {
    $("#resume-link").href = resumeUrl;
    $("#resume-link").target = "_blank";
    $("#resume-link").rel = "noopener noreferrer";
    $("#resume-link").hidden = false;
  }
  if (typeof data.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    $("#email-link").href = `mailto:${encodeURIComponent(data.email)}`;
    $("#email-link").hidden = false;
  }

  // A visitor's explicit choice takes precedence over their system theme.
  const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  let storedTheme;
  try { storedTheme = localStorage.getItem("chen-blog-theme"); } catch { /* File previews and private modes may restrict storage. */ }
  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const label = theme === "dark" ? "切换到浅色模式" : "切换到深色模式";
    $(".theme-button").setAttribute("aria-label", label);
    $(".theme-button").title = label;
    $('meta[name="theme-color"]').content = theme === "dark" ? "#18251f" : "#f5f5ef";
  };
  setTheme(["light", "dark"].includes(storedTheme) ? storedTheme : themeMedia.matches ? "dark" : "light");
  $(".theme-button").addEventListener("click", () => {
    storedTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(storedTheme);
    try { localStorage.setItem("chen-blog-theme", storedTheme); } catch { /* Theme still changes for this page. */ }
  });
  themeMedia.addEventListener("change", event => { if (!storedTheme) setTheme(event.matches ? "dark" : "light"); });

  const menuButton = $(".menu-button");
  const menu = $("#mobile-nav");
  const closeMenu = () => {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "展开导航");
  };
  menuButton.addEventListener("click", () => {
    const open = menu.hidden;
    menu.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "关闭导航" : "展开导航");
  });
  menu.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("click", event => { if (!event.target.closest(".header")) closeMenu(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !menu.hidden) { closeMenu(); menuButton.focus(); } });
  window.matchMedia("(min-width: 641px)").addEventListener("change", event => { if (event.matches) closeMenu(); });

  let activeCategory = "全部";
  const categories = ["全部", ...new Set([...(data.categories || []), ...posts.map(post => post.category)].filter(category => category && category !== "全部"))];
  const filters = $("#filters");
  categories.forEach(category => {
    const button = node("button", `filter${category === "全部" ? " active" : ""}`, category);
    button.type = "button";
    button.dataset.category = category;
    button.setAttribute("aria-pressed", String(category === "全部"));
    button.addEventListener("click", () => {
      activeCategory = category;
      filters.querySelectorAll("button").forEach(item => {
        const active = item.dataset.category === category;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderPosts();
    });
    filters.append(button);
  });

  const renderPosts = () => {
    const query = $("#article-search").value.trim().toLocaleLowerCase();
    const visiblePosts = posts.filter(post => {
      const searchText = [post.title, post.excerpt, post.category, ...(post.tags || []), blocksText(post.content)].join(" ").toLocaleLowerCase();
      return (activeCategory === "全部" || post.category === activeCategory) && (!query || searchText.includes(query));
    });
    const list = $("#article-list");
    list.replaceChildren();
    visiblePosts.forEach(post => {
      const article = node("article", "article-item");
      const link = node("a", "article-link");
      link.href = `#post/${encodeURIComponent(post.id)}`;
      const meta = node("div", "article-meta");
      meta.append(node("span", "article-category", post.category || "文章"), dated(post.date));
      const bottom = node("div", "article-bottom");
      const tags = node("div", "tags");
      (post.tags || []).forEach(tag => tags.append(node("span", "", tag)));
      const arrow = node("span", "article-arrow", "↗");
      arrow.setAttribute("aria-hidden", "true");
      bottom.append(tags, arrow);
      link.append(meta, node("h3", "article-title", post.title), node("p", "article-excerpt", post.excerpt || ""), bottom);
      article.append(link);
      list.append(article);
    });
    const initialEmpty = posts.length === 0 && !query && activeCategory === "全部";
    $("#empty-articles").hidden = !initialEmpty;
    $("#no-results").hidden = visiblePosts.length > 0 || initialEmpty;
    text("#article-count", `${visiblePosts.length} 篇文章`);
    text("#filter-status", `${activeCategory}分类，找到 ${visiblePosts.length} 篇文章`);
  };
  $("#article-search").addEventListener("input", renderPosts);
  text("#archive-count", posts.length ? `${posts.length} 篇 · 慢慢积累` : "0 篇 · 从这里开始");
  renderPosts();

  const notesList = $("#notes-list");
  notes.forEach(note => {
    const article = node("article", "note-item");
    article.append(dated(note.date), node("p", "", note.text));
    notesList.append(article);
  });
  $("#empty-notes").hidden = notes.length > 0;

  // Article blocks use text nodes so content is never interpreted as executable HTML.
  const renderContent = (blocks) => {
    const container = $("#dialog-body");
    container.replaceChildren();
    (blocks || []).forEach(block => {
      if (typeof block === "string") { container.append(node("p", "", block)); return; }
      if (!block || typeof block !== "object") return;
      if (block.type === "list") {
        const list = node(block.ordered ? "ol" : "ul");
        (block.items || []).forEach(item => list.append(node("li", "", item)));
        container.append(list);
      } else if (block.type === "code") {
        const pre = node("pre");
        pre.append(node("code", "", block.text));
        container.append(pre);
      } else if (block.type === "link") {
        const url = safeUrl(block.url);
        if (!url) return;
        const paragraph = node("p");
        const link = node("a", "", block.text || url);
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        paragraph.append(link);
        container.append(paragraph);
      } else {
        const tag = block.type === "heading" ? "h3" : block.type === "quote" ? "blockquote" : "p";
        container.append(node(tag, "", block.text || ""));
      }
    });
  };
  const dialog = $("#article-dialog");
  const baseTitle = document.title;
  const closeArticle = () => { if (dialog.open) dialog.close(); };
  const syncRoute = () => {
    if (!location.hash.startsWith("#post/")) { closeArticle(); return; }
    let id;
    try { id = decodeURIComponent(location.hash.slice(6)); } catch { return; }
    const post = posts.find(item => String(item.id) === id);
    if (!post) { closeArticle(); return; }
    text("#dialog-title", post.title);
    text("#dialog-meta", [post.category || "文章", formatDate(post.date)].filter(Boolean).join(" / "));
    renderContent(post.content);
    document.title = `${post.title} · ${data.name || "个人博客"}`;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("dialog-open");
  };
  $(".dialog-close").addEventListener("click", closeArticle);
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeArticle();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    document.title = baseTitle;
    if (location.hash.startsWith("#post/")) history.replaceState(null, "", `${location.pathname}${location.search}#writing`);
  });
  window.addEventListener("hashchange", syncRoute);
  syncRoute();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.desktop-nav a[href^="#"]').forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-18% 0px -55% 0px", threshold: 0 });
    ["writing", "notes", "about"].forEach(id => observer.observe(document.getElementById(id)));
  }
})();
