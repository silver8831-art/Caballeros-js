/* ═══════════════════════════════════════════════════════════
   SAINT SEIYA — CART MODULE  /js/cart.js
   Shopping cart: add, remove, qty, checkout simulation
═══════════════════════════════════════════════════════════ */

const Cart = (() => {
  let items = [];               // { product, qty }
  let cartOpen = false;

  /* ── DOM refs (populated on DOMContentLoaded) ─────────── */
  let overlay, sidebar, countEl, bodyEl, totalEl;

  /* ── CORE ───────────────────────────────────────────────── */
  function addItem(product) {
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      items.push({ product, qty: 1 });
    }
    render();
    openCart();
    showToast("✦ " + product.name + " añadido al carrito");
  }

  function removeItem(id) {
    items = items.filter(i => i.product.id !== id);
    render();
  }

  function changeQty(id, delta) {
    const item = items.find(i => i.product.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeItem(id);
    else render();
  }

  function clearCart() {
    items = [];
    render();
  }

  function getTotal() {
    return items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  }

  function getCount() {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  /* ── RENDER ─────────────────────────────────────────────── */
  function render() {
    if (!bodyEl) return;
    const count = getCount();

    /* badge */
    if (countEl) {
      countEl.textContent = count;
      countEl.classList.toggle("visible", count > 0);
    }

    /* total */
    if (totalEl) totalEl.textContent = formatPrice(getTotal());

    /* body */
    if (items.length === 0) {
      bodyEl.innerHTML = `
        <div class="cart-empty">
          <span class="cart-empty-icon">🛒</span>
          <p>Tu carrito está vacío.<br>Añade figuras o descargas para comenzar.</p>
        </div>`;
      return;
    }

    bodyEl.innerHTML = items.map(({ product, qty }) => `
      <div class="cart-item ${product.type === "descarga" ? "download" : ""}">
        <div class="cart-item-icon">${product.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-type">${product.category}</div>
          <div class="cart-item-price">${formatPrice(product.price * qty)}</div>
          ${product.type === "figura" ? `
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="Cart.changeQty('${product.id}',-1)">−</button>
            <span class="qty-val">${qty}</span>
            <button class="qty-btn" onclick="Cart.changeQty('${product.id}',1)">+</button>
          </div>` : `<div class="cart-item-type" style="margin-top:.3rem;color:#5b8cff">📥 Descarga digital</div>`}
        </div>
        <button class="cart-item-remove" onclick="Cart.removeItem('${product.id}')" title="Eliminar">✕</button>
      </div>
    `).join("");
  }

  /* ── OPEN / CLOSE ────────────────────────────────────────── */
  function openCart() {
    if (!overlay) return;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    cartOpen = true;
  }
  function closeCart() {
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    cartOpen = false;
  }

  /* ── CHECKOUT ────────────────────────────────────────────── */
  function checkout() {
    if (items.length === 0) { showToast("⚠ Tu carrito está vacío"); return; }

    /* Build summary and show checkout modal */
    const checkoutOverlay = document.getElementById("checkoutModal");
    if (!checkoutOverlay) return;

    const summaryEl = document.getElementById("checkoutSummary");
    if (summaryEl) {
      summaryEl.innerHTML = items.map(({ product, qty }) => `
        <div class="checkout-item">
          <span>${product.icon} ${product.name} ${qty > 1 ? "×" + qty : ""}</span>
          <span>${formatPrice(product.price * qty)}</span>
        </div>
      `).join("") + `
        <div class="checkout-total">
          <span>Total</span>
          <span>${formatPrice(getTotal())}</span>
        </div>`;
    }

    closeCart();
    checkoutOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  /* ── INIT ────────────────────────────────────────────────── */
  function init() {
    overlay   = document.getElementById("cartOverlay");
    sidebar   = document.getElementById("cartSidebar");
    countEl   = document.getElementById("cartCount");
    bodyEl    = document.getElementById("cartBody");
    totalEl   = document.getElementById("cartTotal");

    if (!overlay) return;

    document.getElementById("openCart")    ?.addEventListener("click", openCart);
    document.getElementById("cartClose")   ?.addEventListener("click", closeCart);
    document.getElementById("clearCart")   ?.addEventListener("click", clearCart);
    document.getElementById("checkoutBtn") ?.addEventListener("click", checkout);

    /* close on overlay click (not sidebar) */
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeCart();
    });

    render();
    initCheckoutModal();
  }

  /* ── CHECKOUT MODAL LOGIC ────────────────────────────────── */
  function initCheckoutModal() {
    const co = document.getElementById("checkoutModal");
    if (!co) return;

    co.addEventListener("click", e => { if (e.target === co) { co.classList.remove("open"); document.body.style.overflow = ""; } });
    document.getElementById("checkoutClose")?.addEventListener("click", () => {
      co.classList.remove("open");
      document.body.style.overflow = "";
    });

    const form = document.getElementById("checkoutForm");
    form?.addEventListener("submit", e => {
      e.preventDefault();
      /* Simulate payment processing */
      const btn = form.querySelector("[type=submit]");
      btn.textContent = "Procesando…";
      btn.disabled = true;
      setTimeout(() => {
        form.style.display = "none";
        document.getElementById("checkoutSuccess").style.display = "block";
        clearCart();
        /* handle downloads */
        const hasDownloads = items.some ? false : true; // items already cleared
        showToast("✦ ¡Compra realizada con éxito!");
        setTimeout(() => { co.classList.remove("open"); document.body.style.overflow = ""; form.style.display = ""; btn.textContent = "✦ Confirmar Compra"; btn.disabled = false; document.getElementById("checkoutSuccess").style.display = "none"; }, 3500);
      }, 1800);
    });
  }

  return { addItem, removeItem, changeQty, clearCart, openCart, closeCart, checkout, init };
})();

document.addEventListener("DOMContentLoaded", () => Cart.init());
