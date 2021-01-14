$(function(){
    $('.btn').click(async ()=>{
        const username = $('#username').val()
        const password =$('#password').val()
        console.log(username,password);
        if(!username||!password)return alert('请完整填写表单')
        if(!/^[a-z0-9]\w{4,11}$/i.test(username)||!/^[a-z0-9]\w{4,11}$/i.test(password)) return alert('用户名密码不符合要求')
        const { code,nickname }  =await $.post('../server/login.php',{username,password},null,'json')
        // console.log(code,nickname)
        //当code为0的时候 登陆失败 
        if(!code) return alert('用户名密码错误')
        // 存储一个昵称表标示符
        setCookie('nickname',nickname,60*60*24)
        // 获取会话存储里到地址信息
        const url = window.sessionStorage.getItem('url')
        window.location.href = `${url? url: '../index'}.html`
        
        console.log('后续操作');
    })
})