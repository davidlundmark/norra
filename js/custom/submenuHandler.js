//#region MenuScrollHandler
var SubMenuHandler = {
    $submenus: null,
    init: function() {
        if (!ScreensizeHandler.isBigScreen) return;
        //var $subMenus = $('.page-header li.has-child');
        var _submenus = document.querySelectorAll('.page-header li.has-child');
        if (_submenus === null) return;

        this.$submenus = $(_submenus);

        this.positionSubmenus();
        $(window).on('resize', this.positionSubmenus);
    },
    positionSubmenus: function() {
        if (!this.$submenus) return;
        this.$submenus.each(function() {
            var $this = $(this);
            var $subMenu = $(this.querySelector('.submenu'));
            var marginLeft = $this.offset().left;
            $subMenu.css({ 'left': -(marginLeft) });
        });
    }
};
//#endregion

(function() {
    //if (typeof useSubMenus !== 'undefined' && useSubMenus) {
    SubMenuHandler.init();
    //}
})();
