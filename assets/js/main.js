(function($) {
    var $window = $(window),
        $body = $('body');

    // Breakpoints của Template Phantom
    breakpoints({
        xlarge:   [ '1281px',  '1680px' ],
        large:    [ '981px',   '1280px' ],
        medium:   [ '737px',   '980px'  ],
        small:    [ '481px',   '736px'  ],
        xsmall:   [ '361px',   '480px'  ],
        xxsmall:  [ null,      '360px'  ]
    });

    // Hiệu ứng load trang
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    if (browser.mobile) $body.addClass('is-touch');

    // Menu Sidebar logic
    var $menu = $('#menu');
    $menu.wrapInner('<div class="inner"></div>');
    $menu._locked = false;
    $menu._lock = function() {
        if ($menu._locked) return false;
        $menu._locked = true;
        window.setTimeout(function() { $menu._locked = false; }, 350);
        return true;
    };
    $menu._show = function() { if ($menu._lock()) $body.addClass('is-menu-visible'); };
    $menu._hide = function() { if ($menu._lock()) $body.removeClass('is-menu-visible'); };
    $menu._toggle = function() { if ($menu._lock()) $body.toggleClass('is-menu-visible'); };

    $menu.appendTo($body)
        .on('click', function(event) { event.stopPropagation(); })
        .on('click', 'a', function(event) {
            var href = $(this).attr('href');
            event.preventDefault();
            event.stopPropagation();
            $menu._hide();
            if (href == '#menu') return;
            window.setTimeout(function() { window.location.href = href; }, 350);
        })
        .append('<a class="close" href="#menu">Close</a>');

    $body.on('click', 'a[href="#menu"]', function(event) {
        event.stopPropagation();
        event.preventDefault();
        $menu._toggle();
    }).on('click', function(event) {
        $menu._hide();
    }).on('keydown', function(event) {
        if (event.keyCode == 27) $menu._hide();
    });

    // --- ĐỒNG HỒ THỜI GIAN ---
    function updateClock() {
        const clockEl = document.getElementById('live-clock');
        if (clockEl) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            clockEl.innerText = now.toLocaleDateString('vi-VN', options);
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

})(jQuery);

/* --- ĐIỀU KHIỂN SLIDER VITI SHOP AI --- */
$(document).ready(function() {
    var $marquee = $('#productMarquee');
    var scrollStep = 300; // Khoảng cách cuộn mỗi lần bấm

    // Xử lý nút Phải (Next)
    $('#nextBtn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Ngăn các lệnh khác can thiệp
        $marquee.stop().animate({
            scrollLeft: $marquee.scrollLeft() + scrollStep
        }, 500); // 500ms là tốc độ cuộn mượt
    });

    // Xử lý nút Trái (Prev)
    $('#prevBtn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $marquee.stop().animate({
            scrollLeft: $marquee.scrollLeft() - scrollStep
        }, 500);
    });

    // --- CHẠY TỰ ĐỘNG NHƯNG DỪNG KHI RE CHUỘT ---
    var autoScroll;
    function startAuto() {
        autoScroll = setInterval(function() {
            var curr = $marquee.scrollLeft();
            // Nếu cuộn hết thì quay lại đầu trang
            if (curr + $marquee.width() >= $marquee[0].scrollWidth - 5) {
                $marquee.animate({ scrollLeft: 0 }, 1000);
            } else {
                $marquee.scrollLeft(curr + 1);
            }
        }, 15); // Tốc độ chạy tự động (số càng nhỏ chạy càng nhanh)
    }

    startAuto();

    // Dừng chạy khi khách di chuột vào xem sản phẩm
    $('#productMarquee, #prevBtn, #nextBtn').hover(
        function() { clearInterval(autoScroll); $marquee.stop(); },
        function() { startAuto(); }
    );
});
// Tính năng hiện QR Zalo khi bấm MUA NGAY
$(document).ready(function() {
    const modal = $('#qro-modal');
    const closeBtn = $('.close-modal');

    // Khi bấm vào bất kỳ nút nào có class 'button' và chứa chữ 'MUA'
    $('a.button').on('click', function(e) {
        if ($(this).text().toUpperCase().includes('MUA')) {
            e.preventDefault(); // Chặn chuyển hướng Zalo ngay lập tức
            modal.fadeIn(300); // Hiện cửa sổ QR mượt mà
        }
    });

    // Bấm dấu X để đóng
    closeBtn.on('click', function() {
        modal.fadeOut(300);
    });

    // Bấm ra ngoài vùng modal để đóng
    $(window).on('click', function(e) {
        if ($(e.target).is(modal)) {
            modal.fadeOut(300);
        }
    });
});
$(document).ready(function() {
   /* --- XỬ LÝ SỰ KIỆN MUA NGAY - VITI SHOP AI --- */
$(document).ready(function() {
    // Sử dụng $(document).on để đảm bảo tất cả nút, kể cả nút chạy ngang, đều hoạt động
    $(document).on('click', '.btn-mua-ngay', function(e) {
        // 1. Chặn tuyệt đối việc chuyển trang hoặc nhảy lên đầu trang [cite: 2026-02-02]
        e.preventDefault();
        e.stopPropagation();

        // 2. Hiện cửa sổ Modal QR Ngân hàng
        // Đảm bảo ID trong HTML là #qro-modal
        $('#qro-modal').css('display', 'flex').hide().fadeIn(300);
        
        console.log("Đã kích hoạt hiện mã QR thanh toán cho Tín"); // Kiểm tra trong F12
        return false;
    });

    // Đóng Modal khi bấm dấu X [cite: 2026-02-02]
    $(document).on('click', '.close-modal', function() {
        $('#qro-modal').fadeOut(300);
    });

    // Đóng Modal khi bấm ra ngoài vùng chứa ảnh QR
    $(window).on('click', function(event) {
        if ($(event.target).is('#qro-modal')) {
            $('#qro-modal').fadeOut(300);
        }
    });
});