document.addEventListener('DOMContentLoaded', function () {
  renderHeader();
  renderFooter();
});

function renderHeader() {
  const headerRoot = document.getElementById('siteHeader');
  if (!headerRoot) return;

  headerRoot.innerHTML = `
    <div class="top-bar">
      <i class="ti ti-truck-delivery"></i>Miễn phí vận chuyển cho đơn hàng từ 800.000đ
    </div>

    <header class="main-header">
      <div class="container">
        <div class="row align-items-center gy-3">
          <div class="col-lg-3 col-6 order-1">
            <a href="index.html" class="brand-logo">
              <img src="images/logo.png" alt="Lady Rose">
            </a>
          </div>

          <div class="col-lg-6 order-3 order-lg-2">
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

          <div class="col-lg-3 col-6 order-2 order-lg-3">
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
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  const footerRoot = document.getElementById('siteFooter');
  if (!footerRoot) return;

  footerRoot.innerHTML = `
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

    <footer class="footer"> 
      <div class="footer-container">
        <div class="footer-column brand">
          <h2>LADY ROSE</h2>
          <p>
            Lady Rose mang đến những thiết kế túi xách,
            cao cấp, tinh tế và sang trọng dành cho phụ nữ hiện đại.
          </p>
          <div class="social-icons">
            <a href="https://www.facebook.com/share/14fpebXc47p/" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/lady.rose.offical?igsh=eXV6c3VwZmNndmw2" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://tiktok.com/@nguynnh8510" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
          </div>
        </div>
        <div class="footer-column">
          <h3>Mua sắm</h3>
          <ul>
            <li><a href="product.html">Cửa hàng</a></li>
            <li><a href="#">Bộ sưu tập</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Hỗ trợ khách hàng</h3>
          <ul>
            <li><a href="#">Chính sách đổi trả</a></li>
            <li><a href="#">Hướng dẫn mua hàng</a></li>
            <li><a href="#">Thanh toán &amp; Vận chuyển</a></li>
            <li><a href="#">Câu hỏi thường gặp</a></li>
          </ul>
        </div>
        <div class="footer-column contact">
          <h3>Liên hệ</h3>
          <ul>
            <li>
              <i class="fa-solid fa-location-dot"></i>
              123, Nguyễn Huệ, Quận 1, TP.HCM
            </li>
            <li>
              <i class="fa-solid fa-phone"></i>
              012345678
            </li>
            <li>
              <i class="fa-solid fa-envelope"></i>
              support.ladyrose@gmail.com
            </li>
          </ul>
        </div>
        <div class="footer-column subscribe">
          <h3>ĐĂNG KÝ NHẬN TIN</h3>
          <p>
            Nhận ưu đãi và thông tin mới nhất từ Lady Rose
          </p>
          <div class="subscribe-form">
            <input type="email" id="newsletter-email" placeholder="Nhập email của bạn">
            <button id="newsletter-btn" type="button">ĐĂNG KÝ</button>
            <div id="newsletter-error" class="error-message" style="display: none;">
              * Hãy nhập email
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        © 2026 LADY ROSE. All rights reserved.
      </div>
    </footer>
  `;
}
