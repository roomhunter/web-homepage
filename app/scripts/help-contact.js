'use strict';

var helpContact = {

  showHideDropdown: function() {
    $('.help-contact')
      .mouseenter(function () {
        $('.help-dropdown').addClass('show');

      })
      .mouseleave(function () {
        $('.help-dropdown').removeClass('show');

      });
  }
};
