/* =========================================================
   1. HÀM TIỆN ÍCH & CẤU HÌNH BAN ĐẦU
   ========================================================= */
document.addEventListener('DOMContentLoaded', async function () {
  /* === ĐỌC ID TỪ URL === */
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('id') || 'elysia';   // mặc định là elysia

  // Mapping ID từ danh sách sang chi tiết (nếu khác nhau)
  const idMapping = {
    'lr-bella-tay': 'bella',
    'lr-lyra': 'lyra',
    'lr-grace': 'grace',
    'lr-florence': 'florence',
    'lr-classy': 'classy',
    'celeste-vai': 'celeste',
    'nova': 'nova',
    'lr-aura-cheo': 'aura',
    'lr-eysia-cheo': 'elysia',     // Elysia (có lỗi chính tả trong data)
    'vi-handle': 'handle',
    // Thêm các ID khác nếu có
  };

  if (idMapping[productId]) {
    productId = idMapping[productId];
  }

  /* 1. Render header + footer */
  if (typeof renderHeader === 'function') renderHeader();
  if (typeof renderFooter === 'function') renderFooter();

  setupDynamicEvents();

  await loadState();

  // Render sản phẩm theo ID từ URL
  renderProduct(productId);

  updateCartBadge();
  updateWishlistBadge();
});
const toastEl = document.getElementById('toast');
let toastTimer = null;

function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

function formatVND(n) { return n.toLocaleString('vi-VN') + 'đ'; }

