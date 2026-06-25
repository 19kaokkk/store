document.addEventListener('DOMContentLoaded', function () {
  renderHeader();
  renderFooter();
  // Các hàm init cần chờ DOM được render xong
  setTimeout(function () {
    initMobileMenu();
    initHeaderModals();
    initFooterAccordion();
    initServiceLinks();
    initNewsletter();
    syncBadges();
  }, 0);
});

function renderHeader() {
  const headerRoot = document.getElementById('siteHeader');
  if (!headerRoot) return;

  headerRoot.innerHTML = `
    <!-- Top bar -->
    <div class="top-bar">
      <i class="ti ti-truck-delivery"></i>Miễn phí vận chuyển cho đơn hàng từ 800.000đ
    </div>

    <!-- Main header -->
    <header class="main-header">
      <div class="container">
        <div class="row align-items-center">

          <!-- Logo -->
          <div class="col-lg-3 col-4">
            <a href="index.html" class="brand-logo">
              <img src="images/logo.png" alt="Lady Rose Logo">
            </a>
          </div>

          <!-- Desktop Nav (ẩn trên tablet/mobile) -->
          <div class="col-lg-6 d-none d-lg-block">
            <nav class="main-nav">
              <ul class="nav justify-content-center">
                <li class="nav-item">
                  <a class="nav-link" href="index.html">Trang chủ</a>
                </li>
                <li class="nav-item product-menu">
                  <a class="nav-link" href="product.html">Sản phẩm</a>
                  <div class="product-dropdown">
                    <a href="product.html?cat=tui-xach-tay">Túi xách tay</a>
                    <a href="product.html?cat=tui-deo-vai">Túi đeo vai</a>
                    <a href="product.html?cat=tui-deo-cheo">Túi đeo chéo</a>
                    <a href="product.html?cat=tui-tote">Túi tote</a>
                    <a href="product.html?cat=vi-cam-tay">Ví cầm tay</a>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="index.html#about-us-section">Về chúng tôi</a>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Icons + Hamburger -->
          <div class="col-lg-3 col-8">
            <div class="header-icons d-flex justify-content-end align-items-center">

              <!-- Tìm kiếm -->
              <a href="#" aria-label="Tìm kiếm"
                 data-bs-toggle="modal" data-bs-target="#searchModal">
                <i class="ti ti-search"></i>
              </a>

              <!-- Tài khoản -->
              <a href="#" aria-label="Tài khoản"
                 data-bs-toggle="modal" data-bs-target="#accountModal">
                <i class="ti ti-user"></i>
              </a>

              <!-- Yêu thích -->
              <a href="#" aria-label="Yêu thích">
                <i class="ti ti-heart"></i>
              <span class="badge-count" id="wishlistBadge">0</span>
              </a>

              <!-- Giỏ hàng -->
              <a href="#" aria-label="Giỏ hàng"
                 data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                <i class="ti ti-shopping-bag"></i>
                <span class="badge-count" id="cartBadge">0</span>
              </a>

              <!-- Hamburger (chỉ hiện trên tablet/mobile) -->
              <button class="hamburger-btn d-lg-none" id="hamburgerBtn" aria-label="Mở menu">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Mobile/Tablet drawer overlay -->
      <div class="mobile-nav-overlay" id="mobileNavOverlay"></div>

      <!-- Mobile/Tablet drawer nav -->
      <nav class="mobile-nav" id="mobileNav" aria-label="Menu di động">
        <button class="mobile-nav-close" id="mobileNavClose" aria-label="Đóng menu">
          <i class="ti ti-x"></i>
        </button>
        <ul>
          <li><a href="index.html">Trang chủ</a></li>
          <li class="mobile-product-menu">
            <button class="mobile-nav-toggle" id="mobileProductToggle">
              Sản phẩm <i class="ti ti-chevron-down"></i>
            </button>
            <ul class="mobile-sub-menu" id="mobileProductSub">
              <li><a href="product.html?cat=tui-xach-tay">Túi xách tay</a></li>
              <li><a href="product.html?cat=tui-deo-vai">Túi đeo vai</a></li>
              <li><a href="product.html?cat=tui-deo-cheo">Túi đeo chéo</a></li>
              <li><a href="product.html?cat=tui-tote">Túi tote</a></li>
              <li><a href="product.html?cat=vi-cam-tay">Ví cầm tay</a></li>
            </ul>
          </li>
          <li><a href="index.html#about-us-section">Về chúng tôi</a></li>
        </ul>
      </nav>
    </header>

    <!-- ================================================
         SEARCH MODAL
         ================================================ -->
    <div class="modal fade" id="searchModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-0 border-0">
          <div class="modal-header border-0 pb-0">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
          </div>
          <div class="modal-body text-center pb-5 px-4">
            <h5 class="fw-bold mb-4">Bạn muốn tìm gì hôm nay?</h5>
            <div class="input-group mb-4" style="border-bottom: 2px solid #000;">
              <input type="text" id="headerSearchInput"
                     class="form-control border-0 shadow-none px-0"
                     placeholder="Nhập tên sản phẩm...">
              <button class="btn border-0 bg-transparent" id="headerSearchBtn" type="button">
                <i class="ti ti-search fs-5"></i>
              </button>
            </div>
            <p class="text-muted small fw-bold text-start mb-2">Tìm kiếm phổ biến</p>
            <div class="d-flex flex-wrap gap-2">
              <a href="product.html?search=bella"
                 class="badge bg-light text-dark text-decoration-none border p-2 fw-normal">
                Túi xách tay LR Bella
              </a>
              <a href="product.html?search=celeste"
                 class="badge bg-light text-dark text-decoration-none border p-2 fw-normal">
                Túi đeo chéo Celeste
              </a>
              <a href="product.html?search=nova"
                 class="badge bg-light text-dark text-decoration-none border p-2 fw-normal">
                Túi đeo vai LR Nova
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================
         ACCOUNT MODAL
         ================================================ -->
    <div class="modal fade" id="accountModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-0 border-0">
          <div class="modal-header border-0 pb-0">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
          </div>
          <div class="modal-body pt-0 px-4 pb-4">
            <ul class="nav nav-tabs justify-content-center mb-4 border-0" id="accountTabs" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active fw-bold text-dark border-0 rounded-0 pb-2"
                        data-bs-toggle="tab" data-bs-target="#login-pane" type="button" role="tab">
                  ĐĂNG NHẬP
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link fw-bold text-muted border-0 rounded-0 pb-2"
                        data-bs-toggle="tab" data-bs-target="#register-pane" type="button" role="tab">
                  ĐĂNG KÝ
                </button>
              </li>
            </ul>

            <div class="tab-content">
              <!-- Đăng nhập -->
              <div class="tab-pane fade show active" id="login-pane" role="tabpanel">
                <h5 class="text-center fw-bold mb-2">ĐĂNG NHẬP TÀI KHOẢN</h5>
                <p class="text-center text-muted small mb-4">Nhập email và mật khẩu của bạn</p>
                <div class="mb-3">
                  <input type="email" class="form-control rounded-0" placeholder="Email">
                </div>
                <div class="mb-3">
                  <input type="password" class="form-control rounded-0" placeholder="Mật khẩu">
                </div>
                <button type="button" class="btn btn-dark w-100 rounded-0 py-2 mb-3">ĐĂNG NHẬP</button>
                <div class="text-center small">
                  <a href="#" class="text-dark text-decoration-none d-block mb-2">Khách hàng mới? Tạo tài khoản</a>
                  <a href="#" class="text-dark text-decoration-none d-block">Quên mật khẩu? Khôi phục</a>
                </div>
              </div>

              <!-- Đăng ký -->
              <div class="tab-pane fade" id="register-pane" role="tabpanel">
                <h5 class="text-center fw-bold mb-4">TẠO TÀI KHOẢN</h5>
                <button class="btn border border-secondary w-100 rounded-0 mb-3 py-2 text-dark">
                  <i class="fa-brands fa-google me-2 text-danger"></i> Tiếp tục với Google
                </button>
                <button class="btn btn-dark w-100 rounded-0 mb-4 py-2">
                  <i class="fa-brands fa-apple me-2"></i> Tiếp tục với Apple
                </button>
                <div class="text-center text-muted small mb-3">Hoặc</div>
                <div class="mb-3">
                  <input type="email" class="form-control rounded-0" placeholder="Nhập địa chỉ Email">
                </div>
                <button type="button" class="btn btn-secondary w-100 rounded-0 py-2 mb-3">Tiếp tục</button>
                <div class="text-center small">
                  <a href="#" class="text-dark text-decoration-none">Quay lại tiếp tục mua hàng</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================
         WISHLIST OFFCANVAS
         ================================================ -->
    <div class="offcanvas offcanvas-end" tabindex="-1"
         id="wishlistOffcanvas" aria-labelledby="wishlistOffcanvasLabel">
      <div class="offcanvas-header border-bottom">
        <h5 id="wishlistOffcanvasLabel" class="fw-bold mb-0">DANH SÁCH YÊU THÍCH</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Đóng"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column justify-content-center align-items-center text-center p-4">
        <i class="ti ti-heart mb-3 text-muted" style="font-size:4rem;"></i>
        <h6 class="fw-bold mb-3">Vui lòng đăng nhập để thêm sản phẩm này vào danh sách yêu thích</h6>
        <p class="text-muted small mb-4">
          Bằng cách đăng nhập, bạn có thể quản lý danh sách sản phẩm yêu thích cá nhân.
        </p>
        <div class="d-flex w-100 gap-2">
          <button class="btn btn-outline-dark w-50 rounded-0" data-bs-dismiss="offcanvas">Để sau</button>
          <button class="btn btn-dark w-50 rounded-0"
                  data-bs-toggle="modal" data-bs-target="#accountModal"
                  data-bs-dismiss="offcanvas">Đăng nhập</button>
        </div>
      </div>
    </div>

    <!-- ================================================
         CART OFFCANVAS
         ================================================ -->
    <div class="offcanvas offcanvas-end" tabindex="-1"
         id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
      <div class="offcanvas-header border-bottom">
        <h5 id="cartOffcanvasLabel" class="fw-bold mb-0">Giỏ hàng của bạn</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Đóng"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column bg-light" id="cartOffcanvasBody">
        <!-- Nội dung giỏ hàng sẽ được điền bởi page-level JS -->
        <div id="cartEmpty" class="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1">
          <h4 class="fw-bold mb-3">Bạn chưa có sản phẩm trong giỏ hàng</h4>
          <p class="text-muted small mb-4">Có nhiều sản phẩm mới đợi bạn thêm vào giỏ</p>
          <button class="btn btn-dark rounded-0 px-4 py-2" data-bs-dismiss="offcanvas">Dạo một vòng</button>
        </div>
        <div id="cartItems" style="display:none;"></div>
      </div>
      <div class="offcanvas-footer border-top p-3" id="cartFooter" style="display:none;">
        <div class="d-flex justify-content-between fw-bold mb-3">
          <span>Tổng cộng</span>
          <span id="cartTotal">0đ</span>
        </div>
        <a href="cart.html" class="btn btn-dark w-100 rounded-0 py-2">XEM GIỎ HÀNG</a>
      </div>
    </div>
  `;
}

