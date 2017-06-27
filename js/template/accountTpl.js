/**
 * Created by EKO-LKB on 2017/3/28.
 */
define(function () {
    var tpl = [
        '<div class="page-group">',
            '<div class="page" id="login_page">',
                '<div class="login_container">',
                    '<div>',
                        '<div class="btn_group">',
                            '<div class="btn_login active" id="login">登录</div>',
                            '<div class="btn_register" id="register">注册</div>',
                        '</div>',
                    '</div>',
                    '<form>',
                        '<div><i class="iconfont icon-zhanghao"></i><input type="text" name="userName" id="userName" placeholder="账号" autocomplete="off"></div>',
                        '<div><i class="iconfont icon-denglumima"></i><input type="password" name="password" id="password" placeholder="密码"></div>',
                        '<button id="submit" type="button" class="button button-big button-fill">登录</button>',
                    '</form>',
                '</div>',
               /* '<div class="regisbtn"><a href="#">还没有账号?立即注册</a></div>',*/
                '<div class="backdrop"></div>',
            '</div>',
        '</div>'
    ].join('');
    return tpl;
});