/**
 * Created by xinyue on 4/2/15.
 */
'use strict';

var weixinLogin = {

  initialization: function () {
    var appId = "wxc685011a4fb095bd";
    var appSecret = "5ae24c2aa5bca08b8c8732df9ccf9a3f";
    var redirect_url = "https://test.roomhunter.us";
    var requestUserInfoUrl = userAuth.apiHost()+"users/wechat/login";
    var twoDCodeBoxStyleFile = "https://test.roomhunter.us/styles/wechat-related.css";

    new WxLogin({
      id: "wechat-login-2D-code",
      appid: appId,
      scope: "snsapi_login",
      redirect_uri: encodeURIComponent(redirect_url),
      state: "",
      style: "black",
      href: twoDCodeBoxStyleFile
    });


    //limit the height of wechat 2D code
    $("iframe").each(function () {
      $(this).css("height", "300px");
    });

    var getUrlParam = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    }


    var apiCode = getUrlParam("code");
    if (apiCode != null) {

      //request for weixin user information
      var requestUserInfoData = {
        code : apiCode
      };
      $.ajax({
        cache: true,
        type: "GET",
        url: requestUserInfoUrl,
        data: requestUserInfoData,
        dataType: "json",
        success: function (data) {
          var obj = data.data;
          localStorage.setItem("userId", obj.userId);
          localStorage.setItem("userAvatar", obj.userAvatar);
          localStorage.setItem("userToken", obj.userToken);
          localStorage.setItem("firstName", obj.firstName)
          var userHref = $('#user-label').attr('href');
          $('#user-label').attr("href",userHref + obj.userId);
          $('#user-name').text(obj.firstName);
          $('#user-avatar').attr("src",obj.userAvatar+"!userSmallAvatar");
          $('.has-cached-user-info').show();
          $('#register').hide();
          $('#login').hide();
        },
        error: function () {
          console.log("error");
        }
      });

    }

    else {
      console.log("no code here");
    }


  }
}

