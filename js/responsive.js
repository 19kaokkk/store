document.addEventListener('DOMContentLoaded', function () {

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navbar = document.querySelector('.navbar');

    if (hamburgerBtn && navbar) {
        hamburgerBtn.addEventListener('click', function () {
            navbar.classList.toggle('navbar-open');
            const icon = hamburgerBtn.querySelector('i');
            if (navbar.classList.contains('navbar-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
    const footerToggles = document.querySelectorAll('.footer-toggle');

    footerToggles.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const column = btn.closest('.footer-accordion');
            const isOpen = column.classList.contains('open');

            document.querySelectorAll('.footer-accordion.open').forEach(function (openCol) {
                if (openCol !== column) openCol.classList.remove('open');
            });

            column.classList.toggle('open', !isOpen);
        });
    });

});

