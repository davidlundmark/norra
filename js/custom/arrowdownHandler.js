$(document).ready(function() {
    //handle arrow down click
    var _arrowdown = document.querySelector('.arrow-down');
    if (_arrowdown !== null) {
        $(_arrowdown).on('click', function(e) {
            hideArrow();
            $('html, body').animate({
                scrollTop: $('.content-wrapper').offset().top
            }, 1000);
        });
    }
});

$(window).on('load', function() {
    $(this).one('scroll', function() {
        hideArrow();
    });
});


function hideArrow() {
    var _arrowdown = document.querySelector('.arrow-down');
    if (_arrowdown === null) return;
    $(_arrowdown).fadeOut(200);
}
