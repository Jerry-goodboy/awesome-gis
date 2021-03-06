﻿/// <reference path="jquery/jquery.min.js" />
/// <reference path="bootstrap/bootstrap.min.js" />
/// <reference path="handlebars/handlebars.runtime.js" />
/// <reference path="../templates/navTemplate.hbs.js" />
/// <reference path="../templates/itemTemplate.hbs.js" />

try {
    $.get('data.json', function (awesomeData) {
        var itemTemplate = awesomeTemplates['templates/itemTemplate.handlebars'];
        $('#itemsContainer').html(itemTemplate(awesomeData));

        $(function () {
            $('#txtFilter').fastLiveFilter('.itemList', {
                timeout: 200
                //callback: function (total) {
                //    console.log("Found: " + total);
                //}
            });
        });
        var navTemplate = awesomeTemplates['templates/navTemplate.handlebars'];
        $('#navContainer').html(navTemplate(awesomeData));

        $(window).scroll(function () {
            if ($(document).scrollTop() > 50) {
                $('#banner').addClass('shrink');
            } else {
                $('#banner').removeClass('shrink');
            }
        });

        $.get('contributors.json', function (awesomeContributors) {
            var contributorsList = awesomeTemplates['templates/contributorsList.handlebars'];
            $('#contributorsContainer').html(contributorsList(awesomeContributors));
        });
    });
} catch (e) {
    console.log(e);
}

function scroll_if_anchor(href) {
    href = typeof (href) == "string" ? href : $(this).attr("href");

    // You could easily calculate this dynamically if you prefer
    var fromTop = 110;

    // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
    // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174
    if (href.indexOf("#") == 0) {
        var $target = $(href);

        // Older browser without pushState might flicker here, as they momentarily
        // jump to the wrong position (IE < 10)
        if ($target.length) {
            $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
            if (history && "pushState" in history) {
                history.pushState({}, document.title, window.location.pathname + href);
                return false;
            }
        }
    }
}

// When our page loads, check to see if it contains and anchor
scroll_if_anchor(window.location.hash);

// Intercept all anchor clicks
$("body").on("click", "a", scroll_if_anchor);

// Add offset to scrollspy
$('body').scrollspy({
    offset: $(window).height() * 0.2
});