function starString(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

/* =========================================================
   2. DỮ LIỆU SẢN PHẨM
   ========================================================= */
const PRODUCTS = {
  elysia: {
    id: 'elysia', name: 'Túi đeo chéo LR Elysia', category: 'Túi Đeo Chéo',
    price: 1355000, oldPrice: 1499000, sold: 20, stock: 150, rating: 4.8, reviewCount: 3,
    images: [
      "images/Túi đeo chéo LR Elysia/Túi đeo chéo LR Elysia - Đỏ.jpg",
      "images/Túi đeo chéo LR Elysia/Đỏ 2.jpg",
      "images/Túi đeo chéo LR Elysia/Đen 1.jpg",
      "images/Túi đeo chéo LR Elysia/Đen 2.jpg"
    ],
    colors: [{ name: 'Đỏ mận', hex: '#5E1A22' }, { name: 'Đen', hex: '#1B1B1B' }],
    sizes: ['22', '28', '35'],
    desc: 'Chất liệu: Da PU bóng cao cấp. Kèm dây đeo chéo điều chỉnh được và phụ kiện nơ đính đá. Khóa kim loại mạ vàng chống xỉn màu.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: [
      { name: 'Nguyễn Minh Anh', date: '15/06/2026', stars: 5, text: 'Túi đẹp, đúng mô tả' },
      { name: 'Trần Hoài Bão', date: '10/05/2026', stars: 5, text: 'Đóng gói cẩn thận, sản phẩm hợp giá tiền' },
      { name: 'Phan Anh Cao', date: '30/05/2026', stars: 4, text: 'Hàng giống hình, chất liệu tốt' }
    ]
  },
  nova: {
    id: 'nova', name: 'Túi đeo vai LR Nova', category: 'Túi Đeo Vai',
    price: 1085000, oldPrice: null, sold: 12, stock: 60, rating: 5, reviewCount: 2,
    images: [
      "images/Túi đeo vai LR Nova/Túi đeo vai Nova - Đen.jpg",
      "images/Túi đeo vai LR Nova/Túi đeo vai Nova - Nâu.jpg",
      "images/Túi đeo vai LR Nova/Đen 1.jpg",
      "images/Túi đeo vai LR Nova/Nâu 2.jpg"
    ],
    colors: [{ name: 'Đen', hex: '#1B1B1B' }, { name: 'Nâu', hex: '#6B4226' }],
    sizes: ['26', '32'],
    desc: 'Chất liệu: Da bóng cao cấp phối khóa kéo. Phù hợp đi làm và dạo phố.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: [
      { name: 'Vũ Quang Huy', date: '28/05/2026', stars: 5, text: 'Đeo vai rất thoải mái' },
      { name: 'Ngô Thanh Trúc', date: '14/05/2026', stars: 5, text: 'Sản phẩm ổn so với giá tiền' }
    ]
  },
  florence: {
    id: 'florence', name: 'Túi xách tay LR Florence', category: 'Túi Xách Tay',
    price: 1245000, oldPrice: 1390000, sold: 0, stock: 80, rating: 0, reviewCount: 0,
    images: [
      "images/Túi xách tay LR Florence/Túi xách tay LR Florence - Đen.jpg",
      "images/Túi xách tay LR Florence/Túi xách tay LR Florence - Đỏ.jpg",
      "images/Túi xách tay LR Florence/Đen 1.jpg",
      "images/Túi xách tay LR Florence/Đỏ 1.jpg"
    ],
    colors: [{ name: 'Đen', hex: '#1B1B1B' }, { name: 'Đỏ mận', hex: '#5E1A22' }],
    sizes: ['24', '30'],
    desc: 'Chất liệu: Da bò thật cao cấp. Thiết kế dáng hộp sang trọng, có dây đeo chéo tháo rời tiện lợi.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: []
  },
  aura: {
    id: 'aura', name: 'Túi đeo chéo LR Aura', category: 'Túi Đeo Chéo',
    price: 939000, oldPrice: null, sold: 0, stock: 40, rating: 0, reviewCount: 0,
    images: [
      "images/Túi đeo chéo LR Aura/Túi đeo chéo LR Aura-Hồng.jpg",
      "images/Túi đeo chéo LR Aura/Túi đeo chéo LR Aura - Xanh.jpg",
      "images/Túi đeo chéo LR Aura/Hồng 1.jpg",
      "images/Túi đeo chéo LR Aura/Xanh 1.jpg"
    ],
    colors: [{ name: 'Hồng', hex: '#F3B8C4' }, { name: 'Xanh nhạt', hex: '#AEDCE8' }],
    sizes: ['20', '24'],
    desc: 'Chất liệu: Da matelassé chần kim cương. Form nhỏ gọn, dễ phối đồ hằng ngày.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: []
  },
  grace: {
    id: 'grace', name: 'Túi đeo chéo LR Grace', category: 'Túi Đeo Chéo',
    price: 1559000, oldPrice: null, sold: 0, stock: 25, rating: 0, reviewCount: 0,
    images: [
      "images/Túi xách tay LR Grace/Túi xách tay LR Grace - Đen.jpg",
      "images/Túi xách tay LR Grace/Đen 1.jpg",
      "images/Túi xách tay LR Grace/Đen 2.jpg",
      "images/Túi xách tay LR Grace/Đen 3.jpg"
    ],
    colors: [{ name: 'Đen', hex: '#1B1B1B' }, { name: 'Đỏ mận', hex: '#5E1A22' }],
    sizes: ['24', '30'],
    desc: 'Chất liệu: Da trơn cao cấp, khóa cài kim loại sang trọng.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: []
  },
  celeste: {
    id: 'celeste', name: 'Túi đeo vai LR Celeste', category: 'Túi Đeo Vai',
    price: 949000, oldPrice: null, sold: 0, stock: 70, rating: 0, reviewCount: 0,
    images: [
      "images/Túi đeo vai Celeste/Túi đeo vai Celeste - Đen.jpg",
      "images/Túi đeo vai Celeste/Túi đeo vai Celeste - Kem.jpg",
      "images/Túi đeo vai Celeste/Đen 1.jpg",
      "images/Túi đeo vai Celeste/Kem 1.jpg"
    ],
    colors: [{ name: 'Đen', hex: '#1B1B1B' }, { name: 'Kem', hex: '#E9DCC9' }],
    sizes: ['20', '26'],
    desc: 'Chất liệu: Da chần kim cương phối dây xích.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: []
  },
  bella: {
    id: 'bella', name: 'Túi xách tay LR Bella', category: 'Túi Xách Tay',
    price: 1245000, oldPrice: null, sold: 0, stock: 55, rating: 0, reviewCount: 0,
    images: [
      "images/Túi xách tay LR Bella/Túi xách tay LR Bella - Hồng.jpg",
      "images/Túi xách tay LR Bella/Túi xách tay LR Bella - Trắng.jpg",
      "images/Túi xách tay LR Bella/Hồng 1.jpg",
      "images/Túi xách tay LR Bella/Trắng 1.jpg"
    ],
    colors: [{ name: 'Hồng', hex: '#F3B8C4' }, { name: 'Trắng', hex: '#ffffff' }],
    sizes: ['22', '28'],
    desc: 'Chất liệu: Da vân nhẹ cao cấp. Kèm móc khóa nơ đính đá.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: []
  },
  lyra: {
    id: 'lyra', name: 'Túi xách tay LR Lyra', category: 'Túi Xách Tay',
    price: 1435000, oldPrice: null, sold: 0, stock: 45, rating: 0, reviewCount: 0,
    images: [
      "images/Túi xách tay LR Lyra/Túi xách tay LR Lyra - Nâu.jpg",
      "images/Túi xách tay LR Lyra/Túi xách tay LR Lyra- Đen.jpg",
      "images/Túi xách tay LR Lyra/Đen 1.jpg",
      "images/Túi xách tay LR Lyra/Nâu 1.jpg"
    ],
    colors: [{ name: 'Đen', hex: '#1B1B1B' }, { name: 'Nâu', hex: '#BF9A7E' }],
    sizes: ['24', '30'],
    desc: 'Chất liệu: Da mịn cao cấp, quai đeo ngắn và dài kèm theo. Nắp từ tính tiện lợi.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: []
  },
  classy: {
    id: 'classy', name: 'Túi tote LR Classy', category: 'Túi Tote',
    price: 1295000, oldPrice: null, sold: 0, stock: 90, rating: 0, reviewCount: 0,
    images: [
      "images/Túi tote LR Classy/Túi tote LR Classy - Nâu.jpg",
      "images/Túi tote LR Classy/Túi tote LR Classy - Đen.jpg",
      "images/Túi tote LR Classy/Đen 1.jpg",
      "images/Túi tote LR Classy/Nâu 1.jpg"
    ],
    colors: [{ name: 'Đen', hex: '#000000' }, { name: 'Nâu', hex: '#BF9A7E' }],
    sizes: ['35'],
    desc: 'Chất liệu: Da PU. Thiết kế độc đáo. Túi to rộng, dùng đi làm hay đi chơi đều đẹp.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: []
  },
  handle: {
    id: 'handle', name: 'Ví cầm tay Handle', category: 'Ví cầm tay',
    price: 729000, oldPrice: null, sold: 0, stock: 70, rating: 0, reviewCount: 0,
    images: [
      "images/Ví cầm tay Handle/Ví cầm tay Handle - Xanh.jpg",
      "images/Ví cầm tay Handle/Ví cầm tay Handle - Kem.jpg",
      "images/Ví cầm tay Handle/Kem 2.jpg",
      "images/Ví cầm tay Handle/Kem 1.jpg"
    ],
    colors: [{ name: 'Xanh', hex: '#4E76A3' }, { name: 'Kem', hex: '#F0DBCD' }],
    sizes: ['18'],
    desc: 'Chất liệu: Da PU cao cấp. Phụ kiện khóa vàng 18K. Ví cầm tay nhỏ gọn.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: []
  }
};

