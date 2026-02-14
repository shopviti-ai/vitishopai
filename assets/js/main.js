$(document).ready(function() {
    // 1. Mở Modal khi nhấn Mua Ngay
    $(document).on('click', '.btn-order', function() {
        const name = $(this).data('name');
        const price = $(this).data('price');
        $('#order-details').html(`Đang chọn: <strong>${name}</strong> (${price})`);
        $('#order-modal').fadeIn().css('display', 'flex');
    });

    // 2. Đóng Modal
    $('.close-modal').on('click', function() { $('#order-modal').fadeOut(); });

    // 3. Toggle Menu Mobile
    $('#mobile-menu-btn').on('click', function() { $('.nav-links').toggleClass('active'); });

    // 4. Gửi Messenger
    $('#btn-send-messenger').on('click', function() {
        const info = $('#order-details').text();
        const msg = `CHÀO VĨNH TÍN AI! TÔI MUỐN MUA:\n${info}\nVui lòng tư vấn giúp tôi!`;
        navigator.clipboard.writeText(msg).then(() => {
            alert("Đã sao chép nội dung đơn hàng!");
            window.open("https://m.me/cafeep276", "_blank"); 
        });
    });
});
