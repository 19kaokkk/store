
(function injectCardCSS() {
  const style = document.createElement('style');
  style.textContent = `
     .pcard-wish {
       position: absolute; top: 10px; right: 10px;
       width: 34px; height: 34px;
       background: rgba(255,255,255,0.85); border: none; border-radius: 50%;
       cursor: pointer; display: flex; align-items: center; justify-content: center;
       box-shadow: 0 1px 4px rgba(0,0,0,0.15);
       transition: background 0.2s, transform 0.15s;
       color: #c0a898; z-index: 2;
     }
     .pcard-wish:hover { background: #fff; transform: scale(1.12); }
     .pcard-wish.active { color: #e54a5a; }
     .pcard-wish svg { width: 16px; height: 16px; pointer-events: none; }
     .padd.added {
       background: #2e8b3a !important; color: #fff !important;
       border-color: #2e8b3a !important; cursor: default;
     }
     .pcolors-row { display:flex; align-items:center; gap:8px; margin:5px 0 6px; }
     .pcard-color-label { font-size:11px; color:#9C8E7E; min-width:28px; white-space:nowrap; }
     .pcolors { display:flex; gap:5px; flex-wrap:wrap; }
     .pcard-swatch {
       display:inline-block; width:15px; height:15px; border-radius:50%;
       border:1.5px solid transparent; cursor:pointer;
       transition:transform .15s, border-color .15s, outline .15s;
       outline:2px solid transparent; outline-offset:2px;
     }
     .pcard-swatch:hover { transform:scale(1.12); }
     .pcard-swatch-active { border-color:#555; outline-color:#555; transform:scale(1.15); }
     .pcard-actions { display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:8px; }
     .pcard-buy, .padd {
       font-size:10px; font-weight:600; letter-spacing:.05em;
       padding:6px 3px; border-radius:6px; cursor:pointer;
       border:1px solid; transition:opacity .15s, background .15s; text-align:center;
     }
     .pcard-buy { background:#2D231B; color:#fff; border-color:#2D231B; }
     .pcard-buy:hover { opacity:.8; }
     .padd { background:transparent; color:#2D231B; border-color:#2D231B; }
     .padd:hover { background:#f5f0eb; }
     .pcard-img { transition:transform .35s ease, opacity .12s ease; display:block; }
     .pimg img  { transition:transform .35s ease, opacity .12s ease; }
  `;
  document.head.appendChild(style);
})();

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
    colors: [{ name: 'Đỏ mận', hex: '#5E1A22', key: 'do' }, { name: 'Đen', hex: '#1B1B1B', key: 'den' }],
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
    colors: [{ name: 'Đen', hex: '#1B1B1B', key: 'den' }, { name: 'Nâu', hex: '#6B4226', key: 'nau' }],
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
    colors: [{ name: 'Đen', hex: '#1B1B1B', key: 'den' }, { name: 'Đỏ mận', hex: '#5E1A22', key: 'do' }],
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
    colors: [{ name: 'Hồng', hex: '#F3B8C4', key: 'hong' }, { name: 'Xanh nhạt', hex: '#AEDCE8', key: 'xanh' }],
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
    colors: [{ name: 'Đen', hex: '#1B1B1B', key: 'den' }, { name: 'Đỏ mận', hex: '#5E1A22', key: 'do' }],
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
    colors: [{ name: 'Đen', hex: '#1B1B1B', key: 'den' }, { name: 'Kem', hex: '#E9DCC9', key: 'kem' }],
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
    colors: [{ name: 'Hồng', hex: '#F3B8C4', key: 'hong' }, { name: 'Trắng', hex: '#ffffff', key: 'trang' }],
    sizes: ['22', '28'],
    desc: 'Chất liệu: Da vân nhẹ cao cấp. Kèm móc khóa nơ đính đá.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: []
  },
  lyra: {
    id: 'lyra', name: 'Túi xách tay LR Lyra', category: 'Túi Xách Tay',
    price: 1435000, oldPrice: null, sold: 0, stock: 45, rating: 0, reviewCount: 0,
    images: [
      // ĐÃ SỬA: Thêm lại ảnh màu Đen chuẩn cấu trúc không chứa lỗi dấu cách thừa
      "images/Túi xách tay LR Lyra/Túi xách tay LR Lyra - Nâu.jpg",
      "images/Túi xách tay LR Lyra/Nâu 1.jpg"
    ],
    colors: [{ name: 'Nâu', hex: '#BF9A7E', key: 'nau' }],
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
    colors: [{ name: 'Đen', hex: '#000000', key: 'den' }, { name: 'Nâu', hex: '#BF9A7E', key: 'nau' }],
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
    colors: [{ name: 'Xanh', hex: '#4E76A3', key: 'xanh' }, { name: 'Kem', hex: '#F0DBCD', key: 'kem' }],
    sizes: ['18'],
    desc: 'Chất liệu: Da PU cao cấp. Phụ kiện khóa vàng 18K. Ví cầm tay nhỏ gọn.',
    warranty: 'Bảo hành 12 tháng cho lỗi khóa, chỉ may và phụ kiện kim loại. Đổi mới trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất.',
    reviews: []
  }
};