/* =========================================================
   3. TRẠNG THÁI ỨNG DỤNG (BỘ NHỚ STORAGE)
   ========================================================= */
let currentId = 'elysia';
let cart = [];
let wishlist = new Set();
let recentlyViewed = [];

async function loadState() {
  try { const c = await window.storage.get('lr_cart'); if (c) cart = JSON.parse(c.value); } catch (e) {}
  try { const w = await window.storage.get('lr_wishlist'); if (w) wishlist = new Set(JSON.parse(w.value)); } catch (e) {}
  try { const r = await window.storage.get('lr_recent'); if (r) recentlyViewed = JSON.parse(r.value); } catch (e) {}
}
async function saveCart()     { try { await window.storage.set('lr_cart',     JSON.stringify(cart));           } catch (e) {} }
async function saveWishlist() { try { await window.storage.set('lr_wishlist', JSON.stringify([...wishlist])); } catch (e) {} }
async function saveRecent()   { try { await window.storage.set('lr_recent',   JSON.stringify(recentlyViewed)); } catch (e) {} }

/* =========================================================
   4. GIỎ HÀNG — badge + thêm sản phẩm + Mua ngay
   ========================================================= */
function bump(el) {
  if (!el) return;
  el.style.transform = 'scale(1.3)';
  setTimeout(() => el.style.transform = 'scale(1)', 150);
}

function totalCartQty() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function updateCartBadge() {
  const total = totalCartQty();
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  badge.textContent = total;
  /* Chỉ hiện badge khi có ít nhất 1 sản phẩm */
  badge.style.display = total === 0 ? 'none' : 'inline-block';
  bump(badge);
}

function addToCart(productId, qty) {
  const existing = cart.find(item => item.id === productId);
  if (existing) existing.qty += qty;
  else cart.push({ id: productId, qty });
  updateCartBadge();
  saveCart();
  const p = PRODUCTS[productId];
  showToast(`Đã thêm ${qty} "${p ? p.name : 'sản phẩm'}" vào giỏ hàng`);
}

/* =========================================================
   5. YÊU THÍCH — badge + toggle trái tim
   ========================================================= */
function updateWishlistBadge() {
  const total = wishlist.size;

  /* Badge số bên cạnh icon trái tim trên header */
  const wishBadge = document.getElementById('wishlistBadge');
  if (wishBadge) {
    wishBadge.textContent = total;
    /* Chỉ hiện badge khi có ít nhất 1 sản phẩm yêu thích */
    wishBadge.style.display = total === 0 ? 'none' : 'inline-block';
    bump(wishBadge);
  }

  /* Đổi màu icon trái tim trên header theo trạng thái sản phẩm hiện tại */
  const headerWishIcon = document.querySelector('#headerWishBtn i');
  if (headerWishIcon) {
    headerWishIcon.style.color = wishlist.has(currentId) ? '#E54A5A' : '';
  }

  /* Nút trái tim nhỏ trong khu thông tin sản phẩm */
  const mainWishBtn = document.getElementById('wishBtn');
  if (mainWishBtn) mainWishBtn.classList.toggle('active', wishlist.has(currentId));
}

function toggleWishlist(productId) {
  if (wishlist.has(productId)) wishlist.delete(productId);
  else wishlist.add(productId);
  updateWishlistBadge();
  saveWishlist();
  showToast(wishlist.has(productId) ? 'Đã thêm vào danh sách yêu thích' : 'Đã bỏ khỏi danh sách yêu thích');
}

