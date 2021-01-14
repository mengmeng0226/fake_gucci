$(function (){
    console.log('入口函数');
    const list_info = {
        cat_one: 'all',
        cat_two:'all',
        cat_three:'all',
        sort:'id',
        sortType:'ASC',
        current:1,
        pagesize:12,
    }
    // 请求一级分类列表
    getCatOne()
    async function getCatOne(){
        const { list } = await $.get('../server/catOne.php',null,null,'json')
        // 渲染页面
        let str = '<span class="active">全部</span>'
        list.forEach(item => {
            str +=` <span> ${ item.cat_one_id }</span>`
        })
        $('.right').html(str)
    }
    // 给span添加点击事件 委托给right
    $('.right').on('click','span',function(){
        $(this).addClass('active').siblings().removeClass('active')
        const cat_one = $(this).text()
        list_info.cat_one = cat_one
        list_info.cat_two = 'all'
        list_info.cat_three ='all'
        $('.cat_three .right').html('<span class="active">全部</span>')
        if(cat_one ==='全部'){
            // 给二级列表回归
            $('.cat_two .right').html('<span class="active">全部</span>')
            list_info.cat_one = 'all'
        }else{
            getCatTwo()
        }
        getCount()
    })
// 请求二级分类列表
async function getCatTwo(){
    const {list }  = await $.get('./server/catTwo.php',{ cat_one: list_info.cat_one },null,'json')
    // 渲染页面
    let str = '<span class="active">全部</span>'
    list.forEach(item => {
        str += `<span>${ item.cat_two_id }</span>`
    })
    $('.cat_two .right').html(str)
}
$('.cat_two .right').on('click','span',function(){
    $(this).addClass('active').siblings().removeClass('active')
    // 拿到分类内容
    const cat_two = $(this).text()
    // 修改list info
    list_info.cat_two = cat_two
    // 修改list info 里面的cat-three回归
    list_info.cat_three = 'all'

    if(cat_two ==='全部'){
        list_info.cat_two ='all'

        $('.cat_two .right').html('<span class="active">全部</span>')
        list_info.cat_two = 'all'
    }else{
        getCatThree()
    }

    getCount()

})
// 请求三级分类列表
async function getCatThree(){
    const { list }  = await $.get('./server/catThree.php',{ cat_one: list_info.cat_one,cat_two: list_info.cat_two },null,'json')
    // 渲染页面
    let str = '<span class="active">全部</span>'
    list.forEach(item => {
        str += `<span>${ item.cat_three_id }</span>`
    })
    $('.cat_three .right').html(str)
}
// 三级列表点击事件
$('.cat_three>.right').on('click','span',function(){
    $(this).addClass('active').siblings().removeClass('active')
    const cat_three = $(this).text()
    list_info.cat_three = cat_three
    if(cat_three === '全部'){
        list_info.cat_three='all'
    }
    getCount()
})
// 8.请求总条数
getCount()
async function getCount(){
    // 8,1 发起请求
    const{ count } = await $.get('./server/getCount.php',{ cat_one: list_info.cat_one,cat_two:list_info.cat_two,cat_three:list_info.cat_three },null,'json')
    console.log(count+'条数据');
    // 8,2 渲染页面 使用pagination插件
    new Pagination('.pagination',{
        total:count,
        pagesize:12,
        sizeList:[10,20,30],
        change(current,pagesize){
            
            list_info.pagesize = pagesize
            list_info.current = current
            getGoodsList()
        }
    })
}
    // 请求商品列表
    async function getGoodsList(){
        const { list } =await $.get('../server/goodsList.php',list_info,null,'json')
        // 渲染页面
        let str =''
        list.forEach(item =>{
            str += `
            <li class="thumbnail">
            <img src="${ item.goods_big_logo}" alt="...">
            <div class="caption">
            <h5 style="height:100px"data-id="${ item.goods_id}">${ item.goods_name }</h5><p class="price">￥ <span class="text-danger">${ item.goods_price }</span></p><p>
                <a href="javascript:;" class="btn btn-danger" role="button">加入购物车</a>
                <a href="./cart.html" class="btn btn-warning" role="button">去结算</a>
            </p>
            </div>
        </li>
        `
        })
        $('.goodsList ul').html(str)
    }
    // 每一个商品到点击事件
$('.goodsList ul').on('click','h5',function(){
    console.log('我呗点击了');
    console.log(this);
    window.sessionStorage.setItem('goods-id',this.dataset.id)
    // 跳转页面
    window.location.href= '../detail.html'
})
})