import $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';
const asideJquery = () => {
  const asideBody = new PerfectScrollbar('.aside-body', {
    suppressScrollX: true
  });
  if ($('.aside-backdrop').length === 0) {
    $('#root').append('<div class="aside-backdrop"></div>');
  }
  const mql = window.matchMedia('(min-width:992px)');
  function doMinimize(e) {
    if (e.matches) {
      $('.aside').addClass('minimize');
    } else {
      $('.aside').removeClass('minimize');
    }
    asideBody.update();
  }
  mql.addListener(doMinimize);
  doMinimize(mql);
  $('.aside-menu-link').on('click', function(e) {
    e.preventDefault();
    if (window.matchMedia('(min-width: 992px)').matches) {
      $(this)
        .closest('.aside')
        .toggleClass('minimize');
    } else {
      $('#root').toggleClass('show-aside');
    }
    asideBody.update();
  });

  $('.nav-aside .with-sub').on('click', '.nav-link', function(e) {
    e.preventDefault();
    $(this)
      .parent()
      .siblings()

      .removeClass('show');
    $(this)
      .parent()
      .toggleClass('show');
    asideBody.update();
  });

  $('#root').on('mouseenter', '.minimize .aside-body', function(e) {
    $(this)
      .parent()
      .addClass('maximize');
  });
  $('#root').on('mouseleave', '.minimize .aside-body', function(e) {
    $(this)
      .parent()
      .removeClass('maximize');

    asideBody.update();
  });
  $('#root').on('click', '.aside-backdrop', function(e) {
    $('#root').removeClass('show-aside');
  });
};

export { asideJquery };
