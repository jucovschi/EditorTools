define (require) ->
	$ = jQuery if not $?;

	class ScriptableToolbar
		constructor: (parent, @config) ->
			@menuMap = {};
			@initVisual(parent);
			@eventQueue = @config.eventQueue;

		addItem: (section, itemName, imghRef, helpText="", clear=false) ->
			me = @
			
			item = $("<div>").addClass("ribbon-button").attr("style","float:left");
			item.attr("style", item.attr("style")+";clear:both") if clear;
			item.append($("<span>").addClass("button-help").text(helpText))
			item.append($("<img>").addClass("ribbon-icon").attr("src", @config.root_path+imghRef));

			$(item).click () ->
				impls = JOBAD.util.trigger(me.eventQueue, "interpreter/getImplementation", itemName);
				impls = JOBAD.util.compact(impls);
				return if (impls.length == 0);
				script = impls[0];
				script();

			$(item).mousedown (evt) -> 
				return if evt.which != 3;
				console.log(itemName);

			section["__itemRoot__"].append(item);

		addSection: (menu, sectionName) ->
			return menu[sectionName] if menu[sectionName]?

			itemRoot = $("<div>").addClass("ribbon-section");
			itemRoot.append($("<span>").addClass("section-title").text(sectionName));
			menu["__sectionRoot__"].append(itemRoot);
			menu[sectionName] = 
				__itemRoot__ : itemRoot

		addMenu: (name) ->
			return @menuMap[name] if @menuMap[name]?
			tab = $("<div>").addClass("ribbon-tab");
			tab.append($("<span>").addClass("ribbon-title").text(name));
			@ribbon.append(tab);

			@menuMap[name] = 
				__sectionRoot__ : tab

		initVisual: (parent) ->
			@ribbon = $("<div>").addClass("ribbon").append($("<span>").addClass("ribbon-window-title"));

			parent.append(@ribbon);

		loadLayout: (data) ->
			for name, menuData of data
				menu = @addMenu(name)
				for sectionName, sectionData of menuData
					section = @addSection(menu, sectionName);
					for itemName, itemData of sectionData
						@addItem(section, itemName, itemData["href"], itemData["help"], itemData["clear"]);
			return null