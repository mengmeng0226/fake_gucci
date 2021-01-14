$(function (){
    console.log('start');
    let goodsNumber = 200
    let count = 1
    let goods_info = null
    // 得到商品ID
    const id = window.sessionStorage.getItem('goods-id')
    // 判断是否有这个商品
    if(!id) {alert('该商品不存在') 
    window.location.href = '../list.html' 
    return}
    getGoodsInfo()
    async function getGoodsInfo(){
        const res = await $.get('../server/goodsInfo.php',
        {id},null,'json')
        bindHtml(res.info)
        console.log(id);
        console.log(res.info);
    }
    function bindHtml(info){
        // goodsNumber =info.goodsNumber
        goods_info = info
        // console.log(info.goodsNumber);
        let s1 =`
    <div class=" enlargeBox box">
        <div class="imgBox show">
            <img src="${ info.goods_big_logo }" alt="">
            <div class="mask"></div>
        </div>
        <div class="enlarge"></div>




          
          <div class="goodsInfo">
            <p class="desc">${ info.goods_name }</p>
            <div class="btn-group size">
              <button type="button" class="btn btn-default">S</button>
              <button type="button" class="btn btn-default">M</button>
              <button type="button" class="btn btn-default">L</button>
              <button type="button" class="btn btn-default">XL</button>
            </div>
            <p class="price">
              ￥ <span class="text-danger">${ info.goods_price }</span>
            </p>
            <div class="num">
              <button class="sub">-</button>
              <input type="text" value="1" class="number">
              <button class="add">+</button>
            </div>
            <div class="getCart">
              <button class="btn btn-success addCart">加入购物车</button>
              <button class="btn btn-warning goShopping">继续去购物</button>
            </div>
          </div>
        </div>
        `
        $('.goodsDetail').html(s1)
    }
    // 绑定事件
    $('.goodsDetail').on('click','.add',()=>{
        count++
        console.log(count);
        // if(count > goodsNumber)return
        // count = goodsNumber
        $('.goodsDetail .number').val(count)
        console.log(count);
        console.log(goodsNumber);
    })
    $('.goodsDetail').on('click','.sub',()=>{
        count --
        if(count < 1 )return count = 1
        $('.goodsDetail .number').val(count)
        console.log('点击了');
    })
// 加入购物车
$('.goodsDetail').on('click','.addCart',function(){
    const list = JSON.parse(window.localStorage.getItem('list'))||[]
    const res = list.filter(item => item.goods_id === goods_info.goods_id)
    if(res.length){
        // 表示有
        res[0].cart_number += count 
    } else{
        goods_info.cart_number = count
        list.push(goods_info)
    }
    window.localStorage.setItem('list',JSON.stringify(list))
})
//  6.继续购物
$('.goodsDetail').on('click','.goShopping',function(){
    console.log('点击了');
    window.location.href='../list.html'
})
})

// 放大镜
        function Enlarge (select){
            this.ele =document.querySelector(select)
            // 图片盒子
            this.show = this.ele.querySelector('.imgBox')
            // 放大镜盒子
            this.enlarge = this.ele.querySelector('.enlarge')
            // 朦版盒子
            this.mask = this.ele.querySelector('.mask')
            // list盒子
            this.list = this.ele.querySelector('.listBox')
            console.log(this.list);
            // 图片盒子的长和宽
            this.showWidth = this.show.clientWidth
            this.showHeight = this.show.clientHeight
            // 放大镜盒子的长和宽
            this.enlargeWidth = parseInt(window.getComputedStyle(this.enlarge).width)
            this.enlargeHeight = parseInt(window.getComputedStyle(this.enlarge).height)
            // 背景图的高度和宽度
            this.bgWidth = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
            this.bgHeight = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])

            this.init()
        }

        // 1.启动器
        Enlarge.prototype.init =function (){
            this.overOut()
            this.setMask()
            this.mouseMove()
            this.setList()
        }
        // 2.鼠标移入 mask 和放大镜 盒子显示
        Enlarge.prototype.overOut =function(){
            this.show.addEventListener('mouseover',()=>{
                this.mask.style.display = 'block'
                this.enlarge.style.display = 'block'
            })
            this.show.addEventListener('mouseout',()=>{
                this.mask.style.display = 'none'
                this.enlarge.style.display = 'none'
            })
        }
        // 3.计算比例 改变mask的尺寸
        Enlarge.prototype.setMask = function(){
            // mask尺寸= show盒子尺寸 * 放大镜盒子尺寸 / 背景图尺寸
            this.maskWidth = this.showWidth * this.enlargeWidth / this.bgWidth
            this.maskHeight = this.showHeight * this.enlargeHeight / this.bgHeight
            // 赋值给mask
            this.mask.style.width = this.maskWidth+'px'
            this.mask.style.height = this.maskHeight+'px'
        }
        // 4.设置鼠标跟随
        Enlarge.prototype.mouseMove = function(){
            this.show.addEventListener('mousemove',(e)=>{
                e = e || window.event
                // 1.得到坐标
                let x = e.offsetX -this.maskWidth/2
                let y = e.offsetY - this.maskHeight/2
                // 3. 控制范围
                if(x < 0) x = 0
                if(y < 0) y = 0
                if(x > this.showWidth - this.maskWidth) x = this.showWidth - this.maskWidth
                if( y > this.showHeight - this.maskHeight) y = this.showHeight -this.maskHeight
                // 2.赋值
                this.mask.style.left = x + 'px'
                this.mask.style.top = y + 'px'
                // 4.计算背景图移动的距离
                const bgX = x*this.enlargeWidth /this.maskWidth
                const bgY = x*this.enlargeHeight /this.maskHeight
                // 5.赋值
                this.enlarge.style.backgroundPosition = `-${bgX}px -${bgY}px`
            })
        } 
        // list 切换
        Enlarge.prototype.setList= function(){
            // 1.事件委托给listBox
            this.list.addEventListener('click',(e)=>{
                e = e || window.event
                const target = e.target|| e.srcElement
                if(target.nodeName ==='IMG'){
                    const showUrl = target.dataset.show
                    const enlargeUrl = target.dataset.enlarge
                    console.log(showUrl);
                    console.log(enlargeUrl);
                    // 赋值
                    this.show.firstElementChild.src = showUrl
                    this.enlarge.style.backgroundImage = `url(${enlargeUrl})`
                    // 边框颜色配套
                    for(let i = 0; i < this.list.children.length;i++){
                        this.list.children[i].classList.remove('active')
                    }
                    target.parentElement.classList.add('active')
                }
            })
        }