function initMobileMenu() {
  const hamburgerBtn        = document.getElementById('hamburgerBtn');
  const mobileNav           = document.getElementById('mobileNav');
  const mobileNavOverlay    = document.getElementById('mobileNavOverlay');
  const mobileNavClose      = document.getElementById('mobileNavClose');
  const mobileProductToggle = document.getElementById('mobileProductToggle');
  const mobileProductSub    = document.getElementById('mobileProductSub');

  if (!hamburgerBtn || !mobileNav) return;

  function openNav() {
    mobileNav.classList.add('open');
    mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.classList.remove('open');
    mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeNav);

  if (mobileProductToggle && mobileProductSub) {
    mobileProductToggle.addEventListener('click', function () {
      const isOpen = mobileProductSub.classList.toggle('open');
      const icon = this.querySelector('i');
      if (icon) icon.style.transform = isOpen ? 'rotate(180deg)' : '';
    });
  }
}

function initHeaderModals() {
  const searchInput = document.getElementById('headerSearchInput');
  const searchBtn   = document.getElementById('headerSearchBtn');

  function doSearch() {
    if (!searchInput) return;
    const q = searchInput.value.trim();
    if (q) window.location.href = 'product.html?search=' + encodeURIComponent(q);
  }

  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSearch();
    });
  }
}

