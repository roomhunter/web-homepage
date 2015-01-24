'use strict';

var helpContact = {

  showHideDropdown: function() {
    var dropdown = $('.help-dropdown');
    $('.help-contact')
      .mouseenter(function () {
        dropdown.toggle();
      })
      .mouseleave(function () {
        dropdown.toggle();
      })
      .click(function () {
        dropdown.toggle();
      })
  }
};