let currentId = 'elysia';
let cart = [];
let wishlist = new Set();
let recentlyViewed = [];

const WISHLIST_KEY = 'ladyrose_wishlist';

async function loadState() {
  try {
    const w = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    wishlist = new Set(w);
  } catch (e) {}
  try { recentlyViewed = JSON.parse(localStorage.getItem('lr_recent') || '[]'); } catch (e) {}
}

function saveCart() {}
function saveRecent() {
  try { localStorage.setItem('lr_recent', JSON.stringify(recentlyViewed)); } catch (e) {}
}

function saveWishlist() {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify([...wishlist]));
    if (typeof syncGlobalBadges === 'function') syncGlobalBadges();
  } catch (e) {}
}


function bump(el) {
  if (!el) return;
  el.style.transform = 'scale(1.3)';
  setTimeout(() => el.style.transform = 'scale(1)', 150);
}

function totalCartQty() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function updateCartBadge() {
  const total = typeof CartManager !== 'undefined'
    ? CartManager.getTotalQuantity()
    : totalCartQty();
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  badge.textContent = total;
  badge.style.display = total === 0 ? 'none' : 'inline-flex';
  badge.classList.toggle('show', total > 0);
  bump(badge);
}

function addToCart(productId, qty) {
  const realId = toCatalogId(productId);
  const product = PRODUCTS[productId];
  if (typeof CartManager !== 'undefined') {
    CartManager.addFromCatalog(realId, 'den', qty);
  }
  if (typeof syncGlobalBadges === 'function') syncGlobalBadges();
  else updateCartBadge();
  const p = product;
  showToast(`Đã thêm ${qty} "${p ? p.name : 'sản phẩm'}" vào giỏ hàng`);
}


function updateWishlistBadge() {
  if (typeof syncGlobalBadges === 'function') {
    syncGlobalBadges();
  } else {
    const total = wishlist.size;
    const wishBadge = document.getElementById('wishlistBadge');
    if (wishBadge) {
      wishBadge.textContent = total;
      wishBadge.style.display = total === 0 ? 'none' : 'inline-flex';
      bump(wishBadge);
    }
  }
  const mainWishBtn = document.getElementById('wishBtn');
  if (mainWishBtn) mainWishBtn.classList.toggle('active', wishlist.has(toCatalogId(currentId)));
}

