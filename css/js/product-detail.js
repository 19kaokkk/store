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
    desc: 'Chất liệu: Da chần kim cương phối dây xích. ',
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
      "images/Túi xách tay LR Lyra/Túi xách tay LR Lyra - Đen.jpg",
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
      "images/Ví cầm tay Handle/Xanh 1.jpg",
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
   2. TRẠNG THÁI ỨNG DỤNG
   ========================================================= */
let currentId = 'elysia';
let cart = [];
let wishlist = new Set();
let recentlyViewed = [];

async function loadState() {
  try {
    const c = await window.storage.get('lr_cart');
    if (c) cart = JSON.parse(c.value);
  } catch (e) { }
  try {
    const w = await window.storage.get('lr_wishlist');
    if (w) wishlist = new Set(JSON.parse(w.value));
  } catch (e) { }
  try {
    const r = await window.storage.get('lr_recent');
    if (r) recentlyViewed = JSON.parse(r.value);
  } catch (e) { }
}
async function saveCart() { try { await window.storage.set('lr_cart', JSON.stringify(cart)); } catch (e) { } }
async function saveWishlist() { try { await window.storage.set('lr_wishlist', JSON.stringify([...wishlist])); } catch (e) { } }
async function saveRecent() { try { await window.storage.set('lr_recent', JSON.stringify(recentlyViewed)); } catch (e) { } }

/* =========================================================
   3. RENDER TRANG SẢN PHẨM THEO ID
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

  const swatchWrap = document.getElementById('swatchesContainer');
  swatchWrap.innerHTML = p.colors.map((c, i) =>
    `<span class="swatch ${i === 0 ? 'selected' : ''}" style="background:${c.hex}" data-color="${c.name}" title="${c.name}"></span>`
  ).join('');

  const sizeWrap = document.getElementById('sizesContainer');
  sizeWrap.innerHTML = p.sizes.map((s, i) =>
    `<div class="size-box ${i === 0 ? 'selected' : ''}" data-size="${s}">${s}</div>`
  ).join('');

  const qtyInput = document.getElementById('qtyInput');
  qtyInput.value = 1;
  qtyInput.max = p.stock;

  const mainWishBtn = document.getElementById('wishBtn');
  if (mainWishBtn) mainWishBtn.classList.toggle('active', wishlist.has(p.id));

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
          <span class="review-name">${r.name}</span><span class="review-date">${r.date}</span>
          <div class="review-text">${r.text}</div>
          <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
        </div>
      </div>`).join('');
  } else {
    document.getElementById('reviewsStars').textContent = '★★★★★';
    document.getElementById('reviewsScoreNum').textContent = '(0)';
    document.getElementById('reviewsTotal').textContent = 'Chưa có đánh giá';
    document.getElementById('reviewsList').innerHTML = '<p style="color:var(--ink-soft);font-size:14px;padding:20px 0;">Hãy là người đầu tiên đánh giá sản phẩm này!</p>';
  }

  const suggestions = Object.values(PRODUCTS).filter(x => x.id !== p.id);
  renderSuggestSlider(suggestions);

  recentlyViewed = [p.id, ...recentlyViewed.filter(x => x !== p.id)].slice(0, 8);
  saveRecent();
  renderRecentShelf();

  updateWishlistBadges();
}

function renderRecentShelf() {
  const list = recentlyViewed.filter(id => id !== currentId).slice(0, 9).map(id => PRODUCTS[id]).filter(Boolean);
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

// Event delegation cho sản phẩm đề xuất / đã xem
document.querySelectorAll('.shelf').forEach(shelf => {
  shelf.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.padd');
    if (addBtn) { e.stopPropagation(); addToCart(addBtn.dataset.id, 1); return; }
    const card = e.target.closest('.pcard');
    if (card) selectProduct(card.dataset.id);
  });
});

/* =========================================================
   4. GALLERY ẢNH
   ========================================================= */
let galleryImages = [];
let activeIndex = 0;

function renderGallery(p) {
  galleryImages = p.images;
  const thumbsWrap = document.getElementById('thumbs');
  thumbsWrap.innerHTML = galleryImages.map((img, i) =>
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
  const t = thumbs[activeIndex];
  t.classList.add('active');
  const mainImg = document.getElementById('mainImg');
  mainImg.style.opacity = 0;
  setTimeout(() => {
    mainImg.src = galleryImages[activeIndex];
    mainImg.style.opacity = 1;
  }, 150);
  t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
}

document.getElementById('mainImg').style.transition = 'opacity .15s ease';

// Option swatches & sizes
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

// Stepper số lượng
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
  let v = parseInt(qtyInput.value) || 1;
  qtyInput.value = Math.min(max, Math.max(1, v));
});

/* =========================================================
   5. GIỎ HÀNG (Đồng bộ ID mới: "cartBadge")
   ========================================================= */
