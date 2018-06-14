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


    //toggler, расскрывающий селекты на странице задач  (ниже 992px)
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




});

