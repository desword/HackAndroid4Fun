(function() {this.Core = {}; Core.Class = function(){};Core.apply = function(object, config, defaults){if (defaults) {Core.apply(object, defaults);}if (object && config && typeof config === 'object'){for (var i in config){object[i] = config[i];}}return object;};Core.delegate = function(target, method, args){return (typeof method === "function") ? function(){arguments.push = Array.prototype.push;for (var arg in args){arguments.push(args[arg]);}return method.apply(target, arguments); } : function(){return false;};};Core.pattern = (function(){return {isString: function(value){return typeof value === 'string';},isArray: function(value){return value.constructor == Array;},isFilemap: function(value){if (this.isObject(value) && !this.isString(value)){for (var key in value){if (!this.isString(key)) return false;if (!this.isArray(value[key])) return false;}}else{return false;}return true;},isNumber: function(value) {return Object.prototype.toString.call(value) === '[object Number]';},isObject: function(value) {return Object.prototype.toString.call(value) === '[object Object]';},isClass: function(value) {return (typeof(value) == "function" && typeof(value.prototype) == "object") ? true : false; },isFunction: function(value) {return Object.prototype.toString.apply(value) === '[object Function]';},isBoolean: function(value) {return Object.prototype.toString.apply(value) === '[object Boolean]';},isURI: function(value) {var regex =  new RegExp('(ftp|http|https)','ig');return value.match(regex) ? true : false;}}})();Core.mixin = (function(){var options = {defer:  [],override: true};var Mixin = (function(){return {proto: null,mixins: null,augment: function(args){this.proto= args.shift(),this.mixins = args.shift(),options.defer= args.shift() || [],options.override = args.shift() || false;this.override();return this.proto;},compose: function(){},override: function() {for (var mixin in this.mixins) {proto = this.mixins[mixin].prototype || this.mixins[mixin];Core.apply(this.proto.prototype, proto);this.proto.prototype.mixinPrototypes[mixin] = proto;}}}})();return function() {var args = Array.prototype.slice.call(arguments);args.unshift(this);return Mixin.augment(args);}})();Core.Class.prototype = {mixinPrototypes:[],delegate: Core.delegate,getMixin: function(name) {return this.getMixins()[name];},getMixins: function() {return this.mixinPrototypes || {};}};Core.apply(Core.Class,{extend: function(object) {Core.constructing = true;var proto = new this(), superclass = this.prototype;delete Core.constructing;Core.apply(proto, object);var Class = proto.constructor = function() {if (!Core.constructing && this.init) {this.init.apply(this, arguments);}};proto.superclass = superclass;Core.apply(Class, {prototype:   proto,constructor: Class,ancestor:this,extend:  this.extend,mixin:  this.mixin});if (object.mixins) {this.mixin(object.mixins);}return Class;},extendPro: function(proto) {Core.constructing = true;var F = function() {if (!Core.constructing && this.init) {this.init.apply(this, arguments);}};F.prototype = new this(); delete Core.constructing;for (key in proto) (function(fn, sfn) {F.prototype[key] = !Core.pattern.isFunction(fn) || !Core.pattern.isFunction(sfn) ? fn : function() {this._super = sfn; return fn.apply(this, arguments); };})(proto[key], F.prototype[key]);F.prototype.constructor = F;F.extend = this.extend;F.mixin= this.mixin;return F;},mixin: Core.mixin});Core.Class.inherit = function(constructor) {Core.constructing = true;constructor = constructor || function(){};var parent = this;F = function() {this.parent = parent;if (!Core.constructing) {var pubs = constructor.apply(this, arguments), self = this;for (key in pubs) (function(fn, sfn) {self[key] = typeof fn != "function" || typeof sfn != "function" ? fn : function() {this.parent = sfn; return fn.apply(this, arguments); };})(pubs[key], self[key]);}}; F.prototype = new this;delete Core.constructing;F.prototype.constructor = F;F.inherit = arguments.callee;return F;};Core.apply(Core, {Array: (function() {var extendedPrototype = {clear: function() {this.length = 0;return this;},map: function(mapper, context) {var result = new Array(this.length);for (var i = 0, n = this.length; i<n; i++)if (i in this) result[i] = mapper.call(context, this[i], i, this);return result;},invoke: function(method) {var args = Array.prototype.slice.call(arguments, 1);return this.map(function(element) {return element[method].apply(element, args);});},filter: function(fn) {var a = [];for ( var i=0, j=this.length; i < j; ++i ) {if ( !fn.call(this, this[i], i, this) ) {continue;}a.push(this[i]);}return a;},clean: function() {return this.filter(function(value, index) {return null === value ? false : value.length;});},contains: function(obj) {var i = this.length;while (i--) {if (this[i] === obj) {return true;}}return false;}};return {get: function(array) {Core.apply(array, extendedPrototype);return array;}}})()});Core.apply(Core, {namespace: (function() {return Core.apply(Core,{register: function(namespace, scope, object) {var namespaces = namespace.split('.');for (var i = 0; i < namespaces.length; i++) {var namespace = namespaces[i];if (!this.exists(namespace, scope)) {scope[namespace] = object;}scope = scope[namespace];}return scope;},exists: function(namespace, scope) {return (!scope || typeof scope[namespace] === "undefined") ? false : true;},autoload: function(namespace, callback) {var scripts = {};var toPath = function( string ) {if (Core.pattern.isURI(namespace)) {Core.loader.setConfig({path: ''});return namespace;}var params = [], regex = new RegExp('((\\.\\.\\/)+)','i');relative = regex.exec(string);if (relative && relative.length) {relative = relative.shift();string = string.substring(relative.length);params.push(relative);}params.push(string);return params.join('');};var queue = function(namespace) {var script = toPath(namespace);scripts[script] = [];};if (Core.pattern.isFilemap(namespace)) {scripts = namespace;}else{if (Core.pattern.isString(namespace)) {queue(namespace);}else{for (var i in namespace) {queue(namespace[i]);}}};Core.loader.addScripts(scripts).autoload(callback);}})})(),extend: function(object) {return Core.Class.extend(object);},inherit: function(object) {return Core.Class.inherit(object);},override: function(origclass, overrides) {Core.apply(origclass.prototype, overrides);},define: function(namespace, object) {return this.namespace.register(namespace, window, object);},require: function(script, callback) {this.namespace.autoload(script, callback);},loader: (function() {var scripts = {}, queue = [], counter = 0, config = {path:  null,basePath:null,cache: true,dataType: 'script',type:'.js',method: 'GET'};return {setConfig: function(options) {jQuery.extend(config, options);return this;},getConfig: function() {return config;},addScripts: function( collection ) {scripts = jQuery.extend(true, {}, scripts, collection);return this;},loadScript: function(url, callback, context) {var script = queue[url] || (queue[url] = {loaded: false,callbacks : []});if(script.loaded) {return callback.apply(context);}script.callbacks.push({fn  : callback,context : context});if(script.callbacks.length == 1) {var resource = [];resource.push(config.path);resource.push(config.basePath);resource.push(url + (config.type || ''));jQuery.ajax({type : config.method,url : Core.Array.get(resource).clean().join('/'),dataType : config.dataType,cache: config.cache,success  : function(response) {script.loaded = true;jQuery.each(script.callbacks, function() {this.fn.apply(this.context);});script.callbacks.length = 0;},error:function (xhr, ajaxOptions, thrownError) {throw 'Failed to load script with status ' + xhr.status + ' . Error: ' + thrownError;}});}},clear: function() {this.queue.clear();return this;},queue: function() {var pushQueue = function(script) {if (-1 == jQuery.inArray(script,queue) && script.length) {queue.push(script);}};jQuery.each(scripts, function(script, scripts) {jQuery.each(scripts, function(index, script) {pushQueue(script);});pushQueue(script);});return this;},autoload: function( callback ) {var path = this.path();this.queue();(function() {if(counter == queue.length) {return callback.apply(window);}
Core.loader.loadScript(queue[counter++], arguments.callee);})();},path: (function(file) {if (!config.path) {var exists = jQuery('script').filter(function() {return this.src.indexOf(file) != -1;}).eq(0);if (exists.size()) {config.path = exists.attr('src').slice(0, -1 - file.length)}}return function() {return config.path;}})('core.js')}})(),preloader: (function() {var queue = [], images = [], total = 0, config = {cache: true,parallel: true};var time = {start: 0,end: 0};return {onComplete: function(ui){},images: function() {return images;},reset: function() {queue = [];images = [];total = 0;return this;},queue: function(element) {if (Core.pattern.isString(element)) {queue.push({source: element})}else {jQuery.each(element, function(index, element) {queue.push(element);})}return this;},finish: function(event, index, image) {total--;jQuery.each(images, function(x,i) {if (i.index == index) {i.size = {width: image.width,height: image.height}}})
if (0 == total) {time.end = new Date().getTime();this.onComplete.apply(this,[{time: ((time.end - time.start)/1000).toPrecision(2),images: images}])}},preload: function(callback) {this.onComplete = callback || this.onComplete;time.start = new Date().getTime();total = i = queue.length;while(i--) {var image = new Image();images.push({index: i,image: image,size: {width:0,height: 0}});image.onload  = Core.delegate(this, this.finish, ([i,image]));image.onerror = Core.delegate(this, this.finish, ([i,image]));image.onabort = Core.delegate(this, this.finish, ([i,image]));image.src = config.cache ? queue[i].source : (queue[i].source + '?u=' + (new Date().getTime()));}},preloadCssImages: function(callback) {var images = this.getCssImages();this.queue(images).preload(callback);},getCssRules: function() {var collection = [], data = {};var Collect = {rules: function(rules) {var rule = rules.length;while(rule--) {data = {rule:rules[rule],selectorText: !rules[rule].selectorText ? null : rules[rule].selectorText,declaration:  (rules[rule].cssText) ? rules[rule].cssText : rules[rule].style.cssText}
collection.push(data);var symlink = rules[rule].styleSheet || null;if (symlink) {Collect.rules(symlink.cssRules);}}}};var i = document.styleSheets.length;while(i--) {var sheet = {rules:  document.styleSheets[i].rules || document.styleSheets[i].cssRules,imports: document.styleSheets[i].imports || []};Collect.rules(sheet.rules);for (x = 0; x < sheet.imports.length; x++) {Collect.rules(sheet.imports[x].rules || sheet.imports[x].cssRules);}}return collection;},getCssImages: function() {var rules = this.getCssRules(), i = rules.length, images = [], regex = new RegExp('[^\(|\'\"]+\.(gif|jpg|jpeg|png)\\)?','ig');while(i--){var img = rules[i].declaration.match(regex);if (img && img.length) {if (1 == img.length) {images.push(img);}else{for (var i in img) {images.push(img[i])}}}}return images;}}})()});Core.validator = (function() {var data = {}, condition = Core.Array.get(['required', 'message','element','tooltip','error']);return {errors: false,tooltip: function() {var Tip = Core.extend({tooltip: null,create: function() {this.tooltip = jQuery('<div/>').addClass('coretip');return this;},empty: function() {this.tooltip.empty();},content: function(content) {this.tooltip.html(content);return this;},open: function(target) {var offset = target.offset();this.tooltip.css({top: offset.top,left: offset.left + target.width() + 15,opacity:0.95}).appendTo('body').fadeIn(200);},close: function() {this.tooltip.remove()}})
return new Tip().create();},display: function(map) {var error = false;jQuery('div.coretip').remove();jQuery.each(map, function(name, options) {if (options.error) {error = true; options.element.addClass('invalid');options.tooltip.content(options.message).open(options.element);}else{options.element.removeClass('invalid');options.tooltip.close();}});},map: function(id, map) {var form = jQuery('form[id=' + id + ']');data[id] ={form: form.length > 0 ? form : null,map: {}}
if (data[id].form) {jQuery.each(map, function(element, options) {data[id].map[element] = jQuery.extend({error:  false,message: null,tooltip: Core.validator.tooltip()},options)});}return this;},auto: function() {jQuery.each(data, Core.delegate(this, this.bind));return this;},bind: function(index, form) {if (form.form) {form.form.find(':submit').unbind('click').bind('click', Core.delegate(this, this.validate,[form]));}},validate: function(event, form) {form.form.find(':input').unbind("blur").bind({blur: Core.delegate(this, this.validate,[form])}).end();this.errors = false;jQuery.each(form.map, Core.delegate(this, this.filter, [form]));if (!this.valid()) {this.display(form.map);}return this.valid();},valid: function() {return this.errors ? false : true;},filter: function(name, options, form) {var element = form.form.find(':input[name=' + name + ']');if (options.required) {jQuery.each(options, Core.delegate(this, this.check,[name, element, form]));}},check: function(fn, bool, name, element, form) {var error = false;if (!condition.contains(fn)) {if (Core.pattern.isFunction(bool)) {bool = bool.apply(this,[element.val()]);}if (bool !== this[fn].apply(this, [element.val(), element])) {error = true;this.errors = true;}jQuery.extend(true, form.map[name],{error: error,element: element})}},empty: function(value) {return null === value ? false : (value.length == 0 ? true : false);},email: function(value) {var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})jQuery/;return regex.test(value);},alnum: function(value) {return true;},digit: function(value) {return Core.pattern.isNumber(value);},alpha: function(value) {return false;},lower: function(value) {return (value == value.toLowerCase()); },upper: function(value) {return (value == value.toUpperCase()); },extend: function(proto) {Core.apply(this, proto);return this;},password: function(value) {return true;},checked: function(value, element) {return element.is(':checked') ? true : false},positive: function(value) {return parseInt(value,10) > 0 ? true : false},negative: function(value) {return parseInt(value,10) < 0 ? true : false},zero: function(value) {return parseInt(value,10) === 0 ? true : false},equalTo: function(value) {return true;},strcmp: function(str1, str2) {return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );},ukpostcode: function(value){var regex = /^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)jQuery/;return regex.test(value);}}})();})(jQuery, window);