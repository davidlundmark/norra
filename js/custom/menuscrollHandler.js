//#region MenuScrollHandler
var MenuScrollHandler =  {
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
    init: function() {
        var _pageheader = document.querySelectorAll('.page-header');
        if (_pageheader === null) return;

        this.$pageheader = $(_pageheader);

        this.$subwebMenu = this.$pageheader.find('.subweb-menu');
        if(this.$subwebMenu.length) this.$rootMenu = this.$pageheader.find('.rootweb-menu');

        //console.log(ScreensizeHandler.isBigScreen)
        
        if (window.ScreensizeHandler.isBigScreen && document.querySelector('.flexslider') !== null) {
        //if (window.ScreensizeHandler.isBigScreen && $('.flexslider').length) {
            this.offsetTop = 168;
        } else {
            this.offsetTop = this.$pageheader.outerHeight();
        }

        $(window).scroll(function() {
            this.handleTopMenu();
        }.bind(this));

        if(this.$subwebMenu.length) this.timer = setTimeout(this.hideRootMenu.bind(this), 3000);
    },
    handleTopMenu: function() {
        if (this.$pageheader.hasClass('menu-open')) return;

        var scrollTop = $(window).scrollTop();

        //console.log(this.offsetTop, scrollTop)

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
                }
            } else if (scrollTop + this.senseSpeed < this.prevScrollTop) {
                if (this.hidden) {
                    this.hidden = false;
                    this.$pageheader.removeClass(this.hideClass);
                }
            }
        } else {
            if (this.hidden) {
                this.hidden = false;
                this.$pageheader.removeClass(this.hideClass);
            }
        }
        this.prevScrollTop = scrollTop;

        if(!this.$subwebMenu.length) return;

        if(scrollTop <= 0) {
            this.showRootMenu();
        }
        else this.hideRootMenu();
    },
    hideRootMenu: function() {
        if(!ScreensizeHandler.isBigScreen || this.rootMenuHidden) return;
        this.rootMenuHidden = true;
        clearTimeout(this.timer);
        this.$rootMenu.stop(true, false).slideUp();
        //this.$rootMenu.addClass(this.hideClass);
    },
    showRootMenu: function() {
        if(!ScreensizeHandler.isBigScreen || !this.rootMenuHidden) return;
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