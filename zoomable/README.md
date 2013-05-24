## Usage

    <!-- the zoomable -->
    <a class="zoomable" href="big.jpg">
        <!-- the thumbnail -->
        <img src="thumbnail.jpg">
    </a>

    <!-- include zepto.js or jquery.js -->
    <script src="zepto.js"></script>
    <!-- include zoomable.js -->
    <script src="zoomable.js"></script>
    <!-- construct the zoomable -->
    <script>$('a.zoomable').zoomable()</script>

The element passed to `.zoomable()` should reference a high resolution
image.

When the thumbnail is clicked, the high resolution image will be shown.
Clicking on image again will dimiss it.

## Methods

### .zoomable(options)

Initializes the zoomable with the options (an `object`) given.

    $('.zoomable').zoomable({
        classPrefix: "m-"
    });

### .zoomable('open')

Opens zoomable.

    $('.zoomable').zoomable('open');

### .zoomable('close')

Closes zoomable.

    $('.zoomable').zoomable('close');

### .zoomable('unbind')

Removes event handlers from the zoomable context.

    $('.zoomable').zoomable('unbind');

### .zoomable('bind')

Restores event handlers for the zoomable context.

    $('.zoomable').zoomable('bind');

### .zoomable('destroy')

Unbinds the events from the zoomable context, and removes it from the DOM.

    $('.zoomable').zoomable('destroy');


## Configuration

Below are the options available in the configuration object:

| Name          | Default        | Description                               |   
|---------------|----------------|-------------------------------------------|
| classPrefix   | `"m-"`         |This prefix is inserted before all class references for conflict avoidance. For example, default close class will be `m-close`. |
| stage         | <body> element | DOM node that will receive generated zoomable markup. |
| classNames    | Object, see below | Contains class names for various parts of zoomable. Classes can be overriden individually. |
| ratio         | `2`            | Zoomed in image is magified to be `ratio` times bigger than the stage. |
| seekImage     | `true`         | If thumbnail image is not found in the anchor element used as context, Zoomable will go up in DOM tree until it finds nearby image. Set to `false` to restrict image lookups to stay within context |
| clickCloses   | `true`         | Specifies if clicking or tapping in place on the magnified image should close magnified view |
| activationEvent | `"click"` | Override to use alternate event for all zoomable control interactions |
| canvasStyle  | Object, see below | Extra CSS properties to be applied to canvas. You can delete default properties by setting their value to `undefined`. | 
| imageStyle   | Object, see below | Extra CSS properties to be applied to low-res and high-res magnified image. You can delete default properties by setting their value to `undefined`. |
| stageHTML | Function | Generates HTML of magnified state of zoomable module. See examples to see how to change it |
| globalStyle | Function | Generates CSS for zoomable acting upon <body>. Typically should be left as-is. |

## Classes

| Name        | Class       | Description                                                                         |           
|-------------|-------------|-------------------------------------------------------------------------------------|
| zooming | m-`zooming` | Applied to stage (usually body element) when zoomable is active |
| close | m-`close` | Should be added to custom close buttons within zoomable markup |
| control | m-`zoomableControl` | Internal, added to all top-level elements injected by zoomable |
| canvas | m-`zoomableCanvas` | Applied to div wrapper that contains both low and high resolution images |
| thumb | m-`zoomableThumb` | Applied to low resolution (thumbnail) image |
| full | m-`zoomableFull` | Applied to high resolution image |

## Default styles

These are the default styles applied to magnified image(s) and their container.

### canvasStyle
    { 
        position: 'absolute'
      , width: '100%'
      , height: '100%'
      , overflow: 'auto'
    }

### imageStyle
    { 
        position: 'absolute'
      , top: '0'
      , left: '0'
      , maxWidth: 'none'
      , maxHeight: 'none'        
    }

## Events

The zoomable emits the following events:

| Name          | Description                               |   
|---------------|-------------------------------------------|
| beforeOpen    | Fired before zoomable starts opening      |
| afterOpen     | Fired when zoomable is fully open         |
| beforeClose   | Fired before zoomable starts closing      |
| afterClose    | Fired after zoomable finishes closing     |

<!--

## Limitations

Zoomable relies on click event for activation and deactivation. This results 
in about ~300ms delay in iOS, as Mobile Safari waits to ensure that event 
in question is a single tap rather than built-in page zooming double tap. 
We do not bundle a quick tap implementation with zoomable, but you can 
attach a tap event manually. Here is an example of custom binding that 
uses [jQuery tappable](https://github.com/aanand/jquery.tappable.js/blob/master/jquery.tappable.js):

    var el = $('a.zoomable').zoomable();
    el.tappable(function() {
        $(this).zoomable('show');
    });
    
Other quick touch implementations can be used in similar ways.

-->
