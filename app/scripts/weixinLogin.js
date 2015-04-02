/**
 * Created by xinyue on 4/2/15.
 */
'user strict'

var weixinLogin = {

    initialization : function () {
      var wechat_login = new WxLogin({
        id:"wechat-login-2D-code",
        appid: "wxc685011a4fb095bd",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent("http://roomhunter.us"),
        state: "",
        style: "black",
        href: "http://localhost:9000/styles/wechat-related.css"
      });

      var wechat_register = new WxLogin({
        id:"wechat-register-2D-code",
        appid: "wxc685011a4fb095bd",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent("http://roomhunter.us"),
        state: "",
        style: "black",
        href: "http://localhost:9000/styles/wechat-related.css"
      });

      $("iframe").each(function () {
        $(this).css("height", "300px");
      })

    }
}
