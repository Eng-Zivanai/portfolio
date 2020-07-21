(function($) {
	$(document).ready(function() {
		"use strict";

	// PRELOADER
		loader()
		function loader(_success) {
			var obj = document.querySelector('.preloader'),
			inner = document.querySelector('.inner .percentage'),
			page = document.querySelector('body');
			obj.classList.remove('page-loaded');
			page.classList.add('page-loaded');
			var w = 0,
				t = setInterval(function() {
					w = w + 1;
					inner.textContent = w;
					if (w === 100){
						obj.classList.add('page-loaded');
						page.classList.remove('page-loaded');
						clearInterval(t);
						w = 0;
						if (_success){
							return _success();
						}
					}
				}, 20);
		}



		// SWIPER SLIDER
			var mySwiper = new Swiper ('.swiper-container', {
			slidesPerView: 'auto',
      		spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 6000,
				disableOnInteraction: false,
			  },
			pagination: {
				el: '.swiper-pagination',
					clickable: true,
				renderBullet: function (index, className) {
				  return '<span class="' + className + '"><svg><circle r="18" cx="20" cy="20"></circle></svg></span>';
				},
			},
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},
		  })





		// PAGE TRANSITION
		$('body a').on('click', function(e) {

			if (typeof $( this ).data('fancybox') == 'undefined') {
			e.preventDefault();
			var url = this.getAttribute("href");
			if( url.indexOf('#') != -1 ) {
			var hash = url.substring(url.indexOf('#'));

			if( $('body ' + hash ).length != 0 ){
			$('.transition-overlay').removeClass("active");
			$(".hamburger").toggleClass("open");
			$("body").toggleClass("overflow");
			$(".navigation-menu").removeClass("active");
			$(".navigation-menu .inner ul").css("transition-delay", "0s");
			$(".navigation-menu .inner blockquote").css("transition-delay", "0s");
			$(".navigation-menu .bg-layers span").css("transition-delay", "0.3s");

			$('html, body').animate({
			scrollTop: $(hash).offset().top
			}, 1000);

			}
			}
			else {
			$('.transition-overlay').toggleClass("active");
			setTimeout(function(){
			window.location = url;
			},600);

			}
			}
			});





		// GO TO TOP
			$(window).scroll(function () {
				if ($(this).scrollTop() > 300) {
					$('.gotop').fadeIn();
				} else {
					$('.gotop').fadeOut();
				}
			});

			$('.gotop').on('click', function(e) {
				$("html, body").animate({
					scrollTop: 0
				}, 600);
				return false;
			});





		// STICKY SIDE LOGO
		$(window).on("scroll touchmove", function () {
		$('.logo').toggleClass('sticky', $(document).scrollTop() > 300);
		});




		// HIDE NAVBAR
		$(window).on("scroll touchmove", function () {
		$('.navbar').toggleClass('hide', $(document).scrollTop() > 30);
		});




		// DATA BACKGROUND IMAGE
			var pageSection = $(".swiper-slide");
			pageSection.each(function(indx){
				if ($(this).attr("data-background")){
					$(this).css("background-image", "url(" + $(this).data("background") + ")");
				}
			});




		// HAMBURGER
		$(function(){
			var $burger = $('.burger');
			var $bars = $('.burger-svg__bars');
			var $bar = $('.burger-svg__bar');
			var $bar1 = $('.burger-svg__bar-1');
			var $bar2 = $('.burger-svg__bar-2');
			var $bar3 = $('.burger-svg__bar-3');
			var isChangingState = false;
			var isOpen = false;
			var burgerTL = new TimelineMax();

			function burgerOver() {

				if(!isChangingState) {
					burgerTL.clear();
					if(!isOpen) {
						burgerTL.to($bar1, 0.5, { y: -2, ease: Elastic.easeOut })
								.to($bar2, 0.5, { scaleX: 0.6, ease: Elastic.easeOut, transformOrigin: "50% 50%" }, "-=0.5")
								.to($bar3, 0.5, { y: 2, ease: Elastic.easeOut }, "-=0.5");
					}
					else {
						burgerTL.to($bar1, 0.5, { scaleX: 1.2, ease: Elastic.easeOut })
								.to($bar3, 0.5, { scaleX: 1.2, ease: Elastic.easeOut }, "-=0.5");
					}
				}
			}

			function burgerOut() {
				if(!isChangingState) {
					burgerTL.clear();
					if(!isOpen) {
						burgerTL.to($bar1, 0.5, { y: 0, ease: Elastic.easeOut })
								.to($bar2, 0.5, { scaleX: 1, ease: Elastic.easeOut, transformOrigin: "50% 50%" }, "-=0.5")
								.to($bar3, 0.5, { y: 0, ease: Elastic.easeOut }, "-=0.5");
					}
					else {
						burgerTL.to($bar1, 0.5, { scaleX: 1, ease: Elastic.easeOut })
								.to($bar3, 0.5, { scaleX: 1, ease: Elastic.easeOut }, "-=0.5");
					}
				}
			}

			function showCloseBurger() {
				burgerTL.clear();
				burgerTL.to($bar1, 0.3, { y: 6, ease: Power4.easeIn })
						.to($bar2, 0.3, { scaleX: 1, ease: Power4.easeIn }, "-=0.3")
						.to($bar3, 0.3, { y: -6, ease: Power4.easeIn }, "-=0.3")
						.to($bar1, 0.5, { rotation: 45, ease: Elastic.easeOut, transformOrigin: "50% 50%" })
						.set($bar2, { opacity: 0, immediateRender: false }, "-=0.5")
						.to($bar3, 0.5, { rotation: -45, ease: Elastic.easeOut, transformOrigin: "50% 50%", onComplete: function() { isChangingState = false; isOpen = true; } }, "-=0.5");
			}

			function showOpenBurger() {
				burgerTL.clear();
				burgerTL.to($bar1, 0.3, { scaleX: 0, ease: Back.easeIn })
						.to($bar3, 0.3, { scaleX: 0, ease: Back.easeIn }, "-=0.3")
						.set($bar1, { rotation: 0, y: 0 })
						.set($bar2, { scaleX: 0, opacity: 1 })
						.set($bar3, { rotation: 0, y: 0 })
						.to($bar2, 0.5, { scaleX: 1, ease: Elastic.easeOut })
						.to($bar1, 0.5, { scaleX: 1, ease: Elastic.easeOut }, "-=0.4")
						.to($bar3, 0.5, { scaleX: 1, ease: Elastic.easeOut, onComplete: function() { isChangingState = false; isOpen = false; } }, "-=0.5");
			}

			$(".custom-btn").on('click', function(e) {
				$("body").toggleClass("overflow");
				$(".navigation-menu").toggleClass("active");



			});

			$burger.on('click', function(e) {
				$("body").toggleClass("overflow");
				$(".navigation-menu").toggleClass("active");
				$(".back-btn").toggleClass("off");
				$(".navbar").toggleClass("light");
				if(!isChangingState) {
					isChangingState = true;

					if(!isOpen) {
						showCloseBurger();
					}
					else {
						showOpenBurger();
					}
				}

			});

			$burger.hover( burgerOver, burgerOut );

		});





		// MASONRY
		var $container = $('.works ul').imagesLoaded( function() {
			$container.isotope({
			  itemSelector: '.works ul li',
			  layoutMode: 'masonry'
			});
		});



		});


		// SCROLL BG COLOR
		$(window).scroll(function() {
		  var $window = $(window),
			  $body = $('body'),
			  $panel = $('section, footer, header');

		  var scroll = $window.scrollTop() + ($window.height() / 3);

		  $panel.each(function () {
			var $this = $(this);
			if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

			  $body.removeClass(function (index, css) {
				return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
			  });

			  $body.addClass('color-' + $(this).data('color'));
			}
		  });

		}).scroll();



		// WOW ANIMATION
			wow = new WOW(
			{
				animateClass: 'animated',
				offset:       50
			}
			);
			wow.init();
})(jQuery);
