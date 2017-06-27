/**
 * Created by EKO-LKB on 2017/2/13.
 */
define(['zepto', 'smmin', 'smextend', 'template/articleTpl', 'template/articleListTpl', 'template/articleContentTpl', 'mustache','echo'], function ($, smmin, smextend, articleTpl, articleListTpl, articleContentTpl, mustache, echo) {

    function getArticleTypeList() {
        post(BASE_URL + 'article/getClassifyArticle/token/' + user.token, {}, function (res) {
            //console.log(res);
            if(res.status == 401){
                $.alert("token失效,请重新登录", function () {
                    account.login();
                });
            }else if(res.status == 200){
                var articleListHtml = '';
                for(var index in res.data){
                    if(index % 2 == 0){
                        var flag = Number(index) + 1;
                        articleListHtml += '<li class="article_classify">';
                        articleListHtml +=    '<a class="classify_title" data-type_article="'+res.data[index].category+'">';
                        articleListHtml +=    '<div class="item-inner">';
                        articleListHtml +=   '<div class="item-title">'+res.data[index].category+'</div>';//if(lastIndex%2==0){}
                        articleListHtml +=   '</div>';
                        articleListHtml +=   '</a>';
                        articleListHtml +=    '<div class="list-block media-list">';
                        articleListHtml +=   '<ul>';
                        articleListHtml +=    '<li class="item-content" data-id_article="'+res.data[index].articleId+'">';
                        articleListHtml +=    '<div class="item-media"><img src="'+res.data[index].imgPath+'" width="55"></div>';
                        articleListHtml +=    '<div class="item-inner"><div class="item-title-row"><div class="item-title">'+res.data[index].title+'</div></div><div class="item-subtitle"> by '+res.data[index].author+'</div></div>';
                        articleListHtml +=    '</li>';
                        articleListHtml +=    '<li class="item-content" data-id_article="'+res.data[flag].articleId+'">';
                        articleListHtml +=   '<div class="item-media"><img src="'+res.data[flag].imgPath+'" width="55"></div>';
                        articleListHtml +=    '<div class="item-inner"><div class="item-title-row"><div class="item-title">'+res.data[flag].title+'</div></div><div class="item-subtitle"> by '+res.data[flag].author+'</div></div>';
                        articleListHtml +=    '</li>';
                        articleListHtml +=    '</ul>';
                        articleListHtml +=    '</div></li>';
                    }
                }
                $('.article_layout > ul').html(articleListHtml);
                $('.article_classify .item-content').on('click', function () {
                    var articleId = $(this).data('id_article');
                    article.loadArticle(articleId);
                    //$.router.load("#article_content");
                });
                $('.classify_title').on('click', function () {
                    var category = $(this).data('type_article');
                    article.loadArticleList(category);
                });
            }else{
                $.alert(res.error);
            }
        });
    }
    function createArticleContainer() {
        post(BASE_URL + 'article/getNewestArticle/token/' + user.token, {} , function (res) {
            //console.log(res);
            if(res.status == 401){
                $.alert("token失效,请重新登录", function () {
                    account.login();
                });
            }else if(res.status == 200){
                $('#main_page > .content').html(articleTpl);
                for(var index in res.data){
                    $('#article_banner > .swiper-wrapper').append('<div class="swiper-slide" data-id_article="'+res.data[index].articleId+'"><img src="'+ res.data[index].imgPath+'" alt=""></div>');
                }
                $('#article_banner').swiper({
                    pagination:'.swiper-pagination',
                    loop:true,
                    autoplay:5000,
                    autoplayDisableOnInteraction:false
                });
                $('#article_banner > .swiper-wrapper > .swiper-slide').off('click').on('click', function () {
                    var articleId = $(this).data('id_article');
                    article.loadArticle(articleId);
                });
                getArticleTypeList();
            }else{
                $.alert(res.error);
            }
        })
    }

    function createArticleListContainer(page, category) {
        if($('#article_list').length == 0){
            $('.page-group').append(articleListTpl);
        }
        $('.articlelist_scroll .page-title').html(category);
        $('.articlelist_scroll > .list_layout').empty();
        if($('.articlelist_scroll > .infinite-scroll-preloader').length == 0){
            $('.articlelist_scroll').append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');
        }

        //console.log(page.currentPage+'--' + page.totalPage);
        $.showIndicator();
        $('.modal-overlay').addClass('modal-overlay-visible');
        var loading = false;
        /*首先加载第一页内容*/
        article.getArticleList(page);
        setTimeout(function () {
            $.hideIndicator();
            $('.modal-overlay').removeClass('modal-overlay-visible');
        }, 500);

        /*不超过五条记录取消无限滚动*/
        if(page.totalPage <= 1){
            $('.articlelist_scroll > .infinite-scroll-preloader').remove();
            return false;
        }
        /*监听滚动到底部事件*/
        $(document).off('infinite').on('infinite', '.articlelist_scroll',function() {
            //console.log(page.currentPage+'==' + page.totalPage + '--' + loading);
            if(loading) return;
            loading = true;
            setTimeout(function () {
               loading = false;
               if(page.currentPage >= page.totalPage){
                   $.detachInfiniteScroll($('.articlelist_scroll'));
                   $('.articlelist_scroll > .infinite-scroll-preloader').remove();
                   return false;
               }
               page.currentPage++;
               article.getArticleList(page);
               $.refreshScroller();
            }, 1000);
        });

    }

    function getArticleContent(articleId) {
        post(BASE_URL+ 'article/'+ articleId + '/detail/token/' + user.token, {}, function (res) {
            console.log(res);
            if(res.status == 401){
                $.alert("token失效,请重新登录", function () {
                    account.login();
                });
            }else if(res.status == 200){
                if($('#article_content').length == 0){
                    $('.page-group').append(articleContentTpl);
                }
                if(res.data == null){
                    $('.article_text > .card-content').html("暂时无内容");
                    $.router.load("#article_content");
                    return false;
                }
                if(!$('.comment_input > input').val()){
                    $('.send_comment').addClass('disabled').attr('disabled', 'disabled');
                }
                $('.article_text > .card-content').html(res.data.articleContent);
                //$.router.load("#article_content");
                getTotalComment(articleId);
            }else {
                $.alert(res.error);
            }
        });
    }
    function getTotalComment(articleId) {
        post(BASE_URL + 'article/' + articleId + '/getTotalComment/token/' + user.token, {}, function (res) {
            //console.log(res);
            if(res.status == 401){
                $.alert("token失效,请重新登录", function () {
                    account.login();
                });
            }else if(res.status == 200){
                $('.article_comment > .card-header').text(res.data + ' 全部评论');
                if(res.data === 0){
                    $('.article_comment > .card-content').html('暂时无评论');
                }
                var page = {
                    currentPage:1,
                    pageSize:5,
                    totalPage:Math.ceil(res.data/5)
                };
                $('.article_comment > .card-content').empty();

                if($('.comment_scroll > .infinite-scroll-preloader').length == 0){
                    $('.comment_scroll').append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');
                }
                $.showIndicator();
                $('.modal-overlay').addClass('modal-overlay-visible');
                var loading = false;
                getArticleComment(articleId, page);
                setTimeout(function () {
                    $.hideIndicator();
                    $('.modal-overlay').removeClass('modal-overlay-visible');
                }, 500);
                if($('#article_content').hasClass('page-current'))  return false;
                $.router.load("#article_content");
                /*评论框*/
                $('.comment_input > input').bind('input propertychange', function () {
                    var commentInfo = $.trim($(this).val());
                    if(commentInfo){
                        $('.send_comment').removeClass('disabled').removeAttr('disabled');
                        $('.send_comment').off('click').on('click', function () {
                            console.log(articleId);
                            var commentData = {
                                comment:$('.comment_input > input').val(),
                                articleId:articleId
                            };
                            article.sendComment(commentData);
                        });
                    }else {
                        $('.send_comment').addClass('disabled').attr('disabled', 'disabled');
                    }
                });

                $(document).off('infinite').on('infinite', '.comment_scroll', function () {
                    if(loading) return;
                    loading = true;
                    setTimeout(function () {
                        //console.log(page.currentPage+"--" +page.totalPage);
                        loading = false;
                        if(page.currentPage >= page.totalPage){
                            $.detachInfiniteScroll($('.comment_scroll'));
                            $('.comment_scroll > .infinite-scroll-preloader').remove();
                            return false;
                        }
                        page.currentPage++;
                        getArticleComment(articleId, page);
                        $.refreshScroller();
                    }, 1000);
                });

                if(page.totalPage <= 1){
                    $('.comment_scroll > .infinite-scroll-preloader').remove();
                    return false;
                }

            }else {
                $.alert(res.error);
            }
        });
    }
    function getArticleComment(articleId, page) {
        post(BASE_URL + 'article/' + articleId + '/getMessages/token/' + user.token, page, function (res) {
            console.log(res);
            if(res.status == 401){
                $.alert("token失效,请重新登录", function () {
                    account.login();
                });
            }else if(res.status == 200){
                for(var index in res.data){
                    $('.article_comment > .card-content').append('<div class="comment"><div class="facebook-avatar"><img src="../img/blank.gif" data-echo="'+res.data[index].avatarUrl+'"><div class="facebook-name">'+res.data[index].userName+'</div><div class="facebook-date">'+res.data[index].sendTime+'</div></div><div class="comment_content">'+res.data[index].comment+'</div></div>');
                }
                Echo.init({
                    offset:0,
                    throttle:300
                });
                $('.comment_scroll').on('scroll', function () {
                    Echo.init({
                        offset:0,
                        throttle:300
                    });
                });
                $('.comment_scroll').on('resize', function () {
                    Echo.init({
                        offset:0,
                        throttle:300
                    });
                });
            }else {
                $.alert(res.error);
            }
        });
    }
    
    var article = {
        loadArticleMain:function () {
            createArticleContainer();
            $.init();
        },
        loadArticleList:function (category) {
            post(BASE_URL+'article/getNum/token/' + user.token, {searchType:category}, function (res) {
               //console.log(res);
                if(res.status == 401){
                    $.alert("token失效,请重新登录", function () {
                        account.login();
                    });
                }else if(res.status == 200){
                    var page = {
                        currentPage:1,
                        pageSize:5,
                        searchType:category,
                        totalPage:Math.ceil(res.data/5)
                    };
                    createArticleListContainer(page, category);
                    $.router.load("#article_list");
                }else {
                    $.alert(res.error);
                }
            });

        },
        getArticleList:function (page) {
            post(BASE_URL + 'article/getList/token/'+ user.token, page, function (res) {
                console.log(res);
                if(res.status == 401){
                    $.alert("token失效,请重新登录", function () {
                        account.login();
                    });
                }else if(res.status == 200){
                    for(var index in res.data){
                        $('.articlelist_scroll > .list_layout').append('<div class="article_box" data-id_article="'+res.data[index].articleId+'"><div class="article_header"><img src="../img/blank.gif" data-echo="'+res.data[index].imgPath+'" alt=""></div><div class="article_content"><h3>'+res.data[index].title+'</h3><p>针对跑、跳及球类运动者的..</p></div></div>');
                    }
                    $('.article_box').on('click', function () {
                        var articleId = $(this).data('id_article');
                        article.loadArticle(articleId);
                    });
                    Echo.init({
                        offset:0,
                        throttle:300
                    });
                    $('.articlelist_scroll').on('scroll', function () {
                        Echo.init({
                            offset:0,
                            throttle:300
                        });
                    });
                    $('.articlelist_scroll').on('resize', function () {
                        Echo.init({
                            offset:0,
                            throttle:300
                        });
                    });
                }else {
                    $.alert(res.error);
                }
            });
        },
        loadArticle:function (articleId) {
            getArticleContent(articleId);
        },
        sendComment:function (commentData) {
            post(BASE_URL + 'article/addComment/token/' + user.token, commentData, function (res) {
                if(res.status == 401){
                    $.alert("token失效,请重新登录", function () {
                        account.login();
                    });
                }else if(res.status == 14){
                    //$.toast("发送评论成功");
                    getTotalComment(commentData.articleId);
                }else{
                    $.alert(res.error);
                }
            })
        }


    };
    return article;
});