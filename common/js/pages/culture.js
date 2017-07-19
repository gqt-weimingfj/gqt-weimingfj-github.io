$(function(){


	// 未名 Family 员工风采轮播
	var familySwiper;
	// 管理团队弹框 初始化
	var management = initManagement();
	// 员工风采弹框
	var employee = initEmployee();

	// 初始化管理团队
	function initManagement(option){
		// var _layer = {};
		var _dom = {};
		var $body = $('body');
		var _setting = {};
		var _html = '<div class="layer-backdrop">\
	        <div class="layer-box management">\
	            <img src="">\
	            <div class="cont">\
	            <div class="s-name"></div>\
	            <div class="s-title"></div>\
	            <div class="s-describe"></div>\
	            <i class="ii i-x"></i>\
	            </div>\
	        </div>\
	    </div>';

		_dom.container = $(_html);
		_dom.layerBox = _dom.container.find('.layer-box');
		_dom.img = _dom.container.find('img');
		_dom.sName = _dom.container.find('.s-name');
		_dom.sTitle = _dom.container.find('.s-title');
		_dom.sDescribe = _dom.container.find('.s-describe');
		_dom.close = _dom.container.find('.i-x');

		_setting = $.extend(true, {}, option);
		if (_setting.id) {_dom.container.attr('id', _setting.id); }
		if (_setting.className) {_dom.layerBox.addClass(_setting.className); }
		_dom.container.hide();

		$body.append(_dom.container);
		_dom.layerBox.on('click', '.i-x', function(e) {
			_hideLayer();
			e.preventDefault();
		});

		function _showLayer (){
			_dom.container.fadeIn();
		}

		function _hideLayer (){
			_dom.container.fadeOut();
		}

		function open(opt){
			if (opt) {
				_dom.img.attr('src', opt.src);
				_dom.sName.html(opt.sName);
				_dom.sTitle.html(opt.sTitle);
				_dom.sDescribe.html(opt.sDescribe);
			}
			_showLayer();
		}
		function hide(){
			_hideLayer();
		}

		return {
			_container: _dom.container,
			open: open,
			hide: hide,
		};

	};

	// 初始化员工风采
	function initEmployee(option){
		// var _layer = {};
		var _dom = {};
		var $body = $('body');
		var _setting = {};
		var _html = '<div class="layer-backdrop">\
	        <div class="layer-box employee">\
	            <div class="img"></div>\
	            <i class="ii i-x"></i>\
	        </div>\
	    </div>';

		_dom.container = $(_html);
		_dom.layerBox = _dom.container.find('.layer-box');
		_dom.img = _dom.container.find('.img');

		_setting = $.extend(true, {}, option);
		if (_setting.id) {_dom.container.attr('id', _setting.id); }
		if (_setting.className) {_dom.layerBox.addClass(_setting.className); }
		_dom.container.hide();

		$body.append(_dom.container);
		_dom.layerBox.on('click', '.i-x', function(e) {
			_hideLayer();
			e.preventDefault();
		});

		function _showLayer (){
			_dom.container.fadeIn();
		}

		function _hideLayer (){
			_dom.container.fadeOut();
		}

		function open(opt){
			if (opt) {_dom.img.css('background-image', 'url(' + opt.src +')'); }
			_showLayer();
		}
		function hide(){
			_hideLayer();
		}

		return {
			_container: _dom.container,
			open: open,
			hide: hide,
		};

	};

	// tab 切换
	subNav.initNav({
		callBack: function(){
			var $s = $(this);
			var actIdx = familySwiper ? familySwiper.activeIndex : 2;
			// Family 轮播
	    	if($s.hasClass('j-family')){
	    		if (familySwiper) {
	    			familySwiper.destroy();
	    		}
	    	
    			familySwiper = new Swiper('.swiper-container', {
    		        autoplay: 2500,
    		        initialSlide: actIdx,
    		        autoplayDisableOnInteractionL: false,
    		        observer:true,
    		        pagination : '.swiper-pagination',
    			});
	    	}

	    	if(!$s.hasClass('j-management')){
	    		management._container.hide();
	    	}

	    	if(!$s.hasClass('j-family')){
	    		employee._container.hide();
	    	}

		}
	});




	// 管理管理团队 事件
	var managementProxy = {
		init: function () {
			this.events()
		},
		events: function () {
			$('#managementFloor').on('click','.col-inner',managementHandle);

			function managementHandle (e){
				management.open({
					src: '../images/default/culture/management/陈未名.png',
					sName: '陈未名',
					sTitle: '福建未名信息技术股份有限公司CTO',
					sDescribe: '福建未名信息技术股份有限公司CTO (首席技术官) 兼副总经理',
				});
			}
		},
	};
	managementProxy.init();

	// 管理管理团队 事件
	var employeeProxy = {
		init: function () {
			this.events()
		},
		events: function () {
			$('#employeeFloor').on('click','.col-inner',employeeHandle);

			function employeeHandle (e){
				var _src = $(this).find('img').attr('src');
				employee.open({
					src: _src,
				
				});
			}
		},
	};
	employeeProxy.init();

	// management.open();
})