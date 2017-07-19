$(function () {
	
	// header
	var header = {
		init: function (){
			this.events();
		},
		events: function (){
			var $doc = $(document);
			var $win = $(window);
			var $body = $('body');
			var $header = $('.header');


			// 打开菜单
			$header.on('click','.menu-open',openMenuHandle)
			$header.on('click','.menu-close',closeMenuHandle)
		

			$doc.on('scroll',function(){
				if ($(this).scrollTop() > 60) {
					$header.addClass('bg');
					
				}else{
					$header.removeClass('bg');
				}
			});

			// $(window).on('resize',resizeHandle);

			function openMenuHandle (e){
				var _$s = $(this);
				var _$nav = $header.find('.nav');
				_$s.toggleClass('act');
				if (_$s.hasClass('act')) {
					_$nav.slideDown();
				}else{
					_$nav.slideUp();
				}
				// e.stopPropagation();
			}

			function closeMenuHandle (e){
				var _$openIcon = $header.find('.menu-open');
				var _$nav = $header.find('.nav');
				_$openIcon.removeClass('act');
				_$nav.slideUp();
				// e.stopPropagation();
			}
			
		},
		
	};
	header.init();


	// footer
	/*
		暂不考虑动画效果
	*/
	var footer = {
		init: function (){
			this.events();
		},
		events: function (){
			var $body = $('body');

			// footer菜单开关
			$('.footer').on('click','.links-block dt',footerLinkHandle)
		

			function footerLinkHandle (e){
				var $s = $(this);
				var $dl = $s.parent();
				var $dlSiblings = $dl.siblings('dl');
				$dl.toggleClass('act');
				$dlSiblings.removeClass('act');
				e.stopPropagation();
			}

		},
		
	};
	footer.init();



});

// sub nav 
var subNav = {
	initNav: function (option){
		var setting = {
			navItemSelector: '.sub-nav li',
			tabWrapper: '.tab-floor',
			tabCont: '.floor-cont',
			className: 'act'
		};

		if (option) {
			$.extend(true, setting, option);
		}

		var $body = $('body'),
			$tabWrapper = $(setting.tabWrapper),
			$tabCont = $(setting.tabCont),
			$navItems = $(setting.navItemSelector);

		$body.on('click', setting.navItemSelector, function(e) {
			var actItemSelector = $(this).attr('data-active');

			$navItems.removeClass(setting.className);
			$(this).addClass(setting.className);

			$tabCont.removeClass(setting.className);
			$tabWrapper.find('.' + actItemSelector).addClass(setting.className);

			if (setting.callBack && typeof setting.callBack == 'function') {
				setting.callBack.call(this);
			}
			event.preventDefault();
		});

	}
};



var screenSize = {
	xs: 480,
	sm: 768,
	sm: 992,
	sm: 1200,
}
function getWindowWidth (){
	return $(window).width();
}

function isWindowSmallThen (size){
	var _w = getWindowWidth();
	return _w < size;
}