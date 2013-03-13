# Mobify Accordion

A mobile-first accordion module for progressive disclosure on the web.

## Usage

    <!-- include accordion.css -->
    <link rel="stylesheet" href="accordion.css">

    <!-- the markup -->
    <ul class="m-accordion">
      <!-- the items -->
      <li class="m-item">
        <h3 class="m-header">
          <!-- header title -->
          <a>Tab1</a>
        </h3>
        <div class="m-content">
          <div class="m-inner-content">
            <!-- content for item -->
            <h2>Content 1</h2>
            <h2>Lorem Ipsum</h2>
          </div>
        </div>
      </li>
      <li class="m-item">
        <h3 class="m-header">
          <a>Tab2</a>
        </h3>
        <div class="m-content">
          <div class="m-inner-content">
            <h2>Content 2</h2>
            <p>Lorem Ipsum</p>
          </div>
        </div>
      </li>
      <li class="m-item">
        <h3 class="m-header">
          <a>Tab3</a>
        </h3>
        <div class="m-content">
          <div class="m-inner-content">
            <h2>Content 3</h2>
            <p>Lorem Ipsum</p>
          </div>
        </div>
      </li>
    </ul>

    <!-- include zepto.js or jquery.js -->
    <script src="zepto.js"></script>
    <!-- include accordion.js -->
    <script src="accordion.js"></script>
    <!-- construct the accordion -->
    <script>$('.m-accordion').accordion()</script>

## Methods

### .accordion(options)

Initializes the accordion.

    $('.m-accordion').accordion();

### .accordion('unbind')

Removes any tap, mouse, and other event handlers from the accordion.

    $('.m-accordion').accordion('unbind');

### .accordion('bind')

Restores the tap, mouse, and other event handlers for the accordion.

    $('.m-accordion').accordion('bind');

### .accordion('destroy')

Unbinds the events from the accordion, and removes it from the DOM.

    $('.m-accordion').accordion('destroy');

## Browser Compatibility


| Browser           | Version | Support                    |
|-------------------|---------|----------------------------|
| Safari            | 4.0+    | Supported.                 |
| Firefox           | 3.5-3.6 | Degraded. No transitions.  |
| Firefox           | 4.0+    | Supported                  |
| Chrome            | 9.0+    | Supported                  |
| Opera             | 12.0+   | Supported.                 |
| Internet Explorer | 6-7.0   | Not Supported              |
| Internet Explorer | 8.0     | Degraded. No transitions.  |
| Internet Explorer | 9.0     | Degraded. No transitions.  |
| Internet Explorer | 10.0    | Supported                  |
| Mobile Safari     | 3.1.*   | Degraded. No transitions   |
| Mobile Safari     | 4.0+    | Supported                  |
| Android Browser   | 2.1+    | Supported                  |
| Chrome (Android)  | 1.0+    | Supported                  |
| Firefox (Android) | 1.0+    | Supported                  |
| Windows Phone     | 7.5     | Degraded. No transitions.  |

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