/* =========================================================
   6. RENDER CHI TIẾT SẢN PHẨM
   ========================================================= */
function renderProduct(id) {
  const p = PRODUCTS[id];
  if (!p) return;
  currentId = id;
  document.title = p.name + ' | LADY ROSE';

  document.getElementById('breadcrumbCategory').textContent = p.category;
  renderGallery(p);

  document.getElementById('pTitle').textContent = p.name;
  document.getElementById('pSold').textContent = p.sold;
  document.getElementById('pStock').textContent = p.stock;
  document.getElementById('pPriceNow').textContent = formatVND(p.price);

  const oldEl = document.getElementById('pPriceOld');
  if (p.oldPrice) { oldEl.textContent = formatVND(p.oldPrice); oldEl.style.display = ''; }
  else { oldEl.textContent = ''; oldEl.style.display = 'none'; }

  if (p.reviewCount > 0) {
    document.getElementById('pStars').textContent = starString(p.rating);
    document.getElementById('pRatingNum').textContent = `(${p.rating}/5)`;
    document.getElementById('pReviewCount').textContent = `${p.reviewCount} đánh giá`;
  } else {
    document.getElementById('pStars').textContent = '☆☆☆☆☆';
    document.getElementById('pRatingNum').textContent = '';
    document.getElementById('pReviewCount').textContent = '0 đánh giá';
  }

  document.getElementById('swatchesContainer').innerHTML = p.colors.map((c, i) =>
    `<span class="swatch ${i === 0 ? 'selected' : ''}" style="background:${c.hex}" data-color="${c.name}" title="${c.name}"></span>`
  ).join('');

  document.getElementById('sizesContainer').innerHTML = p.sizes.map((s, i) =>
    `<div class="size-box ${i === 0 ? 'selected' : ''}" data-size="${s}">${s}</div>`
  ).join('');

  const qtyInput = document.getElementById('qtyInput');
  qtyInput.value = 1;
  qtyInput.max = p.stock;

  document.getElementById('accDescText').textContent = p.desc;
  document.getElementById('accWarrantyText').textContent = p.warranty;

  if (p.reviewCount > 0) {
    document.getElementById('reviewsStars').textContent = starString(p.rating);
    document.getElementById('reviewsScoreNum').textContent = `(${p.rating}/5)`;
    document.getElementById('reviewsTotal').textContent = `${p.reviewCount} đánh giá`;
    document.getElementById('reviewsList').innerHTML = p.reviews.map(r => `
      <div class="review-item">
        <div class="review-avatar">${r.name.charAt(0)}</div>
        <div>
          <span class="review-name">${r.name}</span>
          <span class="review-date">${r.date}</span>
          <div class="review-text">${r.text}</div>
          <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
        </div>
      </div>`).join('');
  } else {
    document.getElementById('reviewsStars').textContent = '★★★★★';
    document.getElementById('reviewsScoreNum').textContent = '(0)';
    document.getElementById('reviewsTotal').textContent = 'Chưa có đánh giá';
    document.getElementById('reviewsList').innerHTML =
      '<p style="color:var(--ink-soft);font-size:14px;padding:20px 0;">Hãy là người đầu tiên đánh giá sản phẩm này!</p>';
  }

  const suggestions = Object.values(PRODUCTS).filter(x => x.id !== p.id);
  renderSuggestSlider(suggestions);

  recentlyViewed = [p.id, ...recentlyViewed.filter(x => x !== p.id)].slice(0, 8);
  saveRecent();
  renderRecentShelf();

  /* Đồng bộ lại badge & trái tim sau khi đổi sản phẩm */
  updateWishlistBadge();
  updateCartBadge();
}

/* =========================================================
   7. GALLERY ẢNH & THUMBNAILS
   ========================================================= */
let galleryImages = [];
let activeIndex = 0;

function renderGallery(p) {
  galleryImages = p.images;
  document.getElementById('thumbs').innerHTML = galleryImages.map((img, i) =>
    `<div class="thumb ${i === 0 ? 'active' : ''}" data-i="${i}">
       <img src="${img}" alt="${p.name} ảnh ${i + 1}">
     </div>`
  ).join('');
  activeIndex = 0;
  document.getElementById('mainImg').src = galleryImages[0];
  document.getElementById('mainImg').alt = p.name;
  bindThumbClicks();
}

function bindThumbClicks() {
  document.querySelectorAll('#thumbs .thumb').forEach(t => {
    t.addEventListener('click', () => showThumb(parseInt(t.dataset.i, 10)));
  });
}

