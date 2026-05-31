(function () {
  const CART_KEY = 'empireStoneCart';
  const WHATSAPP_NUMBER = '212679191230';

  const style = document.createElement('style');
  style.textContent = `
    .site-header {
      background: rgba(255, 255, 255, 0.9) !important;
      backdrop-filter: blur(18px);
      box-shadow: 0 14px 40px rgba(8, 47, 87, 0.08);
    }

    .nav-shell {
      position: relative;
      isolation: isolate;
    }

    .brand {
      flex: 0 1 auto;
      min-width: 0;
    }

    .brand-mark {
      box-shadow: 0 12px 28px rgba(21, 96, 172, 0.14);
    }

    .main-nav {
      padding: 8px;
      border: 1px solid rgba(16, 54, 102, 0.1);
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.72);
      box-shadow: 0 12px 30px rgba(8, 47, 87, 0.06);
      gap: 6px !important;
    }

    .main-nav a {
      display: inline-flex;
      align-items: center;
      min-height: 38px;
      padding: 0 12px;
      border-radius: 12px;
      transition: background-color 180ms ease, color 180ms ease, transform 180ms ease;
      white-space: nowrap;
    }

    .main-nav a:hover,
    .main-nav a:focus-visible {
      background: rgba(21, 111, 190, 0.1);
      color: var(--navy-900, #0b4278);
      transform: translateY(-1px);
    }

    .main-nav a::after {
      display: none !important;
    }

    .nav-actions {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      flex: 0 0 auto;
    }

    .nav-actions > .btn {
      min-height: 46px;
      padding-inline: 18px;
      white-space: nowrap;
      box-shadow: 0 14px 28px rgba(16, 91, 164, 0.18);
    }

    .menu-toggle {
      flex: 0 0 46px;
    }

    .nav-cart-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 46px;
      padding: 0 16px;
      border-radius: 14px;
      border: 1px solid rgba(21, 111, 190, 0.2);
      background: rgba(21, 111, 190, 0.1);
      color: var(--navy-900, #0b4278);
      font-family: var(--font-ui, inherit);
      font-weight: 800;
      line-height: 1;
      text-decoration: none;
      cursor: pointer;
      transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease;
      white-space: nowrap;
    }

    .nav-cart-icon {
      font-size: 1rem;
      line-height: 1;
    }

    .nav-cart-btn:hover,
    .nav-cart-btn:focus-visible {
      transform: translateY(-2px);
      border-color: rgba(21, 111, 190, 0.34);
      background: rgba(21, 111, 190, 0.16);
      box-shadow: 0 16px 32px rgba(16, 91, 164, 0.14);
    }

    .cart-count-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 7px;
      border-radius: 999px;
      background: var(--navy-700, #156fbe);
      color: #fff;
      font-size: 0.78rem;
      font-weight: 900;
      line-height: 1;
    }

    .cart-overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(6, 24, 48, 0.52);
      opacity: 0;
      pointer-events: none;
      transition: opacity 220ms ease;
    }

    .cart-overlay.is-visible {
      opacity: 1;
      pointer-events: auto;
    }

    .cart-sidebar {
      position: fixed;
      inset: 0 0 0 auto;
      z-index: 1000;
      width: min(440px, 100vw);
      height: 100dvh;
      background: #fff;
      box-shadow: -18px 0 60px rgba(8, 47, 87, 0.2);
      transform: translateX(100%);
      transition: transform 260ms ease;
      display: flex;
      flex-direction: column;
    }

    .cart-sidebar.is-open {
      transform: translateX(0);
    }

    .cart-header {
      padding: 22px 22px 18px;
      border-bottom: 1px solid rgba(16, 54, 102, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .cart-header h2 {
      margin: 0;
      color: var(--ink-950, #10213b);
      font-family: var(--font-display, serif);
      font-size: 1.9rem;
      line-height: 1;
    }

    .close-cart {
      width: 42px;
      height: 42px;
      border: 1px solid rgba(16, 54, 102, 0.1);
      border-radius: 12px;
      background: rgba(21, 111, 190, 0.08);
      color: var(--navy-900, #0b4278);
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
    }

    .cart-body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 18px 22px;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 82px minmax(0, 1fr);
      gap: 14px;
      padding: 16px 0;
      border-bottom: 1px solid rgba(16, 54, 102, 0.08);
    }

    .cart-item-img {
      width: 82px;
      height: 82px;
      object-fit: cover;
      border-radius: 12px;
      background: #eef6ff;
    }

    .cart-item-info {
      min-width: 0;
      display: grid;
      gap: 7px;
    }

    .cart-item-title {
      color: var(--ink-950, #10213b);
      font-weight: 800;
      line-height: 1.25;
    }

    .cart-item-details {
      color: var(--ink-700, #5f7392);
      font-size: 0.88rem;
      line-height: 1.45;
    }

    .cart-item-price {
      color: var(--navy-700, #156fbe);
      font-weight: 900;
    }

    .cart-item-tools {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 2px;
    }

    .cart-qty {
      display: inline-grid;
      grid-template-columns: 34px 34px 34px;
      align-items: center;
      border: 1px solid rgba(16, 54, 102, 0.12);
      border-radius: 12px;
      overflow: hidden;
      background: rgba(248, 251, 255, 0.95);
    }

    .cart-qty button {
      width: 34px;
      height: 34px;
      border: 0;
      background: transparent;
      color: var(--navy-900, #0b4278);
      font-weight: 900;
      cursor: pointer;
    }

    .cart-qty span {
      text-align: center;
      font-weight: 800;
      font-size: 0.92rem;
    }

    .remove-item,
    .cart-clear-btn {
      border: 0;
      background: transparent;
      color: #b42318;
      font-weight: 800;
      cursor: pointer;
    }

    .remove-item {
      font-size: 0.84rem;
      white-space: nowrap;
    }

    .cart-footer {
      padding: 18px 22px 22px;
      border-top: 1px solid rgba(16, 54, 102, 0.1);
      background: linear-gradient(180deg, rgba(248, 251, 255, 0.96), #fff);
    }

    .cart-footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }

    .cart-total {
      display: grid;
      gap: 2px;
      color: var(--ink-950, #10213b);
      font-size: 0.92rem;
      font-weight: 700;
    }

    .cart-total strong {
      font-size: 1.35rem;
      line-height: 1.1;
    }

    .cart-btn-order {
      width: 100%;
      min-height: 52px;
      padding: 0 18px;
      border: 0;
      border-radius: 14px;
      background: linear-gradient(135deg, #25d366, #128c7e);
      color: #fff;
      font-weight: 900;
      cursor: pointer;
      transition: transform 180ms ease, box-shadow 180ms ease;
      box-shadow: 0 18px 34px rgba(18, 140, 126, 0.22);
    }

    .cart-btn-order:hover,
    .cart-btn-order:focus-visible {
      transform: translateY(-2px);
      box-shadow: 0 22px 40px rgba(18, 140, 126, 0.28);
    }

    .cart-empty-msg {
      margin: 42px auto 0;
      max-width: 260px;
      color: var(--ink-700, #5f7392);
      text-align: center;
    }

    @media (max-width: 1080px) {
      .nav-shell {
        gap: 14px !important;
      }

      .main-nav a {
        padding-inline: 10px;
      }

      .nav-actions > .btn {
        padding-inline: 14px;
      }
    }

    @media (max-width: 900px) {
      body.menu-open {
        overflow: hidden;
      }

      .site-header {
        z-index: 950 !important;
      }

      .nav-shell {
        min-height: 72px !important;
        flex-wrap: nowrap !important;
        gap: 10px !important;
        padding-block: 10px;
      }

      .brand-copy strong {
        font-size: 1.35rem !important;
      }

      .brand-copy small {
        font-size: 0.58rem !important;
        letter-spacing: 0.18em !important;
      }

      .main-nav {
        position: absolute !important;
        top: calc(100% + 10px);
        left: 0;
        right: 0;
        display: grid !important;
        grid-template-columns: 1fr;
        width: 100% !important;
        padding: 12px !important;
        border-radius: 18px !important;
        background: rgba(255, 255, 255, 0.97) !important;
        box-shadow: 0 22px 60px rgba(8, 47, 87, 0.18);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-8px);
        transition: opacity 180ms ease, transform 180ms ease;
      }

      body.menu-open .main-nav {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      .main-nav a {
        min-height: 44px;
        justify-content: center;
      }

      .nav-actions {
        margin-left: auto;
      }

      .nav-actions > .btn {
        display: none !important;
      }

      .menu-toggle {
        display: inline-flex !important;
        position: relative;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(21, 111, 190, 0.18) !important;
        background: rgba(21, 111, 190, 0.1) !important;
        box-shadow: none;
      }
    }

    @media (max-width: 560px) {
      :root {
        --container: min(100% - 28px, 1240px);
      }

      .brand {
        gap: 9px !important;
      }

      .brand-mark {
        width: 42px !important;
        height: 42px !important;
        flex-basis: 42px !important;
        border-radius: 12px !important;
      }

      .brand-copy small {
        display: none !important;
      }

      .nav-cart-btn {
        width: 46px;
        padding: 0;
      }

      .nav-cart-label {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
      }

      .cart-count-badge {
        position: absolute;
        top: -7px;
        right: -7px;
        min-width: 22px;
        height: 22px;
      }

      .cart-sidebar {
        width: 100vw;
      }

      .cart-header,
      .cart-body,
      .cart-footer {
        padding-inline: 16px;
      }

      .cart-item {
        grid-template-columns: 74px minmax(0, 1fr);
      }

      .cart-item-img {
        width: 74px;
        height: 74px;
      }
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  const sidebar = document.createElement('aside');
  sidebar.className = 'cart-sidebar';
  sidebar.setAttribute('aria-label', 'Panier');
  sidebar.setAttribute('aria-hidden', 'true');
  sidebar.innerHTML = `
    <div class="cart-header">
      <h2>Mon panier</h2>
      <button class="close-cart" type="button" aria-label="Fermer le panier">&times;</button>
    </div>
    <div class="cart-body" id="cart-items-container"></div>
    <div class="cart-footer">
      <div class="cart-footer-row">
        <div class="cart-total">
          <span>Total</span>
          <strong id="cart-total-price">0 dh</strong>
        </div>
        <button class="cart-clear-btn" type="button" id="cart-clear-btn">Vider</button>
      </div>
      <button class="cart-btn-order" type="button" id="cart-order-btn">Commander sur WhatsApp</button>
    </div>
  `;
  document.body.appendChild(sidebar);

  const closeButton = sidebar.querySelector('.close-cart');
  const cartOrderButton = sidebar.querySelector('#cart-order-btn');
  const cartClearButton = sidebar.querySelector('#cart-clear-btn');
  const cartItemsContainer = sidebar.querySelector('#cart-items-container');
  const cartTotalPrice = sidebar.querySelector('#cart-total-price');

  function getCart() {
    try {
      const value = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(value) ? value.map(normalizeCartItem).filter(Boolean) : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.map(normalizeCartItem).filter(Boolean)));
    renderCart();
    updateCartCount();
  }

  function normalizeCartItem(item) {
    if (!item || typeof item !== 'object') return null;
    const title = String(item.title || 'Produit Empire Stone').trim();
    const quantity = Math.max(1, Number.parseInt(item.quantity || item.qty || 1, 10) || 1);
    return {
      id: String(item.id || title).trim(),
      title,
      image: item.image || 'logo.jpeg',
      price: item.price ?? 'Sur devis',
      options: item.options && typeof item.options === 'object' ? item.options : {},
      quantity
    };
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[char]);
  }

  function numericPrice(price) {
    if (typeof price === 'number') return Number.isFinite(price) ? price : null;
    const cleaned = String(price || '').replace(/[^\d.,-]/g, '').replace(',', '.');
    const value = Number.parseFloat(cleaned);
    return Number.isFinite(value) ? value : null;
  }

  function formatPrice(price, quantity) {
    const value = numericPrice(price);
    if (value === null) return 'Sur devis';
    const total = value * Math.max(1, quantity || 1);
    return `${total} dh`;
  }

  function optionSignature(options) {
    return Object.entries(options || {})
      .map(([key, value]) => `${String(key).trim().toLowerCase()}:${String(value).trim().toLowerCase()}`)
      .sort()
      .join('|');
  }

  function sameCartItem(left, right) {
    return String(left.id || left.title) === String(right.id || right.title)
      && optionSignature(left.options) === optionSignature(right.options)
      && String(left.price ?? '') === String(right.price ?? '');
  }

  function getCartCount(cart) {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function renderCart() {
    const cart = getCart();

    if (!cartItemsContainer || !cartTotalPrice) return;

    if (!cart.length) {
      cartItemsContainer.innerHTML = '<p class="cart-empty-msg">Votre panier est vide. Ajoutez un produit pour preparer votre commande.</p>';
      cartTotalPrice.textContent = '0 dh';
      if (cartClearButton) cartClearButton.hidden = true;
      return;
    }

    if (cartClearButton) cartClearButton.hidden = false;

    let total = 0;
    let allPriced = true;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
      const price = numericPrice(item.price);
      if (price === null) {
        allPriced = false;
      } else {
        total += price * item.quantity;
      }

      const details = Object.entries(item.options || {})
        .filter(([, value]) => String(value || '').trim() !== '')
        .map(([key, value]) => `${escapeHTML(key)} : ${escapeHTML(value)}`)
        .join('<br>');

      return `
        <article class="cart-item">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" class="cart-item-img" onerror="this.src='logo.jpeg'">
          <div class="cart-item-info">
            <div class="cart-item-title">${escapeHTML(item.title)}</div>
            ${details ? `<div class="cart-item-details">${details}</div>` : ''}
            <div class="cart-item-price">${formatPrice(item.price, item.quantity)}</div>
            <div class="cart-item-tools">
              <div class="cart-qty" aria-label="Quantite">
                <button type="button" data-cart-action="decrease" data-index="${index}" aria-label="Diminuer la quantite">-</button>
                <span>${item.quantity}</span>
                <button type="button" data-cart-action="increase" data-index="${index}" aria-label="Augmenter la quantite">+</button>
              </div>
              <button class="remove-item" type="button" data-cart-action="remove" data-index="${index}">Retirer</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    cartTotalPrice.textContent = allPriced ? `${total} dh` : 'Sur devis';
  }

  function updateCartCount() {
    const count = getCartCount(getCart());
    document.querySelectorAll('.cart-count-badge').forEach(el => {
      el.textContent = count;
      el.setAttribute('aria-label', `${count} article${count > 1 ? 's' : ''} dans le panier`);
    });
  }

  function openCart() {
    sidebar.classList.add('is-open');
    sidebar.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-visible');
    overlay.setAttribute('aria-hidden', 'false');
    renderCart();
  }

  function closeCart() {
    sidebar.classList.remove('is-open');
    sidebar.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function updateQuantity(index, delta) {
    const cart = getCart();
    const item = cart[index];
    if (!item) return;
    item.quantity += delta;
    if (item.quantity < 1) {
      cart.splice(index, 1);
    }
    saveCart(cart);
  }

  function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
  }

  function buildOrderMessage(cart) {
    let total = 0;
    let allPriced = true;
    const lines = [
      'Bonjour Empire Stone,',
      '',
      'Je souhaite passer commande pour les articles suivants :',
      ''
    ];

    cart.forEach((item, index) => {
      const price = numericPrice(item.price);
      const itemTotal = price === null ? 'Sur devis' : `${price * item.quantity} dh`;
      if (price === null) {
        allPriced = false;
      } else {
        total += price * item.quantity;
      }

      lines.push(`${index + 1}. ${item.title}`);
      lines.push(`   - Quantite : ${item.quantity}`);

      Object.entries(item.options || {}).forEach(([key, value]) => {
        if (String(value || '').trim() !== '') {
          lines.push(`   - ${key} : ${value}`);
        }
      });

      lines.push(`   - Prix : ${itemTotal}`);
      lines.push('');
    });

    lines.push(allPriced ? `Total estimé : ${total} dh` : 'Total : sur devis');
    lines.push('');
    lines.push('Merci de me confirmer la disponibilité, le délai et la livraison.');
    return lines.join('\n');
  }

  function injectMenuToggle(navShell) {
    let toggle = navShell.querySelector('.menu-toggle');
    const hadExistingToggle = Boolean(toggle);
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'menu-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-label', 'Ouvrir le menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<span></span>';
      navShell.appendChild(toggle);
    }

    if (hadExistingToggle) return;
    if (toggle.dataset.empireBound === 'true') return;
    toggle.dataset.empireBound = 'true';
    toggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    navShell.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
      });
    });
  }

  function injectNavButton() {
    const navShell = document.querySelector('.nav-shell');
    if (!navShell || navShell.querySelector('.nav-cart-btn')) return;

    let actions = navShell.querySelector('.nav-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'nav-actions';

      const existingButtons = Array.from(navShell.children).filter(child => {
        return child.matches?.('.btn, .btn-primary') && !child.classList.contains('menu-toggle');
      });

      const menuToggle = navShell.querySelector('.menu-toggle');
      navShell.insertBefore(actions, menuToggle || null);
      existingButtons.forEach(button => actions.appendChild(button));
    }

    const cartBtn = document.createElement('button');
    cartBtn.className = 'nav-cart-btn';
    cartBtn.type = 'button';
    cartBtn.innerHTML = '<span class="nav-cart-icon" aria-hidden="true">&#128722;</span><span class="nav-cart-label">Panier</span><span class="cart-count-badge">0</span>';
    cartBtn.addEventListener('click', event => {
      event.preventDefault();
      openCart();
    });
    actions.appendChild(cartBtn);

    injectMenuToggle(navShell);
  }

  closeButton?.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeCart();
      document.body.classList.remove('menu-open');
      document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
    }
  });

  cartItemsContainer?.addEventListener('click', event => {
    const button = event.target.closest('[data-cart-action]');
    if (!button) return;
    const index = Number.parseInt(button.dataset.index || '-1', 10);
    if (index < 0) return;

    if (button.dataset.cartAction === 'increase') updateQuantity(index, 1);
    if (button.dataset.cartAction === 'decrease') updateQuantity(index, -1);
    if (button.dataset.cartAction === 'remove') removeItem(index);
  });

  cartClearButton?.addEventListener('click', () => {
    saveCart([]);
  });

  cartOrderButton?.addEventListener('click', () => {
    const cart = getCart();
    if (!cart.length) return;
    const msg = buildOrderMessage(cart);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  window.EmpireCart = {
    add(product) {
      const incoming = normalizeCartItem(product);
      if (!incoming) return;

      const cart = getCart();
      const existing = cart.find(item => sameCartItem(item, incoming));
      if (existing) {
        existing.quantity += incoming.quantity;
      } else {
        cart.push(incoming);
      }

      saveCart(cart);
      openCart();
    },
    clear() {
      saveCart([]);
    },
    count() {
      return getCartCount(getCart());
    },
    items() {
      return getCart();
    },
    open: openCart
  };

  window.addEventListener('DOMContentLoaded', () => {
    injectNavButton();
    updateCartCount();
    renderCart();
  });
})();
