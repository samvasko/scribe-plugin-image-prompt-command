/**
 * Creates simple image. You can pass it a link prompt function
 * that will be called when command is executed. The function should return
 * valid url. So please validate.
 * @param  {function} prompt function
 * @return {function}
 */
module.exports = function (prompt) {
    return function (scribe) {
        var imagePromptCommand = new scribe.api.Command('insertImage');
        imagePromptCommand.nodeName = 'IMG';

        imagePromptCommand.execute = function () {
            link = prompt ? prompt() : window.prompt('Enter image url');
            if (link) {
                if (!/^https?\:\/\//.test(link)) {
                    link = location.protocol + '//' + link;
                };
                scribe.api.SimpleCommand.prototype.execute.call(this, link);
            };
        }

        scribe.commands.imagePrompt = imagePromptCommand;
    };
}