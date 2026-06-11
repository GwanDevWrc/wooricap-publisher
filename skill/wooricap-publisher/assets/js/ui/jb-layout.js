$.fn.gnb = function(options){
	var settings = $.extend({
		'actionType': 'mouseenter focusin', // 硫붾돱媛� �숈옉�섎뒗 �≪뀡 (mouseenter focusin, click)
		'target': '', // �쒖꽦�� �� �대옒�ㅺ� 異붽��섎뒗 �붿냼 (怨듬��� 寃쎌슦 �ㅻ쾭�섎뒗 a 留곹겕 遺�紐� li�먮쭔 �대옒�� 異붽���)		
		'class': 'on', // 異붽��� �대옒�ㅻ챸 (target�� 異붽���)
		'depth1': '.depth1', // depth1
		'depth2': '.depth2-wrap', // �쒕툕硫붾돱
		'closeBtn': '.close-btn' // �リ린 踰꾪듉�� 蹂꾨룄濡� 議댁옱�섎뒗 寃쎌슦 (�リ린 踰꾪듉�� �대┃�쒖뿉留�)
	}, options);

	return this.each(function(){
		var $selector = $(this);
		var hasDepth2 = $selector.find(settings.depth2).length > 0;

		$selector.find('a').on(settings.actionType, function(){
			var $selectorLi = $(this).closest('li');

			if(!$selectorLi.hasClass('on')) {
				$selectorLi.addClass('on').siblings('li').removeClass('on');
				$selectorLi.parents('li').addClass('on').siblings('li').removeClass('on');

				if (settings.target != ''){
					$(settings.target).addClass(settings.class);
				}
			}
			if (settings.actionType == 'click' && $(this).next('*').length > 0){
				return false;
			}
		});

		// 留덉슦�� �꾩썐
		$(document).on('mousemove', function(e){
			var selectOffset = $selector.offset();
			var gnbWidth = $selector.outerWidth();
			var gnbHeight = $selector.outerHeight();
			var mouseX = e.pageX;
			var mouseY = e.pageY;

			var inX = mouseX >= selectOffset.left && mouseX <= selectOffset.left + gnbWidth;
			var inY = mouseY >= selectOffset.top && mouseY <= selectOffset.top + gnbHeight;

			// if(!hasDepth2) { }
			if(!inX && inY) {
				$selector.find('li').removeClass(settings.class);
				setTimeout(function(){
					$(settings.target).removeClass(settings.class);
				}, 150);
			}
			

			if ($selector.find('li.on').length){
				var boundaryBottom;

				if(hasDepth2) {
					var $activeDepth2 = $selector.find('.on').find(settings.depth2);
					if($activeDepth2.length > 0) {
						boundaryBottom = $activeDepth2.offset().top + $activeDepth2.outerHeight();
					}
				} else {
					boundaryBottom = $selector.find(settings.depth1).offset().top + $selector.find(settings.depth1).outerHeight();
				}

				if(mouseY > boundaryBottom) {
					setTimeout(function(){
						$selector.find('li').removeClass(settings.class);
						$(settings.target).removeClass(settings.class);
					}, 150);
				}
			}
		});

		// �� �꾩썐
		$selector.find('a:last').keydown(function(e){
			if (e.keyCode === 9){
				$selector.find('li').removeClass(settings.class);
				$(settings.target).removeClass(settings.class);
			}
		});

		// ��꺆 �꾩썐
		$selector.find('a:first').keydown(function(e){
			if (e.keyCode === 9 && e.shiftKey){
				$selector.find('li').removeClass(settings.class);
				$selector.removeClass(settings.classname);
			}
		});
	});
};

//硫붾돱 寃���
function search_recent(){
	var $searchWrap = $('#allmenu .search-wrap');
	var $inputItem = $('#allmenu .search-wrap .input-con input[type="text"]');
	var $recent = $('#allmenu .search-wrap .recent');

	$recent.hide();
	$inputItem.on('click focusin', function(){
		$recent.show();
	});
	$inputItem.keydown(function(e){
		if(e.keyCode === 9 && e.shiftKey){
			$recent.hide();
		}
	});
	$recent.find('button:last').keydown(function(e){
		if (e.keyCode === 9){
			$recent.hide();
		}
	});
	$(document).mouseup(function(e){
		if(($recent).has(e.target).length === 0){
			$recent.hide();
		}
	});
}

