$('.alphabet > span').each(function() {
	$(this).data('left', $(this).position().left);
	$(this).data('top', $(this).position().top);
});
let letterIndex;
let selectedTop = 0;
if($(window).width() > 1280)
	selectedTop = 100;
$(window).on('resize',function(){
		$('.alphabet > span').hide().each(function() {
			$(this).css({
				"top": "auto",
				"left": "auto",
				"position": "static"
			}).show();
		});
		$('.alphabet > span').each(function() {
			$(this).data('left', $(this).position().left);
			$(this).data('top', $(this).position().top);
		});
		$('.alphabet > span').each(function() {
			$(this).css({
				'top': $(this).data('top'),
				'left': $(this).data('left'),
				'position': 'absolute'
			});
			if($('.alphabet > span.selected').length) {
				$(this).hide();
			}
			if($(window).width() > 1280)
				selectedTop = 100;
			if($(this).hasClass('selected')) {
				$(this).css({
					"top": selectedTop,
					"left": 0,
					"position": "absolute"
				}).show();
			}
		})
});
$('.alphabet > span').click(function() {
	letterIndex = $(this).index('span');
	if(!$(this).hasClass('selected')) {
		let letterTop = $(this).data('top');
		let letterLeft = $(this).data('left');
		$(this).siblings('span').each(function() {
			$(this).css({
				"top": $(this).data('top'),
				"left": $(this).data('left')
			});
		});
		$(this).addClass('selected').css({
			"top": letterTop,
			"left": letterLeft
		});
		$('.alphabet > span').css('position', 'absolute');
		let innerSym = $(this).children('i');
		innerSym.css("animation", "delayAnimate"+(Math.floor($(this).index('span')/9)+1)+" 1.2s ease-in-out");
		setTimeout(function() {
			innerSym.css("animation", "none");
		}, 1200);
		$(this).siblings('span').addClass('hide').each(function(i) {
			$(this).css({
				"transition-property": "left",
				"transition-duration": Math.random() * (2 - 1) + 1+"s",
				"left": Math.round(20 + Math.random() * (50 - 20))+"%",
			});
			$(this).fadeOut(800);
		});
		$(this).css({
			"transition-property": "top, left",
			"transition-duration": "1s",
			"top": selectedTop,
			"left": 0
		});
		if($(this).hasClass('info')) {
			$('.info-heading').css({
				'top': $('.alphabet > span.selected').height()+20+selectedTop,
				'left': 0
			}).fadeIn(2000);
			$('.information').fadeIn(1000);
		} else {
			$('ul.items').eq(letterIndex).css("display", "flex").hide().fadeIn(2000).css('position', 'absolute').children('li').removeClass('selected').fadeIn().each(function() {
				$(this).css({
					"position": "static",
					"top": 0,
					"left": 0
				})
			});		
		}
	} else {
		$('ul.items').eq(letterIndex).hide();
		$('.information, .info-heading').hide();
		$('.iteminner').html('').hide();
		$(this).removeClass('selected hide').css({
				'transition-property': 'top, left',
				'transition-duration': '1s',
				'left': $(this).data('left'),
				'top': $(this).data('top')
		}).siblings('span').removeClass('selected hide').each(function() {
			let letterOrder = $(this).index('span') % 9;
			let letterDelay = 100;
			let letterFade = 600;
			let letterThis = $(this);
			if((letterOrder >= 2 && letterOrder <= 4) || (letterOrder == 7 || letterOrder == 8)) {
				letterFade = 800;
				letterDelay = 200;
			}
			letterThis.css({
				'transition-property': 'top, left',
				'transition-duration': '1s',
				'left': $(this).data('left'),
				'top': $(this).data('top')
			}).hide();
			setTimeout(function() {
				letterThis.fadeIn(letterFade);
			}, letterDelay);
		});
	}
});
$('.items > li').click(function() {
	if($(this).hasClass('disabled')) {
		$('.subscription').css("display", "flex").hide().fadeIn();
	} else {
		let selectedLetter = $('.alphabet > span.selected');
		$(this).parent().css('position', 'static');
		$(this).addClass('selected').css({
			"position": "absolute",
			"top": selectedLetter.position().top+selectedLetter.height()+20,
			"left": selectedLetter.position().left,
		}).siblings().fadeOut(500);
		let iframeWidth = 510;
		if($(window).height() < 640)
			iframeWidth = 400;
		$('.iteminner').html('<iframe width="100%" height="'+iframeWidth+'" src="https://www.youtube.com/embed/DF6W1XD25Dc?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>').show();
	}
});
$('.plans > div').click(function() {
	$(this).addClass('selected').siblings().removeClass('selected');
});
$('.close-popup').click(function(e) {
	e.preventDefault();
	$(this).closest('.popup').fadeOut();
});