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


    //selectize
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


//    slide toggle tr в таблице
    $(".table-slide-toggle").on('click', function () {
        if (! $(this).hasClass('table-slide-toggle--is-active')) {
            $(this).addClass('table-slide-toggle--is-active').addBack().html('−');
            $(this).closest('.test').next('.slide').slideDown('fast');
        }
        else{
            $(this).removeClass('table-slide-toggle--is-active').addBack().html('+');
            $(this).closest('.test').next('.slide').slideUp('fast');
        }
    });


//    tabs

    $(".tabs__list li ").on('click', function () {
        $(this).removeClass().addClass('btn btn--dark').siblings().removeClass('btn--dark').addClass('btn--light');

        var target = $('.tabs-content-item').eq($(this).index());

        target.addClass('is-shown').siblings().removeClass('is-shown');

    });


});

