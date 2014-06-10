var imagePrompt = require('../src/main.js');
var f = function() {return {}};
var scribeShim = {
    api: { Command: f, SimpleCommand: {prototype: {execute: f}}},
    commands: {}
};

describe('init', function(){
    it('should return a function', function () {
        expect(typeof imagePrompt({}, function () {})).toBe('function');
    });
});

describe('plugin', function () {
    var plugin, p;

    beforeEach(function () {
        p = {prompt: function () { return 'url'; }};
        spyOn(p, 'prompt').andCallThrough();
        spyOn(scribeShim.api.SimpleCommand.prototype, 'execute');

        plugin = imagePrompt({attributes: {'class': 'test'}}, p.prompt);
    });

    it('should call prompt when executed', function () {
        plugin(scribeShim);
        scribeShim.commands.imagePrompt.execute();

        expect(p.prompt).toHaveBeenCalled();
    });

    it('should return proper image with class', function () {
        plugin(scribeShim);
        scribeShim.commands.imagePrompt.execute();

        expect(scribeShim.api.SimpleCommand.prototype.execute)
            .toHaveBeenCalledWith('<img src="http://url" class="test">');
    });
})