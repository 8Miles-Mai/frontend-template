/**
 * Created by miles on 16/3/23.
 */

$('.navbar-nav > li').click(function (event) {
    $('.navbar-nav > li').removeClass('active');
    $(this).addClass('active');
});