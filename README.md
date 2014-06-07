[Scribe](https://github.com/guardian/scribe) image prompt commmand
=================================================

### Installation

Using npm `npm install --save scribe-plugin-image-prompt-command`

Using bower `bower install --save scribe-plugin-image-prompt-command`

I may actually provide a release builds outside of npm/bower if somebody will show an interest.

### Usage
Can be required with browserify, used as AMD or included in script.
**npm version will not work with last two**

### Api
```
Creates simple image. You can pass it a link prompt function
that will be called when command is executed. The function should return
valid url. So please validate.
@param  {url function()} Function for getting the url
@return {function(scribe)}  Standard scribe plugin
```

### Example
```Javascript
var imagePrompt = require('scribe-plugin-image-prompt-command');
scribe.use(imagePrompt(function() {
    // Show your modal or whatever
    return window.prompt('Url please');
}));

// Now can be executed like any other scribe command
```