$(document).ready(function() {

    const $cont = $('.cont');

    const $slider = $('.slider');

    const $nav = $('.slider-nav');

    const winW = $(window).width();

    const animSpd = 750; // Change also in CSS

    const distOfLetGo = winW * 0.2;

    let curSlide = 1;

    let animation = false;

    let autoScrollVar = true;

    let diff = 0;



    // Generating slides

    let arrCities = ['FIFA 20', 'CS:GO', 'PUBG Mobil', 'VALORANT', 'Zula']; // Change number of slides in CSS also

    let numOfCities = arrCities.length;

    let arrCitiesDivided = [];



    arrCities.map((city) => {

        let length = city.length;

        let letters = Math.floor(length / 4);

        let exp = new RegExp(".{1," + letters + "}", "g");



        arrCitiesDivided.push(city.match(exp));

    });



    let generateSlide = function(city) {

        let frag1 = $(document.createDocumentFragment());

        let frag2 = $(document.createDocumentFragment());

        const numSlide = arrCities.indexOf(arrCities[city]) + 1;

        const firstLetter = arrCitiesDivided[city][0].charAt(0);



        const $slide =

            $(`<div data-target="${numSlide}" class="slide slide--${numSlide}">

							<div class="slide__darkbg slide--${numSlide}__darkbg"></div>

							<div class="slide__text-wrapper slide--${numSlide}__text-wrapper"></div>

						</div>`);



        const letter =

            $(`<div class="slide__letter slide--${numSlide}__letter">

							${firstLetter}

						</div>`);



        for (let i = 0, length = arrCitiesDivided[city].length; i < length; i++) {

            const text =

                $(`<div class="slide__text slide__text--${i + 1}">

								${arrCitiesDivided[city][i]}

							</div>`);

            frag1.append(text);

        }



        const navSlide = $(`<li data-target="${numSlide}" class="nav__slide nav__slide--${numSlide}"></li>`);

        frag2.append(navSlide);

        $nav.append(frag2);



        $slide.find(`.slide--${numSlide}__text-wrapper`).append(letter).append(frag1);

        $slider.append($slide);



        if (arrCities[city].length <= 4) {

            $('.slide--' + numSlide).find('.slide__text').css("font-size", "12vw");

        }

    };



    for (let i = 0, length = numOfCities; i < length; i++) {

        generateSlide(i);

    }



    $('.nav__slide--1').addClass('nav-active');



    // Navigation

    function bullets(dir) {

        $('.nav__slide--' + curSlide).removeClass('nav-active');

        $('.nav__slide--' + dir).addClass('nav-active');

    }



    function timeout() {

        animation = false;

    }



    function pagination(direction) {

        animation = true;

        diff = 0;

        $slider.addClass('animation');

        $slider.css({

            'transform': 'translate3d(-' + ((curSlide - direction) * 100) + '%, 0, 0)'

        });



        $slider.find('.slide__darkbg').css({

            'transform': 'translate3d(' + ((curSlide - direction) * 50) + '%, 0, 0)'

        });



        $slider.find('.slide__letter').css({

            'transform': 'translate3d(0, 0, 0)',

        });



        $slider.find('.slide__text').css({

            'transform': 'translate3d(0, 0, 0)'

        });

    }



    function navigateRight() {

        if (!autoScrollVar) return;

        if (curSlide >= numOfCities) return;

        pagination(0);

        setTimeout(timeout, animSpd);

        bullets(curSlide + 1);

        curSlide++;

    }



    function navigateLeft() {

        if (curSlide <= 1) return;

        pagination(2);

        setTimeout(timeout, animSpd);

        bullets(curSlide - 1);

        curSlide--;

    }



    function toDefault() {

        pagination(1);

        setTimeout(timeout, animSpd);

    }



    // Events

    $(document).on('mousedown touchstart', '.slide', function(e) {

        if (animation) return;

        let target = +$(this).attr('data-target');

        let startX = e.pageX || e.originalEvent.touches[0].pageX;

        $slider.removeClass('animation');



        $(document).on('mousemove touchmove', function(e) {

            let x = e.pageX || e.originalEvent.touches[0].pageX;

            diff = startX - x;

            if (target === 1 && diff < 0 || target === numOfCities && diff > 0) return;



            $slider.css({

                'transform': 'translate3d(-' + ((curSlide - 1) * 100 + (diff / 30)) + '%, 0, 0)'

            });



            $slider.find('.slide__darkbg').css({

                'transform': 'translate3d(' + ((curSlide - 1) * 50 + (diff / 60)) + '%, 0, 0)'

            });



            $slider.find('.slide__letter').css({

                'transform': 'translate3d(' + (diff / 60) + 'vw, 0, 0)',

            });



            $slider.find('.slide__text').css({

                'transform': 'translate3d(' + (diff / 15) + 'px, 0, 0)'

            });

        })

    })



    $(document).on('mouseup touchend', function(e) {

        $(document).off('mousemove touchmove');



        if (animation) return;



        if (diff >= distOfLetGo) {

            navigateRight();

        } else if (diff <= -distOfLetGo) {

            navigateLeft();

        } else {

            toDefault();

        }

    });



    $(document).on('click', '.nav__slide:not(.nav-active)', function() {

        let target = +$(this).attr('data-target');

        bullets(target);

        curSlide = target;

        pagination(1);

    });



    $(document).on('click', '.side-slider-nav', function() {

        let target = $(this).attr('data-target');



        if (target === 'right') navigateRight();

        if (target === 'left') navigateLeft();

    });



    $(document).on('keydown', function(e) {

        if (e.which === 39) navigateRight();

        if (e.which === 37) navigateLeft();

    });



    $(".cont").on('mousewheel DOMMouseScroll', function(e) {

        if (animation) return;

        let delta = e.originalEvent.wheelDelta;



        if (delta > 0 || e.originalEvent.detail < 0) navigateLeft();

        if (delta < 0 || e.originalEvent.detail > 0) navigateRight();

    });

});





