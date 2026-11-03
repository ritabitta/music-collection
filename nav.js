const navFallback = `
<header class="site-header">
  <a class="brand" href="index.html">MY MUSIC <strong>VAULT</strong></a>
  <nav class="primary-nav" aria-label="主导航">
    <a href="index.html" data-i18n="nav.home">首页</a>
    <a href="albums.html" data-i18n="nav.albums">专辑收藏</a>
    <a href="artists.html" data-i18n="nav.artists">艺人介绍</a>
    <a href="videos.html" data-i18n="nav.videos">音乐视频</a>
    <a href="fun.html" data-i18n="nav.fun">趣味</a>
    <a href="about.html" data-i18n="nav.about">关于我</a>
  </nav>
  <div class="nav-actions">
    <a class="nav-auth" id="nav-auth-link" href="login.html" data-i18n="nav.login">登录</a>
    <a class="nav-auth" id="nav-library-link" href="library.html" data-i18n="nav.library">我的收藏库</a>
    <a class="nav-auth" id="nav-logout" href="index.html" data-i18n="nav.logout" hidden>退出</a>
    <button class="lang-toggle" type="button" title="Switch to English">EN</button>
  </div>
</header>`;

const footerFallback = `
<footer class="site-footer">
  <p data-i18n="footer.line">My Music Vault · 把喜欢的声音，好好收藏。</p>
  <a href="index.html" data-i18n="footer.back">返回首页 ↑</a>
</footer>`;

async function insertPart(placeholderId, fileName, fallbackHTML) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  try {
    const response = await fetch(fileName);
    if (!response.ok) throw new Error("无法加载页面片段");
    placeholder.innerHTML = await response.text();
  } catch {
    // 直接双击打开页面（file://）时，fetch 会被拦截，走这里也能显示导航和页脚
    placeholder.innerHTML = fallbackHTML;
  }
}

function renderAuthUI() {
  const user = window.Auth ? window.Auth.currentUser() : null;
  const authLink = document.getElementById("nav-auth-link");
  const logoutLink = document.getElementById("nav-logout");
  if (!authLink) return;

  if (user) {
    authLink.textContent = user;
    authLink.removeAttribute("data-i18n");
    authLink.href = "library.html";
    if (logoutLink) logoutLink.hidden = false;
  } else {
    authLink.setAttribute("data-i18n", "nav.login");
    authLink.href = "login.html";
    if (logoutLink) logoutLink.hidden = true;
  }
}

function bindAuth() {
  const logoutLink = document.getElementById("nav-logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.Auth) window.Auth.logout();
      window.location.href = "index.html";
    });
  }
}

Promise.all([
  insertPart("nav-placeholder", "nav.html", navFallback),
  insertPart("footer-placeholder", "footer.html", footerFallback)
]).then(() => {
  if (window.I18N && window.I18N.translatePage) window.I18N.translatePage();
  renderAuthUI();
  bindAuth();
});