function showThumb(index) {
  const thumbs = Array.from(document.querySelectorAll('#thumbs .thumb'));
  if (thumbs.length === 0) return;
  activeIndex = (index + thumbs.length) % thumbs.length;
  thumbs.forEach(x => x.classList.remove('active'));
  thumbs[activeIndex].classList.add('active');
  const mainImg = document.getElementById('mainImg');
  mainImg.style.opacity = 0;
  setTimeout(() => { mainImg.src = galleryImages[activeIndex]; mainImg.style.opacity = 1; }, 150);
  thumbs[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
}

document.getElementById('mainImg').style.transition = 'opacity .15s ease';

/* =========================================================
   8. CHỌN MÀU SẮC & SIZE
   ========================================================= */
document.getElementById('swatchesContainer').addEventListener('click', (e) => {
  const sw = e.target.closest('.swatch');
  if (!sw) return;
  document.querySelectorAll('#swatchesContainer .swatch').forEach(s => s.classList.remove('selected'));
  sw.classList.add('selected');
});

document.getElementById('sizesContainer').addEventListener('click', (e) => {
  const box = e.target.closest('.size-box');
  if (!box) return;
  document.querySelectorAll('#sizesContainer .size-box').forEach(b => b.classList.remove('selected'));
  box.classList.add('selected');
});

/* =========================================================
   9. STEPPER SỐ LƯỢNG
   ========================================================= */
const qtyInput = document.getElementById('qtyInput');

document.getElementById('qtyMinus').addEventListener('click', () => {
  qtyInput.value = Math.max(1, parseInt(qtyInput.value || 1) - 1);
});
document.getElementById('qtyPlus').addEventListener('click', () => {
  const max = parseInt(qtyInput.max || 999, 10);
  qtyInput.value = Math.min(max, parseInt(qtyInput.value || 1) + 1);
});
qtyInput.addEventListener('change', () => {
  const max = parseInt(qtyInput.max || 999, 10);
  qtyInput.value = Math.min(max, Math.max(1, parseInt(qtyInput.value) || 1));
});

/* =========================================================
   10. NÚT MUA NGAY & THÊM VÀO GIỎ
   ========================================================= */

document.getElementById('addCart').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('qtyInput').value) || 1;
  
  // Lấy ID gốc từ URL để khớp với file product data.js
  const urlParams = new URLSearchParams(window.location.search);
  let realProductId = urlParams.get('id');
  
  // Đề phòng trường hợp chuyển sản phẩm từ phần gợi ý (không có URL)
  if (!realProductId) {
      const reverseMapping = {
          'bella': 'lr-bella-tay', 'lyra': 'lr-lyra', 'grace': 'lr-grace',
          'florence': 'lr-florence', 'classy': 'lr-classy', 'celeste': 'celeste-vai',
          'nova': 'nova', 'aura': 'lr-aura-cheo', 'elysia': 'lr-eysia-cheo', 'handle': 'vi-handle'
      };
      realProductId = reverseMapping[currentId] || currentId;
  }

  // Chuyển tên màu đang chọn thành key màu (nếu cần)
 const activeColor = document.querySelector('#swatchesContainer .swatch.selected');
  let colorKey = 'den'; // Mặc định dự phòng
  if (activeColor) {
      const title = activeColor.getAttribute('title').toLowerCase();
      if (title.includes('đen')) colorKey = 'den';
      else if (title.includes('nâu')) colorKey = 'nau';
      else if (title.includes('đỏ')) colorKey = 'do';
      else if (title.includes('trắng')) colorKey = 'trang';
      else if (title.includes('hồng')) colorKey = 'hong';
      else if (title.includes('kem')) colorKey = 'kem';
      else if (title.includes('xanh')) colorKey = 'xanh';
  }

  // Gọi hàm giỏ hàng mới
  if (typeof CartManager !== 'undefined') {
      CartManager.addFromCatalog(realProductId, colorKey, qty);
      showToast('Đã thêm sản phẩm vào giỏ hàng!');
      
      // Hiệu ứng UX: Đổi chữ
      const btn = document.getElementById('addCart');
      const originalText = btn.textContent;
      btn.textContent = 'ĐÃ THÊM ✓';
      btn.disabled = true;
      btn.style.background = '#2e8b3a';
      btn.style.color = '#fff';
      btn.style.borderColor = '#2e8b3a';
      
      setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
      }, 1200);
  } else {
      console.error("Lỗi: Chưa tải file cart.js");
  }
});

document.getElementById('buyNow').addEventListener('click', () => {
  // Mua ngay = Bấm thêm vào giỏ + Chuyển trang
  document.getElementById('addCart').click(); 
  setTimeout(() => {
      window.location.href = 'cart.html'; 
  }, 400);
});

/* NÚT TRÁI TIM trên trang sản phẩm */
document.getElementById('wishBtn').addEventListener('click', () => {
  toggleWishlist(currentId);
});

/* =========================================================
   11. ACCORDION MÔ TẢ & BẢO HÀNH
   ========================================================= */
document.querySelectorAll('[data-acc]').forEach(item => {
  item.querySelector('.accordion-head').addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

/* =========================================================
   12. SLIDER CAROUSEL (GỢI Ý + ĐÃ XEM GẦN ĐÂY)
   ========================================================= */
function getVisible() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 880) return 2;
  return 4;
}

