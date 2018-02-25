(function () {
  $(document).ready(function () {
    networks = ['facebookAuth', 'twitterAuth', 'linkedinAuth'];
    
    // Checks for connections and redirects user appropriately
    if (!Cookies.get('facebookAuth') && !Cookies.get('twitterAuth') && !Cookies.get('linkedinAuth')) {
      if (window.location.pathname.split("/").slice(-1) != "preferences" && window.location.pathname.split("/").slice(-1) != "authenicating" && window.location.pathname.split("/").slice(-1) != "") {
        window.location.href = "./preferences/";
        console.log(window.location.pathname);
      }
    }

    
/*

    /*$(leadsList).each(function () {
      var initLead = $(this).find('li')[0];
      selectLead(initLead);
      setTimeout(function () {
        $('body').addClass('init-lead-detail');
        $('body').addClass('lead-detail');
      }, 2000);

    })


    // Show and hides leads for categories
    $(tabList).click(function (e) {
      e.preventDefault();
      $('body').removeClass('view-tabs');
      selectTab(this);
    });

    // Show and hides lead details for lead
    $(leadsList).find('> li').click(function () {
      selectLead(this);
      $('body').removeClass('view-tabs');
      $('body').addClass('lead-detail');
    });

    $('.back').click(function (e) {
      $('body').removeClass('lead-detail');
      $('body').removeClass('tile-detail');
      $('div[class*="-expanded"]').removeClass('active-tile');
    });

    $('.toggle-tabs').click(function (e) {
      $('body').toggleClass('view-tabs');
    });

    $('div[data-target]').click(function (e) {
      var ea = '.' + $(this).attr('data-target') + '-expanded';
      $(this).parent().siblings(ea).addClass('active-tile');
      $('body').addClass('tile-detail');
    });

    $('div[class*="-expanded"] .fa-times-circle').click(function (e) {
      $('div[class*="-expanded"]').removeClass('active-tile');
      $('body').removeClass('tile-detail');
    });

    /*$('#sso a').click(function (e) {
      e.preventDefault();
      var el = $(this)
      setTimeout(function () {
        $(el).closest('.modal').removeClass('sso').addClass('connect');
      }, 500);
    });*/

    /*$('.connectTabs button').click(function (e) {
      e.preventDefault();
      var target = $(this).parents('li');
      $(target).removeClass('connect').addClass('connecting');
      setTimeout(function () {
        $(target).removeClass('connecting').addClass('connected');
      }, 2000);
      var step = $(this).closest('li').closest('li');

      if (step.is(':last-child')) {
        setTimeout(function () {
          window.location.href = "./authenticated";
        }, 3000);
      } else {
        setTimeout(function () {
          var next = $('input[type="radio"]:checked').nextAll('input[type="radio"]')[0];
          $(next).attr('checked', true);
        }, 3000);
      }
    });*/
  });
})();