(function () {
  var networks = [
    'facebookAuth',
    'twitterAuth',
    'linkedinAuth'
  ]

  $(document).ready(function () {

    if (!Cookies.get('facebookAuth') && !Cookies.get('twitterAuth') && !Cookies.get('linkedinAuth')) {
      if (window.location.pathname != "/connect" && window.location.pathname != "/authenicating" && window.location.pathname != "/") {
        window.location.href = "./connect";
        console.log(window.location.pathname)
      }
    }

    // match networks and connectedness
    function networkConnected(network) {
      var connected = Cookies.get(network);
      if (connected == 1) {
        $('#preferencesDetail li#' + network).addClass('connected');
      } else {
        console.log(network + ' not Connected :(');
      }
    }

    $('#preferencesDetail button').click(function (e) {
      Cookies.set(e.target.getAttribute('data-network'), '1', { expires: 7 });
      window.location.href = "./authenticating";
    });

    for (network in networks) {
      console.log(networks, networks[network])
      networkConnected(networks[network]);
    }

    // Tab stuff
    var tabList = $('#tabsList > li');
    var leadsList = $('.leadsList');

    function selectTab(tab) {
      var tab = tab || $(tabList)[1];
      var target = $(tab).find('a').attr("tab-cat-target");

      $(tab).siblings().find('a').removeClass('active')
      $(tab).find('a').addClass('active');

      $('#tabs > div').each(function () {
        var tabTarget = $(this);
        $('body').removeClass('tile-detail');
        $('div[class*="-expanded"]').removeClass('active-tile');

        if (tabTarget.attr('tab-cat') == target) {
          $(tabTarget).show();
        } else {
          $(tabTarget).hide();
        }
      });
    }

    function selectLead(lead) {
      var lead = lead;
      var target = $(lead).attr("slug-target");

      $(lead).siblings().removeClass('active')
      $(lead).addClass('active');
      $('body').removeClass('tile-detail');
      $('body').removeClass('init-lead-detail');
      $('div[class*="-expanded"]').removeClass('active-tile');

      $(lead).parent().siblings('.leadDetail').find('> div').each(function () {
        var detail = $(this);

        if (detail.attr('slug') == target) {
          $(detail).addClass('visible');
        } else {
          $(detail).removeClass('visible');
        }
      });
    }

    selectTab(); //document load

    $(leadsList).each(function () {
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