function createSlider(carouselEl, dotsEl, prevEl, nextEl) {
  let idx = 0, total = 0;

  function render(items) {
    idx = 0;
    total = items.length;
    carouselEl.innerHTML = items.map(buildCardHTML).join('');
    carouselEl.style.transform = 'translateX(0)';
    buildDots();
  }

  function buildDots() {
    if (!dotsEl) return;
    const pages = Math.ceil(total / getVisible());
    dotsEl.innerHTML = Array.from({ length: pages }, (_, i) =>
      `<button class="${i === 0 ? 'active' : ''}" data-page="${i}" aria-label="Trang ${i + 1}"></button>`
    ).join('');
    dotsEl.querySelectorAll('button').forEach(btn =>
      btn.addEventListener('click', () => go(parseInt(btn.dataset.page) * getVisible()))
    );
  }

  function go(index) {
    const vis = getVisible();
    idx = Math.max(0, Math.min(index, Math.max(0, total - vis)));
    const cardW = carouselEl.children[0] ? carouselEl.children[0].offsetWidth + 20 : 0;
    carouselEl.style.transform = `translateX(-${idx * cardW}px)`;
    if (dotsEl) {
      const page = Math.floor(idx / vis);
      dotsEl.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === page));
    }
  }

  function prev() { go(idx - getVisible()); }
  function next() { const n = idx + getVisible(); go(n >= total ? 0 : n); }

  if (prevEl) prevEl.addEventListener('click', prev);
  if (nextEl) nextEl.addEventListener('click', next);

  let startX = 0;
  carouselEl.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  carouselEl.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
  }, { passive: true });

  window.addEventListener('resize', () => { buildDots(); go(0); });
  return { render };
}

const suggestSlider = createSlider(
  document.getElementById('suggestCarousel'),
  document.getElementById('suggestDots'),
  document.getElementById('navPrev'),
  document.getElementById('navNext')
);

const recentSlider = createSlider(
  document.getElementById('recentCarousel'),
  document.getElementById('recentDots'),
  document.getElementById('recentPrev'),
  document.getElementById('recentNext')
);

function renderSuggestSlider(items) { suggestSlider.render(items); }

function renderRecentShelf() {
  const list = recentlyViewed.filter(id => id !== currentId)
    .slice(0, 9).map(id => PRODUCTS[id]).filter(Boolean);
  const section = document.getElementById('recentSection');
  if (list.length === 0) { section.classList.add('hidden'); return; }
  section.classList.remove('hidden');
  recentSlider.render(list);
}

function buildCardHTML(p) {
  const img = p.images[0];
  const colorsHTML = p.colors.map(c => `<span style="background:${c.hex}"></span>`).join('');
  const priceOldHTML = p.oldPrice ? `<span class="pprice-old">${formatVND(p.oldPrice)}</span>` : '';
  const ratingHTML = p.reviewCount > 0
    ? `<div class="prating"><span class="prating-stars">${starString(p.rating)}</span><span class="prating-count">(${p.reviewCount})</span></div>`
    : `<div class="prating prating-empty">Chưa có đánh giá</div>`;
  return `
    <article class="pcard" data-id="${p.id}">
      <div class="pimg"><img src="${img}" alt="${p.name}"></div>
      <div class="pbody">
        <div class="pname">${p.name}</div>
        <div class="pcolors">${colorsHTML}</div>
        ${ratingHTML}
        <div class="pprice">${formatVND(p.price)}${priceOldHTML}</div>
        <button class="padd" data-id="${p.id}">THÊM VÀO GIỎ</button>
      </div>
    </article>`;
}

function selectProduct(id) {
  if (id === currentId) return;
  renderProduct(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Click trên shelf: bấm card → mở sản phẩm, bấm "Thêm vào giỏ" → addToCart */
document.querySelectorAll('.shelf').forEach(shelf => {
  shelf.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.padd');
    if (addBtn) { e.stopPropagation(); addToCart(addBtn.dataset.id, 1); return; }
    const card = e.target.closest('.pcard');
    if (card) selectProduct(card.dataset.id);
  });
});

/* =========================================================
   13. SỰ KIỆN CHO HEADER & FOOTER ĐƯỢC RENDER ĐỘNG
       Gọi hàm này SAU KHI renderHeader() & renderFooter() xong
   ========================================================= */
