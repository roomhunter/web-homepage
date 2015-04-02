/**
 * Created by xinyue on 4/2/15.
 */
'user strict'

var weixinLogin = {

    initialization : function () {
      var objj = new WxLogin({
        id:"wechat-twoD-code",
        appid: "wxc685011a4fb095bd",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent("http://roomhunter.us"),
        state: "",
        style: "black",
        //href: "/styles/wechat-related.css"
      });

    }
}
