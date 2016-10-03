(function() {

    //lib
    require('./lib/jquery.easing.1.3.js');
    //require('./lib/prism.js');
    require('./lib/fastclick.js');
    require('./lib/jquery.matchHeight.js');
    require('./lib/picturefill.js');
    //require('./lib/slick.js');
    require('./lib/jquery.flexslider.js');
    require('./lib/jquery.swipebox.js');
    //global js
    require('./custom/screensizeHandler.js');
    //
    require('./custom/menuscrollHandler.js');
    require('./custom/mobilemenuHandler.js');
    require('./custom/flexsliderHandler.js');
    require('./custom/accordionHandler.js');
    require('./custom/swipeboxHandler.js');
    //require('./custom/carouselHandler.js');
    //require('./custom/expanderHandler.js');
    //require('./custom/informationHandler.js');
    require('./custom/dekai.js');

    console.log('deKai v.2.1');

    $(document).ready(function() {

        //Grid same height
        if (typeof useGridSameHeight !== 'undefined' && useGridSameHeight) {
            $('.same-height > .column').matchHeight();
        }

        //Anchor card
        if (typeof useAnchorCard !== 'undefined' && useAnchorCard) {
            if (!isMobile) {
                $('.card.card-anchor').hover(function() {
                    var $this = $(this);
                    $this.toggleClass('hover');
                    $this.find('.link').toggleClass('hover');
                    $this.find('.card-image-overlay').toggleClass('hover');
                });
                $('.card.card-lightbox .card-image').hover(function() {
                    var $this = $(this);
                    $this.find('.card-image-overlay').toggleClass('hover');
                });
                $('.card.card-lightbox .card-link').hover(function() {
                    var $this = $(this);
                    var $card = $this.closest('.card');
                    $card.toggleClass('hover');
                    $card.find('.link').toggleClass('hover');
                });
            }
        }

        if (typeof useSubMenus !== 'undefined' && useSubMenus) {
            positionSubmenus();
            $(window).on('resize', positionSubmenus);

            function positionSubmenus() {
                if (!ScreensizeHandler.isBigScreen) return;
                var $subMenus = $('.header li.has-child');
                $subMenus.each(function() {
                    var $this = $(this);
                    var $subMenu = $this.find('.submenu');
                    var marginLeft = $this.offset().left;
                    //var marginLeft = $subMenu.width() * 0.5; 
                    //marginLeft -= $this.width() * 0.5;
                    $subMenu.css({ 'left': -(marginLeft) });
                });
            }
        }

        //handle arrow down click <!_.|(xUx)|._!>  
        $('.arrow-down .icon').on('click', function(e) {
            hideArrow(); 
            $('html, body').animate({
                scrollTop: $('.scroll-target').offset().top
            }, 1000);
        });

        setTimeout(hideArrow, 5000);

        function hideArrow() {
            $('.arrow-down').fadeOut(200);
        }

        $('#header .search .icon-container').on('click', function(e) {
            var $this = $(this);
            $this.siblings('.label').fadeToggle(200, function() {
                $(this).focus();
            });
        });

        $('#header .search .label').keypress(function(e) {
            if (e.which == 13) {
                alert('SÖK: ' + $(this).val());
            }
        });

        $('#mobile-menu .search .label').keypress(function(e) {
            if (e.which == 13) {
                alert('SÖK: ' + $(this).val());
            }
        });

        $('#mobile-menu .search .icon-container').on('click', function(e) {
            var $this = $(this);
            alert('SÖK: ' + $this.parent().find('.label').val());
        });

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

    });

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
        $('#mobile-menu .content').css({ 'padding-top': $('#header').outerHeight() });
        //$('#mobile-menu .content').css({'min-height':'calc(100% - '+$('#header').outerHeight()+'px)'});
        //topmenuHandler.init();
        $(window).trigger('resize');
    });
})();
