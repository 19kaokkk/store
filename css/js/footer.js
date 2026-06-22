// ==================== FOOTER JS ====================

document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('newsletter-email');
    const subscribeBtn = document.getElementById('newsletter-btn');
    const errorMsg = document.getElementById('newsletter-error');

    if (!subscribeBtn) return;

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

        // TODO: thay bằng lệnh gọi API thực tế khi tích hợp backend
        alert('Đăng ký thành công! Cảm ơn bạn đã quan tâm Lady Rose.');
        emailInput.value = '';
    });
});
