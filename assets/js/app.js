$("body").prepend('<div class=text-white style=position:fixed;top:0;bottom:0;width:100%;z-index:99999999;padding-top:12%;background-color:rgba(87,87,87,.95);" id="cover-page"><div id="cover-page-con" class="container text-center"style="opacity:100%;"><img alt="Brian Savage"class="img-fluid rounded-circle"src=http://via.placeholder.com/150x150><h1>William Harding</h1><p class=lead>...inspired innovative technology leader & follower.<p class=lead style=font-size:80%><i class="fa-1x fa-cog fa-spin fas"></i> we are preparing your experiance now...</div></div>');
		2.	var parentPageID = 55;
		3.	window.onload = getContent();
		4.	
		5.	function getContent() {
		6.		$.ajax({
		7.			method: 'GET',
		8.			url: 'https://me.inside-out-project.com/wp-json/wp/v2/pages/?parent=' + parentPageID + '&order=asc&orderby=menu_order',
		9.			dataType: 'json',
		10.			success: function (data) {
		11.				if (data.length > 0) {
		12.					var thePage = '';
		13.					var theMenu = '<ul class="navbar-nav ml-auto">';
		14.					var className = '';
		15.					data.forEach(function (item) {
		16.						if (item.slug === 'home') {
		17.							$("header").html(item.content.rendered);
		18.						} else {
		19.							let isActive = (theMenu === null) ? ' active' : '';
		20.							theMenu = theMenu + '<li class="nav-item"> <a class="nav-link js-scroll-trigger' + isActive + '" href="#' + item.slug + '">' + item.title.rendered + '</a> </li>';
		21.							className = (className === '') ? ' class="bg-light"' : '';
		22.							thePage = thePage + '<section id="' + item.slug + '"' + className + '>' + item.content.rendered + '</section>';
		23.						}
		24.					});
		25.					$("#navbarResponsive").html(theMenu + '</ul>');
		26.					$("main").html(thePage);
		27.				}
		28.			},
		29.			error: function () {
		30.				console.log('bad');
		31.			}
		32.		});
		33.		setTimeout(function () {
		34.			$("#cover-page").fadeOut(2000);
		35.			startScroll();
		36.			resizeDiv();
		37.		}, 2000);
		38.	}
		39.	window.onresize = function (event) {
		40.		resizeDiv();
		41.	}
		42.	
		43.	function resizeDiv() {
		44.		let vpw = $(window).width();
		45.		let vph = $(window).height();
		46.		let navH = $('nav').height();
		47.		let footerH = $('nav').height();
		48.		let setvph = vph - navH;
		49.		$("section,header").css({
		50.			"height": setvph
		51.		});
		52.		$("header").css({
		53.			"margin-top": navH
		54.		});
		55.	}