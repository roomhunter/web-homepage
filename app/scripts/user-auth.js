'use strict';

var userAuth = {

  apiHost: function () {
    return location.hostname === 'roomhunter.us' ? 'https://api.roomhunter.us/v1' : 'https://test.roomhunter.us:3100/v1/';
  },
  redirectHost: function () {
    return location.hostname === 'roomhunter.us' ? "https://roomhunter.us" : "https://test.roomhunter.us";
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
      name = localStorage.getItem('firstName'),
      avatar = localStorage.getItem('userAvatar'),
      userLabel = $('#user-label');
    $('.none-cached-user-info').css('display', 'none');
    $('.has-cached-user-info').css('display', 'block');
    userLabel.children('span').text(name);
    userLabel.children('img').attr('src', avatar+"!userSmallAvatar");
  },

  initAuthViewWithCachedInfo: function () {
    var t = localStorage.getItem('userToken');
    var id = localStorage.getItem('userId');
    var name = localStorage.getItem('firstName');
    var avatar = localStorage.getItem('userAvatar');

    if (t && name && avatar && id) {
      userAuth.displayUserLabel();
    }
    else {
      userAuth.displayRegisterAndLogin()
    }
  },

  registerButtonClicked: function () {
    $('#register').click(function (e) {
      e.preventDefault();
      $('#login-modal').modal('show');
      $('.form-group').removeClass("has-error");
      $('.register-related').removeClass('hidden');
      $('.login-related').addClass('hidden');
    });
  },

  loginButtonClicked: function () {
    $('#login').click(function (e) {
      e.preventDefault();
      $('#login-modal').modal('show');
      $('.form-group').removeClass("has-error");
      $('.register-related').addClass('hidden');
      $('.login-related').removeClass('hidden');
    });
  },
  forgetPwdButtonClicked: function () {
    $('#forgetPwd').click(function (e) {
      e.preventDefault();
      $('#login-modal').modal('hide');
      $('#forgetPwd-modal').modal('show');
      $('.form-group').removeClass("has-error");
    })

  },
  noAccountButtonClicked: function () {
    $('#no-account').click(function (e) {
      e.preventDefault();
      $('.form-group').removeClass("has-error");
      $('.login-related').addClass('hidden');
      $('.register-related').removeClass('hidden');
    })
  },
  returnToLoginButtonClicked: function () {
    $('#return-to-login').click(function (e) {
      e.preventDefault();
      $('.login-related').removeClass('hidden');
      $('.register-related').addClass('hidden');
    })
  },

  emailRegex: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,


  loginFormSubmit: function () {
    $('#login-form').submit(function(e){
      e.preventDefault();
      $('.form-group').removeClass("has-error");
      var host_url = userAuth.apiHost() + 'users/login';
      var email = $('#emailaddress').val();
      var pwd = $('#password').val();
      $('.button-loading-img').removeClass('invisible');

      var postData_login = $('#login-form').serialize();

      $.ajax({
        cache:true,
        type:"POST",
        url:host_url,
        data:postData_login,
        dataType:"json",
        success:function(data){
          $('.button-loading-img').addClass('invisible');
          var obj = eval(data.data);
          localStorage.setItem('userToken',obj.userToken);
          localStorage.setItem('userId',obj.userId);
          localStorage.setItem('firstName',obj.firstName);
          localStorage.setItem('userAvatar',obj.userAvatar);
          $('.none-cached-user-info').hide();
          $('#user-name').text(obj.firstName);
          $('#user-avatar').attr("src",obj.userAvatar+"!userSmallAvatar");
          $('.has-cached-user-info').show();
          $('#login-modal').modal('hide');
        },
        error:function(data){
          $('.button-loading-img').addClass('invisible');
          if(data.error.code = 404){
            $('#msg').show("fast").html("Invalid email or password");
            setTimeout(function(){
              $('#msg').hide("fast");
            }, 3000);
          }
          else{
            $('#msg').show("fast").html("Invalid login");
            setTimeout(function(){
              $('#msg').hide("fast");
            }, 3000);
          }
        }

      });
    })
  },


  logOut: function () {
    $('#logout').click(function (e) {
      e.preventDefault();
      var userToken = localStorage.getItem('userToken');
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userAvatar");
      localStorage.removeItem("firstName");
      $('.has-cached-user-info').hide();
      $('.none-cached-user-info').show();
      $('#login').show();
      var postData = {
        userToken: userToken
      };

      $.ajax({
        cache:true,
        type:'GET',
        url:userAuth.apiHost()+'users/logout',
        data:postData,
        dataType:'JSON',
        success:function(data){
          if(data.error.code==200){
            console.log('success');
          }
        },
        error:function(){
          console.log('error');
        }


      });

      //window.location.href = location.hostname === 'roomhunter.us' ? "https://roomhunter.us" : 'https://121.199.3.126';
    });
  },

  forgetPwdFormSubmit: function () {
    $('#forgetPwd-form').submit(function (e) {
      e.preventDefault();
      var host_url = userAuth.apiHost() + "users/forget-pwd";
      $('.button-loading-img').removeClass('invisible');
      $.ajax({
        cache:true,
        type:"GET",
        url:host_url,
        data:$('#forgetPwd-form').serialize(),
        dataType:"json",
        success:function(){
          $('.button-loading-img').addClass('invisible');
          $('#forgetPwd-modal').modal('hide');
          $('#alertMessage').show();
          setTimeout("$('#alertMessage').hide()",5000);
        },
        error:function(data){
          console.log("error");
          $('.button-loading-img').addClass('invisible');
          if(data.error.code = 404){
            $('#msg2').show("fast").html("Invalid email");
            setTimeout(function(){
              $('#msg2').hide("fast");
            }, 3000);
          }
          else{
            $('#msg2').show("fast").html("Invalid email");
            setTimeout(function(){
              $('#msg2').hide("fast");
            }, 3000);
          }

        }

      })
    })
  }
};



