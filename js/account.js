/**
 * Created by EKO-LKB on 2017/2/13.
 */
define(['zepto', 'smmin', 'app', 'template/accountTpl'], function ($, smmin, app, accountTpl) {
    var account = {
        login:function () {
            app.destory();
            account.setUser(null);
            account.createLoginBody();
            account.validateLogin();
            account.register();
        },
        setUser:function (user) {
            if(user === null){
                localStorage.removeItem("user");
                user = [];
                window.user = undefined;
            }else {
                localStorage.setItem("user", JSON.stringify(user));
                window.user = user;
            }

            account.user = user;
            //console.log(account.user);
        },
        getUser:function () {
            //console.log(localStorage.getItem("token"));
            account.user = account.user ? account.user : JSON.parse(localStorage.getItem("user"));
            //if(account.user){console.log(account.user)}
            return account.user;
        },
        createLoginBody:function () {
            if($('#login_page').length == 0){
                $('body').html(accountTpl);
            }

            $(document).off('click', '.btn_group > div');
            $(document).on('click', '.btn_group > div', function () {
                var $t = $(this);
                var $id = $t.attr('id');
               /* if($t.hasClass('active')){
                    return false;
                }*/
                $t.addClass('active').siblings().removeClass('active');
                switch($id){
                    case 'login':
                        var loginHtml = '<div><i class="iconfont icon-zhanghao"></i><input type="text" name="userName" id="userName" placeholder="账号" autocomplete="off"></div>'+
                                        '<div><i class="iconfont icon-denglumima"></i><input type="password" name="password" id="password" placeholder="密码"></div>'+
                                        '<button id="submit" type="button" class="button button-big button-fill">登录</button>';
                        $('.login_container > form').html(loginHtml);
                        break;
                    case 'register':
                        var registerHtml = '<div><i class="iconfont icon-zhanghao"></i><input type="text" name="userName" id="userName" placeholder="账号" autocomplete="off"></div>'+
                                           '<div><i class="iconfont icon-denglumima"></i><input type="password" name="password" id="password" placeholder="密码"></div>'+
                                           '<div><i class="iconfont icon-youxiang"></i><input type="text" name="email" id="email" placeholder="邮箱"></div>'+
                                           '<button id="registerSend" type="button" class="button button-big button-fill">注册</button>';
                        $('.login_container > form').html(registerHtml);
                        break;
                }
            });
        },
        validateLogin:function () {
            $(document).off('click', '#submit');
            $(document).on('click', '#submit', function (e) {
                e.stopPropagation();
                var data = {};
                data.userName = $.trim($('#userName').val());
                data.password = $('#password').val();
                if(!data.userName){
                    $.alert('请输入用户名');
                    return false;
                }
                if(!data.password){
                    $.alert('请输入密码');
                    return false;
                }
                //登录验证
                post(BASE_URL + 'Auth/login', data, function (res) {
                    //console.log(res);
                    if(res.status == 200){
                        account.setUser(res.data);
                        app.init();
                    }else {
                        $.alert(res.error);
                    }
                });

            });
            $.init();
        },
        register:function () {
            $(document).off('click', '#registerSend');
            $(document).on('click', '#registerSend', function () {
                var registerData = {};
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                registerData.userName = $.trim($('#userName').val());
                registerData.password = $('#password').val();
                registerData.email = $('#email').val();
                if(!registerData.userName){
                    $.alert('请输入昵称');
                    return false;
                }
                if(!registerData.password){
                    $.alert('请输入密码');
                    return false;
                }
                if(!registerData.email){
                    $.alert('请输入邮箱地址');
                    return false;
                }
                if(!reg.test(registerData.email)){
                    $.alert('请输入有效地邮箱地址');
                    return false;
                }
                post(BASE_URL + 'Auth/register', registerData, function (res) {
                    console.log(res);
                    if(res.status == 4){
                        $.alert("用户已存在");
                    }else if(res.status == 201){
                        $.alert('注册成功，返回登录', function () {
                           $('.btn_login').trigger('click');
                        });
                    }else{
                        $.alert("注册失败");
                    }
                })
            });
        },
        logout:function () {
            account.setUser(null);
            app.destory();
            account.login();
        }
    };
    window.account = {
      login:account.login,
      logout:account.logout,
      getUser:account.getUser()
    };
    return account;
});
