jQuery('.slider').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '60px',
    infinite: true,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    speed: 700,
    useTransform: true,
    cssEase: 'cubic-bezier(1,.25,.25, 1)',
    swipeToSlide: true,
    waitForAnimate: false,
    responsive: [
        {
            breakpoint: 1700,
            settings: {
                slidesToShow: 5,
            },
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 1270,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 1040,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 899,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 730,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 505,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
})

$('.control-arrows_left').on('click', function () {
    $('.slider').slick('slickPrev')
})
$('.control-arrows_right').on('click', function () {
    $('.slider').slick('slickNext')
})
$('.menu-toggler').on('click', function (e) {
    e.preventDefault()
    $('.sidebar').toggleClass('menu-active')
    $('.menu-toggler__burger-icon').toggleClass('hide')
    $('.menu-toggler__close-icon').toggleClass('hide')
})
$('.info__roll').on('click', function (e) {
    e.preventDefault()
    $(this).children('.cover__list').toggleClass('uncover')
})

$('.qty__btn').click(function () {
    var counterVal = parseInt(
        $(this).parent().find('input').val(),
        10
    )
    var input = $(this).parent().find('input')
    var thisVal = parseInt($(this).val(), 10)
    var count = counterVal + thisVal
    var buyBtn = $(this).parent().parent().find('.buy__btn')
    count = count > 99 ? 99 : count
    if (count <= 0) {
        $(this).parent().toggleClass('visible__qty')
        buyBtn.toggleClass('visible__qty')
        count = 1
    }
    input.val(count)
})
$('.buy__btn').click(function () {
    var qtyBlock = $(this).siblings('.qty')
    qtyBlock.toggleClass('visible__qty')
    $(this).toggleClass('visible__qty')
})

function hideMenu() {
    if ($(window).width() <= 900) {
        $('.menu .menu-item:nth-last-child(-n+6)').css(
            'display',
            'none'
        )
        $('.showMoreMenuItems').css('display', 'flex')
        $('.showMoreMenuItems').click(function () {
            $('.menu').children('li').css('display', 'flex')
            $(this).css('display', 'none')
        })
    } else if ($(window).width() > 900) {
        $('.menu').children('li').css('display', 'flex')
        $('.showMoreMenuItems').css('display', 'none')
    }
}

hideMenu()
$(window).on('resize', function () {
    hideMenu()
})
