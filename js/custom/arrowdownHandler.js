(function () {
    //handle arrow down click
    var _arrowdown = document.querySelector('.arrow-down');
    if (_arrowdown !== null) {
        // var scrollTop = $(window).scrollTop();

        // if (scrollTop > 0) {
        //     $(_arrowdown).hide();
        //     return;
        // }

        $(_arrowdown).on('click', function(e) {
            hideArrow();
            console.log('apa')
            $('html, body').animate({
                scrollTop: $('.content-wrapper').offset().top
            }, 1000);
        });
    }
})();

$(window).on('load', function() {
    $(this).one('scroll', function() {
        hideArrow();
    });
});


function hideArrow() {
    var _arrowdown = document.querySelector('.arrow-down');
    if (_arrowdown === null) return;
    $(_arrowdown).off('click').fadeOut(200);
}
