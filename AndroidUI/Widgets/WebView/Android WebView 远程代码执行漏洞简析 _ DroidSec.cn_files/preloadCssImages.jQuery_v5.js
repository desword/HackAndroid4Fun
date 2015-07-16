/**
 * --------------------------------------------------------------------
 * jQuery-Plugin "preloadCssImages"
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * 
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * --------------------------------------------------------------------
 */
jQuery.preloadCssImages = function(settings){
	var settings = jQuery.extend({
		statusTextEl: null,
		statusBarEl: null
	}, settings);
	
	var allImgs = [];
	var k = 0; 
	var sheets = document.styleSheets;
	
	for(var i = 0; i<sheets.length; i++){
		var cssPile = '';
		var csshref = (sheets[i].href) ? sheets[i].href : 'window.location.href';
		var baseURLarr = csshref.split('/');
		baseURLarr.pop();
		var baseURL = baseURLarr.join('/');
		if(baseURL!="") baseURL+='/';
		if(sheets[i].cssRules){
			var thisSheetRules = sheets[i].cssRules; 
			for(var j = 0; j<thisSheetRules.length; j++){ 
				if ( sheets[i].cssRules[j].constructor == 'CSSImportRule' ) { 
					var importSheetRules = sheets[i].cssRules[j].styleSheet.cssRules; 
					for ( var x=0; x<importSheetRules.length; x++ ) { 
						cssPile+= importSheetRules[x].cssText; 
					} 
				} 
				else { 
					cssPile+= thisSheetRules[j].cssText; 
				} 
			} 
		} 
		else { 
			if ( sheets[i].imports.length > 0 ) { 
				for (var m=0; m<sheets[i].imports.length; m++) { 
					cssPile+= sheets[i].imports[m].cssText;
				} 
			} 
			else { 
				cssPile+= sheets[i].cssText; 
			} 
		}
		var imgUrls = cssPile.match(/[^\(]+\.(gif|jpg|jpeg|png)/g);
		var loaded = 0; 

		if(imgUrls != null && imgUrls.length>0 && imgUrls != ''){
			var arr = jQuery.makeArray(imgUrls); 
			jQuery(arr).each(function(){
				allImgs[k] = new Image(); 
				allImgs[k].src = (this.charAt(0) == '/' || this.indexOf('http://')>-1) ? this : baseURL + this;
				
				if(allImgs[k].src.lastIndexOf('http://')>0){allImgs[k].src = allImgs[k].src.split('%22')[1];}
				
				jQuery(allImgs[k]).load(function(){
					loaded++;
					if(settings.statusTextEl) {
						jQuery(settings.statusTextEl).html('<span class="numLoaded">'+loaded+'</span> of <span class="numTotal">'+allImgs.length+'</span> loaded (<span class="percentLoaded">'+(loaded/allImgs.length*100).toFixed(0)+'%</span>) <span class="currentImg">Now Loading: <span>'+allImgs[loaded-1].src.split('/')[allImgs[loaded-1].src.split('/').length-1]+'</span></span>');
					}
					if(settings.statusBarEl) {
						var barWidth = jQuery(settings.statusBarEl).width();
						jQuery(settings.statusBarEl).css('background-position', -(barWidth-(barWidth*loaded/allImgs.length).toFixed(0))+'px 50%');
					}
				});
				k++;
			});
		}
	}
	return allImgs;
}