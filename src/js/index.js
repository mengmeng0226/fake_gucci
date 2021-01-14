$(function(){
    // 二级导航
    $('.nav > ul > li').on('mouseover',function(){
        $(this)
        .find('ol')
        .slideToggle()
        .parent()
        .siblings()
        .addClass('active')
        .find('ol')
        .slideUp()
    })
    $('.nav > ul> li').on('click', e => {
        return false
    })
    // 轮播图
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true, 
        autoplay:true,
          // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
          // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }})
        // 获取cookie
        const nickname = getCookie('nickname')
        console.log(nickname);

        if(nickname){
            $('.off').addClass('hide')
            $('.on').removeClass('hide').text(`欢迎回来：${nickname}`)
            const list = JSON.parse(window.localStorage.getItem('list'||[]))
            $('.cartNum').text(list.length)
        } else {
            $('.off').removeClass('hide')
            $('.on').addCLass('hide')
        }   
        // 点击图片跳转到购物列表
        $('.pic').on('click',function(){
            window.location.href = '../list.html'
        })
})
