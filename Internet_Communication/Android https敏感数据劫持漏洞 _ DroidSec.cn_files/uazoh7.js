(function(jQuery) {
	"use strict";
	var bodyW = jQuery('body').width(),//获取访客窗口宽度
		enableMenuAnimate = false;
	/**窗口滚动**/
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > 40) {
			jQuery('#to-the-top').fadeIn();
			jQuery('#uazoh7-header-menu').addClass('uazoh7-header-sticked');
			jQuery('.uazoh7-content').css('padding-top', jQuery('#uazoh7-header-menu').height() + 'px');
		} else {
			jQuery('#to-the-top').fadeOut();
			jQuery('#uazoh7-header-menu').removeClass('uazoh7-header-sticked');
			jQuery('.uazoh7-content').css('padding-top', 0);
		}
	});
	jQuery('#to-the-top').click(function() { jQuery('body,html').animate({scrollTop: 0}, 500); });
	/**行间距**/
	jQuery('.uazoh7-about-widget p.contacts').first().css({'border-top-width':'1px', 'margin-top':'30px'});
	jQuery('.uazoh7-padding-top-0').find('h2').first().css('margin-top', '0px').css('padding-top', '0px');
	jQuery('.uazoh7-content').find('.uazoh7-section').each(function() {
		jQuery(this).each(function() {
			jQuery(this).find('.row').css('margin-top', '60px').first().css('margin-top', '0px');
			jQuery(this).find('.row').each(function() {
				if (bodyW < 992) {
					jQuery(this).find('[class*="col-"]').css('margin-top','60px').first().css('margin-top','0px');
				}
			});
		});
	});
	if (bodyW > 768) {
		jQuery('.uazoh7-section').each(function() {
			jQuery(this).find('[class*="col-"]').each(function() {
				jQuery(this).find('h2, h3, h1, h4, h5').first().css('margin-top', '0px');
			});
		});
	}
    jQuery('blockquote').each(function() {
    	var content = jQuery(this).text();
    	jQuery(this).html('<i class="fa fa-quote-left"></i>' + content + '<i class="fa fa-quote-right"></i>');
    	jQuery(this).wrapInner('<div class="blockquote-inner"></div>');
    });
	if (bodyW > 768 && bodyW < 992) {
		jQuery('section .col-sm-6').filter(':not(.uazoh7-estate .col-sm-6)').css('margin-top', '60px').eq(0).css('margin-top', '0px').end().eq(1).css('margin-top', '0px');
	} else {
		jQuery('section .col-sm-6, .uazoh7-footer .col-sm-6').css('margin-top', '0px');
	}
	jQuery('.uazoh7-feature-2').each(function() {
		jQuery(this).children().last().css('margin-bottom','0px');
	});
    jQuery('.uazoh7-partner-1').each(function() {
    	var jQuerythis = jQuery(this),
    		H = jQuerythis.height(),
    		h = jQuerythis.find('figure').height();
    	if (H < h)
    		jQuerythis.height(h + 120);
    }).last().css('border-bottom-width', '1px');
    jQuery('.uazoh7-projects-listing').each(function() {
    	var jQuerythis = jQuery(this),
    		offset = parseInt(jQuerythis.find('.uazoh7-listing-item').css('padding-left')),
    		w = parseInt(jQuerythis.parents('[class*="col-"]').width()) + offset, h = 0,
    		jQueryelems = jQuerythis.find('.uazoh7-listing-item');
    	jQuerythis.css({
    		'margin-left' : -offset,
    		'width' : w
    	});
    	if (jQuerythis.hasClass('uazoh7-projects-listing-3-cols')) {
    		if (bodyW < 768) {
	    		jQueryelems.width(100 + '%');
    		} else {
    			jQueryelems.width(jQuerythis.width()/3 - 30);
    		}
    	}
    	if (jQuerythis.hasClass('uazoh7-projects-listing-4-cols')) {
    		if (bodyW < 768) {
	    		jQueryelems.width(100 + '%');
    		} else {
    			jQueryelems.width(jQuerythis.width()/4 - 30);
    		}
    	}
    	if (jQuerythis.hasClass('uazoh7-projects-listing-5-cols')) {
    		if (bodyW < 768) {
	    		jQueryelems.width(100 + '%');
    		} else {
    			jQueryelems.width(jQuerythis.width()/5 - 30);
    		}
    	}
    });
    jQuery('.uazoh7-property-2, .uazoh7-property-3').each(function() {
    	var h = parseInt(jQuery(this).find('figure').height());
    	jQuery(this).find('.uazoh7-property-1-inner').height(h + 2);
    });
    jQuery('.uazoh7-single-estate').each(function() {
    	var jQuerythis = jQuery(this),
    		jQuerydetails = jQuerythis.find('.uazoh7-propert-details'),
    		w = parseInt(jQuerydetails.parents('[class*="col-"]').width());
    	if (bodyW > 768) {
	    	jQuerydetails.width(w/3 + 10).first().css('margin-left', '-31px');
	    	jQuerydetails.find('.inner').css({'padding-left':'30px'});
    	} else {
	    	jQuerydetails.width(w).first().css('margin-left', '0px');
	    	jQuerydetails.find('.inner').css({'padding-left':'0px', 'margin-bottom':'30px'});
	    	jQuerydetails.last().find('.inner').css('margin-bottom', '0px');
		}
    });
	/**Uazoh7 Tabs**/
	jQuery('.uazoh7-tabs').each(function() {
		var jQuerythis = jQuery(this),
			jQuerytitle = jQuerythis.find('header span'),
			jQueryarticle = jQuerythis.find('article');
		jQuery('<div class="arrow"></div>').appendTo(jQuerytitle);
		jQueryarticle.first().show();
		jQuerytitle.first().addClass('active').end().click(function() {
			jQuerytitle.removeClass('active');
			jQuery(this).addClass('active');
			jQueryarticle.hide().eq(jQuery(this).index()).fadeIn();
		});
	});
	/**消息**/
	jQuery('.uazoh7-msg').each(function() {
		var jQuerythis = jQuery(this);
		jQuerythis.find('.fa').click(function() { jQuerythis.fadeOut(); });
	});
	/**订阅按钮**/
	jQuery('.uazoh7-social-button-2').hover(function() {
		jQuery(this).find('.esb-tooltip').stop(true, true).fadeIn();
	}, function() {
		jQuery(this).find('.esb-tooltip').stop(true, true).fadeOut();
	});
	/**Toggle**/
	jQuery('.uazoh7-toggle').each(function() {
		var jQuerythis = jQuery(this),
			jQueryarticle = jQuerythis.find('article'),
			jQueryheader = jQueryarticle.find('header'),
			jQuerycontent = jQueryarticle.find('p');
		jQuerycontent.hide();
		jQueryheader.removeClass('active');
		jQueryarticle.last().css('margin-bottom', '0px');
		jQueryarticle.each(function() {
			var jQueryt = jQuery(this);
			if (jQueryt.hasClass('open')) {
				jQueryt.find('.fa').addClass('fa-minus');
				jQueryt.find('header').addClass('active');
				jQueryt.find('p').show();
			}
		});
		jQueryheader.click(function() {
			jQueryheader.parent().removeClass('open');
			if (jQuery(this).hasClass('active')) {
				jQuery(this).find('.fa').removeClass('fa-minus');
				jQuery(this).removeClass('active');
				jQuery(this).parent().find('p').slideUp();
			} else {
				jQueryheader.removeClass('active');
				jQuerycontent.slideUp();
				jQueryheader.find('.fa').removeClass('fa-minus');
				jQuery(this).find('.fa').addClass('fa-minus');
				jQuery(this).addClass('active');
				jQuery(this).parent().find('p').slideDown();
			}
		});
	});
	/**响应**/
	jQuery('.uazoh7-feature').each(function() {
		jQuery('<span class="arrow-color"></span>').appendTo(jQuery(this).find('header'));
	});
	if (bodyW < 768) {
		jQuery('.uazoh7-feature, .uazoh7-feature-2').last().css('margin-bottom', '0px');
	}
	/**动画**/
	jQuery('.uazoh7-feature-store').each(function() {
		jQuery('<span class="arrow"></span>').prependTo(jQuery(this));
	}).hover(function() {
		jQuery(this).find('i').addClass('animated rotateIn');
	}, function() {
		jQuery(this).find('i').removeClass('animated rotateIn');
	});
	jQuery('.uazoh7-feature-3, .uazoh7-feature-3').hover(function() {
		jQuery(this).find('.fa').addClass('animated rotateIn');
	}, function() {
		jQuery(this).find('.fa').removeClass('animated rotateIn');
	});
	/**表单**/
	jQuery('.uazoh7-estate-search-type span').on('click', function() {
		jQuery('.uazoh7-estate-search-type span').removeClass('active');
		jQuery(this).addClass('active').parent().find('input').val(jQuery(this).attr('data-val'));
	});
	jQuery('.uazoh7-estate-form-item').each(function() {
		var jQuerythis = jQuery(this),
			jQueryspan = jQuerythis.find('span.val'),
			jQuerylist = jQuerythis.find('.uazoh7-efi-list'),
			jQuerychecked = jQuerylist.find('input[type=checkbox]');
		if (jQuerylist.find('> p').length > 8)
			jQuerylist.css({
				'overflow':'scroll',
				'overflow-x':'hidden'
			});
		jQuerythis.find('i.fa-caret-down').click(function() {
			jQuerylist.slideToggle();
			jQuery(this).toggleClass('fa-caret-up');
		});
		jQuerychecked.on('click', function() {
			var jQueryc = jQuerychecked.filter(':checked');
			if (jQueryc.length == 1) {
				jQueryspan.html(jQueryc.val());
			}
			if (jQueryc.length == 0) {
				jQueryspan.html('Choose...');
			}
			if (jQueryc.length > 1) {
				jQueryspan.html('Multiple');
			}
		});
	});
	/**顶部按钮 H1**/
	jQuery('.uazoh7-top-bar').find('ul.social-btns li').each(function() {
		var jQuerythis = jQuery(this),
			jQuerya = jQuerythis.find('a'),
			jQueryaFirst = jQuerya.first();
		jQuerya.addClass('regular').clone().removeClass('regular').addClass('hover').appendTo(jQuerythis);
		jQuerythis.hover(function() {
			jQuery(this).find('a.regular').stop(true, true).animate({'top':'-40px'}, 200);
			jQuery(this).find('a.hover').stop(true, true).animate({'top':'0px'}, 200);
		}, function() {
			jQuery(this).find('a.regular').stop(true, true).animate({'top':'0px'}, 200);
			jQuery(this).find('a.hover').stop(true, true).animate({'top':'40px'}, 200);
		});
	});
	/**高分辨率菜单**/
	var megaMenuIndex = 0;
	jQuery('.uazoh7-header-1 .uazoh7-header-bg nav > ul > li, .uazoh7-header-1 .uazoh7-header-bg nav > ul > li ul > li, .uazoh7-header-3 .uazoh7-desktop-menu-bg nav li').filter(':not(.uazoh7-mega li)').each(function() {
		jQuery('<span class="hover"></span>').appendTo(jQuery(this));
	}).hover(function() {
		jQuery(this).find('> .hover').stop(true, true).fadeIn(200);
	}, function() {
		jQuery(this).find('> .hover').stop(true, true).fadeOut(200);
	});
	jQuery('.uazoh7-header-1 .uazoh7-header-bg nav li, .uazoh7-header-3 .uazoh7-desktop-menu-bg nav li').hover(function() {
		var jQueryul = jQuery(this).find('> ul'),
			jQuerymega = jQuery(this).find('.uazoh7-mega');
		if (jQueryul.length > 0) {
			if (enableMenuAnimate) {
				jQueryul.show().addClass('animated flipInY');
			} else {
				jQueryul.stop(true,true).fadeIn();
			}
		}
		if (jQuerymega.length > 0) {
			if (enableMenuAnimate) {
				jQuerymega.show().addClass('animated flipInY');
			} else {
				jQuerymega.fadeIn();
			}
		}
	}, function() {
		var jQueryul = jQuery(this).find('> ul'),
			jQuerymega = jQuery(this).find('.uazoh7-mega');
		if (enableMenuAnimate) {
			jQueryul.removeClass('animated flipInY').fadeOut(200);
			jQuerymega.removeClass('animated flipInY').fadeOut(200);
		} else {
			jQueryul.stop(true,true).fadeOut();
			jQuerymega.stop(true,true).fadeOut();
		}
	});
	jQuery('.uazoh7-header-1 .uazoh7-header-bg nav > ul > li').each(function() {
		var jQuerymega = jQuery(this).find('.uazoh7-mega');
		if (jQuerymega.length != 0) {
			megaMenuIndex = jQuery(this).index();
		}
	}).hover(function() {
		var l = jQuery('.uazoh7-header nav > ul > li').length;
		if (jQuery(this).index() == (l - 1)) {
			jQuery(this).find('> ul').addClass('left');;
		}
	});

	/**手机伸缩菜单**/
	function uazoh7MegaMenu() {
		if (jQuery('.uazoh7-header-1 .uazoh7-mega').length != 0) {
			var jQuerymega = jQuery('.uazoh7-mega'),
				jQueryitems = jQuerymega.find('.uazoh7-mega-section'),
				jQuerymenu = jQuery('.uazoh7-header-1 .uazoh7-header-bg nav > ul > li'),
				rightOffset = 0, h = 0, w = 100 / jQueryitems.length;
			jQuerymenu.slice(megaMenuIndex + 1).each(function() {
				rightOffset = rightOffset
					+ jQuery(this).width()
					+ parseInt(jQuery(this).css('padding-left'))
					+ parseInt(jQuery(this).css('padding-right'))
					+ parseInt(jQuery(this).css('border-left-width'))
					+ parseInt(jQuery(this).css('border-right-width'));
			});
			jQuerymega.width(jQuery('.col-lg-12').width()).css('right', '-' + rightOffset + 'px');
			jQueryitems.each(function() { jQuery(this).width(jQuery('.col-lg-12').width() / jQueryitems.length - 31); }).first().css('border-left-width', '0px');
			jQueryitems.each(function() {
				jQuery(this).find('li').last().css('border-bottom-width', '0px');
				if (jQuery(this).height() > h)
					h = jQuery(this).height();
			}).css('height', h + parseInt(jQueryitems.css('padding-top')) + parseInt(jQueryitems.css('padding-bottom')) + 'px');
			jQuerymega.height(h + parseInt(jQueryitems.css('padding-top')) + parseInt(jQueryitems.css('padding-bottom')) + 'px').hide();
		}
		if (jQuery('.uazoh7-header-3 .uazoh7-mega').length != 0) {
			var jQuerymega = jQuery('.uazoh7-mega'),
				jQueryitems = jQuerymega.find('.uazoh7-mega-section'),
				offset, offsetLeft = 0, h = 0, w = 100 / jQueryitems.length;
			offset = jQuerymega.offset();
			offsetLeft = offset.left - (jQuery(window).width() - jQuery('.col-lg-12').width()) / 2 - parseInt(jQuery('.col-lg-12').css('padding-left'));
			jQuerymega.width(jQuery('.col-lg-12').width()).css('left', '-' + offsetLeft + 'px');
			jQueryitems.each(function() { jQuery(this).width(jQuery('.col-lg-12').width() / jQueryitems.length - 31); }).first().css('border-left-width', '0px');
			jQueryitems.each(function() {
				jQuery(this).find('li').last().css('border-bottom-width', '0px');
				if (jQuery(this).height() > h)
					h = jQuery(this).height();
			}).css('height', h + parseInt(jQueryitems.css('padding-top')) + parseInt(jQueryitems.css('padding-bottom')) + 'px');
			jQuerymega.height(h + parseInt(jQueryitems.css('padding-top')) + parseInt(jQueryitems.css('padding-bottom')) + 'px').hide();
		}
	}
	uazoh7MegaMenu();
	/**链接小工具定义**/
	jQuery('<span class="border"></span>').appendTo(jQuery('.uazoh7-links-widget li'));
	jQuery('.uazoh7-links-widget ul > li').last().find('.border').remove().detach();
	/**分类小工具**/
    jQuery('.uazoh7-category-widget ul li').hover(function() {
    	jQuery(this).find('p span').addClass('hovered');
    }, function() {
    	jQuery(this).find('p span').removeClass('hovered');
    });

	/**低分辨率菜单**/
	var jQuerymobileMenu = jQuery('.uazoh7-mobile-menu nav'), isMobileMenuShown = 1;
	jQuerymobileMenu.css('max-height', jQuery(window).height() - 40);
	jQuerymobileMenu.mCustomScrollbar();
	jQuery('<span class="border"></span>').appendTo(jQuerymobileMenu.find('ul li'));
	jQuery('<span class="border"></span>').appendTo(jQuerymobileMenu);
	jQuerymobileMenu.find('li').each(function() {
		var jQueryul = jQuery(this).find('> ul');
		if (jQueryul.length > 0)
			jQuery('<i class="fa fa-plus-circle"></i>').appendTo(jQuery(this));
		var jQueryi = jQuery(this).find('> i.fa-plus-circle');
		jQueryi.click(function() {
			jQuery(this).toggleClass('fa-minus-circle');
			if (jQuery(this).hasClass('fa-minus-circle')) {
				jQuery(this).parent('li').find('> ul').show();
			} else {
				jQuery(this).parent('li').find('> ul').hide();
			}
			jQuerymobileMenu.mCustomScrollbar('update');
		});
	});
	jQuerymobileMenu.mCustomScrollbar('update');
	jQuery('#uazoh7-mobile-menu-btn').click(function() {
		if (isMobileMenuShown) {
			jQuery('#uazoh7-mobile-menu').animate({
				'right':'0px'
			});
			jQuery(this).animate({'right':'200px'});
			isMobileMenuShown = 0;
		} else {
			jQuery('#uazoh7-mobile-menu').animate({
				'right':'-200px'
			});
			jQuery(this).animate({
				'right':'0px'
			});
			isMobileMenuShown = 1;
		}
		jQuery(this).toggleClass('clicked');
	});
	jQuery('#uazoh7-mobile-cart-btn').click(function() {
		if (isMobileMenuShown) {
			jQuery('#uazoh7-mobile-cart').animate({
				'right':'0px'
			});
			jQuery(this).animate({
				'right':'200px'
			});
			isMobileMenuShown = 0;
		} else {
			jQuery('#uazoh7-mobile-cart').animate({
				'right':'-200px'
			});
			jQuery(this).animate({
				'right':'0px'
			});
			isMobileMenuShown = 1;
		}
		jQuery(this).toggleClass('clicked');
	});
	/**uazoh7Project**/
	function uazoh7Project() {
		var jQueryprojects = jQuery('.uazoh7-project');
		jQueryprojects.each(function() {
		});
	}
	setTimeout(function() {
		uazoh7Project();
	}, 1000);
	jQuery('.uazoh7-project, .uazoh7-property-1, .uazoh7-product-1, .uazoh7-post-preview, .uazoh7-post').hover(function() {
		jQuery(this).find('figure figcaption').stop(true,true).fadeIn(200).find('i').stop(true,true).animate({'top':'50%'}, 200);
	}, function() {
		jQuery(this).find('figure figcaption').find('i').stop(true,true).animate({'top':'0'}, 200).end().stop(true,true).fadeOut(200);
	});
	/**colorbox**/
	jQuery('a.colorbox').colorbox();
	/**LOGO扩展**/
	var uazoh7LogoH = 0;
	jQuery('.uazoh7-partner-logo').each(function() {
		jQuery(this).find('img').fadeTo(0, 0.3);
		if (jQuery(this).find('img').height() > uazoh7LogoH) {
			uazoh7LogoH = jQuery(this).height();
		}
	}).height(uazoh7LogoH - parseInt(jQuery('.uazoh7-partner-logo .inner').css('padding-left')) - parseInt(jQuery('.uazoh7-partner-logo .inner').css('padding-right'))).hover(function() {
		jQuery(this).find('img').stop(true,true).fadeTo(400, 1);
	}, function() {
		jQuery(this).find('img').stop(true,true).fadeTo(400, 0.3);
	});
	/**小组件扩展**/
	jQuery('.uazoh7-career-1').each(function() {
		var jQueryec = jQuery(this);
		jQuery(this).find('a.show-details').click(function(e) {
			e.preventDefault();
			jQuery(this).find('i.fa').toggleClass('fa-minus');
			jQueryec.find('.details').slideToggle();
		});
	}).last().css('border-bottom-width', '1px');

	jQuery('.uazoh7-pricing-1 header .plan-price').each(function() {
		jQuery('<span class="arrow"></span>').prependTo(jQuery(this));
	});
	function uazoh7AnimateSkill() {
		jQuery('.uazoh7-skill-1').each(function() {
			var jQuerythis = jQuery(this),
				w = jQuerythis.width(),
				val = jQuerythis.find('.value').attr('data-value'),
				jQueryc1 = jQuerythis.find('.color-1'),
				jQueryc2 = jQuerythis.find('.color-2'),
				jQuerywrapper = jQuerythis.find('.color-2-wrapper'),
				jQueryinner = jQuerythis.find('.inner'),
				jQueryp = jQuerythis.find('.value p');
			jQueryc1.height(w);
			jQueryc2.height(w);
			jQueryinner.height(w - 20).width(w - 20).css('line-height', (w - 20) + 'px');
			jQuerywrapper.animate({ 'height': (w * val/100) + 'px'}, 400);
		});
	}
	uazoh7AnimateSkill();

	jQuery('.uazoh7-skill-2').each(function() {
		var jQuerythis = jQuery(this),
			jQuerycolor = jQuery('<span class="color"></span>'),
			jQuerybg = jQuery('<span class="bg"></span>'),
			jQueryp = jQuery('<p></p>');
		jQuerycolor.appendTo(jQuerythis).width(jQuerythis.attr('data-value'));
		jQueryp.appendTo(jQuerythis).html(jQuerythis.attr('data-name') + ': <strong>' + jQuerythis.attr('data-value') + '</strong>').width(jQuerythis.attr('data-value'));
		jQuerybg.appendTo(jQuerycolor).fadeTo(0, 0.05);
	}).last().css('margin-bottom', '0px');

	jQuery('.uazoh7-content-404, .uazoh7-content-404-gradient').height(jQuery(window).height() - 40);
	jQuery('.uazoh7-content-404-inner').height(jQuery(window).height() - 40 - jQuery('#socials').height() - parseInt(jQuery('#socials').css('padding-top')) - parseInt(jQuery('#socials').css('padding-bottom')));
	if (jQuery(window).height() < 900)
		jQuery('.uazoh7-content-404 .uazoh7-soc-buttons-list').css('position','relative').css('margin-top','50px');

    jQuery('<span class="line"></span>').appendTo(jQuery('.riva-countdown .riva-countdown-item .value'));

	jQuery('#create-an-account-div').hide();
	jQuery('#create-an-account').change(function() {
		if (jQuery(this).is(':checked')) {
			jQuery('#create-an-account-div').fadeIn();
		} else {
			jQuery('#create-an-account-div').hide();
		}
	});
	jQuery('#ship-to-billing-address-div').hide();
	jQuery('#ship-to-billing-address').change(function() {
		if (jQuery(this).is(':checked')) {
			jQuery('#ship-to-billing-address-div').hide();
		} else {
			jQuery('#ship-to-billing-address-div').fadeIn();
		}
	});
	jQuery('.payment-option span').click(function() {
		jQuery('.payment-option').removeClass('payment-option-active');
		jQuery(this).parents('.payment-option').addClass('payment-option-active');
		jQuery('input[name=payment-option]').val(jQuery(this).parents('.payment-option').attr('data-payment'));
	});

	jQuery( window ).resize(function() {
		uazoh7Project();
		uazoh7MegaMenu();
		bodyW = jQuery('body').width();
		if (bodyW > 768 && bodyW < 992) {
			jQuery('section .col-sm-6').css('margin-top', '60px').eq(0).css('margin-top', '0px').end().eq(1).css('margin-top', '0px');
			//jQuery('.uazoh7-footer .col-sm-6').css('margin-top', '60px').eq(0).css('margin-top', '0px').end().eq(1).css('margin-top', '0px');
		} else {
			jQuery('section .col-sm-6, .uazoh7-footer .col-sm-6').css('margin-top', '0px');
		}
		if (bodyW < 768) {
			jQuery('.uazoh7-feature').last().css('margin-bottom', '0px');
		}
		uazoh7AnimateSkill();
		if (jQuery(window).height() < 900)
			jQuery('.uazoh7-content-404 .uazoh7-soc-buttons-list').css('position','relative');
	    jQuery('.uazoh7-projects-listing').each(function() {
	    	var jQuerythis = jQuery(this),
	    		offset = parseInt(jQuerythis.find('.uazoh7-listing-item').css('padding-left')),
	    		w = parseInt(jQuerythis.parents('[class*="col-"]').width()), h,
    			jQueryelems = jQuerythis.find('.uazoh7-listing-item');
	    	jQuerythis.css({
	    		'margin-left' : -offset,
	    		'width' : w + offset
	    	});
	    	if (jQuerythis.hasClass('uazoh7-projects-listing-3-cols')) {
	    		if (bodyW < 768) {
		    		jQueryelems.width(w);
	    		}
	    		if (bodyW > 768 && bodyW < 992) {
	    			jQueryelems.width((w  + offset)/2 - offset);
	    		}
	    		if (bodyW > 992) {
	    			jQueryelems.width((w  + offset)/3 - offset);
	    		}
	    	}
	    	if (jQuerythis.hasClass('uazoh7-projects-listing-4-cols')) {
	    		if (bodyW < 768) {
		    		jQueryelems.width(w);
	    		}
	    		if (bodyW > 768 && bodyW < 992) {
	    			jQueryelems.width((w  + offset)/2 - offset);
	    		}
	    		if (bodyW > 992) {
	    			jQueryelems.width((w  + offset)/4 - offset);
	    		}
	    	}
	    	if (jQuerythis.hasClass('uazoh7-projects-listing-5-cols')) {
	    		if (bodyW < 768) {
		    		jQueryelems.width(w);
	    		}
	    		if (bodyW > 768 && bodyW < 992) {
	    			jQueryelems.width((w  + offset)/2 - offset);
	    		}
	    		if (bodyW > 992) {
	    			jQueryelems.width((w  + offset)/5 - offset);
	    		}
	    	}
	    });
	});
})(jQuery);