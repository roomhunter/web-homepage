'use strict';


$( document ).ready(function() {
  userAuth.initAuthViewWithCachedInfo();
  userAuth.userLabelClicked();

  langSwitch.initLang();
  langSwitch.buttonClicked();

  schoolInput.typeAhead();
  schoolInput.formSubmit();

  helpContact.showHideDropdown();

  userAuth.loginButtonClicked();
  userAuth.registerButtonClicked();
  userAuth.loginFormSubmit();
  userAuth.registerFormSubmit();
  userAuth.profileFormSubmit();
});
