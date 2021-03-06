/**
 * Created by EKO-LKB on 2017/3/29.
 */
define(function () {
    var tpl = [
        '<div class="popup edit_information">',
            '<header class="bar bar-nav">',
                '<h1 class="title">编辑资料</h1>',
            '</header>',
            '<div class="content">',
                '<div class="list-block">',
                    '<ul>',
                        '<li class="item-content edit_username">',
                            '<div class="item-media"><i class="icon icon-form-name"></i></div>',
                            '<div class="item-inner">',
                                '<div class="item-title label">昵称</div>',
                                '<div class="item-input"><input type="text"></div>',
                            '</div>',
                        '</li>',
                        '<li class="item-content edit_sex">',
                            '<div class="item-media"><i class="icon icon-form-name"></i></div>',
                            '<div class="item-inner">',
                                '<div class="item-title label">性别</div>',
                                '<div class="item-input"><input type="text"></div>',
                            '</div>',
                        '</li>',
                        '<li class="item-content edit_age">',
                            '<div class="item-media"><i class="icon icon-form-name"></i></div>',
                            '<div class="item-inner">',
                                '<div class="item-title label">年龄</div>',
                                '<div class="item-input"><input type="text" disabled="disabled"></div>',
                            '</div>',
                        '</li>',
                        '<li class="item-content edit_birthday">',
                            '<div class="item-media"><i class="icon icon-form-name"></i></div>',
                            '<div class="item-inner">',
                                '<div class="item-title label">生日</div>',
                                '<div class="item-input"><input type="text"></div>',
                            '</div>',
                        '</li>',
                    '</ul>',
                '</div>',
                '<div class="list-block">',
                    '<ul>',
                        '<li class="item-content edit_email">',
                            '<div class="item-media"><i class="icon icon-form-name"></i></div>',
                            '<div class="item-inner">',
                                '<div class="item-title label">邮箱</div>',
                                '<div class="item-input"><input type="email" disabled="disabled"></div>',
                            '</div>',
                        '</li>',
                        /*'<li class="item-content edit_hometown">',
                            '<div class="item-media"><i class="icon icon-form-name"></i></div>',
                            '<div class="item-inner">',
                                '<div class="item-title label">所在地</div>',
                                '<div class="item-input"><input type="text"></div>',
                            '</div>',
                        '</li>',*/
                    '</ul>',
                '</div>',
                '<div class="content-block">',
                    '<div class="row">',
                        '<div class="col-50"><a href="#" class="button button-big button-fill button-success btn_save">保存</a></div>',
                        '<div class="col-50"><a href="#" class="button button-big button-fill button-danger btn_cancel">取消</a></div>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');
    return tpl;
});