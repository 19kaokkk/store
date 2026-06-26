document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderFooter();
    setupNewsletterValidation();
    handleHeaderSearch(); 
});
function handleHeaderSearch() {
    const searchInput = document.getElementById('modalSearchInput'); 
    const searchBtn = document.getElementById('modalSearchBtn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const keyword = searchInput.value.trim();
            if (keyword !== "") {
                window.location.href = `product.html?search=${encodeURIComponent(keyword)}`;
            } else {
                alert("Vui lòng nhập từ khóa cần tìm kiếm!");
            }
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const keyword = searchInput.value.trim();
                if (keyword !== "") {
                    window.location.href = `product.html?search=${encodeURIComponent(keyword)}`;
                }
            }
        });
    }
}

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
            <a href="index.html" class="logo-link">
              <img src="../images/logo.png" alt="Lady Rose Logo" class="logo-img">
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
                  </div>
                </li>
                <li class="nav-item"><a class="nav-link" href="about.html">Về chúng tôi</a></li>
              </ul>
            </nav>
          </div>
          <div class="col-lg-3 col-6 order-2 order-lg-3">
            <div class="header-icons d-flex justify-content-end align-items-center">
              <a href="#" aria-label="Tìm kiếm" data-bs-toggle="modal" data-bs-target="#searchModal"><i class="ti ti-search"></i></a>
              <a href="#" aria-label="Tài khoản" data-bs-toggle="modal" data-bs-target="#accountModal"><i class="ti ti-user"></i></a>
              <a href="#" aria-label="Yêu thích" data-bs-toggle="offcanvas" data-bs-target="#wishlistOffcanvas"><i class="ti ti-heart"></i></a>
              <a href="#" aria-label="Giỏ hàng" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                <i class="ti ti-shopping-bag"></i>
                <span class="badge-count" id="cartBadge">0</span>
              </a>
            </div>
            <div class="popular-keywords">
              <a href="product.html?search=Túi đeo chéo">Túi xách tay LR Bella</a>
              <a href="product.html?search=Ví">Túi đeo chéo Celeste</a>
              <a href="product.html?search=Túi xách tay">Túi đeo vai LR Nova</a>
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
        <div class="trust-row" style="display: flex; justify-content: space-around; padding: 20px 0;">
          <div class="trust-item"><span class="trust-icon"><i class="ti ti-truck-delivery"></i></span><div><strong>Miễn phí vận chuyển</strong><span>Cho đơn hàng từ 800.000đ</span></div></div>
          <div class="trust-item"><span class="trust-icon"><i class="ti ti-shield-check"></i></span><div><strong>Thanh toán an toàn</strong><span>Bảo mật thông tin</span></div></div>
          <div class="trust-item"><span class="trust-icon"><i class="ti ti-replace"></i></span><div><strong>Đổi trả dễ dàng</strong><span>Trong vòng 7 ngày</span></div></div>
          <div class="trust-item"><span class="trust-icon"><i class="ti ti-headset"></i></span><div><strong>Hỗ trợ 24/7</strong><span>Hotline: 0123.456.78</span></div></div>
        </div>
      </div>
    </section>

    <footer class="footer"> 
      <div class="footer-container">
        <div class="footer-column brand">
          <h2>LADY ROSE</h2>
          <p>Lady Rose mang đến những thiết kế túi xách cao cấp, tinh tế và sang trọng dành cho phụ nữ hiện đại.</p>
          <div class="social-icons">
            <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-tiktok"></i></a>
          </div>
        </div>
        <div class="footer-column">
          <h3>Mua sắm</h3>
          <ul><li><a href="product.html">Cửa hàng</a></li><li><a href="product.html">Bộ sưu tập</a></li></ul>
        </div>
        <div class="footer-column">
          <h3>Hỗ trợ khách hàng</h3>
          <ul><li><a href="#">Chính sách đổi trả</a></li><li><a href="#">Hướng dẫn mua hàng</a></li><li><a href="#">Thanh toán & Vận chuyển</a></li></ul>
        </div>
        <div class="footer-column contact">
          <h3>Liên hệ</h3>
          <ul>
            <li><i class="fa-solid fa-location-dot"></i> 123 Nguyễn Huệ, Quận 1, TPHCM</li>
            <li><i class="fa-solid fa-phone"></i> 012345678</li>
            <li><i class="fa-solid fa-envelope"></i> support@ladyrose.com</li>
          </ul>
        </div>
        <div class="footer-column subscribe">
          <h3>ĐĂNG KÝ NHẬN TIN</h3>
          <p>Nhận ưu đãi và thông tin mới nhất từ Lady Rose</p>
          <div class="subscribe-form">
            <input type="text" id="newsletter-email" placeholder="Nhập email của bạn">
            <button id="newsletter-btn" type="button">ĐĂNG KÝ</button>
            <div id="newsletter-error" style="color: red; font-size: 0.8rem; display: none; margin-top: 5px;">* Lỗi email</div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">© 2026 LADY ROSE. All rights reserved.</div>
    </footer>
    `;
}

function setupNewsletterValidation() {
    const btnReg = document.getElementById('newsletter-btn');
    if (!btnReg) return;

    btnReg.addEventListener('click', function () {
        const emailInput = document.getElementById('newsletter-email');
        const errorDiv = document.getElementById('newsletter-error');
        const emailValue = emailInput.value.trim();
        
        const emailPattern = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;

        if (emailValue === "") {
            errorDiv.innerText = "* Vui lòng nhập địa chỉ email!";
            errorDiv.style.display = "block";
            emailInput.focus();
        } else if (!emailPattern.test(emailValue)) {
            errorDiv.innerText = "* Định dạng email không đúng (VD: abc@gmail.com)!";
            errorDiv.style.display = "block";
            emailInput.focus();
        } else {
            errorDiv.style.display = "none";
            alert("Đăng ký nhận tin từ LADY ROSE thành công!");
            emailInput.value = "";
        }
    });
}
function handleHeaderSearch() {
    const searchInput = document.getElementById('modalSearchInput'); 
    const searchBtn = document.getElementById('modalSearchBtn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const keyword = searchInput.value.trim();
            if (keyword !== "") {
                window.location.href = `product.html?search=${encodeURIComponent(keyword)}`;
            } else {
                alert("Vui lòng nhập từ khóa cần tìm kiếm!");
            }
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const keyword = searchInput.value.trim();
                if (keyword !== "") {
                    window.location.href = `product.html?search=${encodeURIComponent(keyword)}`;
                }
            }
        });
    }
}
