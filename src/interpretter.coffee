define (req) ->

	class Interpreter
		constructor: (@editor) ->
			_this = @;
			@env = {};

		hasImplementation: (item) ->
			@env[item]?;

		getImplementation: (cmd) ->
			@env[cmd]

		addImplementation: (cmd, fnc) ->
			@env[cmd] = fnc

		removeImplementation: (cmd) ->
			delete @env[cmd]


		exec: (script) ->
			try
				eval("with (this.env) { script(); }");
			catch e
				s = e;
			s.toString() if s? && s.toString?

		autocomplete: (string, callback) ->
			results = [];
			for prop of @env
				results.push(prop) if prop.indexOf(string) == 0
			callback(results);

		loadScript : (editor, env, api) ->
			(t) ->
				env[api] = () ->
					t(editor);

		loadAPI: (data) ->
			if typeof(data) == "string"
				data = JSON.parse(data)
			env = @env;
			editor = @editor;
			for prop of data
				api = "scripts/"+prop+"-"+data[prop]["repo"]+"-"+data[prop]["version"]+".js";
				r = require([require.toUrl(api)], @loadScript(editor, env, prop));

			env