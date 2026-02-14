$(document).ready(function() {
    // 1. Mở Modal khi nhấn Tư vấn [cite: 2026-02-14]
    $(document).on('click', '.btn-order', function() {
        const name = $(this).data('name');
        $('#order-details').html(`Sản phẩm quan tâm: <br>${name}`);
        $('#order-modal').fadeIn().css('display', 'flex');
    });

    // 2. Đóng Modal
    $('.close-modal').on('click', function() { $('#order-modal').fadeOut(); });

    // 3. Toggle Menu Mobile
    $('#mobile-menu-btn').on('click', function() { $('.nav-links').toggleClass('active'); });

    // 4. Tự động đóng modal sau khi khách chọn liên hệ [cite: 2026-02-14]
    $('.contact-buttons a').on('click', function() {
        setTimeout(() => { $('#order-modal').fadeOut(); }, 1000);
    });
});
