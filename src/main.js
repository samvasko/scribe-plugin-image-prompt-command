var extend = require('extend');

/**
 * Creates simple image. You can pass it a link prompt function
 * that will be called when command is executed. The function should return
 * valid url. So please validate.
 * @optional  {Object}   options Options for created image
 * @optional  {Function} prompt Function for getting the url
 * @return {function}
 */
module.exports = function (options, prompt) {
    return function (scribe) {
        var imagePromptCommand = new scribe.api.Command('insertHTML');
        imagePromptCommand.nodeName = 'IMG';

        if (typeof options == 'function') {
            prompt = options;
        }

        imagePromptCommand.execute = function () {
            var link = prompt ? prompt() : window.prompt('Enter image url');
            if (!link) return false;
            if (typeof link === 'object') {
                // If some extra properties were passed from prompt
                options = extend(options, link);
            } else if (typeof link === 'string') {
                options.url = link;
            }

            if (!/^https?\:\/\//.test(options.url)) {
                options.url = location.protocol + '//' + options.url;
            }

            var url = options.url;
            var html = addAttributes('<img src=' + url + '>', options.attributes);

            scribe.api.SimpleCommand.prototype.execute.call(this, html);
        };

        scribe.commands.imagePrompt = imagePromptCommand;
    };
}

function addAttributes (html, attrs) {
    var host = document.createElement('div');
    host.innerHTML = unescape(html);

    var frame = host.children[0];
    for (var prop in attrs) {
        frame.setAttribute(prop, attrs[prop]);
    }

    return host.innerHTML;
}
