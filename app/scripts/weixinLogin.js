/**
 * Created by xinyue on 4/2/15.
 */
'user strict'

var weixinLogin = {

  initialization: function () {
    var appId = "wxc685011a4fb095bd";
    var appSecret = "5ae24c2aa5bca08b8c8732df9ccf9a3f";
    var redirect_url = "http://121.199.3.126";
    var requestUserInfoUrl = "http://121.199.3.126:3000/users/wechat/login"
    var twoDCodeBoxStyleFile = "http://localhost:9000/styles/wechat-related.css";

    var wechat_login = new WxLogin({
      id: "wechat-login-2D-code",
      appid: appId,
      scope: "snsapi_login",
      redirect_uri: encodeURIComponent(redirect_url),
      state: "",
      style: "black"
      //href: twoDCodeBoxStyleFile
    });

    //var wechat_register = new WxLogin({
    //  id: "wechat-register-2D-code",
    //  appid: appId,
    //  scope: "snsapi_login",
    //  redirect_uri: encodeURIComponent(redirect_url),
    //  state: "",
    //  style: "black"
    //  href: twoDCodeBoxStyleFile
    //});


    $("iframe").each(function () {
      $(this).css("height", "350px");
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
        type: "POST",
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
          location.reload();
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

