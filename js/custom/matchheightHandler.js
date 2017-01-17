(function() {
    //Grid same height
    if (typeof useGridSameHeight !== 'undefined' && useGridSameHeight) {
        require('../lib/jquery.matchHeight.js');
        if ($('html').hasClass('ie-old')) { //only do this for IE <= 9
            var _sameheight = document.querySelectorAll('.same-height');
            if (_sameheight !== null) {
                $(_sameheight).find('> .column').matchHeight();
                //$('.same-height > .column').matchHeight();
            }
        }
    }
})();
