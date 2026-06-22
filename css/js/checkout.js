document.addEventListener('DOMContentLoaded', function() {
    let shippingFee = 30000; // Phí ship mặc định ban đầu

    // 1. DỮ LIỆU ĐỊA PHƯƠNG (Tỉnh thành -> Quận huyện -> Phường xã)
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

    // Thay đổi tỉnh thành phố
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

    // Thay đổi quận huyện
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

    // 2. TÍNH NĂNG CHỌN PHƯƠNG THỨC VẬN CHUYỂN
    const shippingItems = document.querySelectorAll('#shipping-methods .option-item');
    shippingItems.forEach(item => {
        item.addEventListener('click', function() {
            shippingItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input[type="radio"]').checked = true;

            shippingFee = parseInt(this.getAttribute('data-fee'));
            document.getElementById('shipping-fee').innerText = shippingFee.toLocaleString('vi-VN') + 'đ';
            tinhToanGioHang();
        });
    });

    // 3. TÍNH NĂNG CHỌN PHƯƠNG THỨC THANH TOÁN
    const paymentItems = document.querySelectorAll('#payment-methods .option-item');
    paymentItems.forEach(item => {
        item.addEventListener('click', function() {
            paymentItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input[type="radio"]').checked = true;
        });
    });

    // 4. TĂNG GIẢM SỐ LƯỢNG & XÓA SẢN PHẨM TRONG GIỎ HÀNG
    const cartList = document.getElementById('cart-list');
    cartList.addEventListener('click', function(e) {
        const target = e.target;

        // Bấm nút Cộng (+)
        if (target.classList.contains('plus')) {
            const qtyVal = target.parentElement.querySelector('.qty-val');
            qtyVal.innerText = parseInt(qtyVal.innerText) + 1;
            capNhatGiaCuaDong(target.closest('.cart-item'));
        }

        // Bấm nút Trừ (-)
        if (target.classList.contains('minus')) {
            const qtyVal = target.parentElement.querySelector('.qty-val');
            let currentQty = parseInt(qtyVal.innerText);
            if (currentQty > 1) {
                qtyVal.innerText = currentQty - 1;
                capNhatGiaCuaDong(target.closest('.cart-item'));
            }
        }

        // Bấm nút Xóa thùng rác
        if (target.classList.contains('remove-btn') || target.closest('.remove-btn')) {
            target.closest('.cart-item').remove();
            tinhToanGioHang();
        }
    });

    function capNhatGiaCuaDong(row) {
        const giaGoc = parseInt(row.getAttribute('data-price'));
        const soLuong = parseInt(row.querySelector('.qty-val').innerText);
        row.querySelector('.item-price').innerText = (giaGoc * soLuong).toLocaleString('vi-VN') + 'đ';
        tinhToanGioHang();
    }

    // Hàm tự động cộng tiền hàng + tiền ship ra tổng tiền cuối cùng
    function tinhToanGioHang() {
        let tongTienHang = 0;
        document.querySelectorAll('.cart-item').forEach(row => {
            const giaGoc = parseInt(row.getAttribute('data-price'));
            const soLuong = parseInt(row.querySelector('.qty-val').innerText);
            tongTienHang += giaGoc * soLuong;
        });

        document.getElementById('subtotal').innerText = tongTienHang.toLocaleString('vi-VN') + 'đ';
        let tongThanhToan = tongTienHang + shippingFee;
        document.getElementById('total-payment').innerText = tongThanhToan.toLocaleString('vi-VN') + 'đ';
        document.getElementById('gateway-amount').innerText = "Số tiền: " + tongThanhToan.toLocaleString('vi-VN') + 'đ';
    }

    // 5. NÚT ĐẶT HÀNG & KIỂM TRA BẮT BUỘC ĐIỀN FORM (VALIDATE)
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

        // Nếu có ô trống, cuộn màn hình lên để báo khách nhập lại
        if (coLoi) {
            window.scrollTo({ top: document.getElementById('shipping-form').offsetTop - 80, behavior: 'smooth' });
            return;
        }

        // Cập nhật trạng thái thanh tiến trình (Bước 3: Vận Chuyển)
        document.getElementById('step-shipping').classList.add('active');
        
        // Kiểm tra xem khách chọn Trực tuyến hay COD nhận hàng trả tiền
        const loaiThanhToan = document.querySelector('#payment-methods .option-item.selected').getAttribute('data-type');
        if (loaiThanhToan === 'online') {
            document.getElementById('gateway-page').style.display = 'flex'; // Hiện mã QR quét tiền
        } else {
            document.getElementById('step-complete').classList.add('active');
            document.getElementById('success-page').style.display = 'flex'; // Hiện thông báo đặt hàng thành công trực tiếp
        }
    });

    // Khi người dùng gõ vào các ô bị báo lỗi, tự động xóa viền đỏ lỗi đi
    document.querySelectorAll('.form-group.compulsory input, .form-group.compulsory select').forEach(el => {
        el.addEventListener('input', function() { this.parentElement.classList.remove('has-error'); });
        el.addEventListener('change', function() { this.parentElement.classList.remove('has-error'); });
    });

    // Nút xác nhận sau khi quét mã QR thành công
    document.getElementById('confirm-payment-btn').addEventListener('click', function() {
        document.getElementById('gateway-page').style.display = 'none';
        document.getElementById('step-complete').classList.add('active');
        document.getElementById('success-page').style.display = 'flex';
    });
});
