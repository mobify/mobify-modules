window.Flyout = (function() {
    var flyout = {};
    var $document = $('html');

    // Do we have overflow scrolling?
    function hasOverflowScrolling() {
        var prefixes = ['webkit', 'moz', 'o', 'ms'];
        var div = document.createElement('div');
        var body = document.getElementsByTagName('body')[0];
        var hasIt = false;

        body.appendChild(div);

        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            div.style[prefix + 'OverflowScrolling'] = 'touch';
        }

        // And the non-prefixed property
        div.style.overflowScrolling = 'touch';

        // Now check the properties
        var computedStyle = window.getComputedStyle(div);

        // First non-prefixed
        hasIt = !!computedStyle.overflowScrolling;

        // Now prefixed...
        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            if (!!computedStyle[prefix + 'OverflowScrolling']) {
                hasIt = true;
                break;
            }
        }

        // Cleanup old div elements
        div.parentNode.removeChild(div);

        return hasIt;
    }

    flyout.init = function () {
        // check if we have overflow scrolling or not
        if (hasOverflowScrolling()) {
            $document.addClass('m-pikabu-overflow-scrolling');
        }

        // Bind handlers
        // Toggle sidebars!
        $('.m-pikabu-nav-toggle').click(function(e) {
          e.stopPropagation();
          
          flyout.showSidebar($(this).attr('data-role'));
        });

        // Overlay: stop clicks, close the sidebars and slide back to main content
        $('.m-pikabu-overlay').click(function(e) {
            e.stopPropagation();

            flyout.closeSidebars();
        });
    };
    
    // Sidebar
    flyout.showSidebar = function(type) {   
        $('.m-pikabu-sidebar').addClass('m-pikabu-overflow-touch');

        if (type == 'left' || type == 'right') {
            $document.toggleClass('m-pikabu-' + type + '-visible');

            this.recalculateSidebarHeight($(window).height());
            window.scrollTo(0, 1);
        }
    };

    flyout.closeSidebars = function() {
        $document.removeClass('m-pikabu-left-visible m-pikabu-right-visible');
        $('.m-pikabu-viewport, .m-pikabu-container').css('height', 'auto');
        $('.m-pikabu-viewport').css('width', 'auto');
        window.scrollTo(0, 1);
      
      // Removing overflow-scrolling-touch causes a content flash so we do it after the sidebar has closed
        setTimeout(function() {
           $('.m-pikabu-sidebar').removeClass('m-pikabu-overflow-touch');
        },250); 
    };

    flyout.recalculateSidebarHeight = function(viewportHeight) {
        var $viewport = $('.m-pikabu-viewport');
        $viewport.width($(window).width());

        // we have overflow scroll touch (iOS devices)
        if (($document.hasClass('m-pikabu-overflow-scrolling')) && ($document.hasClass('m-pikabu-left-visible') || $document.hasClass('m-pikabu-right-visible'))) {
            $('.m-pikabu-container, .m-pikabu-sidebar').height(viewportHeight);
            $viewport.height(viewportHeight);
        }
        // other devices/desktop
        else {
            var offset = window.pageYOffset;
            $viewport.removeAttr('style');
            var $rightSidebar = $('.m-pikabu-right.m-pikabu-sidebar').removeAttr('style');
            var $leftSidebar = $('.m-pikabu-left.m-pikabu-sidebar').removeAttr('style');
            var windowHeight = $(window).height();

            if ($document.hasClass('m-pikabu-left-visible')) {
                // case: sidebar is taller than the window
                // we need to extend the viewport height so that we can scroll through the whole sidebar
                if ($leftSidebar.height() > windowHeight) {
                    $viewport.height($leftSidebar.height());
                }
                // case: sidebar is shorter than the window
                // we need to make the sidebar taller to extend the background to the bottom of the page
                else {
                    $leftSidebar.height(windowHeight);
                    $viewport.height(windowHeight);
                }
            } else if ($document.hasClass('m-pikabu-right-visible')) {
                // case: sidebar is taller than the window
                // we need to extend the viewport height so that we can scroll through the whole sidebar
                if ($rightSidebar.height() > windowHeight) {
                    $viewport.css('height', $rightSidebar.height());
                }
                // case: sidebar is shorter than the window
                // we need to make the sidebar taller to extend the background to the bottom of the page
                else {
                    $rightSidebar.css('min-height', windowHeight);
                    $viewport.css('height', windowHeight);
                }
            }

            window.scrollTo(0, offset);
        }
    };

    return flyout;
});
