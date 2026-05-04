/* ═══════════════════════════════════════════════════════════
   SAINT SEIYA — MAIN JS  /js/main.js
   Toast, episodes render, season tabs, nav active links
═══════════════════════════════════════════════════════════ */

/* ── TOAST ──────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 3500);
}

/* ── FORMAT PRICE ───────────────────────────────────────── */
function formatPrice(n) {
  return "$" + Math.round(n).toLocaleString("es-CL");
}

/* ── EPISODES RENDERER ──────────────────────────────────── */
function renderEpisodes() {
  if (typeof EPISODES === "undefined") return;

  Object.entries(EPISODES).forEach(([season, data]) => {
    const grid = document.getElementById("grid-" + season);
    if (!grid) return;

    grid.innerHTML = data.list.map(ep => {
      const searchUrl = `https://www.youtube.com/results?search_query=saint+seiya+${season === "5" ? "OVA+hades+" : "episodio+"}${ep.num}`;
      return `
        <a class="ep-card" href="${searchUrl}" target="_blank" rel="noopener noreferrer">
          <div class="ep-num">Ep.${ep.num}</div>
          <div class="ep-info">
            <div class="ep-title">${ep.title}</div>
            <div class="ep-arc">${ep.arc}</div>
          </div>
          <div class="ep-play">▶</div>
        </a>`;
    }).join("");
  });
}

/* ── SEASON TABS ────────────────────────────────────────── */
function initSeasonTabs() {
  document.querySelectorAll(".season-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const s = btn.dataset.season;
      document.querySelectorAll(".season-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".episodes-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const panel = document.getElementById("season-" + s);
      if (panel) panel.classList.add("active");
    });
  });
}

/* ── SHOP FILTER TABS ───────────────────────────────────── */
function initShopFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".product-card").forEach(card => {
        if (filter === "all" || card.dataset.type === filter) {
          card.removeAttribute("data-hidden");
        } else {
          card.dataset.hidden = "true";
        }
      });
    });
  });
}

/* ── SHOP PRODUCTS RENDERER ─────────────────────────────── */
function renderShop() {
  if (typeof PRODUCTS === "undefined") return;
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => {
    const badgeHtml = p.badge
      ? `<span class="product-badge ${p.badge}">${p.badge === "new" ? "Nuevo" : p.badge === "sale" ? "Oferta" : p.badge}</span>`
      : "";
    const oldPriceHtml = p.oldPrice
      ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>`
      : "";
    const downloadBadge = p.type === "descarga"
      ? `<div class="download-indicator">📥 <span>Descarga digital instantánea</span></div>`
      : "";

    return `
      <div class="product-card" data-type="${p.type}" data-id="${p.id}">
        <div class="product-img">
          ${badgeHtml}
          ${p.img ? `<img src="${p.img}" alt="${p.name}" />` : p.icon}
        </div>
        <div class="product-body">
          <div class="product-category">${p.category}</div>
          <div class="product-name">${p.name}</div>
          ${downloadBadge}
          <div class="product-desc">${p.desc}</div>
          <div class="product-footer">
            <div class="product-price">
              ${oldPriceHtml}
              ${formatPrice(p.price)}
            </div>
            <button class="add-to-cart-btn" data-id="${p.id}" onclick="handleAddToCart('${p.id}', this)">
              ${p.type === "descarga" ? "⬇ Comprar" : "🛒 Añadir"}
            </button>
          </div>
        </div>
      </div>`;
  }).join("");
}

function handleAddToCart(id, btn) {
  if (typeof PRODUCTS === "undefined" || typeof Cart === "undefined") return;
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  Cart.addItem(product);
  btn.textContent = "✓ Añadido";
  btn.classList.add("added");
  setTimeout(() => {
    btn.textContent = product.type === "descarga" ? "⬇ Comprar" : "🛒 Añadir";
    btn.classList.remove("added");
  }, 2000);
}

/* ── NAV ACTIVE LINKS ───────────────────────────────────── */
function initNavLinks() {
  const links = document.querySelectorAll(".nav-links a");
  const page = window.location.pathname.split("/").pop() || "index.html";
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href.startsWith("#")) {
      /* handled by scroll */
    } else if (href.includes(page)) {
      link.classList.add("active");
    }
  });
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderEpisodes();
  initSeasonTabs();
  renderShop();
  initShopFilters();
  initNavLinks();
});
