/**
 * Created by EKO-LKB on 2017/3/29.
 */
define(['zepto', 'train', 'article', 'mine'], function ($, train, article, mine) {
   
    var toolbar = {
       initToolbar:function () {
           $(function () {
               $(document).on('click', '.main-button > a', function () {
                   var $t = $(this);
                   var $id = $t.attr('id');
                   if($t.hasClass("active")){return false;}
                   switch ($id){
                       case 'train':
                           train.loadTrain();
                           $('.top-title').text("训练");
                           break;
                       case 'article':
                           article.loadArticleMain();
                           $('.top-title').text("发现");
                           break;
                       case 'mine':
                           mine.loadMine();
                           $('.top-title').text("我的训练");
                           break;
                   }
                   $('.main-button > a').removeClass("active");
                   $t.addClass("active");
                   return false;
               });

           });
       }
   };
   toolbar.initToolbar();
   return toolbar;
});