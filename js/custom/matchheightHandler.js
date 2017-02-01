(function() {
    require('../lib/jquery.matchHeight.js');
    //Grid same height
    if (typeof useGridSameHeight !== 'undefined' && useGridSameHeight) {
        if ($('html').hasClass('ie-old')) { //only do this for IE <= 9
            var _sameheight = document.querySelectorAll('.same-height');
            if (_sameheight !== null) {
                $(_sameheight).find('> .column').matchHeight();
                //$('.same-height > .column').matchHeight();
            }
        }
    }

    if (typeof useSlickSameHeight !== 'undefined' && useSlickSameHeight) {
        var _texts = document.querySelectorAll('.slick-carousel .title.match-height');
        if (_texts !== null) {
            $(_texts).matchHeight();
        } 

        var _cardTexts = document.querySelectorAll('.slick-carousel .card-text.match-height');
        if (_cardTexts !== null) {
            $(_cardTexts).matchHeight();
        } 

    }

})();
