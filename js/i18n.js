/* 语言切换：中文 / English（默认中文）
   用法：给静态文本加 data-i18n="key"；输入框用 data-i18n-ph="key"；
   动态渲染的文本用 window.I18N.pick(中文, 英文) 或 window.I18N.t(key, 中文兜底)。
   切换语言会写入 localStorage 并刷新页面，保证动态内容也一起重渲染。 */
(function () {
  "use strict";

  var STORAGE_KEY = "musicVaultLang";

  var EN = {
    /* 导航 */
    "nav.home": "Home",
    "nav.albums": "Albums",
    "nav.artists": "Artists",
    "nav.videos": "Music Videos",
    "nav.fun": "Fun Zone",
    "nav.about": "About",
    "nav.login": "Log in",
    "nav.register": "Sign up",
    "nav.library": "My Library",
    "nav.logout": "Log out",

    /* 页脚 */
    "footer.line": "My Music Vault · A home for the sounds I love.",
    "footer.back": "Back to home ↑",

    /* 首页 */
    "home.eyebrow.shelf": "The Record Shelf",
    "home.heading.collection": "Album Collection",
    "home.browse-note": "Search by album, artist or genre. Pick an album, then watch its official music video.",
    "home.search-ph": "Search albums, artists or genres",
    "home.eyebrow.genres": "Browse by Sound",
    "home.heading.genres": "Explore by Genre",
    "home.genres.link": "Browse all genres ↗",
    "home.eyebrow.playlists": "Curated Listening",
    "home.heading.playlists": "Curated Playlists",
    "home.playlists.link": "Browse all playlists ↗",
    "home.eyebrow.artists": "The People Behind the Sound",
    "home.heading.artists": "Featured Artists",
    "home.artists.link": "Browse all artists ↗",
    "home.eyebrow.closing": "Keep Exploring",
    "home.closing.title": "Start with one album,<br>and discover more sounds you love.",
    "home.closing.link": "Open the full catalog ↗",
    "home.player.eyebrow": "Now Watching",
    "home.player.title": "Choose a music video",
    "home.player.status": "Pick a music video below and it will play right here.",
    "home.videos.link": "Watch all music videos ↗",

    /* 专辑列表 */
    "albums.eyebrow": "The Collection",
    "albums.title": "All Albums.",
    "albums.intro": "Browse my 12 collected albums. Search by title, artist or genre, then open an album.",
    "albums.search-ph": "Search albums, artists or genres…",
    "albums.sort.newest": "Year: newest first",
    "albums.sort.oldest": "Year: oldest first",
    "albums.sort.title": "Sort by album title",
    "albums.empty": "No albums match. Try another search term.",

    /* 专辑详情 */
    "album.back": "← Back to all albums",
    "album.eyebrow": "Album Detail",
    "album.tracks": "Tracks",
    "album.watch": "Watch MV",
    "album.no-video": "No video",
    "album.add": "Add to my library ♥",
    "album.added": "In my library ✓",
    "album.login-hint": "Log in to save albums",

    /* 风格 */
    "genres.eyebrow": "Explore by Sound",
    "genres.title": "Find a sound,<br>by genre.",
    "genres.intro": "From Mandopop to hip-hop, R&B and funk — browse this album collection by genre.",
    "genres.albums": "albums",

    /* 歌单 */
    "playlists.eyebrow": "Curated Playlists",
    "playlists.title": "Sounds picked<br>for every mood.",
    "playlists.intro": "From late-night drives to Mandarin memories, these playlists group albums by vibe.",
    "playlists.albums": "albums",

    /* 艺人 */
    "artists.eyebrow": "The Artists",
    "artists.title": "The creators<br>behind the sound.",
    "artists.intro": "Meet the musicians in my collection, their genres, and the albums they appear in.",
    "artists.count": "artists",

    /* 关于 */
    "about.eyebrow": "About This Collection",
    "about.title": "Music is<br>how I collect.",
    "about.hero": "This is where I keep the albums and artists I love. Every album has its own sound and style — this little vault is where I organize, revisit and share them.",
    "about.albums": "albums",
    "about.artists": "artists",
    "about.genres": "genres",
    "about.why.eyebrow": "Why Music",
    "about.why.title": "Why do I love music?",
    "about.why.lead": "Music records a mood, and a familiar melody can take you back to a moment. I keep my favorite albums here so that every time I open the site, I can rediscover their sounds.",
    "about.value1.title": "Discover new sounds",
    "about.value1.desc": "From pop and hip-hop to Mandopop, the collection spans different styles and voices.",
    "about.value2.title": "Organize favorite albums",
    "about.value2.desc": "Note the title, artist, year and tracks so the albums you love are easier to find.",
    "about.value3.title": "Return to the music",
    "about.value3.desc": "Browse by album, artist or genre and find the music that fits the moment.",
    "about.sounds.eyebrow": "Sounds in My Vault",
    "about.sounds.title": "Genres in the collection",
    "about.sounds.lead": "These genres come from the albums collected so far, and update from your data automatically.",
    "about.closing.title": "Start with one album and keep exploring.",
    "about.closing.link": "Browse all albums ↗",

    /* 视频页 */
    "videos.eyebrow": "Music Videos",
    "videos.title": "Watch the music videos.",
    "videos.intro": "Official music videos for the albums in this collection, embedded from Bilibili. No audio files are hosted on this site.",
    "videos.note": "Videos are embedded from Bilibili.",

    /* 趣味页 */
    "fun.eyebrow": "Fun Zone",
    "fun.title": "Play a little,<br>listen a little.",
    "fun.intro": "Delightfully useless but music-themed toys and games. Tap the record, guess the artist, or find your tempo.",
    "fun.vinyl.title": "Spinning Vinyl Record",
    "fun.vinyl.hint": "Press play and watch the record spin. Useless but soothing.",
    "fun.play": "▶ Play",
    "fun.speed": "Switch 33 / 45 RPM",
    "fun.quiz.title": "Guess the Artist",
    "fun.quiz.hint": "Look at the cover and guess whose album it is.",
    "fun.next": "Next →",
    "fun.bpm.title": "Tempo Test (BPM)",
    "fun.bpm.hint": "Tap along to the beat and measure your BPM.",
    "fun.bpm.tap": "Tap here to the beat",
    "fun.reset": "Reset",
    "fun.mood.title": "Music Mood Generator",
    "fun.mood.hint": "Pick a mood and get a playlist from the collection.",

    /* 登录 / 注册 / 收藏库 */
    "auth.login.eyebrow": "Welcome Back",
    "auth.login.title": "Log in to your vault.",
    "auth.login.intro": "Log in to open your personal music library.",
    "auth.username": "Username",
    "auth.password": "Password",
    "auth.nickname": "Nickname (optional)",
    "auth.username-ph": "Username",
    "auth.password-ph": "Password",
    "auth.name-ph": "Nickname (optional)",
    "auth.login.submit": "Log in",
    "auth.login.to-register": "No account yet? Sign up ↗",
    "auth.register.eyebrow": "Join the Vault",
    "auth.register.title": "Create your own music library.",
    "auth.register.intro": "Sign up with a local account. Everything is saved in this browser.",
    "auth.register.submit": "Sign up",
    "auth.register.to-login": "Already have an account? Log in ↗",
    "auth.library.eyebrow": "My Music Library",
    "auth.library.title": "My personal collection.",
    "auth.library.intro": "Albums you saved from the collection. Add more from any album page.",
    "auth.library.guest": "Log in to see your library.",
    "auth.library.empty": "Your library is empty. Browse albums and tap “Add to my library”.",
    "auth.library.browse": "Browse albums ↗",
    "auth.library.logout": "Log out",
    "auth.library.remove": "Remove",
    "auth.library.count": "albums saved",
    "auth.msg.ok": "Done",
    "auth.msg.err": "Error",

    /* 通用 */
    "common.watch": "Watch MV"
  };

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  var state = { current: getStored() === "en" ? "en" : "zh" };

  function translatePage() {
    var isEn = state.current === "en";
    document.documentElement.lang = isEn ? "en" : "zh-CN";

    // 语言切换按钮：中文模式下显示 EN（点击切英文），英文模式下显示 中文
    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.textContent = isEn ? "中文" : "EN";
      btn.title = isEn ? "切换到中文" : "Switch to English";
    });

    if (!isEn) return; // 中文是 HTML 里的默认文案

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key && EN[key] != null) el.textContent = EN[key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (key && EN[key] != null) el.setAttribute("placeholder", EN[key]);
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (key && EN[key] != null) el.setAttribute("title", EN[key]);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (key && EN[key] != null) el.setAttribute("aria-label", EN[key]);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (key && EN[key] != null) el.innerHTML = EN[key];
    });
  }

  function setLang(lang) {
    if (lang !== "zh" && lang !== "en") return;
    state.current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    translatePage();
  }

  function toggleLang() {
    var next = state.current === "zh" ? "en" : "zh";
    setLang(next);
    window.location.reload();
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".lang-toggle") : null;
    if (!btn) return;
    e.preventDefault();
    toggleLang();
  });

  window.I18N = {
    get current() { return state.current; },
    isEn: function () { return state.current === "en"; },
    setLang: setLang,
    toggleLang: toggleLang,
    translatePage: translatePage,
    t: function (key, fallback) {
      return state.current === "en" ? (EN[key] != null ? EN[key] : fallback) : fallback;
    },
    pick: function (zh, en) {
      return state.current === "en" ? (en || zh) : zh;
    },
    genre: function (zh) {
      var map = { "华语流行": "Mandopop" };
      return state.current === "en" ? (map[zh] || zh) : zh;
    }
  };

  translatePage();
})();
