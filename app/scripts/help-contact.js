'use strict';

var helpContact = {

  showHideDropdown: function() {
    var dropdown = $('.help-dropdown');
    $('.help-contact')
      .mouseenter(function () {
        dropdown.css('display', 'block');
      })
      .mouseleave(function () {
        dropdown.css('display', 'none');
      })
      .click(function () {
        dropdown.toggle();
      })
  }
};
