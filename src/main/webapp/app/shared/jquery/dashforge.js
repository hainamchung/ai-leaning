import $ from 'jquery';
const customJquery = () => {
  // this is changed - current project mix theme and classic plus them into header and side
  $('#mainMenuOpen').on('click touchstart', function(e) {
    e.preventDefault();
    $('#root').addClass('show-aside navbar-nav-show');
  });

  // $('#sidebarMenuClose').on('click', function(e){
  //   e.preventDefault();
  //   $('#root').removeClass('sidebar-show');
  // })

  // hide sidebar when clicking outside of it
  $(document).on('click touchstart', function(e) {
    e.stopPropagation();

    // closing of sidebar menu when clicking outside of it
    // if (!$(e.target).closest('.burger-menu').length) {
    //   const sb = $(e.target).closest('.sidebar').length;
    //   const nb = $(e.target).closest('.navbar-menu-wrapper').length;
    //   if (!sb && !nb) {
    //     if ($('#root').hasClass('navbar-nav-show')) {
    //       $('#root').removeClass('navbar-nav-show');
    //     } else {
    //       $('#root').removeClass('sidebar-show');
    //     }
    //   }
    // }
  });
};

export { customJquery };