function setupDynamicEvents() {
  /* --- Tìm kiếm --- */
  const searchBar    = document.getElementById('searchBar');
  const searchInput  = document.getElementById('searchInput');
  const searchBtn    = document.getElementById('searchBtn');
  const searchClose  = document.getElementById('searchCloseBtn');
  const searchSubmit = document.getElementById('searchSubmit');

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchBar.classList.toggle('open');
      if (searchBar.classList.contains('open')) setTimeout(() => searchInput.focus(), 200);
    });
  }
  if (searchClose)  searchClose.addEventListener('click',  () => searchBar.classList.remove('open'));
  if (searchSubmit) searchSubmit.addEventListener('click', runSearch);
  if (searchInput)  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') runSearch(); });

  function runSearch() {
    const q = (searchInput.value || '').trim().toLowerCase();
    if (!q) { searchBar.classList.remove('open'); return; }
    const match = Object.values(PRODUCTS).find(p => p.name.toLowerCase().includes(q));
    if (match) { selectProduct(match.id); showToast(`Đã tìm thấy: ${match.name}`); }
    else showToast(`Không tìm thấy sản phẩm cho "${q}"`);
    searchBar.classList.remove('open');
  }

  /* --- Tài khoản dropdown --- */
  const accountBtn      = document.getElementById('accountBtn');
  const accountDropdown = document.getElementById('accountDropdown');
  if (accountBtn && accountDropdown) {
    accountBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      accountDropdown.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!accountDropdown.contains(e.target) && e.target !== accountBtn)
        accountDropdown.classList.remove('open');
    });
  }

  /* --- Icon trái tim trên header --- */
  const headerWishBtn = document.getElementById('headerWishBtn');
  if (headerWishBtn) {
    headerWishBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleWishlist(currentId);
    });
  }

  /* --- Đăng ký nhận tin (footer) --- */
  const newsletterBtn   = document.getElementById('newsletter-btn');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterError = document.getElementById('newsletter-error');
  if (newsletterBtn && newsletterEmail) {
    newsletterBtn.addEventListener('click', () => {
      const email = newsletterEmail.value.trim();
      if (!email) {
        if (newsletterError) newsletterError.style.display = 'block';
      } else {
        if (newsletterError) newsletterError.style.display = 'none';
        showToast('Đăng ký nhận tin thành công!');
        newsletterEmail.value = '';
      }
    });
  }
}

/* =========================================================
   14. KHỞI ĐỘNG CHÍNH (DOMContentLoaded)
   ========================================================= */
document.addEventListener('DOMContentLoaded', async function () {
  /* 1. Render header + footer vào placeholder */
  if (typeof renderHeader === 'function') renderHeader();
  if (typeof renderFooter === 'function') renderFooter();

  /* 2. Gắn sự kiện cho các phần tử vừa render xong */
  setupDynamicEvents();

  /* 3. Tải trạng thái lưu trữ (giỏ hàng, yêu thích, lịch sử xem) */
  await loadState();

  /* 4. Render sản phẩm đầu tiên */
  renderProduct(currentId);

  /* 5. Đồng bộ badge ngay khi trang vừa load */
  updateCartBadge();
  updateWishlistBadge();
});


/* =========================================================
   15. GIỎ HÀNG OFFCANVAS (MENU TRƯỢT NGANG)
   ========================================================= */
function renderCartOffcanvas() {
    if (typeof CartManager === 'undefined') return;
    
    const cart = CartManager.getCart(); 
    const cartItemsEl = document.getElementById('cartItems');
    const cartEmptyEl = document.getElementById('cartEmpty');
    const cartFooterEl = document.getElementById('cartFooter');
    const cartTotalEl = document.getElementById('cartTotal');

    if (!cartItemsEl) return;

    if (cart.length === 0) {
      cartItemsEl.style.display = 'none';
      cartItemsEl.innerHTML = '';
      if (cartEmptyEl) cartEmptyEl.style.display = 'flex';
      if (cartFooterEl) cartFooterEl.style.display = 'none';
      return;
    }

    let total = 0;
    let html = '';
    
    cart.forEach(function (item) {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      html += `
        <div class="cart-offcanvas-item" style="
          display:flex; gap:12px; background:#fff;
          border:1px solid #E3D7C7; border-radius:10px;
          padding:12px; margin-bottom:10px;
        ">
          <img src="${item.image}" alt="${item.name}"
               style="width:72px; height:80px; object-fit:cover; border-radius:6px; flex-shrink:0; background:#F5EFE6;">
          <div style="flex:1; min-width:0;">
            <div style="font-size:13px; font-weight:600; color:#2D231B; line-height:1.3; margin-bottom:4px;">${item.name}</div>
            <div style="font-size:12px; color:#9C8E7E; margin-bottom:6px;">Màu: ${item.colorLabel}</div>
            <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
              <div style="display:flex; align-items:center; border:1px solid #E3D7C7; border-radius:6px; overflow:hidden;">
                <button class="cart-qty-btn" data-action="minus" data-cart-id="${item.cartItemId}"
                        style="width:28px; height:28px; background:none; border:none; cursor:pointer; font-size:16px; color:#3A2E26; display:flex; align-items:center; justify-content:center;">−</button>
                <span style="width:28px; text-align:center; font-size:13px; font-weight:600;">${item.qty}</span>
                <button class="cart-qty-btn" data-action="plus" data-cart-id="${item.cartItemId}"
                        style="width:28px; height:28px; background:none; border:none; cursor:pointer; font-size:16px; color:#3A2E26; display:flex; align-items:center; justify-content:center;">+</button>
              </div>
              <div style="font-size:14px; font-weight:700; color:#413125;">${formatVND(itemTotal)}</div>
            </div>
          </div>
          <button class="cart-remove-btn" data-cart-id="${item.cartItemId}"
                  style="background:none; border:none; cursor:pointer; color:#C0A898; font-size:18px; padding:0; align-self:flex-start;"
                  title="Xóa">×</button>
        </div>
      `;
    });

    cartItemsEl.innerHTML = html;
    cartItemsEl.style.display = 'block';
    if (cartEmptyEl) cartEmptyEl.style.display = 'none';
    if (cartFooterEl) cartFooterEl.style.display = 'block';
    if (cartTotalEl) cartTotalEl.textContent = formatVND(total);

    // Gắn sự kiện cho nút + / −
    cartItemsEl.querySelectorAll('.cart-qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cartItemId = this.dataset.cartId;
        const action = this.dataset.action;
        const currentItem = CartManager.getCart().find(i => i.cartItemId === cartItemId);
        
        if (currentItem) {
            const newQty = action === 'plus' ? currentItem.qty + 1 : currentItem.qty - 1;
            CartManager.updateQty(cartItemId, newQty); 
            renderCartOffcanvas(); 
        }
      });
    });

    // Gắn sự kiện cho nút Xóa
    cartItemsEl.querySelectorAll('.cart-remove-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        CartManager.removeItem(this.dataset.cartId); 
        renderCartOffcanvas(); 
      });
    });
}

