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

  userAuth.registerButtonClicked();
  userAuth.loginButtonClicked();
  userAuth.forgetPwdButtonClicked();
  userAuth.loginFormSubmit();
  userAuth.logOut();
  userAuth.forgetPwdFormSubmit();
  userAuth.noAccountButtonClicked();
  userAuth.returnToLoginButtonClicked();
});
