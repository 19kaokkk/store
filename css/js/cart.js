function formatPrice(price) {
    return Math.round(price).toLocaleString('vi-VN') + 'đ';
}

function renderCartItemHTML(item) {
    const lineTotal = item.qty * item.price;
    const colorDot = item.colorHex
        ? `<span class="color-dot" style="background:${item.colorHex};"></span>`
        : '';
    const sizeLine = item.size ? `<p>Size: ${item.size}</p>` : '';

    return `
    <div class="cart-item" data-id="${item.id}">
        <div class="product">
            <img src="${item.image}" alt="${item.name}">
            <div class="product-info">
                <div class="product-info-top">
                    <h4>${item.name}</h4>
                    <button class="delete delete-mobile" aria-label="Xóa sản phẩm">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
                ${colorDot}
                ${sizeLine}
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
            <input type="text" value="${item.qty}" class="qty-input">
            <button class="plus">+</button>
        </div>
        <div class="price">${formatPrice(lineTotal)}</div>
        <button class="delete delete-desktop" aria-label="Xóa sản phẩm">
            <i class="fa-regular fa-trash-can"></i>
        </button>
    </div>`;
}

function renderCart() {
    const items = CartData.getCart();
    const cartList = document.querySelector('.cart-list');
    const cartItemsWrap = document.getElementById('cart-items-wrap');
    const emptyState = document.getElementById('empty-cart');
    const continueBtn = document.querySelector('.cart-left > .continue-btn');

    if (!cartItemsWrap) return; // trang này không phải trang giỏ hàng

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

/* ---------- Cập nhật khối "TÓM TẮT ĐƠN HÀNG" ---------- */
function updateSummary(items) {
    const subtotal = items.reduce((sum, it) => sum + it.qty * it.price, 0);
    const totalQty = items.reduce((sum, it) => sum + it.qty, 0);

    // Phí vận chuyển: miễn phí từ 800.000đ trở lên (đồng bộ với thông báo top-bar)
    const FREE_SHIP_THRESHOLD = 800000;
    const SHIP_FEE = 30000;
    const shipFee = (subtotal === 0 || subtotal >= FREE_SHIP_THRESHOLD) ? 0 : SHIP_FEE;
    const discount = 0; // chỗ để gắn logic mã giảm giá sau này
    const grandTotal = subtotal + shipFee - discount;

    const summarySpans = document.querySelectorAll('.summary-row span:last-child');
    if (summarySpans[0]) summarySpans[0].textContent = formatPrice(subtotal);
    if (summarySpans[1]) summarySpans[1].textContent = totalQty;

    const shippingRow = document.querySelector('.shipping-row span:last-child');
    if (shippingRow) shippingRow.textContent = shipFee === 0 ? '0đ' : formatPrice(shipFee);

    const freeShipNote = document.querySelector('.free-ship-note');
    if (freeShipNote) freeShipNote.style.display = shipFee === 0 && subtotal > 0 ? 'block' : 'none';

    const totalEl = document.querySelector('.summary-total strong');
    if (totalEl) totalEl.textContent = formatPrice(grandTotal);

    // Vô hiệu hoá nút thanh toán khi giỏ trống
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) checkoutBtn.disabled = items.length === 0;
}

/* ---------- Gắn sự kiện cho từng dòng sản phẩm vừa render ---------- */
function bindCartItemEvents() {
    document.querySelectorAll('.cart-item').forEach(function (row) {
        const id = row.dataset.id;

        row.querySelectorAll('.plus').forEach(function (btn) {
            btn.onclick = function () {
                const input = btn.parentElement.querySelector('.qty-input');
                const newQty = (parseInt(input.value, 10) || 0) + 1;
                CartData.updateQty(id, newQty);
            };
        });

        row.querySelectorAll('.minus').forEach(function (btn) {
            btn.onclick = function () {
                const input = btn.parentElement.querySelector('.qty-input');
                const newQty = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
                CartData.updateQty(id, newQty);
            };
        });

        row.querySelectorAll('.qty-input').forEach(function (input) {
            input.onchange = function () {
                const newQty = Math.max(1, parseInt(input.value, 10) || 1);
                CartData.updateQty(id, newQty);
            };
        });

        row.querySelectorAll('.delete').forEach(function (btn) {
            btn.onclick = function () {
                CartData.removeItem(id);
            };
        });
    });
}

function initCart() {
    renderCart();
    window.addEventListener(CartData.EVENT_NAME, renderCart);
}

document.addEventListener('DOMContentLoaded', initCart);
