document.addEventListener('DOMContentLoaded', function() {
    let baseShippingFee = 30000; // Phí ship gốc mặc định ban đầu
    let currentShippingFee = 30000; // Phí ship thực tế sau khi tính toán freeship

    // 1. LẤY DỮ LIỆU GIỎ HÀNG TỪ LOCALSTORAGE (ĐỒNG BỘ TỪ TRANG GIỎ HÀNG)
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Nếu không có dữ liệu từ trang giỏ hàng (bị trống), ta tự tạo dữ liệu mẫu để web không bị lỗi hình ảnh
    if (cart.length === 0) {
        cart = [
            { id: 1, title: "Túi xách tay LR Lyra Size 24", price: 1183000, qty: 1, img: "images/Túi xách tay LR Lyra - Nâu.png", meta: "Kem / 24" },
            { id: 2, title: "Túi đeo vai Nova Size 24", price: 1183000, qty: 1, img: "images/Túi đeo vai Nova - Nâu.png", meta: "Kem / 24" }
        ];
    }

    // Hàm hiển thị danh sách sản phẩm ra màn hình thanh toán
    function renderCartItems() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = ''; // Xóa sạch dữ liệu mặc định ban đầu

        cart.forEach((item, index) => {
            cartList.innerHTML += `
                <div class="cart-item" data-index="${index}" data-price="${item.price}">
                    <img src="${item.img}" alt="${item.title}" class="item-img">
                    <div class="item-info">
                        <div class="item-title">${item.title}</div>
                        <div class="item-meta">${item.meta || ''}</div>
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

    // 2. TĂNG GIẢM SỐ LƯỢNG / XÓA SẢN PHẨM
    const cartList = document.getElementById('cart-list');
    cartList.addEventListener('click', function(e) {
        const target = e.target;
        const index = target.getAttribute('data-index');
        
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
            cart.splice(index, 1); // Xóa sản phẩm khỏi mảng
            luuVaCapNhat();
        }
    });

    function luuVaCapNhat() {
        localStorage.setItem('cartItems', JSON.stringify(cart));
        renderCartItems();
    }

    // 3. HÀM TÍNH TOÁN HÓA ĐƠN & KHUYẾN MÃI MIỄN PHÍ VẬN CHUYỂN (> 800.000đ)
    function tinhToanGioHang() {
        let tongTienHang = 0;
        cart.forEach(item => {
            tongTienHang += item.price * item.qty;
        });

        // Áp dụng luật TMĐT: Đơn hàng trên 800k được miễn phí vận chuyển
        if (tongTienHang >= 800000) {
            currentShippingFee = 0;
            document.getElementById('shipping-fee').innerHTML = `<span style="color: #2D6A4F; font-weight: bold;">Miễn phí</span>`;
        } else {
            currentShippingFee = baseShippingFee;
            document.getElementById('shipping-fee').innerText = currentShippingFee.toLocaleString('vi-VN') + 'đ';
        }

        document.getElementById('subtotal').innerText = tongTienHang.toLocaleString('vi-VN') + 'đ';
        let tongThanhToan = tongTienHang + currentShippingFee;
        document.getElementById('total-payment').innerText = tongThanhToan.toLocaleString('vi-VN') + 'đ';
        document.getElementById('gateway-amount').innerText = "Số tiền: " + tongThanhToan.toLocaleString('vi-VN') + 'đ';
    }

    // 4. CHỌN PHƯƠNG THỨC VẬN CHUYỂN (CẬP NHẬT LẠI PHÍ GỐC BAN ĐẦU)
    const shippingItems = document.querySelectorAll('#shipping-methods .option-item');
    shippingItems.forEach(item => {
        item.addEventListener('click', function() {
            shippingItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input[type="radio"]').checked = true;

            baseShippingFee = parseInt(this.getAttribute('data-fee'));
            tinhToanGioHang();
        });
    });

    // 5. CHỌN PHƯƠNG THỨC THANH TOÁN
    const paymentItems = document.querySelectorAll('#payment-methods .option-item');
    paymentItems.forEach(item => {
        item.addEventListener('click', function() {
            paymentItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input[type="radio"]').checked = true;
        });
    });

    // 6. DỮ LIỆU ĐỊA PHƯƠNG (Tỉnh thành -> Quận huyện -> Phường xã)
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

    // 7. XỬ LÝ ĐẶT HÀNG FORM VALIDATION
    const orderBtn = document.getElementById('order-submit-btn');
    orderBtn.addEventListener('click', function() {
        let coLoi = false;
        const cacOTrong = document.querySelectorAll('.form-group.compulsory');

        cacOTrong.forEach(group => {
            const field = group.querySelector('input, select');
            if (!field.value.trim()) {
                group.classList.add('has-error');
                coLoi = true;
            } else {
                group.classList.remove('has-error');
            }
        });

        if (coLoi) {
            window.scrollTo({ top: document.getElementById('province').offsetTop - 120, behavior: 'smooth' });
            return;
        }

        document.getElementById('step-shipping').classList.add('active');
        const loaiThanhToan = document.querySelector('#payment-methods .option-item.selected').getAttribute('data-type');
        if (loaiThanhToan === 'online') {
            document.getElementById('gateway-page').style.display = 'flex';
        } else {
            document.getElementById('step-complete').classList.add('active');
            document.getElementById('success-page').style.display = 'flex';
        }
    });

    document.querySelectorAll('.form-group.compulsory input, .form-group.compulsory select').forEach(el => {
        el.addEventListener('input', function() { this.parentElement.classList.remove('has-error'); });
        el.addEventListener('change', function() { this.parentElement.classList.remove('has-error'); });
    });

    document.getElementById('confirm-payment-btn').addEventListener('click', function() {
        document.getElementById('gateway-page').style.display = 'none';
        document.getElementById('step-complete').classList.add('active');
        document.getElementById('success-page').style.display = 'flex';
    });

    // Kích hoạt vẽ giỏ hàng ngay khi tải xong trang
    renderCartItems();
});