function toggleWishlist(productId) {
  const cid = toCatalogId(productId);
  const wasIn = wishlist.has(cid);
  if (wasIn) wishlist.delete(cid);
  else wishlist.add(cid);
  updateWishlistBadge();
  saveWishlist();
  showToast(!wasIn ? 'Đã thêm vào danh sách yêu thích' : 'Đã bỏ khỏi danh sách yêu thích');
}


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
    `<span class="swatch ${i === 0 ? 'selected' : ''}" style="background:${c.hex}" data-color="${c.name}" data-key="${c.key || _colorNameToKey(c.name)}" title="${c.name}"></span>`
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

  const isWishedNow = wishlist.has(toCatalogId(id));
  const wBtn = document.getElementById('wishBtn');
  if (wBtn) {
    wBtn.classList.toggle('active', isWishedNow);
    const svg = wBtn.querySelector('svg');
    if (svg) svg.setAttribute('fill', isWishedNow ? 'currentColor' : 'none');
  }
  if (typeof syncGlobalBadges === 'function') syncGlobalBadges();
  else { updateWishlistBadge(); updateCartBadge(); }
}


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


document.getElementById('addCart').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('qtyInput').value) || 1;
  
  const realProductId = toCatalogId(currentId);

  const activeColor = document.querySelector('#swatchesContainer .swatch.selected');
  let colorKey = 'den'; 
  if (activeColor) {
      colorKey = activeColor.getAttribute('data-key') || _colorNameToKey(activeColor.getAttribute('title') || '');
  }

  if (typeof CartManager !== 'undefined') {
      CartManager.addFromCatalog(realProductId, colorKey, qty);
      showToast('Đã thêm sản phẩm vào giỏ hàng!');
      
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
  const realProductId = toCatalogId(currentId);

  const activeSwatch = document.querySelector('#swatchesContainer .swatch.selected');
  const colorKey = activeSwatch
    ? (activeSwatch.getAttribute('data-key') || _colorNameToKey(activeSwatch.getAttribute('title') || ''))
    : 'den';
  const qty = parseInt(document.getElementById('qtyInput')?.value, 10) || 1;

  if (typeof CartManager !== 'undefined') {
    CartManager.addFromCatalog(realProductId, colorKey, qty);
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: { items: CartManager.getCart() } }));
  }
  setTimeout(() => { window.location.href = 'cart.html'; }, 200);
});

document.getElementById('wishBtn').addEventListener('click', () => {
  toggleWishlist(toCatalogId(currentId));
});


