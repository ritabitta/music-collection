const navFallback = `
<header class="site-header">
  <a class="brand" href="index.html">MY MUSIC <strong>VAULT</strong></a>
  <nav class="primary-nav" aria-label="主导航">
    <a href="index.html">首页</a>
    <a href="albums.html">专辑收藏</a>
    <a href="artists.html">艺人介绍</a>
    <a href="about.html">关于我</a>
  </nav>
</header>`;

const footerFallback = `
<footer class="site-footer">
  <p>My Music Vault · 把喜欢的声音，好好收藏。</p>
  <a href="index.html">返回首页 ↑</a>
</footer>`;

async function insertPart(placeholderId, fileName, fallbackHTML) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  try {
    const response = await fetch(fileName);
    if (!response.ok) throw new Error("无法加载页面片段");
    placeholder.innerHTML = await response.text();
  } catch {
    // 直接双击打开 index.html 时也能显示导航和页脚
    placeholder.innerHTML = fallbackHTML;
  }
}

Promise.all([
  insertPart("nav-placeholder", "nav.html", navFallback),
  insertPart("footer-placeholder", "footer.html", footerFallback)
]);