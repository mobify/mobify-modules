# Mobify Pikabu

A speedy, flexible, framework for off-canvas flyout panels.

## Usage

		<!-- include pikabu.css -->
		<link rel="stylesheet" href="pikabu.css">
		<link rel="stylesheet" href="pikabu-style.css">

		<!-- the viewport -->
		<div class="m-pikabu-viewport">
            <!-- the left sidebar -->
            <div class="m-pikabu-sidebar m-pikabu-left">
                <!-- left sidebar content -->
            </div>
			<!-- the main page content -->
			<div class="m-pikabu-container">
				<!-- Overlay is needed to have a big click area to close the sidebars -->
				<div class="m-pikabu-overlay"></div>
				<header>
					<a class="m-pikabu-nav-toggle" data-role="left">Left Menu</a>
					<h1>Pikabu</h1>
					<a class="m-pikabu-nav-toggle" data-role="right">Right Menu</a>
				</header>
				<section>
					<!-- Body content goes in here -->
				</section>
			</div>
			<!-- the right sidebar -->
            <div class="m-pikabu-sidebar m-pikabu-right">
                <!-- right sidebar content -->
            </div>
		</div>

		<!-- include zepto.js or jquery.js -->
		<script src="zepto.js"></script>
		<!-- include pikabu.js -->
		<script src="pikabu.js"></script>
		<!-- construct the flyout -->
		<script>
            $(document).ready(function() {
                flyout = new Flyout;
                flyout.init();
            });

            $(window).on('orientationchange', function(e) {
                flyout.recalculateSidebarHeight($(window).height());
            });
        </script>

## Events

@TODO: Write events

## Browser Compatibility

@TODO: Test compatibility

### Mobile Browsers

The following mobile browsers are fully supported:

| Browser           | Version |
|-------------------|---------|
| Mobile Safari     | 3.1.3+  |
| Android Browser   | 2.1+    |
| Android Chrome    | 1.0+    |
| Android Firefox   | 1.0+    |

The following mobile browsers have degraded support:

| Browser           | Version |
|-------------------|---------|
| Windows Phone     | 7.5     |

### Desktop Browsers

The follow desktop browsers are fully supported:

| Browser           | Version |
|-------------------|---------|
| Safari            | 4.0+    |
| Firefox           | 4.0+    |
| Chrome            | 12.0+   |
| Opera             | 12.0+   |
| Internet Explorer | 10.0+   |

The following desktop browsers have degraded support:

| Browser           | Version |
|-------------------|---------|
| Internet Explorer | 8.0,9.0 |
| Firefox           | 3.5,3.6 |

## Building
### Requirements
* [node.js 0.8.x/npm](http://nodejs.org/download/)

### Steps
1. `npm install -g grunt-cli`
2. `npm install`
3. `grunt`

The build directory will be populated with minified versions of the css and 
javascript files and a .zip of the original source files (for distribution and
use with whatever build system you might use).