document.querySelectorAll('[data-acc]').forEach(item => {
  item.querySelector('.accordion-head').addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

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
  const defaultColorIdx = 0;
  const defaultColor = p.colors[defaultColorIdx];
  const img = p.images[0];
  const priceOldHTML = p.oldPrice ? `<span class="pprice-old">${formatVND(p.oldPrice)}</span>` : '';
  const ratingHTML = p.reviewCount > 0
    ? `<div class="prating"><span class="prating-stars">${starString(p.rating)}</span><span class="prating-count">(${p.reviewCount})</span></div>`
    : `<div class="prating prating-empty">Chưa có đánh giá</div>`;
  const isWished = wishlist.has(toCatalogId(p.id));

  const swatchesHTML = p.colors.map((c, i) => {
    const needBorder = ['#ffffff','#ede3d3','#fbcfc0','#f3b8c4','#aedce8','#e9dcc9'].includes(c.hex.toLowerCase());
    const borderStyle = needBorder ? 'box-shadow:inset 0 0 0 1px #ccc;' : '';
    return `<span class="pcard-swatch ${i === 0 ? 'pcard-swatch-active' : ''}"
              style="background:${c.hex};${borderStyle}"
              data-color-idx="${i}"
              data-color-name="${c.name}"
              title="${c.name}"></span>`;
  }).join('');

  return `
    <article class="pcard" data-id="${p.id}" data-selected-color="0">
      <div class="pimg" style="position:relative;">
        <img class="pcard-img" src="${img}" alt="${p.name}">
        <button class="pcard-wish ${isWished ? 'active' : ''}" data-id="${p.id}" aria-label="Yêu thích" title="Yêu thích">
          <svg viewBox="0 0 24 24" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">
            <path d="M12 21s-7.5-4.6-10-9C.5 8.4 2.5 4 7 4c2.3 0 4 1.4 5 3 1-1.6 2.7-3 5-3 4.5 0 6.5 4.4 5 8-2.5 4.4-10 9-10 9z"/>
          </svg>
        </button>
      </div>
      <div class="pbody">
        <div class="pname">${p.name}</div>
        <div class="pcolors-row">
          <span class="pcard-color-label">${defaultColor.name}</span>
          <div class="pcolors">${swatchesHTML}</div>
        </div>
        ${ratingHTML}
        <div class="pprice">${formatVND(p.price)}${priceOldHTML}</div>
        <div class="pcard-actions">
          <button class="pcard-buy" data-id="${p.id}">MUA NGAY</button>
          <button class="padd" data-id="${p.id}">THÊM GIỎ</button>
        </div>
      </div>
    </article>`;
}

function _colorNameToKey(colorName) {
  const n = colorName.toLowerCase();
  if (n.includes('đen'))   return 'den';
  if (n.includes('nâu'))   return 'nau';
  if (n.includes('đỏ'))    return 'do';
  if (n.includes('trắng')) return 'trang';
  if (n.includes('hồng'))  return 'hong';
  if (n.includes('kem'))   return 'kem';
  if (n.includes('xanh'))  return 'xanh';
  return 'den';
}

const PRODUCT_ID_TO_CATALOG = {
  'bella': 'lr-bella-tay', 'lyra': 'lr-lyra', 'grace': 'lr-grace',
  'florence': 'lr-florence', 'classy': 'lr-classy', 'celeste': 'celeste-vai',
  'nova': 'nova', 'aura': 'lr-aura-cheo', 'elysia': 'lr-elysia-cheo', 'handle': 'vi-handle'
};

function toCatalogId(shortId) {
  return PRODUCT_ID_TO_CATALOG[shortId] || shortId;
}

function selectProduct(id) {
  if (id === currentId) return;
  renderProduct(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Điều hướng hành động click trên Card */
document.querySelectorAll('.shelf').forEach(shelf => {
  shelf.addEventListener('click', (e) => {

    const wishBtn = e.target.closest('.pcard-wish');
    if (wishBtn) {
      e.stopPropagation();
      const pid = wishBtn.dataset.id;
      toggleWishlist(pid);
      const isNowWished = wishlist.has(toCatalogId(pid));
      wishBtn.classList.toggle('active', isNowWished);
      const svg = wishBtn.querySelector('svg');
      if (svg) svg.setAttribute('fill', isNowWished ? 'currentColor' : 'none');
      return;
    }

    const swatchDot = e.target.closest('.pcard-swatch');
    if (swatchDot) {
      e.stopPropagation();
      const card = swatchDot.closest('.pcard');
      if (!card) return;
      const pid = card.dataset.id;
      const product = PRODUCTS[pid];
      if (!product) return;
      const colorIdx = parseInt(swatchDot.dataset.colorIdx, 10);

      card.dataset.selectedColor = colorIdx;

      const imgEl = card.querySelector('.pcard-img');
      if (imgEl && product.images[colorIdx]) {
        imgEl.style.opacity = '0';
        setTimeout(() => { imgEl.src = product.images[colorIdx]; imgEl.style.opacity = '1'; }, 120);
      }

      const colorLabel = card.querySelector('.pcard-color-label');
      if (colorLabel) colorLabel.textContent = swatchDot.dataset.colorName;

      card.querySelectorAll('.pcard-swatch').forEach((s, i) =>
        s.classList.toggle('pcard-swatch-active', i === colorIdx)
      );
      return;
    }

    const buyBtn = e.target.closest('.pcard-buy');
    if (buyBtn) {
      e.stopPropagation();
      const card = buyBtn.closest('.pcard');
      const pid = card ? card.dataset.id : buyBtn.dataset.id;
      const colorIdx = card ? parseInt(card.dataset.selectedColor || '0', 10) : 0;
      const product = PRODUCTS[pid];
      if (!product) return;

      const realProductId = toCatalogId(pid);
      const colorKey = _colorNameToKey(product.colors[colorIdx]?.name || '');

      if (typeof CartManager !== 'undefined') {
        CartManager.addFromCatalog(realProductId, colorKey, 1);
      }
      setTimeout(() => { window.location.href = 'cart.html'; }, 300);
      return;
    }

    const addBtn = e.target.closest('.padd');
    if (addBtn) {
      e.stopPropagation();
      const card = addBtn.closest('.pcard');
      const pid = card ? card.dataset.id : addBtn.dataset.id;
      const colorIdx = card ? parseInt(card.dataset.selectedColor || '0', 10) : 0;
      const product = PRODUCTS[pid];
      if (!product) return;

      const realProductId = toCatalogId(pid);
      const colorKey = _colorNameToKey(product.colors[colorIdx]?.name || '');
      const colorLabel = product.colors[colorIdx]?.name || '';

      if (typeof CartManager !== 'undefined') {
        CartManager.addFromCatalog(realProductId, colorKey, 1);
        showToast(`Đã thêm "${product.name} — ${colorLabel}" vào giỏ hàng`);

        addBtn.textContent = 'ĐÃ THÊM ✓';
        addBtn.classList.add('added');
        addBtn.disabled = true;
        if (typeof updateCartBadge === 'function') updateCartBadge();

        setTimeout(() => {
          addBtn.textContent = 'THÊM GIỎ';
          addBtn.classList.remove('added');
          addBtn.disabled = false;
        }, 1800);
      } else {
        console.error('Lỗi: Không tìm thấy CartManager');
      }
      return;
    }

    const card = e.target.closest('.pcard');
    if (card) {
      const colorIdx = card.dataset.selectedColor || '0';
      const catalogId = toCatalogId(card.dataset.id);
      window.location.href = `product-detail.html?id=${catalogId}&colorIdx=${colorIdx}`;
    }
  });
});

document.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('id') || 'elysia';
  const idMapping = {
    'lr-bella-tay': 'bella', 'lr-lyra': 'lyra', 'lr-grace': 'grace',
    'lr-florence': 'florence', 'lr-classy': 'classy', 'celeste-vai': 'celeste',
    'nova': 'nova', 'lr-aura-cheo': 'aura', 'lr-elysia-cheo': 'elysia', 'vi-handle': 'handle'
  };
  if (idMapping[productId]) productId = idMapping[productId];
  currentId = productId;

  await loadState();
  renderProduct(currentId);

  const urlColorIdx = parseInt(urlParams.get('colorIdx') || '0', 10);
  if (urlColorIdx > 0) {
    const swatches = document.querySelectorAll('#swatchesContainer .swatch');
    if (swatches[urlColorIdx]) {
      swatches.forEach(s => s.classList.remove('selected'));
      swatches[urlColorIdx].add('selected');
    }
  }

  if (typeof syncGlobalBadges === 'function') syncGlobalBadges();
  else { updateCartBadge(); updateWishlistBadge(); }
});


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

    cartItemsEl.querySelectorAll('.cart-remove-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        CartManager.removeItem(this.dataset.cartId); 
        renderCartOffcanvas(); 
      });
    });
}

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

window.addEventListener(CartManager.EVENT_NAME, function() {
    const cartOffcanvas = document.getElementById('cartOffcanvas');
    if (cartOffcanvas && cartOffcanvas.classList.contains('show')) {
        renderCartOffcanvas();
    }
    if (typeof syncGlobalBadges === 'function') syncGlobalBadges();
    else updateCartBadge();
});
