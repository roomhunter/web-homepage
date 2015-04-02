'use strict';


$( document ).ready(function() {

  weixinLogin.initialization();

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
  userAuth.logOut();
  userAuth.registerFormSubmit();
  userAuth.profileFormSubmit();

});