//layout�� �좉�+�꾩퐫�붿뼵
function layout_toggle(){
	//*怨좉컼�뺣낫
	var $user_info = $('#header .user-info'),
	$bookmark = $('#allmenu .bookmark');

	$user_info.find('.btn-user').click(function(){
		$(this).parent().toggleClass('on')
	});
	$user_info.find('a:last').keydown(function(e){
		if (e.keyCode === 9){
			$user_info.removeClass('on');
		}
	});
	$user_info.find('button:first').keydown(function(e){
		if (e.keyCode === 9 && e.shiftKey){
			$user_info.removeClass('on');
		}
	});
	$(document).mouseup(function(e){
		if(($user_info).has(e.target).length === 0){
			$user_info.removeClass('on');
		}
	});


	//*�꾩껜硫붾돱 利먭꺼李얘린 紐⑸줉
	$bookmark.find('.btn').click(function(){
		$(this).parent().toggleClass('on');

		$bookmark.find('button:last').keydown(function(e){
			if (e.keyCode === 9){
				$bookmark.removeClass('on');
			}
		});
		$bookmark.find('button:first').keydown(function(e){
			if (e.keyCode === 9 && e.shiftKey){
				$bookmark.removeClass('on');
			}
		});
	});
	
	$(document).mouseup(function(e){
		if(($bookmark).has(e.target).length === 0){
			$bookmark.removeClass('on');
		}
	});
}

// snb js common.js�� _tabContents蹂�寃�
function snb_list() {
	var snbWrap = $('.snb-wrap');

	snbWrap.each(function(){
		var depth1_lst = $(this).find('.snb').find('> li'),
			depth1 = depth1_lst.find('> a'),
			depth2_lst = $(this).find('.depth2 > li');

		depth1.on('click', function(){
			var $this = $(this);
			$this.parent('li').toggleClass('on').siblings().removeClass('on');

			$this.parent('li').attr({
				'aria-selected': true,
				'tabindex': 0
			}).siblings().attr({
				'aria-selected': false,
				'tabindex': -1
			});
		})

		.on('keyup', function(e){
			var $this = $(this),
			keycode = e.keycode || e.which; // keycode 紐낅졊�댁뿉 諛섏쓳�섏� �딅뒗 釉뚮씪�곗��� �덉뼱��, �ㅼ뼇�� 釉뚮씪�곗��� ���묓븯湲� �꾪빐�� keycode�� which瑜� 媛숈씠 �ъ슜

			if (keycode == 39 || keycode == 40){
				var nextTab = $this.next(),
				nextsnbWrapiblings = nextTab.siblings(),
				thisPanel = $('#' + nextTab.attr('aria-controls'));

				nextTab.addClass('on').attr({
					'aria-selected': true,
					'tabindex': 0
				}).focus();

				nextsnbWrapiblings.removeClass('on').attr({
					'aria-selected': false,
					'tabindex': -1
				});

				thisPanel.addClass('on').siblings().removeClass('on');
				// tab list 留덉�留� �붿냼�먯꽌
				var lastTab = $this.last().attr('aria-controls')

				if (lastTab == lastPanel){
					var fisrtTab = depth1_lst.first()

					fisrtTab.addClass('on').attr({
						'aria-selected': true,
						'tabindex': 0
					}).focus();

					fisrtTab.siblings().removeClass('on').attr({
						'aria-selected': false,
						'tabindex': -1
					});
				}
			} else if (keycode == 37 || keycode == 38){ // �쇱そ 諛⑺뼢�� �닿굅�� �꾩そ 諛⑺뼢��
				var prevTab = $this.prev(),
				prevsnbWrapiblings = prevTab.siblings();

				prevTab.addClass('on').attr({ 
					'aria-selected': true,
					'tabindex': 0
				}).focus();

				prevsnbWrapiblings.removeClass('on').attr({
					'aria-selected': false,
					'tabindex': -1
				});
			}
		});

		if(depth2_lst.length) {
			depth2_lst.parents('li').addClass('has-depth2');
		}
	});
}

