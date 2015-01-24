'use strict';

$( document ).ready(function() {
  langSwitch.initLang();
  langSwitch.buttonClicked();

  helpContact.showHideDropdown();
  schoolInput.typeAhead();
  schoolInput.formSubmit();
});
