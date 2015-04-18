'use strict';

var userAuth = {

  apiHost: function () {
    if (location.hostname === 'roomhunter.us') {
      return 'https://api.roomhunter.us/v1';
    }
    else {
      return 'https://test.roomhunter.us:3100/v1/';
    }
  },
  userLabelClicked: function () {
    $('#user-label').click(function () {
      var t = localStorage.getItem('userToken');
      var req = {
        userToken: t
      }
    });
  },
  displayRegisterAndLogin: function () {
    $('.none-cached-user-info').css('display', 'block');
    $('.has-cached-user-info').css('display', 'none');
  },
  displayUserLabel: function () {
    var id = localStorage.getItem('userId'),
      name = localStorage.getItem('userFirstName'),
      avatar = localStorage.getItem('userAvatar'),
      userLabel = $('#user-label');
    $('.none-cached-user-info').css('display', 'none');
    $('.has-cached-user-info').css('display', 'block');
    userLabel.attr('href', 'app/#/user/edit/' + id);
    userLabel.children('span').text(name);
    userLabel.children('img').attr('src', avatar+"!userSmallAvatar");
  },
  initAuthViewWithCachedInfo: function () {
    var t = localStorage.getItem('userToken');
    var id = localStorage.getItem('userId');
    var name = localStorage.getItem('userFirstName');
    var avatar = localStorage.getItem('userAvatar');

    if (t && name && avatar && id) {
      userAuth.displayUserLabel();
    }
    else {
      userAuth.displayRegisterAndLogin()
    }
  },

  registerButtonClicked: function () {
    $('#register').click(function () {
      $('#login-modal').modal('show');
      $('#msg').hide("fast");
      $('.form-group').removeClass("has-error");
      $('.login-related').addClass('hidden');
      $('.register-related').removeClass('hidden');
    });
  },
  loginButtonClicked: function () {
    $('#login').click(function () {
      $('#login-modal').modal('show');
      $('#msg').hide("fast");
      $('.form-group').removeClass("has-error");
      $('.register-related').addClass('hidden');
      $('.login-related').removeClass('hidden');
    });
  },
  forgetPwdButtonClicked: function () {
    $('#forgetPwd').click(function () {
      $('#login-modal').modal('hide');
      $('#forgetPwd-modal').modal('show');
      $('.form-group').removeClass("has-error");
    })

  },
  emailRegex: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,

  registerFormSubmit: function () {
    $('#msg').hide("fast");
    $('#register-submit').click(function () {
      $('.form-group').removeClass("has-error");
      var host_url = userAuth.apiHost() + '/users/register';
      var email = $('#emailaddress').val();
      var pwd = $('#password').val();
      var firstname = $('#firstName').val();
      var lastname = $('#lastName').val();
      if (email == "" || pwd == ""||firstname==""||lastname=="") {
        $('.form-group').addClass("has-error");
        $('#msg').show("slow").html("The following fields cannot be blank!");
        return;
      }
      if (!userAuth.emailRegex.test(email)) {
        $('.email-form-group').addClass("has-error");
        $('#msg').show("slow").html("Invalid email address!");
        return;
      };
      <!-- use ajax to submit -->
      var postData_register = $('#register-form').serialize();
      $.ajax({
        cache:true,
        type:"POST",
        url:host_url,
        data:postData_register,
        dataType:"json",
        success:function(data){
          var obj = eval(data.data);
          localStorage.setItem('userToken',obj.userToken);
          localStorage.setItem('userId',obj.userId);
          localStorage.setItem('userFirstName',obj.firstName);
          localStorage.setItem('userAvatar',obj.userAvatar);
          $('#register').hide();
          $('#login').hide();
          var userHref = $('#user-label').attr('href');
          $('#user-label').attr("href",userHref + obj.userId);
          $('#user-name').text(obj.firstName);
          $('#user-avatar').attr("src",obj.userAvatar+"!userSmallAvatar");
          $('.has-cached-user-info').show();
          $('#register-modal').modal('hide');
        },
        error:function(){
          //alert("aa");
        }
      })
    })
  },

  loginFormSubmit: function () {
    $('#login-submit').click(function(){
      $('.form-group').removeClass("has-error");
      $('#msg').hide("fast");
      var host_url = userAuth.apiHost() + '/users/login';
      var email = $('#emailaddress').val();
      var pwd = $('#password').val();
      if(email==""&&pwd=="") {
        $('.form-group').addClass("has-error");
        $('#msg').show("slow").html("The following fields cannot be blank!");
        return;
      }
      else if(!userAuth.emailRegex.test(email)) {
        $('.email-form-group').addClass("has-error");
        $('#msg').show("slow").html("Invalid email address!");
        return;
      }
      else if(pwd=="") {
        $('#msg').show("slow").html("Password cannot be blank!");
        return;
      }

      var postData_login = $('#login-form').serialize();

      $.ajax({
        cache:true,
        type:"POST",
        url:host_url,
        data:postData_login,
        dataType:"json",
        success:function(data){
          console.log($('#login-form').serialize());
          var obj = eval(data.data);
          localStorage.setItem('userToken',obj.userToken);
          localStorage.setItem('userId',obj.userId);
          localStorage.setItem('userFirstName',obj.firstName);
          localStorage.setItem('userAvatar',obj.userAvatar);
          $('#register').hide();
          $('#login').hide();
          var userHref = $('#user-label').attr('href');
          $('#user-label').attr("href",userHref + obj.userId);
          $('#user-name').text(obj.firstName);
          $('#user-avatar').attr("src",obj.userAvatar+"!userSmallAvatar");
          $('.has-cached-user-info').show();
          $('#login-modal').modal('hide');
        },
        error:function(){
          //alert("aa");
        }

      })
    })
  },
  logOut: function () {
    $('#logout').click(function () {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userAvatar");
      localStorage.removeItem("userFirstName");
      $('.none-cached-user-info').css('display', 'block');
      $('.has-cached-user-info').css('display', 'none');
      //window.location.href = location.hostname === 'roomhunter.us' ? "https://roomhunter.us" : 'https://121.199.3.126';
    })
  },

  forgetPwdFormSubmit: function () {
    $('#forgetPwd-submit').click(function () {
      var host_url = userAuth.apiHost() + "/users/forget-pwd";
      $.ajax({
        cache:true,
        type:"POST",
        url:host_url,
        data:$('#forgetPwd-form').serialize(),
        dataType:"json",
        success:function(data){
          $('#forgetPwd-modal').modal('hide');
          $('#alertMessage').show();
          setTimeout("$('#alertMessage').hide()",5000);

        },
        error:function(){
          console.log("error");
        }

      })
    })
  }
};



