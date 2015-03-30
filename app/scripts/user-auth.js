'use strict';

var userAuth = {
  userLabelClicked: function () {
    $('#user-label').click(function () {
      var t = localStorage.getItem('userToken');
      var apiHost = 'https://api.roomhunter.us/';
      if (location.hostname !== 'roomhunter.us') {
        apiHost = 'http://121.199.3.126:3000/';
      }
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
      $('#register-modal').modal('show');
    });
  },
  loginButtonClicked: function () {
    $('#login').click(function () {
      $('#login-modal').modal('show');
    });
  },
  registerFormSubmit: function () {
    $('#register-submit').click(function () {
      var host_url="http://121.199.3.126:3000/v1/users/register";
      var email = $('#emailaddress').val();
      var pwd = $('#password').val();
      var firstname = $('#firstName').val();
      var lastname = $('#lastName').val();
      if (email == "" || pwd == ""||firstname==""||lastname=="") {
        $('.form-group').addClass("has-error");
        e.preventDefault();
        $('#msg').show("slow").html("The above fields cannot be blank!");
        return;
      }
      var end = email.split(".");
      if (end.length == 1) {
        $('#emailaddress').addClass("has-error");
        $('#msg').show("slow").html("Invalid email address!");
        e.preventDefault();
        return;
      }
      if (end[1] != "edu") {
        $('#emailaddress').addClass("has-error");
        $('#msg').show("slow").html("You must register with an .edu email address!");
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
          //localStorage.setItem('userId',obj.userId);
          localStorage.setItem('userFirstName',obj.firstName);
          localStorage.setItem('userAvatar',obj.userAvatar);
          alert(obj.userToken);
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
          alert("aa");
        }
      })
    })
  },

  loginFormSubmit: function () {
    $('#login-submit').click(function(){
      var host_url="http://121.199.3.126:3000/users/login";
      var email = $('#emailaddress1').val();
      var pwd = $('#password1').val();
      if(email==""&&pwd=="") {
        $('.form-group').addClass("has-error");
        e.preventDefault();
        $('#msg2').show("slow").html("The above fields cannot be blank!");
        return;
      }
      else if(email=="") {
        $('#emailaddress').addClass("has-error");
        e.preventDefault();
        $('#msg2').show("slow").html("Email address cannot be blank!");
        return;
      }
      else if(pwd=="") {
        $('#password').addClass("has-error");
        e.preventDefault();
        $('#msg2').show("slow").html("Password cannot be blank!");
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
          localStorage.setItem('userToken',obj.token);
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
          alert("aa");
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
      var homepageAddress = "http://roomhunter.us";
      if (location.hostname !== 'roomhunter.us') {
        homepageAddress = 'http://121.199.3.126';
      }
      $('.none-cached-user-info').css('display', 'block');
      $('.has-cached-user-info').css('display', 'none');
      window.location.href = homepageAddress;
    })
  },

  profileFormSubmit: function () {
    $('#personal-form-1').submit(function (e) {
      var first = $('#firstname').val();
      var last = $('#lastname').val();
      var uni = $('university').val()
      if (first == "" && last == "") {
        $('.form-group').addClass("has-error");
        e.preventDefault();
        $('#msg3').show("slow").html("The above fields cannot be blank!");
        return;
      }
      else if (first == "") {
        $('#firstname').addClass("has-error");
        e.preventDefault();
        $('#msg3').show("slow").html("First name cannot be blank!");
        return;
      }
      else if (last == "") {
        $('#lastname').addClass("has-error");
        e.preventDefault();
        $('#msg3').show("slow").html("Last name cannot be blank!");
        return;
      }
      $.ajax({
        cache: true,
        type: 'POST',
        url: $('information-form-1').attr("action"),
        data: postData,
        dataType: json,
        success: function (data) {
          location.reload();
        },
        error: function () {
          alert("aa");
        }

      })
    })

  }
};