function syncBadges() {
  var cartCount     = parseInt(localStorage.getItem('lr_cart_count') || '0', 10);
  var wishlistCount = parseInt(localStorage.getItem('lr_wishlist_count') || '0', 10);
  setBadge('cartBadge', cartCount);
  setBadge('wishlistBadge', wishlistCount);
}

function setBadge(id, count) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = count > 99 ? '99+' : count;
  el.style.display = count > 0 ? 'flex' : 'none';
}

window.updateCartBadge = function (count) {
  localStorage.setItem('lr_cart_count', count);
  setBadge('cartBadge', count);
};

window.updateWishlistBadge = function (count) {
  localStorage.setItem('lr_wishlist_count', count);
  setBadge('wishlistBadge', count);
};

function renderFooter() {
  const footerRoot = document.getElementById('siteFooter');
  if (!footerRoot) return;

  footerRoot.innerHTML = `
    <!-- Footer chính -->
    <footer class="footer">
      <div class="footer-container">

        <div class="footer-column footer-accordion brand">
          <div class="footer-toggle">
            <h2>LADY ROSE</h2>
            <i class="ti ti-chevron-down"></i>
          </div>
          <div class="footer-panel">
            <p>Lady Rose mang đến những thiết kế túi xách cao cấp, tinh tế và sang trọng dành cho phụ nữ hiện đại.</p>
            <div class="social-icons">
              <a href="https://www.facebook.com/share/14fpebXc47p/" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/lady.rose.offical?igsh=eXV6c3VwZmNndmw2" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://tiktok.com/@nguynnh8510" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
            </div>
          </div>
        </div>

        <div class="footer-column footer-accordion">
          <div class="footer-toggle">
            <h3>Mua sắm</h3>
            <i class="ti ti-chevron-down"></i>
          </div>
          <div class="footer-panel">
            <ul>
              <li><a href="product.html">Cửa hàng</a></li>
              <li><a href="#">Bộ sưu tập</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-column footer-accordion">
          <div class="footer-toggle">
            <h3>Hỗ trợ khách hàng</h3>
            <i class="ti ti-chevron-down"></i>
          </div>
          <div class="footer-panel">
            <ul>
              <li><a href="#service-bar" class="js-service-link">Chính sách đổi trả</a></li>
              <li><a href="#service-bar" class="js-service-link">Hướng dẫn mua hàng</a></li>
              <li><a href="#service-bar" class="js-service-link">Thanh toán &amp; Vận chuyển</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-column footer-accordion contact">
          <div class="footer-toggle">
            <h3>Liên hệ</h3>
            <i class="ti ti-chevron-down"></i>
          </div>
          <div class="footer-panel">
            <ul>
              <li><i class="fa-solid fa-location-dot"></i> 123, Nguyễn Huệ, Quận 1, TP.HCM</li>
              <li><i class="fa-solid fa-phone"></i> 012345678</li>
              <li><i class="fa-solid fa-envelope"></i> support.ladyrose@gmail.com</li>
            </ul>
          </div>
        </div>

        <div class="footer-column footer-accordion subscribe">
          <div class="footer-toggle">
            <h3>Đăng ký nhận tin</h3>
            <i class="ti ti-chevron-down"></i>
          </div>
          <div class="footer-panel">
            <p>Nhận ưu đãi và thông tin mới nhất từ Lady Rose</p>
            <div class="subscribe-form">
              <input type="email" id="newsletter-email" placeholder="Nhập email của bạn">
              <button id="newsletter-btn" type="button">ĐĂNG KÝ</button>
              <div id="newsletter-error" class="error-message" style="display:none;"></div>
            </div>
          </div>
        </div>

      </div>
      <div class="footer-bottom">© 2026 LADY ROSE. All rights reserved.</div>
    </footer>
  `;
}

