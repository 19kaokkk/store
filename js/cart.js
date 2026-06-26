const CartManager = (function() {
    const STORAGE_KEY = "ladyrose_cart_local"; 
    const EVENT_NAME = "cart:updated";

    function readCart() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (err) {
            console.error("Lỗi đọc giỏ hàng", err);
            return [];
        }
    }

    function writeCart(items) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (err) {
            console.error("Lỗi lưu giỏ hàng", err);
        }
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { items: items } }));
    }

    return {
        getCart: function() {
            return readCart();
        },

        addFromCatalog: function(productId, colorKey, qtyToAdd = 1, size = null) {
            if (typeof PRODUCT_DATA === 'undefined') {
                console.error("Chưa tải file product data.js");
                return;
            }

            const product = PRODUCT_DATA.find(p => p.id === productId);
            if (!product) return;

            const colorObj = product.colors.find(c => c.key === colorKey) || product.colors[0];

            const cartItemId = size ? `${product.id}_${colorObj.key}_${size}` : `${product.id}_${colorObj.key}`;
            const items = readCart();
            const existing = items.find(it => it.cartItemId === cartItemId);

            if (existing) {
                existing.qty += parseInt(qtyToAdd, 10);
            } else {
                items.push({
                    cartItemId: cartItemId,
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    colorLabel: colorObj.label,
                    colorHex: colorObj.hex,
                    image: colorObj.image,
                    size: size,
                    qty: parseInt(qtyToAdd, 10)
                });
            }
            writeCart(items);
        },

        updateQty: function(cartItemId, newQty) {
            let items = readCart();
            newQty = parseInt(newQty, 10) || 0;

            if (newQty < 1) {
                items = items.filter(it => it.cartItemId !== cartItemId);
            } else {
                const target = items.find(it => it.cartItemId === cartItemId);
                if (target) target.qty = newQty;
            }
            writeCart(items);
        },

        removeItem: function(cartItemId) {
            const items = readCart().filter(it => it.cartItemId !== cartItemId);
            writeCart(items);
        },

        getTotalQuantity: function() {
            return readCart().reduce((sum, it) => sum + it.qty, 0);
        },
        EVENT_NAME: EVENT_NAME
    };
})();



function formatPrice(price) {
    return Math.round(price).toLocaleString('vi-VN') + 'đ';
}

function renderCartItemHTML(item) {
    const lineTotal = item.qty * item.price;
    const colorDot = item.colorHex ? `<span class="color-dot" style="background:${item.colorHex}; border: 1px solid #ddd;"></span> <span style="font-size:13px; color:#777;">${item.colorLabel}</span>` : '';
    const sizeInfo = item.size ? `<span style="font-size:13px; color:#777; margin-left:8px;">Size ${item.size}</span>` : '';

    return `
    <div class="cart-item" data-cart-id="${item.cartItemId}">
        <div class="product">
            <img src="${item.image}" alt="${item.name}">
            <div class="product-info">
                <div class="product-info-top">
                    <h4>${item.name}</h4>
                    <button class="delete delete-mobile" aria-label="Xóa sản phẩm">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">${colorDot}${sizeInfo}</div>
                <strong>${formatPrice(item.price)}</strong>
                <div class="quantity quantity-mobile">
                    <button class="minus">-</button>
                    <input type="text" value="${item.qty}" class="qty-input">
                    <button class="plus">+</button>
                </div>
            </div>
        </div>
        <div class="quantity quantity-desktop">
            <button class="minus">-</button>
            <input type="text" value="${item.qty}" class="qty-input" readonly>
            <button class="plus">+</button>
        </div>
        <div class="price">${formatPrice(lineTotal)}</div>
        <button class="delete delete-desktop" aria-label="Xóa sản phẩm">
            <i class="fa-regular fa-trash-can"></i>
        </button>
    </div>`;
}

function renderCart() {
    const cartItemsWrap = document.getElementById('cart-items-wrap');
    if (!cartItemsWrap) return; 

    const items = CartManager.getCart();
    const cartList = document.querySelector('.cart-list');
    const emptyState = document.getElementById('empty-cart');
    const continueBtn = document.querySelector('.cart-left > .continue-btn');

    if (items.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (cartList) cartList.style.display = 'none';
        if (continueBtn) continueBtn.style.display = 'none';
    } else {
        if (emptyState) emptyState.style.display = 'none';
        if (cartList) cartList.style.display = 'block';
        if (continueBtn) continueBtn.style.display = 'inline-block';
        cartItemsWrap.innerHTML = items.map(renderCartItemHTML).join('');
    }

    updateSummary(items);
    bindCartItemEvents();
}

function updateSummary(items) {
    const subtotal = items.reduce((sum, it) => sum + it.qty * it.price, 0);
    const totalQty = items.reduce((sum, it) => sum + it.qty, 0);

    const FREE_SHIP_THRESHOLD = 800000;
    const SHIP_FEE = 30000;
    const shipFee = (subtotal === 0 || subtotal >= FREE_SHIP_THRESHOLD) ? 0 : SHIP_FEE;
    const grandTotal = subtotal + shipFee;

    const summarySpans = document.querySelectorAll('.summary-row span:last-child');
    if (summarySpans.length >= 2) {
        summarySpans[0].textContent = formatPrice(subtotal);
        summarySpans[1].textContent = totalQty;
    }

    const shippingRow = document.querySelector('.shipping-row span:last-child');
    if (shippingRow) shippingRow.textContent = shipFee === 0 ? '0đ' : formatPrice(shipFee);

    const freeShipNote = document.querySelector('.free-ship-note');
    if (freeShipNote) freeShipNote.style.display = (shipFee === 0 && subtotal > 0) ? 'block' : 'none';

    const totalEl = document.querySelector('.summary-total strong');
    if (totalEl) totalEl.textContent = formatPrice(grandTotal);

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = items.length === 0;

        checkoutBtn.onclick = null;
        checkoutBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            const currentCart = CartManager.getCart();
            if (currentCart.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                alert('Giỏ hàng trống, không thể tiến hành thanh toán!');
            }
        };
    }
}

function bindCartItemEvents() {
    document.querySelectorAll('.cart-item').forEach(row => {
        const cartItemId = row.dataset.cartId;

        row.querySelectorAll('.plus').forEach(btn => {
            btn.onclick = () => {
                const input = btn.parentElement.querySelector('.qty-input');
                CartManager.updateQty(cartItemId, parseInt(input.value) + 1);
            };
        });

        row.querySelectorAll('.minus').forEach(btn => {
            btn.onclick = () => {
                const input = btn.parentElement.querySelector('.qty-input');
                CartManager.updateQty(cartItemId, parseInt(input.value) - 1);
            };
        });

        row.querySelectorAll('.delete').forEach(btn => {
            btn.onclick = () => CartManager.removeItem(cartItemId);
        });
    });
}


function refreshCartBadge() {
    const badge = document.getElementById('cartBadge'); 
    if (!badge) return;
    const qty = CartManager.getTotalQuantity();
    badge.textContent = qty;
    badge.classList.toggle('show', qty > 0);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    refreshCartBadge(); 
});

window.addEventListener(CartManager.EVENT_NAME, () => {
    renderCart();
    refreshCartBadge();
});
