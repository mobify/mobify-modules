window.Pikabu = (function() {
    var pikabu = {};
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

    function isLegacyAndroid() {
        var android = /Android\s+([\d\.]+)/.exec(window.navigator.userAgent);

        if (android && android.length > 0 && (parseInt(android[1]) < 3)) {
            // we are on Android 2.x
            return true;
        }

        return false;
    }

    /* @url: http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr */
    function supportsTransitions() {
        var b = document.body || document.documentElement;
        var s = b.style;
        var p = 'transition';
        if(typeof s[p] == 'string') {return true; }

        // Tests for vendor specific prop
        v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
        p = p.charAt(0).toUpperCase() + p.substr(1);
        for(var i=0; i<v.length; i++) {
          if(typeof s[v[i] + p] == 'string') { return true; }
        }
        return false;
    }

    pikabu.init = function () {
        // check if we have overflow scrolling or not
        if (hasOverflowScrolling()) {
            $document.addClass('m-pikabu-overflow-scrolling');
        }

        if (isLegacyAndroid()) {
            $document.addClass('m-pikabu-legacy-android');
        }

        if (supportsTransitions()) {
            $document.addClass('m-pikabu-transitions');
        }

        // Bind handlers
        // Toggle sidebars!
        $('.m-pikabu-nav-toggle').click(function(e) {
          e.stopPropagation();
          
          pikabu.showSidebar($(this).attr('data-role'));
        });

        // Overlay: stop clicks, close the sidebars and slide back to main content
        $('.m-pikabu-overlay').click(function(e) {
            e.stopPropagation();

            pikabu.closeSidebars();
        });
    };
    
    // Sidebar
    pikabu.showSidebar = function(type) {   
        $('.m-pikabu-sidebar').addClass('m-pikabu-overflow-touch');

        if (type == 'left' || type == 'right') {
            $document.toggleClass('m-pikabu-' + type + '-visible');

            this.recalculateSidebarHeight($(window).height());
            window.scrollTo(0, 1);
        }
    };

    pikabu.closeSidebars = function() {
        $document.removeClass('m-pikabu-left-visible m-pikabu-right-visible');
        $('.m-pikabu-viewport').css('width', 'auto');
      
        // 1. Removing overflow-scrolling-touch causes a content flash
        // 2. Removing height too soom causes panel with few content to be not full height during animation
        // so we do these after the sidebar has closed
        setTimeout(function() {
            $('.m-pikabu-viewport, .m-pikabu-container').css('height', '');
            $('.m-pikabu-container').css('marginTop', 1); // add this arbitrary margin-top to force a reflow when we remove it
            window.scrollTo(0, 1);
            $('.m-pikabu-container').css('marginTop', ''); // remove the unnecessary margin-top to force reflow and properly recalculate the height of this container
            $('.m-pikabu-sidebar').removeClass('m-pikabu-overflow-touch');
        }, 250); 
    };

    pikabu.recalculateSidebarHeight = function(viewportHeight) {
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

    return pikabu;
});

$(document).ready(function() {
    pikabu = new Pikabu;
    pikabu.init();
});

$(window).on('orientationchange', function(e) {
    pikabu.recalculateSidebarHeight($(window).height());
});