/* =====================================================
   NEWSLETTER VALIDATION
   ===================================================== */
function initNewsletter() {
  const emailInput   = document.getElementById('newsletter-email');
  const subscribeBtn = document.getElementById('newsletter-btn');
  const errorMsg     = document.getElementById('newsletter-error');
  if (!subscribeBtn || !emailInput || !errorMsg) return;

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  subscribeBtn.addEventListener('click', function () {
    var email = emailInput.value.trim();
    if (!email) {
      errorMsg.textContent = '* Hãy nhập email';
      errorMsg.style.display = 'block';
      return;
    }
    if (!isValidEmail(email)) {
      errorMsg.textContent = '* Email không hợp lệ (VD: abc@gmail.com)';
      errorMsg.style.display = 'block';
      return;
    }
    errorMsg.style.display = 'none';
    alert('Đăng ký thành công! Cảm ơn bạn đã quan tâm đến Lady Rose.');
    emailInput.value = '';
  });
}

function initFooterAccordion() {
  document.querySelectorAll('.footer-accordion .footer-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      this.closest('.footer-accordion').classList.toggle('open');
    });
  });
}


function initServiceLinks() {
  document.querySelectorAll('.js-service-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.getElementById('service-bar');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        e.preventDefault();
        window.location.href = 'index.html#service-bar';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
    // Đợi 800ms để đảm bảo giao diện Header đã được load xong hoàn toàn
    setTimeout(function() {
        // Tìm tất cả các nút/icon đang được cài lệnh mở menu giỏ hàng trượt ngang
        const cartTriggers = document.querySelectorAll('[data-bs-target="#cartOffcanvas"], [href="#cartOffcanvas"]');
        
        cartTriggers.forEach(function(trigger) {
            // 1. Tắt tính năng mở menu trượt của Bootstrap
            trigger.removeAttribute('data-bs-toggle');
            trigger.removeAttribute('data-bs-target');
            
            // Nếu nó là thẻ <a> dùng href="#cartOffcanvas", đổi luôn thành link thật
            if (trigger.hasAttribute('href') && trigger.getAttribute('href') === '#cartOffcanvas') {
                trigger.setAttribute('href', 'cart.html');
            }
            
            // 2. Ép buộc chuyển hướng thẳng sang trang cart.html khi click
            trigger.addEventListener('click', function(e) {
                e.preventDefault(); // Chặn mọi hành động cũ
                window.location.href = 'cart.html'; // Đưa khách hàng sang trang giỏ hàng ngay lập tức
            });
        });
    }, 800);
});

