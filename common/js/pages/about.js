$(function(){
	
	// 集团简介 集团荣誉 轮播
	var honourSwiper;
	// tab 切换
	subNav.initNav({
		callBack: function(){
			var $s = $(this);
			var actIdx = honourSwiper ? honourSwiper.activeIndex : 2;
	    	// if($s.hasClass('j-honour')){
	    	// 	if (honourSwiper) {
	    	// 		honourSwiper.destroy();
	    	// 	}
	    	
    		// 	honourSwiper = new Swiper('.swiper-container', {
    		//         autoplay: 1,
    		//         loop: true,
    		//         speed: 2500,
    		//         initialSlide: actIdx,
    		//         autoplayDisableOnInteractionL: false,
    		//         observer:true,
    		// 	});
	    	// }
		}
	});

	var slider = {
		init: function (container) {
			this.slider = $(container);
			this.sliderContain = this.slider.find('ul').eq(0);
			this.sliderItem = this.sliderContain.children('li');
			this.oldHtml = this.sliderContain.html();
			this.oldSize = this.sliderItem.size();

			this.timer = null;
			this.initContainWidth();
			this.events();
			
		},
		initContainWidth: function () {
			var _ul = this.sliderContain;
			var _cw = this.slider.width();
			var _ow = this.oldSize * this.sliderContain.children('li').eq(0).outerWidth();
			var _li;
			var _newHtml = '';
			var l = Math.floor(_cw / _ow) + 2;

			for (var i = 0; i < l; i++) {
				_newHtml += this.oldHtml;
			}

			_ul.html(_newHtml)
			_li = _ul.children('li');
			_ul.width(_li.eq(0).outerWidth() * _li.size());

			this.doSlider();
		},
		doSlider: function () {
			var _s = this;
			var _l = 0;
			var _ow = this.oldSize * this.sliderContain.children('li').eq(0).outerWidth();;
			var _w = this.sliderContain.width();
			var _cw = this.slider.width();
			clearTimeout(_s.timer);
			doAnimate()
			function doAnimate (){
				if (_l == _l) {
					_s.timer = setTimeout(function(){
						if ((_w - _cw + _l) < 10) {
							_l += _ow; 
						}
						_s.sliderContain.css('transform','translateX('+ (_l -= 5) +'px)');
						doAnimate();
					},40); 
				}
			}
		},
		events: function (){
			var _s = this;
			var $win = $(window);
			var _ow = $(window).width();
			var _smScreen = 768;
			var _t = null
			$win.on('resize',function(e){
				clearTimeout(_t);
				_t = setTimeout(function() {
					var _nw = $(window).width();
					if ((_ow > _smScreen && _nw < _smScreen) || (_ow < _smScreen && _nw > _smScreen)) {
						_s.initContainWidth()
					}
					_ow = _nw;
				},30)
				
			});
		}
	};

	slider.init('.slider-container');

})