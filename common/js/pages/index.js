$(function(){


	// 视频
	var indexVideo = {
		init: function () {
			this.embed = $('#indexEmbed');
			this.fullEmbed = $('#fullEmbedBox');
			this.fullEmbedVideo = $('#fullEmbedBox video');
			this.events()
		},
		events: function() {
			var $btn = $('#indexEmbed .play-btn');
			var $body = $('body');
			var _s = this;
			
			// 打开全屏视频
			$btn.on('click',btnClickHandle);
			function btnClickHandle (e){
				initFullVideo()
				function initFullVideo (){
					var _src = _s.embed.find('video source').attr('src');
					console.log(_s.fullEmbed.size())
					if (!$('#fullEmbedBox').size()) {
						var  _fullVideoHtml =  '<div class="full-embed-box" id="fullEmbedBox"><video class="embed-item fit-width" autoplay><source src="'+ _src +'" type="video/mp4"></video><i class="close"></i></div>'
						_s.fullEmbed = $(_fullVideoHtml);
						_s.fullEmbedVideo = _s.fullEmbed.find('video');
						$body.append(_s.fullEmbed)
					}
				}
				_s.fullEmbed.fadeIn();
				resizeHandle()
			}

			// 关闭全屏
			$('body').on('click','#fullEmbedBox .close', function (e){
				_s.fullEmbed.fadeOut(function() {
					_s.fullEmbed.remove()
				});
			})

			// resize 适配 全屏视频大小
			$(window).on('resize', resizeHandle);
			resizeHandle();

			function resizeHandle (e){
				var percent = 0.5625;
				var _isTrue = $(window).height()/$(window).width() < percent;

				if (_isTrue) {
					_s.fullEmbed.find('.embed-item').addClass('fit-height').removeClass('fit-width');
				}else{
					_s.fullEmbed.find('.embed-item').addClass('fit-width').removeClass('fit-height');
				}
			}
		},
	};

	indexVideo.init();


	// 轮播
	var indexSwiper = {
		init: function (){
			this.events();
		},
		events: function (){
			var _s = this;
			var _oldParam = 0;
			// 适配
			$(window).on('resize',resizeHandle)
			
			resizeHandle();

			function resizeHandle (e){
				var _w = $(window).width();
				var _screen = 768;
				
				var _rst;
				var _option = {
			        // autoplay: 3000,
			        slidesPerView : 1,
			        spaceBetween : 0,
			        observer:true,
			    }

			    if (_w > _screen) {
		    		_rst = 3;
			    }else{
		    		_rst = 1;
			    }
			
				if (_oldParam != _rst) {
					_option.slidesPerView = _oldParam = _rst
					if (_rst > 1) {
						_option.spaceBetween = 40 
					}else{
						_option.spaceBetween = 0 
					}
					_s.initSwiper(_option);
				}
				_s.mySwiper.update()
			}
		},
		initSwiper: function (option){
			this.mySwiper = new Swiper('.swiper-container', option);
		    this.mySwiper.onResize();
		},
	};

	indexSwiper.init();



    
})