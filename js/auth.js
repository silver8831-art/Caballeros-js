/* ═══════════════════════════════════════════════════════════
   SAINT SEIYA — AUTH MODULE  /js/auth.js
   Handles register/login modal
═══════════════════════════════════════════════════════════ */

/* ── USER STORE (localStorage) ──────────────────────────── */
const Auth = (() => {
  const KEY = "ss_users";
  const SESSION_KEY = "ss_session";

  function getUsers() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  }
  function saveUsers(users) {
    localStorage.setItem(KEY, JSON.stringify(users));
  }
  function getSession() {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
  }
  function setSession(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function register(name, email, pass) {
    const users = getUsers();
    if (users.find(u => u.email === email)) return { ok: false, msg: "⚠ Este correo ya está registrado." };
    users.push({ name, email, pass });
    saveUsers(users);
    return { ok: true, msg: "✦ ¡Bienvenido al cosmos, " + name + "!" };
  }

  function login(email, pass) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.pass === pass);
    if (!user) return { ok: false, msg: "⚠ Correo o contraseña incorrectos." };
    setSession(user);
    return { ok: true, msg: "✦ ¡Bienvenido de regreso, " + user.name + "!", user };
  }

  function logout() { clearSession(); }

  return { register, login, logout, getSession };
})();

/* ── MODAL DOM ──────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const overlay   = document.getElementById("authModal");
  const closeBtn  = document.getElementById("authClose");
  const openReg   = document.getElementById("openRegister");
  const openLog   = document.getElementById("openLogin");
  const tabs      = document.querySelectorAll(".modal-tab");
  const regForm   = document.getElementById("formRegister");
  const logForm   = document.getElementById("formLogin");
  const regMsg    = document.getElementById("regMsg");
  const logMsg    = document.getElementById("logMsg");

  if (!overlay) return; // not on every page

  function openModal(tab) {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    switchTab(tab || "register");
  }
  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    clearMsgs();
  }
  function switchTab(tab) {
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
    if (regForm) regForm.classList.toggle("active", tab === "register");
    if (logForm) logForm.classList.toggle("active", tab === "login");
    clearMsgs();
  }
  function clearMsgs() {
    if (regMsg) { regMsg.textContent = ""; regMsg.className = "modal-msg"; }
    if (logMsg) { logMsg.textContent = ""; logMsg.className = "modal-msg"; }
  }

  openReg  && openReg.addEventListener("click",  () => openModal("register"));
  openLog  && openLog.addEventListener("click",   () => openModal("login"));
  closeBtn && closeBtn.addEventListener("click",  closeModal);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.tab)));

  /* Register */
  regForm && regForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name  = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim().toLowerCase();
    const pass  = document.getElementById("reg-pass").value;
    const pass2 = document.getElementById("reg-pass2").value;

    if (pass !== pass2) {
      regMsg.textContent = "⚠ Las contraseñas no coinciden.";
      regMsg.className = "modal-msg error";
      return;
    }
    const result = Auth.register(name, email, pass);
    regMsg.textContent = result.msg;
    regMsg.className = "modal-msg " + (result.ok ? "success" : "error");
    if (result.ok) {
      this.reset();
      setTimeout(() => {
        closeModal();
        showToast("✦ ¡Tu Cosmo ha despertado, " + name + "!");
      }, 1400);
    }
  });

  /* Login */
  logForm && logForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("log-email").value.trim().toLowerCase();
    const pass  = document.getElementById("log-pass").value;
    const result = Auth.login(email, pass);
    logMsg.textContent = result.msg;
    logMsg.className = "modal-msg " + (result.ok ? "success" : "error");
    if (result.ok) {
      this.reset();
      setTimeout(() => {
        closeModal();
        showToast("✦ Sesión iniciada: " + result.user.name);
      }, 1200);
    }
  });
});
