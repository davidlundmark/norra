//#region AccordionHandler
var AccordionHandler = {
    initialized: null,
    init: function() {
        if (this.initialized) return;
        this.initialized = true;
        var $triggers = $('.accordion-trigger');

        $triggers.on('click', function(e) {
            var $this = $(this);
            var $parent = $(this).parent();
            var $submenu = $parent.find('> .submenu');
            $this.trigger('resize-start');
            $parent.toggleClass('is-expanded');

            $submenu.stop().slideToggle(300, 'easeOutSine', function() {
                if (!$parent.hasClass('is-expanded')) {
                    var $submenus = $submenu.find('.is-expanded');
                    $submenus.removeClass('is-expanded');
                    $submenus.find('> .submenu').slideUp(0);
                }

                $this.trigger('resize-end');
            });

            //e.preventDefault();
            return false;
        });

    }
};
//#endregion

$(document).ready(function() {
    if (typeof useAccordion !== 'undefined' && useAccordion) {
        AccordionHandler.init();
    }
});
    