function syncGlobalBadges() {
    let wishlist = JSON.parse(localStorage.getItem('ladyrose_wishlist') || '[]');
    
    if (typeof PRODUCT_DATA !== 'undefined') {
        const validIds = PRODUCT_DATA.map(p => p.id);
        const originalLength = wishlist.length;
        
        wishlist = wishlist.filter(id => validIds.includes(id));
        
        // Nếu phát hiện có rác (ID ảo), lưu lại mảng sạch để modal không bị trắng
        if (wishlist.length !== originalLength) {
            localStorage.setItem('ladyrose_wishlist', JSON.stringify(wishlist));
        }
    }

    const wishBadge = document.getElementById('wishlistBadge');
    if (wishBadge) {
        wishBadge.textContent = wishlist.length;
        // Ẩn badge nếu số lượng = 0 cho đẹp, hiện nếu > 0
        wishBadge.style.display = wishlist.length > 0 ? 'inline-flex' : 'none';
    }

    // Cập nhật số lượng trên tiêu đề của Modal Yêu thích (nếu đang mở)
    const modalWishlistCount = document.getElementById('modalWishlistCount');
    if (modalWishlistCount) {
        modalWishlistCount.textContent = wishlist.length;
    }

    // --- 2. ĐỒNG BỘ GIỎ HÀNG (CART) ---
    let cartCount = 0;
    // Tự động tìm xem đang dùng hệ thống giỏ hàng nào để lấy đúng số lượng
    if (typeof CartManager !== 'undefined') {
        cartCount = CartManager.getTotalQuantity();
    } else {
        const cart = JSON.parse(localStorage.getItem('ladyrose_cart_local') || localStorage.getItem('ladyrose_cart') || '[]');
        cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    }

    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'inline-flex' : 'none';
    }
}

// Chạy đồng bộ khi trang vừa load xong (đợi 800ms để Header render xong)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(syncGlobalBadges, 800);
});

// Chạy đồng bộ mỗi khi click chuột (để bắt ngay lập tức sự kiện Thêm/Xóa)
document.addEventListener('click', function() {
    setTimeout(syncGlobalBadges, 100); 
});

// Chạy đồng bộ khi khách hàng mở nhiều tab và thay đổi giỏ hàng ở tab khác
window.addEventListener('storage', syncGlobalBadges);

/* =========================================================
   MODAL DANH SÁCH YÊU THÍCH (DÙNG CHUNG CHO MỌI TRANG)
   ========================================================= */
