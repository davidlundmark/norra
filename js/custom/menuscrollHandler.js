//#region MenuScrollHandler
var MenuScrollHandler = {
    $pageheader: null,
    scrolledClass: 'scrolled',
    hideClass: 'slide-up',
    scrolled: false,
    hidden: false,
    senseSpeed: 5,
    offsetTop: 0,
    prevScrollTop: 0,
    timer: null,
    $rootMenu: null,
    $subwebMenu: null,
    rootMenuHidden: false,
    scrollDisabled: false,
    init: function() {
        var _pageheader = document.querySelector('.page-header');
        if (_pageheader === null) return;

        this.$pageheader = $(_pageheader);

        this.$subwebMenu = $(_pageheader.querySelector('.subweb-menu')); //this.$pageheader.find('.subweb-menu');
        if (this.$subwebMenu.length) this.$rootMenu = $(_pageheader.querySelector('.rootweb-menu')); //this.$pageheader.find('.rootweb-menu');

        //console.log(ScreensizeHandler.isBigScreen)

        if (window.ScreensizeHandler.isBigScreen && document.querySelector('.flexslider') !== null) {
            //if (window.ScreensizeHandler.isBigScreen && $('.flexslider').length) {
            this.offsetTop = 168;
        } else {
            //this.offsetTop = this.$pageheader.outerHeight();
            this.offsetTop = 168;
        }

        $(window).scroll(function() {
            this.handleTopMenu();
        }.bind(this));

        //this.handleTopMenu();

        //if (this.$subwebMenu.length) this.timer = setTimeout(this.hideRootMenu.bind(this), 3000);
    },
    handleTopMenu: function() {
        if (this.$pageheader.hasClass('menu-open') || this.scrollDisabled) return;

        var scrollTop = $(window).scrollTop();
        //console.log('handleTopMenu')
        if (scrollTop < 0) scrollTop = 0;
        //console.log(this.offsetTop, scrollTop, this.prevScrollTop)

        //change bg color
        if (scrollTop >= this.offsetTop) {
            if (!this.scrolled) {
                this.scrolled = true;
                this.$pageheader.addClass(this.scrolledClass);
            }
        } else {
            if (this.scrolled) {
                this.scrolled = false;
                this.$pageheader.removeClass(this.scrolledClass);
            }
        }

        //hide show menu
        if (scrollTop >= this.offsetTop) {
            if (scrollTop - this.senseSpeed > this.prevScrollTop) {
                if (!this.hidden) {
                    this.hidden = true;
                    this.$pageheader.addClass(this.hideClass);
                    //this.disableScroll();
                    //console.log('hide 1', (scrollTop - this.senseSpeed), this.prevScrollTop);
                }
            } else if (scrollTop + this.senseSpeed < this.prevScrollTop) {
                if (this.hidden) {
                    this.hidden = false;
                    this.$pageheader.removeClass(this.hideClass);
                    //this.disableScroll();
                    //console.log('show 2', (scrollTop + this.senseSpeed), this.prevScrollTop);
                }
            }
        } else {
            if (this.hidden) {
                this.hidden = false;
                this.$pageheader.removeClass(this.hideClass);
                //this.disableScroll();
                //console.log('show');
            }
        }
        this.prevScrollTop = scrollTop;

        /*
        if (!this.$subwebMenu.length) return;

        if (scrollTop <= 0) {
            this.showRootMenu();
        } else {
            this.hideRootMenu();
        }
        */
    },
    disableScroll: function() {
        this.scrollDisabled = true;
        setTimeout(function() {
            this.scrollDisabled = false;
        }.bind(this), 1000);
    },
    hideRootMenu: function() {
        if (!ScreensizeHandler.isBigScreen || this.rootMenuHidden) return;
        this.rootMenuHidden = true;
        clearTimeout(this.timer);
        this.$rootMenu.stop(true, false).slideUp();
        //this.$rootMenu.addClass(this.hideClass);

        if ($(window).scrollTop() == 0) $(window).scrollTop(1);
    },
    showRootMenu: function() {
        if (!ScreensizeHandler.isBigScreen || !this.rootMenuHidden) return;
        this.rootMenuHidden = false;
        this.$rootMenu.stop(true, false).slideDown();
    }
};
//#endregion

$(window).on('load', function() {
    if (typeof useMenuScrollEffect !== 'undefined' && useMenuScrollEffect) {
        MenuScrollHandler.init();
    }
});
