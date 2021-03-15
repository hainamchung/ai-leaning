import $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';

const sidebarJQuery = () => {
  $('#root').addClass('app-ai-learning');
  const mailSidebarBody = new PerfectScrollbar('.ai-learning-sidebar-body', {
    suppressScrollX: true
  });

  $('#atsMenu').on('click', function(e) {
    e.preventDefault();

    $('#root').addClass('ai-learning-sidebar-show');

    $(this).addClass('d-none');
    $('#mainMenuOpen').removeClass('d-none');
  });

  $(document).on('click touchstart', function(e) {
    e.stopPropagation();
  });

  $('.important').on('click', function(e) {
    e.preventDefault();

    const parent = $(this).closest('.card-file');
    const important = parent.find('.marker-icon');

    if (!important.length) {
      $(this)
        .closest('.card-file')
        .append('<div class="marker-icon marker-warning pos-absolute t--1 l--1"><i data-feather="star"></i></div>');

      $(this).html('<i data-feather="star"></i> Unmark as Important');
    } else {
      important.remove();

      $(this).html('<i data-feather="star"></i> Mark as Important');
    }

    feather.replace();
  });

  $('.download').on('click', function(e) {
    e.preventDefault();

    $('#toast').toast('show');
  });

  if (window.matchMedia('(min-width: 1200px)').matches) {
    $('.aside').addClass('minimize');
  }
};

export { sidebarJQuery };
