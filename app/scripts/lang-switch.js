'use strict';

var langSwitch = {
  toEn: function() {
    $('.zh').addClass('hidden');
    $('.en').removeClass('hidden');
    $('.en').removeClass('invisible');
    $('#search-str').attr('placeholder', 'I will go to...');
    $('#login-submit').attr('value', 'Login');
    $('#forgetPwd-submit').attr('value', '发送邮件');
    schoolInput.init('unable to find any schools matching current query');
  },
  toZh: function () {
    $('.en').addClass('hidden');
    $('.zh').removeClass('hidden');
    $('.zh').removeClass('invisible');
    $('#search-str').attr('placeholder', '输入学校查找附近住房');
    $('#login-submit').attr('value', '登录');
    $('#forgetPwd-submit').attr('value', '帮我重设');
    schoolInput.init('无法找到匹配的学校');
  },
  initLang: function() {
    var lang = localStorage.getItem('userLang');
    if(!lang) {
      lang =  navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    }
    if(lang === 'en-US' || lang === 'en') {
      localStorage.setItem('userLang', 'en');
      this.toEn();
    }
    else {
      localStorage.setItem('userLang', 'zh');
      this.toZh();
    }
  },
  buttonClicked: function() {
    $('#switch-zh').click(function (e) {
      e.preventDefault();
      localStorage.setItem('userLang', 'zh');
      langSwitch.toZh();
    });
    $('#switch-en').click(function (e) {
      e.preventDefault();
      localStorage.setItem('userLang', 'en');
      langSwitch.toEn();
    });
  }
};
