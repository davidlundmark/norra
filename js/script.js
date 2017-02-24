(function() {

    //project specific var
    // var useAccordion = true;
    // var useMenuToggle = true;
    // var useSubMenus = true;
    // var useMenuScrollEffect = true;
    // var useCookie = true;

    //libs
    require('./lib/jquery.easing.1.3.js');
    //require('./lib/prism.js');
    //require('./lib/fastclick.js');
    require('./lib/jquery.matchHeight.js');
    require('./lib/picturefill.js');
    //require('./lib/slick.js');
    //require('./lib/jquery.flexslider.js');
    //require('./lib/jquery.swipebox.js');
    //globals
    require('./custom/screensizeHandler.js');
    //customs
    require('./custom/menuscrollHandler.js');
    require('./custom/mobilemenuHandler.js');
    require('./custom/flexsliderHandler.js');
    require('./custom/accordionHandler.js');
    require('./custom/accordiontabsHandler.js');
    require('./custom/swipeboxHandler.js');
    require('./custom/backgroundimageHandler.js');
    require('./custom/apiHandler.js');
    require('./custom/carouselHandler.js');
    //require('./custom/expanderHandler.js');
    //require('./custom/informationHandler.js');
    require('./custom/cookieHandler.js');
    require('./custom/arrowdownHandler.js');
    require('./custom/matchheightHandler.js');
    require('./custom/loginHandler.js');
    require('./custom/submenuHandler.js');
    require('./custom/imagemapHandler.js');
    require('./custom/dekai.js');
    require('./custom/vexHandler.js');

    console.log('deKai v.2.422');

    (function() {

        //Anchor card   
        if (typeof useAnchorCard !== 'undefined' && useAnchorCard) {
            if (!deKai.isMobile) {
                var _cards = document.querySelectorAll('.card');
                if (_cards !== null) {
                    $(_cards).filter('.card-anchor').hover(function() {
                        var $this = $(this);
                        $this.toggleClass('hover');
                        $this.find('.link').toggleClass('hover');
                        $this.find('.card-image-overlay').toggleClass('hover');
                    });
                    $(_cards).filter('.card-lightbox').find('.card-image').hover(function() {
                        var $this = $(this);
                        $this.find('.card-image-overlay').toggleClass('hover');
                    });
                    $(_cards).filter('.card-lightbox').find('.card-link').hover(function() {
                        var $this = $(this);
                        var $card = $this.closest('.card');
                        $card.toggleClass('hover');
                        $card.find('.link').toggleClass('hover');
                    });
                }
            }
        }

        $('.page-header .search .icon-container').on('click', function(e) {
            var $this = $(this);
            $this.siblings('.label').fadeToggle(200, function() {
                $(this).focus();
            });
        });

        $('.page-header .search .label').keypress(function(e) {
            if (e.which == 13) {
                alert('SÖK: ' + $(this).val());
            }
        });


        $('#mobile-menu .search .icon-container').on('click', function(e) {
            var $this = $(this);
            alert('SÖK: ' + $this.parent().find('.label').val());
        });

        $('#mobile-menu .search .label').keypress(function(e) {
            if (e.which == 13) {
                alert('SÖK: ' + $(this).val());
            }
        });

        // if (document.querySelector('.page-image') !== null) {
        //     $('body').css({
        //         'padding-top': $('.page-header').outerHeight()
        //     });
        // }

        /*
        $('#mobile-menu .search .label').on('click', function(e) {
            var scrollTop = $(window).scrollTop();
            var interval = 0;
            var scroller = setInterval(function() {
                $(window).scrollTop(scrollTop);
                interval++;
                if (interval > 10) {
                    clearInterval(scroller);
                }
            }, 1);
        });
        */

        if (typeof usePictureChange !== 'undefined' && usePictureChange) {
            var _pictures = document.querySelectorAll('picture.change-source');
            $(_pictures).each(function() {
                var $this = $(this);
                var $image = $this.find('img');
                var src = $image.prop('currentSrc') || $image.prop('src');
                $this.siblings('.background-image').css('background-image', 'url(' + src + ')');
                $this.remove();
            });
        }

    })();

    $(window).on('load', function() {
        /*
        if (ScreensizeHandler.isBigScreen) {
            
            $('.row.same-height').each(function() {
                var height = 0;
                var $this = $(this);
                var $cardTexts = $this.find('.card-text');
                $cardTexts.each(function() {
                    var $this = $(this);
                    var currentHeight = $this.height();
                    if (currentHeight > height) height = currentHeight;
                });
                $cardTexts.height(height);
                $cardTexts.find('> p').addClass('bottom');
            });
        }
        */
        if (typeof useDownloadButton !== 'undefined' && useDownloadButton) {
            var _courseMaterial = document.querySelector('.course-material');
            if (_courseMaterial !== null) {
                $(_courseMaterial).on('click', function(e) {
                    var $this = $(this);
                    $this.find('.course-download').fadeToggle();
                    //console.log('hej')
                });
            }
        }

        if (document.querySelector('.page-slider') === null) {
            $('body').css({
                'padding-top': $('.page-header').outerHeight()
            });
        }

        var headerHeight = $(document.querySelector('.page-header')).outerHeight();
        $('#mobile-menu .content').css({ 'padding-top': headerHeight });
        //topmenuHandler.init();

        //fix for showing menu under sitecore toolbar
        if ($('html').hasClass('sitecore')) {
            //if(document.querySelector('.page-slider') === null) $(document.querySelector('.content-wrapper')).css({ 'padding-top': headerHeight });
            var _scRibbon = document.getElementById('scWebEditRibbon');
            if (_scRibbon === null) return;

            var _height = 0;

            fixRibbon();

            function fixRibbon() {
                if (_scRibbon.offsetHeight != _height) {
                    //if (_scRibbon.offsetHeight > _height) {
                    _height = _scRibbon.offsetHeight;
                    $('.page-header').css({ 'top': _height });
                    $('#mobile-menu .content').css({ 'padding-top': $('.page-header').outerHeight() + _height });
                    $('.page-slider').css({ 'padding-top': _height });
                    //}
                }
                window.setTimeout(fixRibbon, 1000);
            }
        }
        //$(window).trigger('resize');
    });

})();