// Bắt sự kiện khi click vào Icon giỏ hàng trên Header thì sẽ vẽ lại Menu trượt
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const cartOffcanvas = document.getElementById('cartOffcanvas');
        if (cartOffcanvas) {
            cartOffcanvas.addEventListener('show.bs.offcanvas', function () {
                renderCartOffcanvas();
            });
        }
    }, 800);
});

// Cập nhật lại giao diện menu trượt ngay lập tức nếu nó đang mở mà khách lại bấm Thêm vào giỏ
window.addEventListener(CartManager.EVENT_NAME, function() {
    const cartOffcanvas = document.getElementById('cartOffcanvas');
    if (cartOffcanvas && cartOffcanvas.classList.contains('show')) {
        renderCartOffcanvas();
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const buyNowBtn = document.getElementById('buyNow');

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function(e) {
      e.preventDefault();

      const pTitle = document.getElementById('pTitle')?.textContent || "Sản phẩm Lady Rose";
      const priceText = document.getElementById('pPriceNow')?.textContent || "0";
      const pPrice = parseInt(priceText.replace(/[^0-9]/g, ''), 10) || 0;
      const pImage = document.getElementById('mainImg')?.src || "";

      // ĐÃ SỬA: Tìm chính xác class `.selected` của trang chi tiết
      const activeSwatch = document.querySelector('#swatchesContainer .swatch.selected');
      const pColor = activeSwatch ? activeSwatch.getAttribute('data-color') : "Tiêu chuẩn";

      // ĐÃ SỬA: Tìm chính xác class `.selected` của nút chọn kích cỡ
      const activeSize = document.querySelector('#sizesContainer .size-box.selected');
      const pSize = activeSize ? activeSize.textContent.trim() : "";
      const pQty = parseInt(document.getElementById('qtyInput')?.value, 10) || 1;

      // Lấy ID gốc từ URL
      const urlParams = new URLSearchParams(window.location.search);
      let realProductId = urlParams.get('id') || 'sp-detail';

      // Tạo mã cartItemId đồng bộ hoàn toàn với cart.js mới và checkout.js mới
      let customColorKey = 'den';
      if (pColor) {
          const lowerColor = pColor.toLowerCase();
          if (lowerColor.includes('đen')) customColorKey = 'den';
          else if (lowerColor.includes('nâu')) customColorKey = 'nau';
          else if (lowerColor.includes('đỏ')) customColorKey = 'do';
          else if (lowerColor.includes('trắng')) customColorKey = 'trang';
          else if (lowerColor.includes('hồng')) customColorKey = 'hong';
          else if (lowerColor.includes('kem')) customColorKey = 'kem';
          else if (lowerColor.includes('xanh')) customColorKey = 'xanh';
      }
      const cartItemId = `${realProductId}_${customColorKey}`;

      const currentProduct = {
        cartItemId: cartItemId,
        id: realProductId,
        name: pTitle,
        price: pPrice,
        image: pImage, // Lấy trực tiếp ảnh lớn đang hiển thị trên màn hình
        colorLabel: pColor,
        size: pSize,
        qty: pQty
      };

      // Đọc và ghi đè vào đúng Key bộ nhớ chung của hệ thống
      let cart = [];
      const STORAGE_KEY = "ladyrose_cart_local";
      try {
        cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch (err) {
        cart = [];
      }

      const existingItemIndex = cart.findIndex(item => item.cartItemId === currentProduct.cartItemId);

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].qty += currentProduct.qty;
        // Cập nhật lại ảnh thực tế đề phòng dữ liệu cũ bị lỗi logo
        cart[existingItemIndex].image = currentProduct.image; 
      } else {
        cart.push(currentProduct);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

      // Thông báo cập nhật huy hiệu giỏ hàng toàn cục
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: { items: cart } }));

      // Chuyển thẳng sang trang thanh toán của bạn
      window.location.href = 'checkout.html';
    });
  }
});
