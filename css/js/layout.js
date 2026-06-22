document.addEventListener('DOMContentLoaded', function () {
  renderHeader();
  renderFooter();
  initMobileMenu();
  initFooterAccordion();
});

/* =====================================================
   HEADER
   ===================================================== */
function renderHeader() {
  const headerRoot = document.getElementById('siteHeader');
  if (!headerRoot) return;

  headerRoot.innerHTML = `
    <div class="top-bar">
      <i class="ti ti-truck-delivery"></i>Miễn phí vận chuyển cho đơn hàng từ 800.000đ
    </div>

    <header class="main-header">
      <div class="container">
        <div class="row align-items-center">

          <!-- Logo -->
          <div class="col-lg-3 col-4">
            <a href="index.html" class="brand-logo">
              <img src="images/logo.png" alt="Lady Rose">
            </a>
          </div>

          <!-- Desktop Nav (ẩn trên mobile/tablet, hiện trên lg+) -->
          <div class="col-lg-6 d-none d-lg-block">
            <nav class="main-nav">
              <ul class="nav justify-content-center">
                <li class="nav-item"><a class="nav-link" href="index.html">Trang chủ</a></li>
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
                <li class="nav-item"><a class="nav-link" href="about.html">Về chúng tôi</a></li>
              </ul>
            </nav>
          </div>

          <!-- Icons + Hamburger -->
          <div class="col-lg-3 col-8">
            <div class="header-icons d-flex justify-content-end align-items-center">
              <a href="#" aria-label="Tìm kiếm"><i class="ti ti-search"></i></a>
              <a href="#" aria-label="Tài khoản"><i class="ti ti-user"></i></a>
              <a href="#" aria-label="Yêu thích">
                <i class="ti ti-heart"></i>
                <span class="badge-count" id="wishlistBadge">0</span>
              </a>
              <a href="cart.html" aria-label="Giỏ hàng">
                <i class="ti ti-shopping-bag"></i>
                <span class="badge-count" id="cartBadge">0</span>
              </a>
              <!-- Hamburger: chỉ hiện trên tablet/mobile (d-lg-none) -->
              <button class="hamburger-btn d-lg-none" id="hamburgerBtn" aria-label="Mở menu">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Mobile/Tablet Drawer Nav -->
      <div class="mobile-nav-overlay" id="mobileNavOverlay"></div>
      <nav class="mobile-nav" id="mobileNav">
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
          <li><a href="about.html">Về chúng tôi</a></li>
        </ul>
      </nav>
    </header>
  `;
}

function initMobileMenu() {
  // Cần delay vì renderHeader chạy async append DOM
  setTimeout(function () {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav    = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose   = document.getElementById('mobileNavClose');
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
    mobileNavClose.addEventListener('click', closeNav);
    mobileNavOverlay.addEventListener('click', closeNav);

    if (mobileProductToggle && mobileProductSub) {
      mobileProductToggle.addEventListener('click', function () {
        const isOpen = mobileProductSub.classList.toggle('open');
        this.querySelector('i').style.transform = isOpen ? 'rotate(180deg)' : '';
      });
    }
  }, 0);
}

/* =====================================================
   FOOTER
   ===================================================== */
function renderFooter() {
  const footerRoot = document.getElementById('siteFooter');
  if (!footerRoot) return;

  footerRoot.innerHTML = `
    <!-- Trust bar -->
    <section class="trust-section">
      <div class="container">
        <div class="trust-row">
          <div class="trust-item">
            <span class="trust-icon"><i class="ti ti-truck-delivery"></i></span>
            <div>
              <strong>Miễn phí vận chuyển</strong>
              <span>Cho đơn hàng từ 800.000đ</span>
            </div>
          </div>
          <div class="trust-item">
            <span class="trust-icon"><i class="ti ti-shield-check"></i></span>
            <div>
              <strong>Thanh toán an toàn</strong>
              <span>Bảo mật thông tin tuyệt đối</span>
            </div>
          </div>
          <div class="trust-item">
            <span class="trust-icon"><i class="ti ti-replace"></i></span>
            <div>
              <strong>Đổi trả dễ dàng</strong>
              <span>Trong vòng 7 ngày</span>
            </div>
          </div>
          <div class="trust-item">
            <span class="trust-icon"><i class="ti ti-headset"></i></span>
            <div>
              <strong>Hỗ trợ 24/7</strong>
              <span>Hotline: 0123.456.78</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer chính -->
    <footer class="footer">
      <div class="footer-container">

        <!-- Brand — tablet: luôn mở; mobile: accordion -->
        <div class="footer-column footer-accordion brand">
          <div class="footer-toggle">
            <h2>LADY ROSE</h2>
            <i class="ti ti-chevron-down"></i>
          </div>
          <div class="footer-panel">
            <p>Lady Rose mang đến những thiết kế túi xách, cao cấp, tinh tế và sang trọng dành cho phụ nữ hiện đại.</p>
            <div class="social-icons">
              <a href="https://www.facebook.com/share/14fpebXc47p/" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/lady.rose.offical?igsh=eXV6c3VwZmNndmw2" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://tiktok.com/@nguynnh8510" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
            </div>
          </div>
        </div>

        <!-- Mua sắm -->
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

        <!-- Hỗ trợ -->
        <div class="footer-column footer-accordion">
          <div class="footer-toggle">
            <h3>Hỗ trợ khách hàng</h3>
            <i class="ti ti-chevron-down"></i>
          </div>
          <div class="footer-panel">
            <ul>
              <li><a href="#">Chính sách đổi trả</a></li>
              <li><a href="#">Hướng dẫn mua hàng</a></li>
              <li><a href="#">Thanh toán &amp; Vận chuyển</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
            </ul>
          </div>
        </div>

        <!-- Liên hệ -->
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

        <!-- Đăng ký nhận tin -->
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
      <div class="footer-bottom">
        © 2026 LADY ROSE. All rights reserved.
      </div>
    </footer>
  `;

  // Bind newsletter sau khi DOM đã render
  initNewsletter();
}

function initNewsletter() {
  setTimeout(function () {
    const emailInput  = document.getElementById('newsletter-email');
    const subscribeBtn = document.getElementById('newsletter-btn');
    const errorMsg    = document.getElementById('newsletter-error');
    if (!subscribeBtn || !emailInput || !errorMsg) return;

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    subscribeBtn.addEventListener('click', function () {
      const email = emailInput.value.trim();
      if (!email || !isValidEmail(email)) {
        errorMsg.textContent = email ? '* Email không hợp lệ' : '* Hãy nhập email';
        errorMsg.style.display = 'block';
        return;
      }
      errorMsg.style.display = 'none';
      alert('Đăng ký thành công! Cảm ơn bạn đã quan tâm Lady Rose.');
      emailInput.value = '';
    });
  }, 0);
}

/* =====================================================
   FOOTER ACCORDION (tablet + mobile)
   ===================================================== */
function initFooterAccordion() {
  setTimeout(function () {
    document.querySelectorAll('.footer-accordion .footer-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        const col = this.closest('.footer-accordion');
        col.classList.toggle('open');
      });
    });
  }, 0);
}