$(document).ready(function() {

    $(".game-image").hover(

        function() {

            $(this).removeClass("g")

        },

        function() {

            $(this).addClass("g");

        }

    );

});



setInterval(() => {

    let els = document.querySelector("#gameregio-logo");

    if (els) {

        els.style.marginTop = "-15px";

        els.style.marginLeft = "-15px";

        els.style.transform = "scale(.95)";



        setTimeout(() => {

            els.style.marginTop = "0";

            els.style.marginLeft = "0";

            els.style.transform = "scale(1)";

        }, 400);

    }

}, 800);



jQuery(document).ready(function($) {
    //open/close lateral filter
    $('.cd-filter-trigger').on('click', function() {
        triggerFilter(true);
    });
    $('.cd-filter .cd-close').on('click', function() {
        triggerFilter(false);
    });

    function triggerFilter($bool) {
        var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
        elementsToTrigger.each(function() {
            $(this).toggleClass('filter-is-visible', $bool);
        });
    }

    //mobile version - detect click event on filters tab
    var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
        filter_tab_placeholder_default_value = 'Select',
        filter_tab_placeholder_text = filter_tab_placeholder.text();

    $('.cd-tab-filter li').on('click', function(event) {
        //detect which tab filter item was selected
        var selected_filter = $(event.target).data('type');

        //check if user has clicked the placeholder item
        if ($(event.target).is(filter_tab_placeholder)) {
            (filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text): filter_tab_placeholder.text(filter_tab_placeholder_default_value);
            $('.cd-tab-filter').toggleClass('is-open');

            //check if user has clicked a filter already selected
        } else if (filter_tab_placeholder.data('type') == selected_filter) {
            filter_tab_placeholder.text($(event.target).text());
            $('.cd-tab-filter').removeClass('is-open');

        } else {
            //close the dropdown and change placeholder text/data-type value
            $('.cd-tab-filter').removeClass('is-open');
            filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
            filter_tab_placeholder_text = $(event.target).text();

            //add class selected to the selected filter item
            $('.cd-tab-filter .selected').removeClass('selected');
            $(event.target).addClass('selected');
        }
    });

    //close filter dropdown inside lateral .cd-filter
    $('.cd-filter-block h4').on('click', function() {
        $(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
    })


    /************************************
    	MitItUp filter settings
    	More details:
    	https://mixitup.kunkalabs.com/
    	or:
    	http://codepen.io/patrickkunka/
    *************************************/

    buttonFilter.init();
    $('.cd-gallery ul').mixItUp({
        controls: {
            enable: false
        },
        callbacks: {
            onMixStart: function() {
                $('.cd-fail-message').fadeOut(200);
            },
            onMixFail: function() {
                $('.cd-fail-message').fadeIn(200);
            }
        }
    });

    //search filtering
    //credits http://codepen.io/edprats/pen/pzAdg
    var inputText;
    var $matching = $();

    var delay = (function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    $(".cd-filter-content input[type='search']").keyup(function() {
        // Delay function invoked to make sure user stopped typing
        delay(function() {
            inputText = $(".cd-filter-content input[type='search']").val().toLowerCase();
            // Check to see if input field is empty
            if ((inputText.length) > 0) {
                $('.mix').each(function() {
                    var $this = $(this);

                    // add item to be filtered out if input text matches items inside the title
                    if ($this.attr('class').toLowerCase().match(inputText)) {
                        $matching = $matching.add(this);
                    } else {
                        // removes any previously matched item
                        $matching = $matching.not(this);
                    }
                });
                $('.cd-gallery ul').mixItUp('filter', $matching);
            } else {
                // resets the filter to show all item if input is empty
                $('.cd-gallery ul').mixItUp('filter', 'all');
            }
        }, 200);
    });
});

/*****************************************************
	MixItUp - Define a single object literal
	to contain all filter custom functionality
*****************************************************/
var buttonFilter = {
    // Declare any variables we will need as properties of the object
    $filters: null,
    groups: [],
    outputArray: [],
    outputString: '',

    // The "init" method will run on document ready and cache any jQuery objects we will need.
    init: function() {
        var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.

        self.$filters = $('.cd-main-content');
        self.$container = $('.cd-gallery ul');

        self.$filters.find('.cd-filters').each(function() {
            var $this = $(this);

            self.groups.push({
                $inputs: $this.find('.filter'),
                active: '',
                tracker: false
            });
        });

        self.bindHandlers();
    },

    // The "bindHandlers" method will listen for whenever a button is clicked.
    bindHandlers: function() {
        var self = this;

        self.$filters.on('click', 'a', function(e) {
            self.parseFilters();
        });
        self.$filters.on('change', function() {
            self.parseFilters();
        });
    },

    parseFilters: function() {
        var self = this;

        // loop through each filter group and grap the active filter from each one.
        for (var i = 0, group; group = self.groups[i]; i++) {
            group.active = [];
            group.$inputs.each(function() {
                var $this = $(this);
                if ($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) {
                    if ($this.is(':checked')) {
                        group.active.push($this.attr('data-filter'));
                    }
                } else if ($this.is('select')) {
                    group.active.push($this.val());
                } else if ($this.find('.selected').length > 0) {
                    group.active.push($this.attr('data-filter'));
                }
            });
        }
        self.concatenate();
    },

    concatenate: function() {
        var self = this;

        self.outputString = ''; // Reset output string

        for (var i = 0, group; group = self.groups[i]; i++) {
            self.outputString += group.active;
        }

        // If the output string is empty, show all rather than none:
        !self.outputString.length && (self.outputString = 'all');

        // Send the output string to MixItUp via the 'filter' method:
        if (self.$container.mixItUp('isLoaded')) {
            self.$container.mixItUp('filter', self.outputString);
        }
    }
};

$(window).on('load', function() {

    var preLoder = $("#preloader");
    preLoder.addClass('hide');

});



$(window).on('load', function () {

     
var notify = document.querySelector("li.nav-item.dropdown.notify>a");
var wallet = document.querySelector("li.nav-item.dropdown.wallet>a");
var profile = document.querySelector("li.nav-item.dropdown.nav-user>a");

var notificationDropdown = document.querySelector("#navbarSupportedContent > ul.dropdown-menu.dropdown-menu-right.notification-dropdown");
var walletDropdown = document.querySelector("#navbarSupportedContent > ul.dropdown-menu.dropdown-menu-right.wallet-dropdown");
var profileDrowdown = document.querySelector("#navbarSupportedContent > div.dropdown-menu.dropdown-menu-right.nav-user-dropdown");

var notifyStatus = 0;
var walletStatus = 0;
var profileStatus = 0;

var isNotify = 1;
var isWallet = 1;
var isProfile = 1;

notify.addEventListener("click", function() {
    if (notifyStatus == 0 && isNotify == 1) {
        $(notificationDropdown).addClass("show");
        notifyStatus = 1;
        isNotify = 0;
    } else {
        $(notificationDropdown).removeClass("show");
        notifyStatus = 0;
        isNotify = 1;
    }

    $(walletDropdown).removeClass("show");
    $(profileDrowdown).removeClass("show");
    walletStatus = 0;
    profileStatus = 0;
    isWallet = 1;
    isProfile = 1;
});

wallet.addEventListener("click", function() {
    if (walletStatus == 0 && isWallet == 1) {
        $(walletDropdown).addClass("show");
        walletStatus = 1;
        isWallet = 0;
    } else {
        $(walletDropdown).removeClass("show");
        walletStatus = 0;
        isWallet = 1;
    }
    $(notificationDropdown).removeClass("show");
    $(profileDrowdown).removeClass("show");
    notifyStatus = 0;
    profileStatus = 0;
    isNotify = 1;
    isProfile = 1;
});

profile.addEventListener("click", function() {
    if (profileStatus == 0 && isProfile == 1) {
        $(profileDrowdown).addClass("show");
        profileStatus = 1;
        isWallet = 0;
    } else {
        $(profileDrowdown).removeClass("show");
        profileStatus = 0;
        isProfile = 1;
    }
    $(notificationDropdown).removeClass("show");
    $(walletDropdown).removeClass("show");
    notifyStatus = 0;
    walletStatus = 0;
    isWallet = 1;
    isNotify = 1;
});
});