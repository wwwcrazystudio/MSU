$(function() {

//    burger
    $(".burger").on('click', function () {
       $(this).toggleClass('burger--close');
       $(".main-nav-wrapper").slideToggle('fast');
    });


//   Слайдер фотографий пользователя на странице пользователя
    $(".user-about-gallery__thumbs-wrapper img").on('click', function () {
        var targetSrc = $(this).attr('src'),
            targetElement = $(".user-about-gallery__partial--main img");

        targetElement.attr('src', targetSrc);

    });


//  слайдер файлов на странице задач
    $(".tasks-slider").slick({
        prevArrow: '.task-slider__control--prev',
        nextArrow: '.task-slider__control--next',
        vertical: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    });


    //селекты
    customSelectize();
    function customSelectize() {
        var xhr;
        var select_state, $select_state;
        var select_city, $select_city;
        $select_state = $('.form-field--select').selectize({
            onChange: function(value) {
                if (!value.length) return;
                select_city.disable();
                select_city.clearOptions();
                select_city.load(function(callback) {
                    xhr && xhr.abort();
                    xhr = $.ajax({
                        url: 'http://www.corsproxy.com/api.sba.gov/geodata/primary_city_links_for_state_of/' + value + '.json',
                        success: function(results) {
                            select_city.enable();
                            callback(results);
                        },
                        error: function() {
                            callback();
                        }
                    })
                });
            }
        });

    }


//    dropdown-ы в таблицах
    $(".table-slide-toggle").on('click', function () {

        if( $(this).closest('li').find('ul').length )  {

            if (! $(this).hasClass('table-slide-toggle--is-active')) {
                $(this).addClass('table-slide-toggle--is-active').addBack().html('−');
                $(this).closest('li').addClass('show-direct-children').find('> ul').slideDown('fast');
            }
            else{
                $(this).removeClass('table-slide-toggle--is-active').addBack().html('+');
                $(this).closest('li').find('.table-slide-toggle--is-active').not($(this)).removeClass('table-slide-toggle--is-active').addBack().html('+');
                $(this).closest('li').removeClass('show-direct-children').find('ul').slideUp('fast');
            }

        }
    });


    //toggler, расскрывающий селекты на странице задач  (ниже 992px) на странице tasks.html
    $(".tasks-table-filter-toggler").on('click', function () {
        if (! $(this).hasClass('is-active')) {
            $(this).addClass('is-active').addBack().find('.tasks-table-filter-toggler__sign').html('−');
            $(".tasks-table-filters").slideDown('fast');
        }
        else{
            $(this).removeClass('is-active').addBack().find('.tasks-table-filter-toggler__sign').html('+')
            $(".tasks-table-filters").slideUp('fast');
        }
    });




    //оперирование трроугольником на старанице задач
    $(".tasks-table-header__toggler").on('click', function () {
       $(this).toggleClass('is-active');
    });



//    табы на странице "Кабинет руковдителя"

    $(".tabs__list li ").on('click', function () {
        $(this).removeClass().addClass('btn btn--dark').siblings().removeClass('btn--dark').addClass('btn--light');

        var target = $('.tabs-content-item').eq($(this).index());

        target.addClass('is-shown').siblings().removeClass('is-shown');

    });




// resize textarea
    autosize($('textarea'));


//    скрываем дропдаун на странице Кабинет руководителя при клике на любое место страницы

    $(".boss-table__position-info").click(function() {

        $(this).siblings('.boss-table-popup').toggle();

        $('.boss-table-popup').not($(this).siblings('.boss-table-popup')).hide();
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest(".boss-table__position").length) {
            $('.boss-table-popup').hide();
        }
        e.stopPropagation();
    });


//    скрываем кнопочку с плюсовм (возможность раскрыть айтем таблицы, чтобы увидеть дропдауны) у елементов, которые не имеет дропдауны внутри (на странице Кабинет руководителя и Организционная структура)
//    работает как и на декстопе, так и намобилках

    removePlusToggleFromTablesDrop();
    function removePlusToggleFromTablesDrop() {

        var $leaves1 = $('.boss-table__item').filter(":not(:has(ul))");
        var $leaves2 = $('.org-table__item').filter(":not(:has(ul))");

        $leaves1.addClass('not-toggle-plus');
        $leaves2.addClass('not-toggle-plus');


        if ( $(window).width() < 481 ) {

            $leaves2.hide();

        }

        else{
            $leaves2.show();
        }

    }

    $(window).on('resize', removePlusToggleFromTablesDrop);


});

