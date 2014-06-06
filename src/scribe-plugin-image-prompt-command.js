module.exports = function () {
    return function (scribe) {
        var imagePromptCommand = new scribe.api.Command('insertImage');
        imagePromptCommand.nodeName = 'IMG';

        imagePromptCommand.execute = function () {
            link = window.prompt('Gimme link');
            debugger;
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