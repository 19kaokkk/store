document.addEventListener('DOMContentLoaded', function() {
    let baseShippingFee = 30000; 
    let currentShippingFee = 30000; 

    // ĐỒNG BỘ AN TOÀN: Kiểm tra đồng thời cả sessionStorage và localStorage để tránh lỗi trình duyệt chặn file:///
    let cart = [];
    try {
        cart = JSON.parse(sessionStorage.getItem('ladyrose_cart')) || JSON.parse(localStorage.getItem('ladyrose_cart')) || [];
    } catch(e) {
        cart = [];
    }

    // Nếu giỏ hàng trống không có gì, ta lấy tạm dữ liệu sản phẩm từ file products-data.js thực tế trong máy bạn để hiển thị mẫu
    if (!cart || cart.length === 0) {
        cart = [
            { id: "tui-xach-tay-lr-velvet-xanh", name: "Túi xách tay LR Velvet", price: 799000, qty: 1, image: "images/sanpham/Túi xách tay LR Velvet xanh-799.000đ", color: "Xanh", size: "24" }
        ];
    }

    // Hàm render sản phẩm ra giao diện cột phải
    function renderCartItems() {
        const cartList = document.getElementById('cart-list');
        if (!cartList) return;
        
        cartList.innerHTML = ''; 

        cart.forEach((item, index) => {
            // Xử lý fallback nếu thiếu ảnh hoặc thiếu tên để giao diện không bị vỡ lỗi
            const itemImg = item.image || (item.img || '');
            const itemName = item.name || (item.title || 'Sản phẩm Lady Rose');

            cartList.innerHTML += `
                <div class="cart-item" data-index="${index}" data-price="${item.price}">
                    <img src="${itemImg}" alt="${itemName}" class="item-img" onerror="this.src='images/logo.png';">
                    <div class="item-info">
                        <div class="item-title">${itemName}</div>
                        <div class="item-meta">${item.color || ''} ${item.size ? '/ ' + item.size : ''}</div>
                        <div class="item-qty-price">
                            <div class="qty-controls">
                                <button class="qty-btn minus" data-index="${index}">-</button>
                                <span class="qty-val">${item.qty}</span>
                                <button class="qty-btn plus" data-index="${index}">+</button>
                            </div>
                            <div class="item-price">${(item.price * item.qty).toLocaleString('vi-VN')}đ</div>
                        </div>
                    </div>
                    <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-trash remove-btn" data-index="${index}"></i></button>
                </div>
            `;
        });
        tinhToanGioHang();
    }

    // Xử lý bấm tăng / giảm số lượng sản phẩm trực tiếp tại trang thanh toán
    const cartList = document.getElementById('cart-list');
    if (cartList) {
        cartList.addEventListener('click', function(e) {
            const target = e.target;
            let index = target.getAttribute('data-index');
            
            if (index === null && target.parentElement) {
                index = target.parentElement.getAttribute('data-index');
            }
            if (index === null) return;

            if (target.classList.contains('plus')) {
                cart[index].qty += 1;
                luuVaCapNhat();
            } else if (target.classList.contains('minus')) {
                if (cart[index].qty > 1) {
                    cart[index].qty -= 1;
                    luuVaCapNhat();
                }
            } else if (target.classList.contains('remove-btn') || target.closest('.remove-btn')) {
                cart.splice(index, 1); 
                luuVaCapNhat();
            }
        });
    }

    function luuVaCapNhat() {
        sessionStorage.setItem('ladyrose_cart', JSON.stringify(cart));
        localStorage.setItem('ladyrose_cart', JSON.stringify(cart));
        renderCartItems();
    }

    // YÊU CẦU: Tự động miễn phí vận chuyển cho đơn hàng từ 800.000đ trở lên
    function tinhToanGioHang() {
        let tongTienHang = 0;
        cart.forEach(item => {
            tongTienHang += item.price * item.qty;
        });

        if (tongTienHang >= 800000) {
            currentShippingFee = 0;
            const shippingFeeEl = document.getElementById('shipping-fee');
            if (shippingFeeEl) {
                shippingFeeEl.innerHTML = `<span style="color: #2D6A4F; font-weight: bold;"><i class="fa-solid fa-truck-fast"></i> Miễn phí</span>`;
            }
        } else {
            currentShippingFee = baseShippingFee;
            const shippingFeeEl = document.getElementById('shipping-fee');
            if (shippingFeeEl) {
                shippingFeeEl.innerText = currentShippingFee.toLocaleString('vi-VN') + 'đ';
            }
        }

        const subtotalEl = document.getElementById('subtotal');
        if (subtotalEl) subtotalEl.innerText = tongTienHang.toLocaleString('vi-VN') + 'đ';

        let tongThanhToan = tongTienHang + currentShippingFee;
        
        const totalPaymentEl = document.getElementById('total-payment');
        if (totalPaymentEl) totalPaymentEl.innerText = tongThanhToan.toLocaleString('vi-VN') + 'đ';
        
        const gatewayAmountEl = document.getElementById('gateway-amount');
        if (gatewayAmountEl) gatewayAmountEl.innerText = "Số tiền: " + tongThanhToan.toLocaleString('vi-VN') + 'đ';
    }

    // Chọn phương thức vận chuyển
    const shippingItems = document.querySelectorAll('#shipping-methods .option-item');
    shippingItems.forEach(item => {
        item.addEventListener('click', function() {
            shippingItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;

            baseShippingFee = parseInt(this.getAttribute('data-fee')) || 30000;
            tinhToanGioHang();
        });
    });

    // Chọn phương thức thanh toán
    const paymentItems = document.querySelectorAll('#payment-methods .option-item');
    paymentItems.forEach(item => {
        item.addEventListener('click', function() {
            paymentItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // Xử lý dữ liệu tỉnh thành đổ xuống
    const locationData = {
        hcm: {
            districts: {
                q1: { name: "Quận 1", wards: ["Phường Bến Nghé", "Phường Bến Thành"] },
                q3: { name: "Quận 3", wards: ["Phường 1", "Phường 2"] }
            }
        },
        hn: {
            districts: {
                hk: { name: "Quận Hoàn Kiếm", wards: ["Phường Hàng Bạc", "Phường Tràng Tiền"] },
                bd: { name: "Quận Ba Đình", wards: ["Phường Đội Cấn", "Phường Kim Mã"] }
            }
        }
    };

    const provinceSelect = document.getElementById('province');
    const districtSelect = document.getElementById('district');
    const wardSelect = document.getElementById('ward');

    if (provinceSelect && districtSelect && wardSelect) {
        provinceSelect.addEventListener('change', function() {
            const province = this.value;
            districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
            wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
            if (province && locationData[province]) {
                const districts = locationData[province].districts;
                for (const id in districts) {
                    districtSelect.innerHTML += `<option value="${id}">${districts[id].name}</option>`;
                }
            }
        });

        districtSelect.addEventListener('change', function() {
            const province = provinceSelect.value;
            const district = this.value;
            wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
            if (province && district && locationData[province].districts[district]) {
                const wards = locationData[province].districts[district].wards;
                wards.forEach(ward => {
                    wardSelect.innerHTML += `<option value="${ward}">${ward}</option>`;
                });
            }
        });
    }

    // Xử lý kiểm tra lỗi khi nhấn đặt hàng (Form Validation)
    const orderBtn = document.getElementById('order-submit-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            let coLoi = false;
            const fields = document.querySelectorAll('.form-group.compulsory');

            fields.forEach(group => {
                const input = group.querySelector('input, select');
                if (input && !input.value.trim()) {
                    group.classList.add('has-error');
                    coLoi = true;
                } else {
                    group.classList.remove('has-error');
                }
            });

            if (coLoi) {
                const prov = document.getElementById('province');
                if (prov) window.scrollTo({ top: prov.offsetTop - 120, behavior: 'smooth' });
                return;
            }

            const stepShipping = document.getElementById('step-shipping');
            if (stepShipping) stepShipping.classList.add('active');

            const selectedPayment = document.querySelector('#payment-methods .option-item.selected');
            const loaiThanhToan = selectedPayment ? selectedPayment.getAttribute('data-type') : 'cod';
            
            if (loaiThanhToan === 'online') {
                const gatewayPage = document.getElementById('gateway-page');
                if (gatewayPage) gatewayPage.style.display = 'flex';
            } else {
                hoanTatDonHang();
            }
        });
    }

    function hoanTatDonHang() {
        const stepComplete = document.getElementById('step-complete');
        if (stepComplete) stepComplete.classList.add('active');
        const successPage = document.getElementById('success-page');
        if (successPage) successPage.style.display = 'flex';
        
        // Xóa sạch giỏ hàng sau khi đặt thành công
        sessionStorage.removeItem('ladyrose_cart');
        localStorage.removeItem('ladyrose_cart');
    }

    const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', function() {
            const gatewayPage = document.getElementById('gateway-page');
            if (gatewayPage) gatewayPage.style.display = 'none';
            hoanTatDonHang();
        });
    }

    // Kích hoạt hàm khởi chạy vẽ dữ liệu lên màn hình
    renderCartItems();
});
