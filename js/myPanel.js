/**
 * Created by EKO-LKB on 2017/2/13.
 */
define(['zepto', 'smmin', 'template/myPanelTpl', 'template/editTpl', 'template/editPassWordTpl' , 'mustache'], function ($, smmin, myPanelTpl, editTpl, editPassWordTpl, mustache) {
    //打开面板
    $(document).on('click', '.myinformation', function () {
        if(!user.avatarUrl){
            user.avatarUrl = "../img/default-avatar.e30559a.svg";
        }
        var userInfo = {
            userName:user.userName,
            userEmail:user.email,
            userAvatar:user.avatarUrl
        };
        $('.information_panel').html(mustache.render(myPanelTpl, userInfo));
        if($('.information_panel').hasClass('active'))  return false;
        $.openPanel(".information_panel");

    });
    //计算年龄
    function getAge(birthday) {
        var bDay = new Date(birthday);
        var nDay = new Date();
        var nbDay = new Date(nDay.getFullYear(), bDay.getMonth(), bDay.getDate());
        var age = nDay.getFullYear() - bDay.getFullYear();
        if(bDay.getTime() > nDay.getTime()){$.alert('选择日期有错'); return null;}
        else{return nbDay.getTime() <= nDay.getTime() ? age : --age;}
    }
    function editUserInfo() {
        $.popup(editTpl);
        $('.edit_username input').val(user.userName);
        $('.edit_sex input').val(user.sex);
        $('.edit_age input').val(user.age);
        $('.edit_birthday input').val(user.birthday);
        $('.edit_email input').val(user.email);
        $('.edit_hometown input').val(user.hometown);

        $('.edit_sex .item-input > input').picker({
            toolbarTemplate:'<header class="bar bar-nav">\
                                 <button class="button button-link pull-right close-picker">确定</button>\
                                 <h1 class="title">标题</h1>\
                             </header>',
            cols:[
                {
                    textAlign:'center',
                    values:['男', '女']
                }
            ]
        });
        $('.edit_birthday .item-input > input').calendar();
        $('.edit_birthday .item-input > input').on('change', function () {
            var age = getAge($('.edit_birthday input').val());
            //console.log(age);
            if(age == null) return false;
            $('.edit_age input').val(age);
        });
        $('.btn_save').on('click', function () {
            var updateUserInfo = {
                userName:$('.edit_username input').val(),
                sex:$('.edit_sex input').val(),
                age:$('.edit_age input').val(),
                birthday:$('.edit_birthday input').val(),
                email:$('.edit_email input').val(),
                //hometown:$('.edit_hometown input').val()
            };
            post(BASE_URL + 'Auth/editUserInfo/token/' + user.token, updateUserInfo, function (res) {
                //console.log(res);
                if(res.status == 401) {
                    $.alert("token失效,请重新登录", function () {
                        account.login();
                    });
                }else if(res.status == 19){
                    $.toast("更新成功");
                    user.userName = updateUserInfo.userName;
                    user.sex = updateUserInfo.sex;
                    user.age = updateUserInfo.age;
                    user.birthday = updateUserInfo.birthday;
                    user.email = updateUserInfo.email;
                    //user.hometown = updateUserInfo.hometown;
                    account.setUser(user);
                    $.closeModal('.edit_information');
                }else{
                    $.alert(res.error);
                }
            });

        });
        $('.btn_cancel').on('click', function () {
            $.closeModal('.edit_information');
        });
    }
    function editPwd() {
        $.popup(editPassWordTpl);
        $('.btn_cancel').on('click', function () {
            $.closeModal('.edit_password');
        });
        $('.btn_save').on('click',function () {
            var oriPassWord = $('.edit_pwd .item-input > input').val();
            var newPwd = $('.edit_newpwd .item-input > input').val();
            var reNewPwd = $('.edit_renewpwd .item-input > input').val();
            if(!oriPassWord){
                $.alert("请输入原密码");
                return false;
            }
            if(!newPwd){
                $.alert("请输入新密码");
                return false;
            }
            if(!reNewPwd){
                $.alert("请输入重复新密码");
            }
            if(oriPassWord != user.password){
                $.alert("原密码错误");
                return false;
            }
            if(newPwd != reNewPwd){
                $.alert("两次输入密码不一致");
                return false;
            }
            var newPassWord = {
                password:newPwd
            };
            post(BASE_URL + 'Auth/editPassWord/token/' + user.token, newPassWord, function (res) {
                console.log(res);
                if(res.status == 401) {
                    $.alert("token失效,请重新登录", function () {
                        account.login();
                    });
                }else if(res.status == 21){
                    user.password = newPassWord.password;
                    account.setUser(user);
                    $.toast("修改成功");
                    $.closeModal('.edit_password');
                }else{
                    $.alert(res.error);
                }
            });
        });
    }

    var loading = false;
    $(document).on('click', '#editAvatar', function () {
        if(loading) return;
        loading = true;
        $('#upload').trigger('click');

        $('#upload').on('change',function (event) {
            //获取文件名
            var fileName = $(this).val().replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");
            if(!isCanvasSupported()){
                /*
                * var formData = new FormData();
                * var file = $("#upload")[0].files[0];
                * formData.append("file", file);
                * uploadAvatar(file);
                * */
                var formData = new FormData();
                var file = $("#upload")[0].files[0];
                formData.append("file", file);
                compress(formData);
            }else{
                compress(event, function (base64Img) {
                    //console.log(base64Img);
                    //$('.user_avatar > img').attr('src', base64Img);
                    base64Img = base64Img.split(',')[1];
                    base64Img = window.atob(base64Img);
                    var ia = new Uint8Array(base64Img.length);
                    for(var i = 0; i < base64Img.length; i++){
                        ia[i] = base64Img.charCodeAt(i);
                    }
                    var blob = new Blob([ia], {type:"image/jpeg"});
                    var fd = new FormData();
                    fd.append('file', blob, 'userAvatar' + user.userId + fileName + '.jpg');
                    applyAvatar(fd); 
                })
            }

        });
        loading = false;
    });
    //上传头像
    function applyAvatar(data) {
        $.ajax({
            url:BASE_URL + 'upload/uploadAvatar/token/' + user.token,
            type:'POST',
            data:data,
            crossDomain: true,
            xhrFields:{withCredentials:true},
            cache:false,
            contentType: false,
            processData:false,
            success:function (res) {
                console.log(res);
                if(res.status == 401){
                    $.alert("token失效,请重新登录", function () {
                        account.login();
                    });
                }else if(res.status == 5){
                    $.toast("更换头像成功");
                    user.avatarUrl = res.data.avatarPath;
                    account.setUser(user);
                    $('.myinformation').trigger('click');
                }else{
                    $.alert(res.error);
                }
            }
        });
    }
    // 压缩图片
    function compress(event, callback){
        var file = event.currentTarget.files[0];
        var reader = new FileReader();
        // 读取图片信息
        reader.onload = function (e) {

            var image = $('<img/>');
            // 图片加载完成时：
            image.on('load', function(){
                var canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                var context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(this, 0,0);
                var data = canvas.toDataURL('image/jpeg',0.5);
                callback(data);
            });
            image.attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    }

    $(document).on('click', '.user_information > .list-block > ul li', function () {
        var $t = $(this);
        var $id = $t.attr('id');
        switch($id){
            case 'editInformation':
                editUserInfo();
                break;
            case 'editPassword':
                editPwd();
                break;
            case 'logout':
                $.confirm('确定要退出?', function () {
                    $('body').removeClass();
                    account.logout();
                });
                break;
        }
    });
    $.init();
});