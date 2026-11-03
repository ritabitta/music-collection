/* 简易本地账号与个人收藏库（localStorage 实现，无需后端）
   - 注册 / 登录 / 退出
   - 每个用户独立保存收藏的专辑 id
   注：这是纯前端演示实现，数据只存在当前浏览器里。 */
(function () {
  "use strict";

  var USERS_KEY = "mv_users";
  var SESSION_KEY = "mv_session";
  var FAV_PREFIX = "mv_fav_";

  function readJSON(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function getUsers() { return readJSON(USERS_KEY) || {}; }

  function currentUser() {
    try { return localStorage.getItem(SESSION_KEY) || null; } catch (e) { return null; }
  }

  function register(username, password, name) {
    username = String(username || "").trim();
    password = String(password || "");
    if (!username) return { ok: false, message: "请输入用户名" };
    if (username.length < 2) return { ok: false, message: "用户名至少需要 2 个字符" };
    if (password.length < 4) return { ok: false, message: "密码至少需要 4 位" };
    var users = getUsers();
    if (users[username]) return { ok: false, message: "该用户名已被注册" };
    users[username] = { password: password, name: name || username, createdAt: Date.now() };
    writeJSON(USERS_KEY, users);
    try { localStorage.setItem(SESSION_KEY, username); } catch (e) {}
    return { ok: true, username: username };
  }

  function login(username, password) {
    username = String(username || "").trim();
    password = String(password || "");
    var users = getUsers();
    var user = users[username];
    if (!user) return { ok: false, message: "用户不存在，请先注册" };
    if (user.password !== password) return { ok: false, message: "密码不正确" };
    try { localStorage.setItem(SESSION_KEY, username); } catch (e) {}
    return { ok: true, username: username };
  }

  function logout() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  function favorites(username) {
    username = username || currentUser();
    if (!username) return [];
    return readJSON(FAV_PREFIX + username) || [];
  }

  function isFavorite(albumId) {
    return favorites().indexOf(String(albumId)) !== -1;
  }

  function toggleFavorite(albumId) {
    var user = currentUser();
    if (!user) return { ok: false, needLogin: true };
    albumId = String(albumId);
    var favs = favorites(user);
    var idx = favs.indexOf(albumId);
    var added = false;
    if (idx === -1) { favs.push(albumId); added = true; }
    else { favs.splice(idx, 1); }
    writeJSON(FAV_PREFIX + user, favs);
    return { ok: true, added: added, favorites: favs };
  }

  window.Auth = {
    register: register,
    login: login,
    logout: logout,
    currentUser: currentUser,
    favorites: favorites,
    isFavorite: isFavorite,
    toggleFavorite: toggleFavorite
  };
})();
