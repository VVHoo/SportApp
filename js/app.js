/**
 * Created by EKO-LKB on 2017/3/23.
 */
define(['zepto'], function ($) {
    var app = {
        init:function () {
            require(['account', 'template/bodyTpl','train', 'article', 'mine', 'myPanel', 'toolbar'], function (account, bodyTpl, train, article, mine, myPanel, toolbar) {
                //if(applogin){continue}else{account.login}
                window.account = account;
                window.user = account.getUser();
                window.trainFlag = false;
                //console.log(window.user);
                if(user == undefined || user == null){
                    account.login();
                }else{
                    $('body').html(bodyTpl);
                    $('#train').trigger('click');
                    $(document).on("pageInit", "#main_page", function (e, id, $page) {
                       //alert(1);
                    });
                    $.init();
                }
            });

            $(document).on('contextmenu', function () {
                return false;
            });

            $(document).on('mousedown', 'img', function (e) {
                e.preventDefault();
            });

            $(document).on('touchmove', '.scroller', function(e) {
                e.preventDefault();
            });
        },
        destory:function () {
            $('body').empty();
        }
    };
    return app;
});