function bump(el) {
  if (!el) return;
  el.style.transform = 'scale(1.3)';
  setTimeout(() => el.style.transform = 'scale(1)', 150);
}
function totalCartQty() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function updateCartBadges() {
  const total = totalCartQty();
  // Khớp với ID "cartBadge" ở header động mới
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = total;
    badge.style.display = total === 0 ? 'none' : 'inline-block';
    bump(badge);
  }
}

function addToCart(productId, qty) {
  const existing = cart.find(item => item.id === productId);
  if (existing) existing.qty += qty;
  else cart.push({id: productId, qty});
  updateCartBadges();
  saveCart();
  const p = PRODUCTS[productId];
  showToast(`Đã thêm ${qty} "${p ? p.name : 'sản phẩm'}" vào giỏ hàng`);
}

document.getElementById('addCart').addEventListener('click', () => {
  addToCart(currentId, parseInt(qtyInput.value) || 1);
});
document.getElementById('buyNow').addEventListener('click', () => {
  addToCart(currentId, parseInt(qtyInput.value) || 1);
  alert('Đang chuyển đến trang thanh toán...');
});

/* =========================================================
   6. YÊU THÍCH
   ========================================================= */
function updateWishlistBadges() {
  const total = wishlist.size;
  const mainWishBtn = document.getElementById('wishBtn');
  if (mainWishBtn) mainWishBtn.classList.toggle('active', wishlist.has(currentId));
  
  // Đồng bộ trạng thái icon trên Header nếu có
  const headerWishIcon = document.querySelector('.header-icons a[aria-label="Yêu thích"] i');
  if (headerWishIcon) {
    headerWishIcon.style.color = wishlist.has(currentId) ? '#E54A5A' : '';
  }
}

function toggleWishlist(productId) {
  const wasWished = wishlist.has(productId);
  if (wasWished) wishlist.delete(productId);
  else wishlist.add(productId);
  updateWishlistBadges();
  saveWishlist();
  showToast(!wasWished ? 'Đã thêm vào danh sách yêu thích' : 'Đã bỏ khỏi danh sách yêu thích');
}
document.getElementById('wishBtn').addEventListener('click', () => toggleWishlist(currentId));

/* =========================================================
   7. ACCORDION MÔ TẢ
   ========================================================= */
document.querySelectorAll('[data-acc]').forEach(item => {
  item.querySelector('.accordion-head').addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

/* =========================================================
   8. SLIDER CHUNG
   ========================================================= */
function getVisible() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 880) return 2;
  return 4;
}

function createSlider(carouselEl, dotsEl, prevEl, nextEl) {
  let idx = 0;
  let total = 0;
  function visible() { return getVisible(); }

  function render(items) {
    idx = 0;
    total = items.length;
    carouselEl.innerHTML = items.map(buildCardHTML).join('');
    carouselEl.style.transform = 'translateX(0)';
    buildDots();
  }

  function buildDots() {
    if (!dotsEl) return;
    const pages = Math.ceil(total / visible());
    dotsEl.innerHTML = Array.from({ length: pages }, (_, i) =>
      `<button class="${i === 0 ? 'active' : ''}" data-page="${i}" aria-label="Trang ${i + 1}"></button>`
    ).join('');
    dotsEl.querySelectorAll('button').forEach(btn =>
      btn.addEventListener('click', () => go(parseInt(btn.dataset.page) * visible()))
    );
  }

  function go(index) {
    const vis = visible();
    const max = Math.max(0, total - vis);
    idx = Math.max(0, Math.min(index, max));
    const cardW = carouselEl.children[0] ? carouselEl.children[0].offsetWidth + 20 : 0;
    carouselEl.style.transform = `translateX(-${idx * cardW}px)`;
    if (dotsEl) {
      const page = Math.floor(idx / vis);
      dotsEl.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === page));
    }
  }

  function prev() { go(idx - visible()); }
  function next() { const n = idx + visible(); go(n >= total ? 0 : n); }

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

/* =========================================================
   9. ĐĂNG KÝ NHẬN TIN (FOOTER)
   ========================================================= */
function setupFooterEvents() {
  const newsletterBtn = document.getElementById('newsletter-btn');
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
   10. KHỞI ĐỘNG CHƯƠNG TRÌNH (Tích hợp Render Động)
   ========================================================= */
document.addEventListener('DOMContentLoaded', async function () {
  // 1. Render giao diện dùng chung trước
  if (typeof renderHeader === 'function') renderHeader();
  if (typeof renderFooter === 'function') renderFooter();

  // 2. Tải dữ liệu trạng thái từ bộ nhớ
  await loadState();

  // 3. Render thông tin chi tiết sản phẩm và các Slider gắn liền
  renderProduct(currentId);
  updateCartBadges();

  // 4. Kích hoạt sự kiện cho Footer vừa sinh ra
  setupFooterEvents();
});
