//#region ExpanderHandler
var ExpanderHandler = {
    initialized: null,
    init: function() {
        if (this.initialized) return;
        this.initialized = true;

        $('.expander-trigger').bind('click', function(e) {
            var $expander = $(this).closest('.expander');
            $expander.find('.expander-content').slideToggle(400, 'easeOutSine'); // apply the toggle to the ul
            $expander.toggleClass('is-expanded');
            e.preventDefault();
            return false;
        });

    }
};
//#endregion

$(document).ready(function() {
     if (typeof useExpander !== 'undefined' && useExpander) {
        ExpanderHandler.init();
    }
});