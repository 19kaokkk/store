function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function initNewsletter() {
    const emailInput = document.getElementById('newsletter-email');
    const submitBtn = document.getElementById('newsletter-btn');
    const errorDiv = document.getElementById('newsletter-error');

    if (!emailInput || !submitBtn || !errorDiv) return;

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        emailInput.focus();
    }

    submitBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        errorDiv.style.display = 'none';

        if (email === '') {
            showError('* Hãy nhập email');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('* Email không hợp lệ (ví dụ: ten@email.com)');
            return;
        }
        
        errorDiv.style.display = 'none';
        alert('✅ Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi thông tin mới nhất cho bạn.');
        
        emailInput.value = '';
    });

    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
}

document.addEventListener('DOMContentLoaded', initNewsletter);
