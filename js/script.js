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
    //require('./custom/swipeboxHandler.js');
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
    require('./custom/youtubeHandler.js');

    //console.log('deKai v.2.422');

    (function() {

        //Anchor card   
        if (typeof useAnchorCard !== 'undefined' && useAnchorCard) {
            if (!deKai.isMobile) {
                // var _cards = document.querySelectorAll('.card');
                var _cards = document.querySelectorAll('.card.card-anchor');
                if (_cards !== null) {
                    var $cardLinks = $(_cards).find('.card-link');
                    $cardLinks.off('mouseenter mouseleave');
                    $cardLinks.hover(function() {
                        var $this = $(this).closest('.card');
                        $this.toggleClass('hover');
                        $this.find('.link').toggleClass('hover');
                        $this.find('.card-image-overlay').toggleClass('hover');
                    });
                    // $(_cards).filter('.card-anchor').hover(function() {
                    //     var $this = $(this);
                    //     $this.toggleClass('hover');
                    //     $this.find('.link').toggleClass('hover');
                    //     $this.find('.card-image-overlay').toggleClass('hover');
                    // });
                    // $(_cards).filter('.card-lightbox').find('.card-image').hover(function() {
                    //     var $this = $(this);
                    //     $this.find('.card-image-overlay').toggleClass('hover');
                    // });
                    // $(_cards).filter('.card-lightbox').find('.card-link').hover(function() {
                    //     var $this = $(this);
                    //     var $card = $this.closest('.card');
                    //     $card.toggleClass('hover');
                    //     $card.find('.link').toggleClass('hover');
                    // });
                }
            }
        }

        if (typeof useSkogsskolanHero !== 'undefined' && useSkogsskolanHero) {
            var _skogsskolanhero = document.querySelector('.hero-text-image-summary');
            if (_skogsskolanhero !== null) {
                fixHeight();

                $(window).resize(function() {
                    fixHeight();
                });

                function fixHeight() {
                    $(_skogsskolanhero).each(function() {
                        $(this.querySelector('.background-image')).css('padding-bottom', $(this.querySelector('.text')).height());
                    });
                }
            }
        }

        if (typeof useSearchCount !== 'undefined' && useSearchCount) {
            var _counter = document.querySelector('.search-count-section .search-count');
            if (_counter !== null) {
                $(_counter).text(function() {
                    var _searchresults = document.querySelectorAll('.search-item').length;
                    if (_searchresults <= 0) {
                        $(document.querySelector('.search-count-section')).addClass('no-results');
                    }
                    return $(this).text().replace('[x]', '' + _searchresults);
                });
            }
        }

        if (typeof useSearchLoadMore !== 'undefined' && useSearchLoadMore) {
            var _loadmore = document.querySelectorAll('.search-result-section .load-more');
            if (_loadmore !== null) {
                $(_loadmore).on('click', function(e) {
                    var $this = $(this);
                    var $parent = $this.parent();
                    $parent.find('.search-item.hide').slice(0, 3).removeClass('hide');
                    if (!$parent.find('.search-item.hide').length) $this.hide();
                    return false;
                });
            }
        }

        //Top border  
        if (typeof useTopBorder !== 'undefined' && useTopBorder) {
            // var _pageSection = document.querySelector('.content-wrapper > .page-section:first-child');
            // $(_pageSection).addClass('top-border');
            var _header = document.querySelector('.page-header');
            $(_header).addClass('brand-border');
        }

        var _searchButtons = document.querySelectorAll('.page-header .search .icon-container');
        $(_searchButtons).on('click triggered-click', function(e) {
            //console.log('yeah')
            var $this = $(this);
            var $searchcontainer = $this.closest('.search-container');
            $searchcontainer.toggleClass('open');

            if ($searchcontainer.hasClass('open')) {
                $this.siblings('.label').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                    $(this).focus();
                });
            }

            if (ScreensizeHandler.isBigScreen) return;

            $(document.querySelector('.page-header .logo-container')).toggleClass('no-opacity');

            if (e.type == 'triggered-click') return;

            var _mobilemenu = document.getElementById('mobile-menu');
            if ($(_mobilemenu).hasClass('open')) {
                var _menutoggle = document.querySelector('.menu-toggle');
                $(_menutoggle).trigger('triggered-click', new CustomEvent('triggered-click'));
            }
        });

        var _pageImageTexts = document.querySelector('.page-image-text-overlay');
        if (_pageImageTexts !== null) {
            fixTextWidth();

            $(window).resize(function() {
                fixTextWidth();
            });

            function fixTextWidth() {
                var _textContet = _pageImageTexts.querySelector('.text-content');
                //var _title = _textContet.querySelector('.page-title');
                //var _width = $(_title).width();
                //_width = Math.round(_width);
                var _width = window.innerWidth - 40;
                $(_textContet).width(_width + (_width % 2));
            }
        }

        // $('.page-header .search .icon-container').on('click', function(e) {
        //     var $this = $(this);
        //     $this.siblings('.label').fadeToggle(200, function() {
        //         $(this).focus();
        //     });
        // });

        // $('.page-header .search .label').keypress(function(e) {
        //     if (e.which == 13) {
        //         alert('SÖK: ' + $(this).val());
        //     }
        // });


        // $('#mobile-menu .search .icon-container').on('click', function(e) {
        //     var $this = $(this);
        //     alert('SÖK: ' + $this.parent().find('.label').val());
        // });

        // $('#mobile-menu .search .label').keypress(function(e) {
        //     if (e.which == 13) {
        //         alert('SÖK: ' + $(this).val());
        //     }
        // });

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

        // if (typeof usePictureChange !== 'undefined' && usePictureChange) {
        //     var _pictures = document.querySelectorAll('picture.change-source');
        //     $(_pictures).each(function() {
        //         var $this = $(this);
        //         var $image = $this.find('img');
        //         var src = $image.prop('currentSrc') || $image.prop('src');
        //         $this.siblings('.background-image').css('background-image', 'url(' + src + ')');
        //         $this.remove();
        //     });
        // }

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
            var _courseMaterial = document.querySelectorAll('.course-material .link');
            if (_courseMaterial !== null) {
                $(_courseMaterial).on('click', function(e) {
                    var $this = $(this).parent();
                    $this.find('.course-download').fadeToggle();
                    return false;
                });
            }
        }

        if (document.querySelector('.page-slider') === null) {
            fixBodyPadding();

            $(window).resize(function() {
                fixBodyPadding();
            });

            function fixBodyPadding() {
                $('body').css({
                    'padding-top': $('.page-header').outerHeight()
                });
            }
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
