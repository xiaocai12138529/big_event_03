// 入口函数
$(function () {
    // 需求一 : 点击跳转
    $('#link_reg').on('click', function () {
        $('.loginBox').hide();
        $('.regBox').show();
    });
    $('#link_login').on('click', function () {
        $('.loginBox').show();
        $('.regBox').hide();
    });

    // 需求二 : 密码验证
    let form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value, item) { //value：表单的值、item：表单的DOM对象
            let pwd = $('.regBox [name=password]').val();
            if (pwd != value) {
                return "密码不一致"
            }
        }
    })

    // 需求三 : 注册表单提交
    let layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        // 组织表单提交
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.regBox [name=username]').val().trim(),
                password: $('.regBox [name=password]').val().trim()
            },
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }

                // 注册成功后
                layer.msg(res.message,{icon : 6});
                // 跳转页面
                $('#link_login').click();
                // 重置from表单
                $('#form_reg')[0].reset();
            }
        })


    });

    // 需求四  : 登录表单
    $('#form_login').on('submit',function  (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data:$(this).serialize(),
            success : function  (res) {
                // console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message,{icon : 5})
                }
                layer.msg(res.message, { icon: 1 });
                // 登录成功跳转页面
                location.href ='/index.html';
                // 保存token
                localStorage.setItem('token',res.token)
            }
        });
    });
})
