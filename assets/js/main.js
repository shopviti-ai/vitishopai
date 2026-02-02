$(document).ready(function() {
    /* --- 1. XỬ LÝ SỰ KIỆN MUA NGAY (HIỆN QR BANK) --- */
    $(document).on('click', '.btn-mua-ngay', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Hiện cửa sổ Modal QR Ngân hàng
        $('#qro-modal').css('display', 'flex').hide().fadeIn(300);
        
        console.log("Viti Shop AI: Đã kích hoạt hiện mã QR thanh toán");
        return false;
    });

    /* --- 2. XỬ LÝ ĐÓNG MODAL --- */
    $(document).on('click', '.close-modal', function() {
        $('#qro-modal').fadeOut(300);
    });

    $(window).on('click', function(event) {
        if ($(event.target).is('#qro-modal')) {
            $('#qro-modal').fadeOut(300);
        }
    });

    /* --- 3. XỬ LÝ MENU MOBILE --- */
    $('#mobile-menu-btn').on('click', function(e) {
        e.preventDefault();
        $('#horizontal-nav').slideToggle(300);
        $(this).toggleClass('active');
    });

    // Tự động đóng menu khi bấm vào link trên mobile
    $('#main-menu a').on('click', function() {
        if ($(window).width() <= 768) {
            $('#horizontal-nav').slideUp(300);
        }
    });
});
