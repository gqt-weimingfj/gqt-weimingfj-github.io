$(function(){
	
	// tab
	$('body').find('.floor-1').addClass('act');
	subNav.initNav();
    
	

	// 岗位手风琴
	;+function(){
		$('body').on('click', '.job-list dt',handle);

		function handle (e){
			var $title = $(this),
				$cont = $title.siblings('dd'),
				$wrap = $title.parent(),
				$wrapSiblings = $wrap.siblings(),
				$contSiblings = $wrap.find('dd');

			$wrap.toggleClass('act');
			$wrapSiblings.removeClass('act');
		}

	}()

	// 地址手风琴
	;+function(){
		$('body').on('click', '.address-list dt',handle);

		function handle (e){
			var $title = $(this),
				$cont = $title.siblings('dd'),
				$wrap = $title.parent(),
				$wrapSiblings = $wrap.siblings(),
				$contSiblings = $wrap.find('dd');
				
			$wrap.toggleClass('act');
			$wrapSiblings.removeClass('act');
		}
	}()
})