// �쒕툕硫붿씤 �섎떒諛� animation
function btnavi_ani() {
	var lastScrollTop = 0;
	var delta = 10;
	var scrollTimer_navi;
	$(window).on('scroll', function(){
		var currentScroll = $(this).scrollTop();
		var docHeight = $(document).height();
		var winHeight = $(window).height();
		
		// 留� �� �꾨떖 
		if(currentScroll <= 0) {
			$('.submain-navi').removeClass('down');
			lastScrollTop = currentScroll;
			return;
		}
		// 留� �꾨옒 �꾨떖
		if(currentScroll + winHeight > docHeight - 50) {
			$('.submain-navi').removeClass('down');
			lastScrollTop = currentScroll;
			return;
		}
		
		clearTimeout(scrollTimer_navi);
		scrollTimer_navi = setTimeout(() => {
			$('.submain-navi').removeClass('down');
		}, 500);

		if(Math.abs(lastScrollTop - currentScroll) <= delta) return;
		if(currentScroll > lastScrollTop) {
			$('.submain-navi').addClass('down')
		} else {
			$('.submain-navi').removeClass('down')
		}

		lastScrollTop = currentScroll;
	});
}

//�몄텧
$(function(){
	$('#header .gnb').gnb();
	layout_toggle();
	search_recent();
	snb_list();
	btnavi_ani();

	$('body').append('<div class="landscape-warning"><p>JB�곕━罹먰뵾�덉� 紐⑤컮�� �� 媛�濡쒕え�쒕� 吏��먰븯吏� �딆뒿�덈떎.</p></div>');
	if(!$('.wrapper').find('.bravo').length) {
		$('body').append('<button type="button" class="btn-top"><p class="blind">留� �꾨줈 �대룞</p></button>');
	}

	$('#allmenu .mark').click(function(){
		$(this).toggleClass('on');
	});
	//�꾩껜硫붾돱 �닿린
	$('.btn.menu-open').click(function(){
		$('.gnb > ul > li, .user-info').removeClass('on');
		$('#allmenu').addClass('on');
		$('body').addClass('overflow')
	});
	//�꾩껜硫붾돱 �リ린
	$('#allmenu .btn.menu-close').click(function(){
		$('.gnb > ul > li, .bookmark,.menu-tab a').removeClass('on');
		$('.search-wrap .recent').hide();
		$('#allmenu').removeClass('on');
		$('body').removeClass('overflow')
	});
	//�꾩껜硫붾돱 �� depth
	$('.menu-tab a').click(function(){
		var $menu = $(this.hash);
		var $allmenu = $('#allmenu')
		$(this).addClass('on').siblings().removeClass('on');
		$allmenu.animate({scrollTop : $menu.position().top + $allmenu.scrollTop() - 90}, 300);
		
		$menu.find('button:last').keydown(function(e){
			if (e.keyCode === 9){
				$('.menu-tab a.on').focus();
			}
		});
	});
	//�꾩껜硫붾돱 .mark 珥덉젏
	$('.depth2-lst > li > a').on('focus', function() {
		$('.depth2-lst > li').removeClass('on')
		$(this).closest('li').addClass('on')
	})

	//header, snb fixed
	$(window).on('scroll', function(){
		var st = $(this).scrollTop();
		if(st > 0) {
			$('header').addClass('fixed');
		} else {
			$('header').removeClass('fixed');
		}
	});

	if(window.visualViewport) {
		const $fixedBtn = $('.section-bottom-fixed');
		window.visualViewport.addEventListener('resize', function() {
			const vpHeight = window.visualViewport.height;
			const winHeight = window.innerHeight;
			const diff = winHeight - vpHeight;
			if(diff > 150) { // �ㅽ뙣�� �щ씪��
				$fixedBtn.css('transform', 'translateY(0)');
			} else { // �ㅽ뙣�� �대젮��
				$fixedBtn.css('transform', 'translateZ(0)');
			}
		})
	}
	
	// �ㅽ겕濡� 吏��먮룄援�
	var scrollTimer;
	$(window).on('scroll', function(){
		var st = $(this).scrollTop();
		
		if($('.section-bottom-fixed').length) {
            $('.btn-top').addClass('has-bottom');
            $('.chat-btn-area').addClass('has-bottom');
        }
        if($('.submain-navi').length) {
            $('.btn-top').addClass('has-navi');
            $('.chat-btn-area').addClass('has-navi');
        }
		
		if(st > 200) {
			$('.btn-top').addClass('active');
			clearTimeout(scrollTimer);

			scrollTimer = setTimeout(() => {
				$('.btn-top').removeClass('active');
				$('.chat-btn-area').removeClass('has-bottom');
                $('.chat-btn-area').removeClass('has-navi');
			}, 3000);
		} else {
			$('.btn-top').removeClass('active');
			$('.chat-btn-area').removeClass('has-bottom');
            $('.chat-btn-area').removeClass('has-navi');
		}
		/*
		if($('.section-bottom-fixed').length) {
			$('.btn-top').addClass('has-bottom');
		}
		if($('.submain-navi').length) {
			$('.btn-top').addClass('has-navi');
		}
		*/
	});
	$('.btn-top').click(function(){
		$('html, body').animate({scrollTop : 0 }, 500);
	})
	
	setTimeout(() => {
		//媛� ui 遺�遺�
		$('.finish-txt-wrap').parents('.wrapper').addClass('finish-ui');
		$('.submain-wrap').parents('.wrapper').addClass('submain-ui');
		$('.financial-product-wrap').parents('.wrapper').addClass('financial-ui');
		$('.product-summary.type-bridge').parents('.wrapper').addClass('bridge-ui');
		$('.ceo-wrap').parents('.wrapper').addClass('ceo-ui');
		$('.blog-wrap').parents('.wrapper').addClass('blog-ui');
		$('.blog-main').parents('.wrapper').addClass('blog-main-ui');
		// �곸뾽吏��� ui 遺�遺�
		$('.list-wrap .btn-write').parents('li').addClass('has-btn');
		$('.car-option-wrap').parents('.wrapper').addClass('car-option-ui');
		$('.staff-main').parents('.wrapper').addClass('staff-ui');
		$('.pop-search-wrap').parents('.wrapper').addClass('pop-search-ui');
		// �좊텇利� 珥ъ쁺
		$('#id-card-wrap').parents('.layerpop-wrap').addClass('type-idcard');
		// �ㅽ뀦 ui
		$('.contents-wrap').each(function(){
			$(this).find($('.step-wrap .tit-wrap')).parents('.step-wrap').addClass('has-tit');
		})
	}, 300);

	//mobile snb left
	$('.snb-wrap').each(function(){
		if(!$(this).is(':hidden')) {
			$(this).find('.snb > li').on('click', function(){
				const snbleft = $(this).offset().left - 20;
				const snbcurLeft = $(this).closest('.snb').scrollLeft();
				$(this).closest('.snb').animate({scrollLeft : snbcurLeft+snbleft}, 400);
			});
			$(this).find('.snb .depth2 > li').on('click', function(){
				const snbleft = $(this).offset().left - 20;
				const snbcurLeft = $(this).closest('.snb .depth2').scrollLeft();
				$(this).closest('.snb .depth2').animate({scrollLeft : snbcurLeft+snbleft}, 400);
			});

			if($(this).find('.snb > li.on').length) {
				const snbleft = $(this).find('.snb > li.on').offset().left - 20;
				const snbcurLeft = $(this).find('.snb').scrollLeft();
				$(this).find('.snb').animate({scrollLeft : snbcurLeft+snbleft}, 400);

				
				$(this).find('.snb > li.on > a').attr('title', '�좏깮��');
			}
			if($(this).find('.snb .depth2 > li.on').length) {
				const snbleft = $(this).find('.snb .depth2 > li.on').offset().left - 20;
				const snbcurLeft = $(this).find('.snb .depth2').scrollLeft();
				$(this).find('.snb .depth2').animate({scrollLeft : snbcurLeft+snbleft}, 400);

				
				$(this).find('.snb .depth2 > li.on > a').attr('title', '�좏깮��');
			}
		}
	})
	
});