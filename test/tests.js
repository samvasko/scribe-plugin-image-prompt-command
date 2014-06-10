(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

function isPlainObject(obj) {
	if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval)
		return false;

	var has_own_constructor = hasOwn.call(obj, 'constructor');
	var has_is_property_of_method = hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !has_own_constructor && !has_is_property_of_method)
		return false;

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for ( key in obj ) {}

	return key === undefined || hasOwn.call( obj, key );
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone,
	    target = arguments[0] || {},
	    i = 1,
	    length = arguments.length,
	    deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && typeof target !== "function") {
		target = {};
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];

					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

},{}],2:[function(require,module,exports){
var extend = require('extend');

/**
 * Creates simple image. You can pass it a link prompt function
 * that will be called when command is executed. The function should return
 * valid url. So please validate.
 * @param  {function} prompt function
 * @return {function}
 */
module.exports = function (options, prompt) {
    return function (scribe) {
        var imagePromptCommand = new scribe.api.Command('insertImage');
        imagePromptCommand.nodeName = 'IMG';

        imagePromptCommand.execute = function () {
            link = prompt ? prompt() : window.prompt('Enter image url');
            if (!link) return false;
            if (typeof link === 'object') {
                // If some extra properties were passed from prompt
                options = extend(options, link);
            } else if (typeof link === 'string') {
                options.url = link
            };

            if (!/^https?\:\/\//.test(options.url)) {
                options.url = location.protocol + '//' + options.url;
            };

            var url = options.url;
            var html = addAttributes('<img src=' + url + '>', options.attributes);

            scribe.api.SimpleCommand.prototype.execute.call(this, html);
        }

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
},{"extend":1}],3:[function(require,module,exports){
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
},{"../src/main.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9ibGlrZXIvQ29kZS9Kcy9zY3JpYmUtcGx1Z2luLWltYWdlLXByb21wdC1jb21tYW5kL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9ibGlrZXIvQ29kZS9Kcy9zY3JpYmUtcGx1Z2luLWltYWdlLXByb21wdC1jb21tYW5kL25vZGVfbW9kdWxlcy9leHRlbmQvaW5kZXguanMiLCIvaG9tZS9ibGlrZXIvQ29kZS9Kcy9zY3JpYmUtcGx1Z2luLWltYWdlLXByb21wdC1jb21tYW5kL3NyYy9tYWluLmpzIiwiL2hvbWUvYmxpa2VyL0NvZGUvSnMvc2NyaWJlLXBsdWdpbi1pbWFnZS1wcm9tcHQtY29tbWFuZC90ZXN0L21haW5fdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG5cdGlmICghb2JqIHx8IHRvU3RyaW5nLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScgfHwgb2JqLm5vZGVUeXBlIHx8IG9iai5zZXRJbnRlcnZhbClcblx0XHRyZXR1cm4gZmFsc2U7XG5cblx0dmFyIGhhc19vd25fY29uc3RydWN0b3IgPSBoYXNPd24uY2FsbChvYmosICdjb25zdHJ1Y3RvcicpO1xuXHR2YXIgaGFzX2lzX3Byb3BlcnR5X29mX21ldGhvZCA9IGhhc093bi5jYWxsKG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdpc1Byb3RvdHlwZU9mJyk7XG5cdC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3Rcblx0aWYgKG9iai5jb25zdHJ1Y3RvciAmJiAhaGFzX293bl9jb25zdHJ1Y3RvciAmJiAhaGFzX2lzX3Byb3BlcnR5X29mX21ldGhvZClcblx0XHRyZXR1cm4gZmFsc2U7XG5cblx0Ly8gT3duIHByb3BlcnRpZXMgYXJlIGVudW1lcmF0ZWQgZmlyc3RseSwgc28gdG8gc3BlZWQgdXAsXG5cdC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duLlxuXHR2YXIga2V5O1xuXHRmb3IgKCBrZXkgaW4gb2JqICkge31cblxuXHRyZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgfHwgaGFzT3duLmNhbGwoIG9iaiwga2V5ICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHQgICAgdGFyZ2V0ID0gYXJndW1lbnRzWzBdIHx8IHt9LFxuXHQgICAgaSA9IDEsXG5cdCAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHQgICAgZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKCB0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcblx0XHQvLyBza2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0aSA9IDI7XG5cdH1cblxuXHQvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcblx0aWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB0YXJnZXQgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKG9wdGlvbnMgPSBhcmd1bWVudHNbIGkgXSkgIT0gbnVsbCApIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0WyBuYW1lIF07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zWyBuYW1lIF07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAoIHRhcmdldCA9PT0gY29weSApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRpZiAoIGRlZXAgJiYgY29weSAmJiAoIGlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0gQXJyYXkuaXNBcnJheShjb3B5KSkgKSApIHtcblx0XHRcdFx0XHRpZiAoIGNvcHlJc0FycmF5ICkge1xuXHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIEFycmF5LmlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0gZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG5cdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0fSBlbHNlIGlmICggY29weSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0gY29weTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuIiwidmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgc2ltcGxlIGltYWdlLiBZb3UgY2FuIHBhc3MgaXQgYSBsaW5rIHByb21wdCBmdW5jdGlvblxuICogdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIGNvbW1hbmQgaXMgZXhlY3V0ZWQuIFRoZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuXG4gKiB2YWxpZCB1cmwuIFNvIHBsZWFzZSB2YWxpZGF0ZS5cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBwcm9tcHQgZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBwcm9tcHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNjcmliZSkge1xuICAgICAgICB2YXIgaW1hZ2VQcm9tcHRDb21tYW5kID0gbmV3IHNjcmliZS5hcGkuQ29tbWFuZCgnaW5zZXJ0SW1hZ2UnKTtcbiAgICAgICAgaW1hZ2VQcm9tcHRDb21tYW5kLm5vZGVOYW1lID0gJ0lNRyc7XG5cbiAgICAgICAgaW1hZ2VQcm9tcHRDb21tYW5kLmV4ZWN1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsaW5rID0gcHJvbXB0ID8gcHJvbXB0KCkgOiB3aW5kb3cucHJvbXB0KCdFbnRlciBpbWFnZSB1cmwnKTtcbiAgICAgICAgICAgIGlmICghbGluaykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBsaW5rID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIC8vIElmIHNvbWUgZXh0cmEgcHJvcGVydGllcyB3ZXJlIHBhc3NlZCBmcm9tIHByb21wdFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBleHRlbmQob3B0aW9ucywgbGluayk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaW5rID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudXJsID0gbGlua1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCEvXmh0dHBzP1xcOlxcL1xcLy8udGVzdChvcHRpb25zLnVybCkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIG9wdGlvbnMudXJsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHVybCA9IG9wdGlvbnMudXJsO1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBhZGRBdHRyaWJ1dGVzKCc8aW1nIHNyYz0nICsgdXJsICsgJz4nLCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuXG4gICAgICAgICAgICBzY3JpYmUuYXBpLlNpbXBsZUNvbW1hbmQucHJvdG90eXBlLmV4ZWN1dGUuY2FsbCh0aGlzLCBodG1sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjcmliZS5jb21tYW5kcy5pbWFnZVByb21wdCA9IGltYWdlUHJvbXB0Q29tbWFuZDtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBhZGRBdHRyaWJ1dGVzIChodG1sLCBhdHRycykge1xuICAgIHZhciBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaG9zdC5pbm5lckhUTUwgPSB1bmVzY2FwZShodG1sKTtcblxuICAgIHZhciBmcmFtZSA9IGhvc3QuY2hpbGRyZW5bMF07XG4gICAgZm9yICh2YXIgcHJvcCBpbiBhdHRycykge1xuICAgICAgICBmcmFtZS5zZXRBdHRyaWJ1dGUocHJvcCwgYXR0cnNbcHJvcF0pO1xuICAgIH1cblxuICAgIHJldHVybiBob3N0LmlubmVySFRNTDtcbn0iLCJ2YXIgaW1hZ2VQcm9tcHQgPSByZXF1aXJlKCcuLi9zcmMvbWFpbi5qcycpO1xudmFyIGYgPSBmdW5jdGlvbigpIHtyZXR1cm4ge319O1xudmFyIHNjcmliZVNoaW0gPSB7XG4gICAgYXBpOiB7IENvbW1hbmQ6IGYsIFNpbXBsZUNvbW1hbmQ6IHtwcm90b3R5cGU6IHtleGVjdXRlOiBmfX19LFxuICAgIGNvbW1hbmRzOiB7fVxufTtcblxuZGVzY3JpYmUoJ2luaXQnLCBmdW5jdGlvbigpe1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgZnVuY3Rpb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cGVjdCh0eXBlb2YgaW1hZ2VQcm9tcHQoe30sIGZ1bmN0aW9uICgpIHt9KSkudG9CZSgnZnVuY3Rpb24nKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZSgncGx1Z2luJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBwbHVnaW4sIHA7XG5cbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcCA9IHtwcm9tcHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICd1cmwnOyB9fTtcbiAgICAgICAgc3B5T24ocCwgJ3Byb21wdCcpLmFuZENhbGxUaHJvdWdoKCk7XG4gICAgICAgIHNweU9uKHNjcmliZVNoaW0uYXBpLlNpbXBsZUNvbW1hbmQucHJvdG90eXBlLCAnZXhlY3V0ZScpO1xuXG4gICAgICAgIHBsdWdpbiA9IGltYWdlUHJvbXB0KHthdHRyaWJ1dGVzOiB7J2NsYXNzJzogJ3Rlc3QnfX0sIHAucHJvbXB0KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBwcm9tcHQgd2hlbiBleGVjdXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGx1Z2luKHNjcmliZVNoaW0pO1xuICAgICAgICBzY3JpYmVTaGltLmNvbW1hbmRzLmltYWdlUHJvbXB0LmV4ZWN1dGUoKTtcblxuICAgICAgICBleHBlY3QocC5wcm9tcHQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHByb3BlciBpbWFnZSB3aXRoIGNsYXNzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwbHVnaW4oc2NyaWJlU2hpbSk7XG4gICAgICAgIHNjcmliZVNoaW0uY29tbWFuZHMuaW1hZ2VQcm9tcHQuZXhlY3V0ZSgpO1xuXG4gICAgICAgIGV4cGVjdChzY3JpYmVTaGltLmFwaS5TaW1wbGVDb21tYW5kLnByb3RvdHlwZS5leGVjdXRlKVxuICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCc8aW1nIHNyYz1cImh0dHA6Ly91cmxcIiBjbGFzcz1cInRlc3RcIj4nKTtcbiAgICB9KTtcbn0pIl19
