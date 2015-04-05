/**
 * Created by xinyue on 4/2/15.
 */
'user strict'

var weixinLogin = {

    initialization : function () {
      var appId = "wxc685011a4fb095bd";
      var appSecret = "5ae24c2aa5bca08b8c8732df9ccf9a3f";
      var redirect_url = "http://121.199.3.126";
      var twoDCodeBoxStyleFile = "http://localhost:9000/styles/wechat-related.css";

      var wechat_login = new WxLogin({
        id:"wechat-login-2D-code",
        appid: appId,
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent(redirect_url),
        state: "",
        style: "black"
        //href: twoDCodeBoxStyleFile
      });

      var wechat_register = new WxLogin({
        id:"wechat-register-2D-code",
        appid: appId,
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent(redirect_url),
        state: "",
        style: "black"
        //href: twoDCodeBoxStyleFile
      });

      $("iframe").each(function () {
        $(this).css("height", "350px");
      });

      var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
      };

      var getUserInfo = function (code) {
        var accessTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token";
        var requestParam = {
          appid: appId,
          secret: appSecret,
          code: code,
          grant_type: "authorization_code"
        };
        var accessToken = null;
        var userOpenId = null;

        $.ajax({
          cache:true,
          type:"GET",
          url:accessTokenUrl,
          data:requestParam,
          dataType:"jsonp",
          success:function(data){
            console.log(data.length);
            console.log(data.access_token);

            accessToken = data.access_token;
            userOpenId = data.openid;
          },
          error:function(data){
            console.log(data);
          }
        });
      };

      var apiCode = getUrlParam("code");
      if(apiCode != null)
        getUserInfo(apiCode);
      else
        console.log("no code here");

    }
}
