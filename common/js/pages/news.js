$(function(){
	
	// tab
	subNav.initNav();
    
	// 时间选择
	var sideMenu = {
		init: function (){
			var _s = this;
			_s.menu = $('.date-nav');
			this.events();
		},
		events: function (){
			var _s = this;
			_s.menu.on('click', '.sup-item .tt',supHandle);

			function supHandle (e){
				var $sub = $(this).siblings('.sub-list');

				var $siblingsSub = $(this).parent().siblings().find('.sub-list');


				if ($sub.is(':hidden')) {
					$sub.show();
				}else{
					$sub.hide();
				}
				$siblingsSub.hide();
			}
			function subHandle (){}

		},
	};

	// sideMenu.init();


	function DateSelect (dateMenu,opt){
		this.$menu = $(dateMenu).eq(0);
		this.setting = $.extend(true, {}, opt);
		this.$wrapper = this.$menu.parents(this.setting.wrapper).eq(0);
		this.$year = this.$wrapper.find(this.setting.year).eq(0);
		this.$month = this.$wrapper.find(this.setting.month).eq(0);
		this.$yearSelect = this.$year.find('select');
		this.$monthSelect = this.$month.find('select');
		this.$yearSpan = this.$year.find('span');
		this.$monthSpan = this.$month.find('span');

		this.date = {
			yyyy: opt.yyyy,
			mm: opt.mm
		}

		this.init();
		return this;
	}
	DateSelect.prototype.init = function (){
		this.initDate()
		this.initEvents()
	};
	DateSelect.prototype.initDate = function (){
		this.setDate();
	};
	DateSelect.prototype.setDate = function (){
		var _d = this.date;
		this.$yearSelect.val(_d.yyyy);
		this.$monthSelect.val(_d.mm);
		this.$yearSpan.html(_d.yyyy);
		this.$monthSpan.html(_d.mm + '月');
	};
	DateSelect.prototype.initEvents = function (){
		var _s = this;
		// pc端年事件
		this.$menu.on('click', '.sup-item .tt', menuTitleHandle);
		// pc端月事件
		this.$menu.on('click', '.sub-list .sub-item', menuItemHandle);

		
		// pc端年事件
		function menuTitleHandle (e){
			var $sub = $(this).siblings('.sub-list');
			var $siblingsSub = $(this).parent().siblings().find('.sub-list');
			if ($sub.is(':hidden')) {$sub.show(); }
			else{$sub.hide(); }
			$siblingsSub.hide();

			e.preventDefault();
		}

		// pc端月事件
		function menuItemHandle (e){
			var _$s = $(this);
			var _$list = _$s.parent();

			_s.date.yyyy = _$list.siblings('.tt').html();
			_s.date.mm = _$s.index() + 1;
			
			_$s.addClass('activated act');
			setTimeout(function () {
				_$s.removeClass('activated');
				_$list.hide()
			},100)

			// 改变移动端选中效果
			_s.setDate()

			_s.$monthSelect.change();
			e.preventDefault();
		}


		// 移动端事件
		this.$yearSelect.on('change', yearSelectHandle);
		this.$monthSelect.on('change', monthSelectHandle);

		function yearSelectHandle (e){
			_s.date.yyyy = $(this).val();
			_s.$yearSpan.html(_s.date.yyyy);

			e.preventDefault();
		}

		function monthSelectHandle (e){
			_s.date.mm = $(this).val();
			_s.$monthSpan.html(_s.date.mm + '月');

			// todo  ajax
			if ( _s.setting.callback && typeof _s.setting.callback == 'function') {
				_s.setting.callback.call(_s,_s.date.yyyy,_s.date.mm)
			}
			e.preventDefault();
		}

	};

	// 集团新闻 初始化
	var groupNews = new DateSelect('#groupDate',{
		wrapper: '.floor-cont', 
		year: '.j-year',
		month: '.j-month',
		yyyy: '2016', //初始年
		mm: '1', // 初始月
		// todo  ajax
		callback: function (y,m){
			console.log(this)
			console.log(y)
			console.log(m)
		}
	});

	// 行业动态 初始化
	var dynamicNews = new DateSelect('#dynamicDate',{
		wrapper: '.floor-cont',
		year: '.j-year',
		month: '.j-month',
		yyyy: '2016', //初始年
		mm: '2', //初始月
		// todo  ajax
		callback: function (y,m){
			console.log(this)
			console.log(y)
			console.log(m)
		}

	});

	console.log(dynamicNews)

})