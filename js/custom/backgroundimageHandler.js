//#region BackgroundImageHandler
var BackgroundImageHandler = {
    init: function() {
        var _backgroundImages = document.querySelectorAll('picture.background-image');
        if (_backgroundImages === null) return;

        $(_backgroundImages).each(function() {
            var $this = $(this);
            var $image = $this.find('> img');
            //var src = $image.prop('currentSrc') || $image.prop('src');
            var src = ""; //$image.prop('currentSrc') || $image.prop('src');
            if ($image.prop('currentSrc')) src = $image.prop('currentSrc');
            else src = $image.prop('src');
            $this.siblings('.background-image').css('background-image', 'url(' + src + ')');
            if ($image.hasClass('use-gradient')) {
                //$slide.find('.flexslider-image')
                 $this.siblings('.background-image').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.27), rgba(0, 0, 0, 0.27)), url(' + src + ')');
            }
            $this.remove();
        });

    }
};
//#endregion

(function () {
    if (typeof useBackgroundImageSwapper !== 'undefined' && useBackgroundImageSwapper) {
        BackgroundImageHandler.init();
    }
})();