function showWishlistModal() {
    // Kiểm tra xem đã có dữ liệu sản phẩm chưa
    if (typeof PRODUCT_DATA === 'undefined') {
        console.error('Chưa tải file product data.js');
        return;
    }

    const wishlistIds = JSON.parse(localStorage.getItem('ladyrose_wishlist') || '[]');
    let contentHTML = '';

    // Nếu không có sản phẩm nào
    if (wishlistIds.length === 0) {
        contentHTML = `<p style="text-align:center; padding: 60px 20px; color: #9C8E7E; font-size: 15px;">
        Bạn chưa có sản phẩm yêu thích nào.<br>
        Hãy nhấn ❤️ trên sản phẩm để thêm vào đây.
        </p>`;
    } else {
        // Nếu có sản phẩm, in ra lưới
        contentHTML = `<div class="row g-3">`;
        PRODUCT_DATA.forEach(function (product) {
            if (wishlistIds.includes(product.id)) {
                const defaultColor = product.colors[0];
                const priceValue = defaultColor.priceOverride || product.price;
                contentHTML += `
                <div class="col-6 col-md-4 wishlist-item">
                    <div style="background:#fff; border:1px solid #E3D7C7; border-radius:10px; overflow:hidden; display:flex; flex-direction:column; height:100%;">
                    <div style="aspect-ratio:1/1.1; overflow:hidden; background:#F5EFE6;">
                        <img src="${defaultColor.image}" alt="${product.name}" 
                            style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div style="padding:12px; display:flex; flex-direction:column; flex:1; gap:6px;">
                        <div style="font-size:13.5px; font-weight:500; color:#2D231B; line-height:1.35;">${product.name}</div>
                        <div style="font-size:16px; font-weight:600; color:#413125;">${Number(priceValue).toLocaleString('vi-VN')}đ</div>
                        <div style="display:flex; gap:6px; margin-top:auto; padding-top:8px;">
                        <a href="product-detail.html?id=${product.id}&color=${defaultColor.key}" 
                            style="flex:1; background:#3A2E26; color:#fff; border:none; border-radius:6px; padding:8px 4px; font-size:12px; font-weight:600; text-align:center; text-decoration:none; display:flex; align-items:center; justify-content:center;">
                            Mua ngay
                        </a>
                        <button class="remove-from-wishlist" data-id="${product.id}" 
                                style="flex:1; background:transparent; color:#3A2E26; border:1px solid #3A2E26; border-radius:6px; padding:8px 4px; font-size:12px; font-weight:600; cursor:pointer;">
                            Xóa
                        </button>
                        </div>
                    </div>
                    </div>
                </div>`;
            }
        });
        contentHTML += `</div>`;
    }

    // Khởi tạo Modal nếu chưa có
    let modal = document.getElementById('wishlistModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'wishlistModal';
        modal.style.cssText = `position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:999999; display:none; align-items:center; justify-content:center;`;
        modal.innerHTML = `
        <div style="background:#fff; width:95%; max-width:720px; max-height:92vh; overflow:auto; border-radius:12px; padding:20px 24px; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:16px;">
            <h4 style="margin:0; font-weight: bold; color: #111;">Danh sách yêu thích (<span id="modalWishlistCount">0</span>)</h4>
            <button id="closeWishlistModal" style="font-size:28px; background:none; border:none; cursor:pointer; color:#666; line-height: 1;">&times;</button>
            </div>
            <div id="wishlistModalContent"></div>
        </div>
        `;
        document.body.appendChild(modal);
    }

    // Đổ dữ liệu vào Modal và hiển thị
    document.getElementById('wishlistModalContent').innerHTML = contentHTML;
    document.getElementById('modalWishlistCount').textContent = wishlistIds.length;
    modal.style.display = 'flex';

    // Xử lý nút Xóa
    document.querySelectorAll('.remove-from-wishlist').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const id = btn.dataset.id;
            let wishlist = JSON.parse(localStorage.getItem('ladyrose_wishlist') || '[]');
            wishlist = wishlist.filter(item => item !== id);
            localStorage.setItem('ladyrose_wishlist', JSON.stringify(wishlist));
            
            if (typeof syncGlobalBadges === 'function') syncGlobalBadges(); // Nhảy số trên icon
            showWishlistModal(); // Cập nhật lại bảng
        });
    });

    // Xử lý nút Đóng
    document.getElementById('closeWishlistModal').onclick = function () {
        modal.style.display = 'none';
    };
    
    // Bấm ra nền đen bên ngoài để đóng
    modal.onclick = function(e) {
        if (e.target === modal) modal.style.display = 'none';
    };
}

// Bắt sự kiện khi click vào Icon trái tim trên Header (áp dụng mọi trang)
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const wishlistLinks = document.querySelectorAll('a[aria-label="Yêu thích"]');
        wishlistLinks.forEach(function(link) {
            // Tắt chức năng offcanvas cũ (mở sidebar thừa) của Bootstrap
            link.removeAttribute('data-bs-toggle');
            link.removeAttribute('data-bs-target');
            
            // Gắn lệnh mở Modal Yêu thích chuẩn
            link.addEventListener('click', function (e) {
                e.preventDefault();
                showWishlistModal();
            });
        });
    }, 800);
});  
