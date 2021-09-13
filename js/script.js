if(screen.availHeight > screen.availWidth) {
	let leftOffsets = [];
	$('.alphabet > span').each(function() {
		if(leftOffsets.length < 9 && leftOffsets[leftOffsets.length-1] != $(this).position().left)
			leftOffsets.push($(this).position().left);
		$(this).data('left', $(this).position().top);
	});
	$('.alphabet > span').each(function() {
		let letterLeftOffset = 0;
		if($(this).index() <= 8)
			letterLeftOffset = 2;
		else if($(this).index() <= 17)
			letterLeftOffset = 1;
		$(this).data('top', leftOffsets[letterLeftOffset]);
	});
} else {
	$('.alphabet > span').each(function() {
		$(this).data('left', $(this).position().left);
		$(this).data('top', $(this).position().top);
	});	
}
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
		if(screen.availHeight > screen.availWidth) {
			let leftOffsets = [];
			$('.alphabet > span').each(function() {
				if(leftOffsets.length < 9 && leftOffsets[leftOffsets.length-1] != $(this).position().left)
					leftOffsets.push($(this).position().left);
				$(this).data('left', $(this).position().top);
			});
			$('.alphabet > span').each(function() {
				let letterLeftOffset = 0;
				if($(this).index() <= 8)
					letterLeftOffset = 2;
				else if($(this).index() <= 17)
					letterLeftOffset = 1;
				$(this).data('top', leftOffsets[letterLeftOffset]);
			});
		} else {
			$('.alphabet > span').each(function() {
				$(this).data('left', $(this).position().left);
				$(this).data('top', $(this).position().top);
			});	
		}
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
$('.alphabet > span').mouseenter(function() {
	if(!$(this).hasClass('selected') && !$(this).hasClass('hide') && !$(this).hasClass('hover')) {
		$(this).addClass('hover').siblings('span.hover').removeClass('hover');
	}
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
		if(letterIndex === 0)
			delayType = 1;
		else if(letterIndex === 1)
			delayType = 0;
		else if(letterIndex > 1 && letterIndex <= 8)
			delayType = 2;
		else if(letterIndex === 9 || letterIndex === 18)
			delayType = 3;
		else if(letterIndex === 10 || letterIndex === 11)
			delayType = 4;
		else if(letterIndex === 19 || letterIndex === 20)
			delayType = 5;
		else if(letterIndex >= 12 && letterIndex <= 17)
			delayType = 6;
		else if(letterIndex >= 21 && letterIndex <= 26)
			delayType = 7;
		innerSym.css("animation", "delayAnimate"+delayType+" 1.2s ease-in-out");
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
		const currentLetter = $(this);
		currentLetter.css({
				'transition-property': 'top, left',
				'transition-duration': '1s',
				'left': $(this).data('left'),
				'top': $(this).data('top')
		});
		setTimeout(function() {
			currentLetter.removeClass('selected').siblings('span').removeClass('hide');
		}, 1000);
		currentLetter.siblings('span').each(function() {
			let letterOrder = $(this).index('span');
			let letterDelay = 100;
			let letterFade = 600;
			let letterThis = $(this);
			if(letterOrder === 1 || letterOrder === 9 || letterOrder === 14 || letterOrder === 19)
				letterDelay = 100;
			else if(letterOrder === 2 || letterOrder === 5 || letterOrder === 10 || letterOrder === 15 || letterOrder === 20 || letterOrder === 23 || letterOrder === 0 || letterOrder === 18)
				letterDelay = 300;
			else if(letterOrder === 3 || letterOrder === 11 || letterOrder === 6 || letterOrder === 16 || letterOrder === 21 || letterOrder === 24)
				letterDelay = 500;
			else if(letterOrder === 4 || letterOrder === 7 || letterOrder === 12 || letterOrder === 17 || letterOrder === 22 || letterOrder === 25)
				letterDelay = 700;
			else if(letterOrder === 8 || letterOrder === 13 || letterOrder === 26)
				letterDelay = 900;
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
	} else if($(this).hasClass('selected')) {
		$('.iteminner').html('').fadeOut(600);
		$(this).removeClass('selected').parent('.items').css('position', 'absolute').find('li').hide().css({
			"position": "static",
			"top": "auto",
			"left": "auto",
		}).fadeIn(600);
	} else {
		let selectedLetter = $('.alphabet > span.selected');
		$(this).parent().css('position', 'static');
		$(this).addClass('selected').css({
			"position": "absolute",
			"top": selectedLetter.position().top+selectedLetter.height()+50,
			"left": selectedLetter.position().left,
		}).siblings().fadeOut(600);
		let iframeWidth = 510;
		if($(window).height() < 640)
			iframeWidth = 400;
		$('.iteminner').html('<video src="design.mp4" autoplay width="100%"></video>').fadeIn(600);
		$('video').on("ended", function(){
			$('.iteminner').html('').hide();
			$('.items > li.selected').removeClass('selected').parent('.items').css('position', 'absolute').find('li').hide().css({
				"position": "static",
				"top": "auto",
				"left": "auto",
			}).fadeIn(600);
		});
	}
});
$('.plans > div').click(function() {
	$(this).addClass('selected').siblings().removeClass('selected');
});
$('.close-popup').click(function(e) {
	e.preventDefault();
	$(this).closest('.popup').fadeOut();
});
