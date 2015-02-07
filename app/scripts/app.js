'use strict';


$( document ).ready(function() {
  langSwitch.initLang();
  langSwitch.buttonClicked();
  schoolInput.typeAhead();
  schoolInput.formSubmit();
  helpContact.showHideDropdown();

$('.newLink').hide();


  $('#register-form').submit(function(e){
    var email = $('#emailaddress').val();
    var pwd = $('#password').val();
    if(email==""&&pwd=="") {
      $('.form-group').addClass("has-error");
      e.preventDefault();
      $('#msg').show("slow").html("The above fields cannot be blank!");
    return;
    }
    else if(email=="") {
      $('#emailaddress').addClass("has-error");
      e.preventDefault();
      $('#msg').show("slow").html("Email address cannot be blank!");
      return;
    }
    else if(pwd=="") {
      $('#password').addClass("has-error");
      e.preventDefault();
      $('#msg').show("slow").html("Password cannot be blank!");
      return;
    }
    var end = email.split(".");
    if(end.length==1) {$('#emailaddress').addClass("has-error");$('#msg').show("slow").html("Invalid email address!");e.preventDefault();return;}
    if(end[1]!="edu") {$('#emailaddress').addClass("has-error");$('#msg').show("slow").html("You must register with an .edu email address!");e.preventDefault();return;};
    <!-- use ajax to submit -->
    var postData = $('#register-form').serialize();
    $('.form-group').removeClass("has-error");
    /*$.ajax({
      cache:true,
      type:post,
      url:$('register-form').attr("action"),
      data:postData,
      dataType:json,
      success:function(data){
        alert("aaa");


      },
      error:function(){
        alert("aa");


      }

    });*/
    e.preventDefault();
    $('#RegisterModal').modal('hide');
    $('#InformationModal1').modal('show');
  })


  $('#login-submit').click(function(){
    var host_url="http://121.199.3.126:3000/v1/users/login";
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
        var obj = eval(data.data);
        console.log(obj);
        $('.oldLink').hide();
        $('.newLink').attr("href","").html(obj.firstName);
        $('.newLink').show();
        $('#LoginModal').modal('hide');
      },
      error:function(){
        alert("aa");
      }

    })
  })

  $('#personal-form-1').submit(function(e){
    var first = $('#firstname').val();
    var last = $('#lastname').val();
    var uni = $('university').val()
    if(first==""&&last=="") {
      $('.form-group').addClass("has-error");
      e.preventDefault();
      $('#msg3').show("slow").html("The above fields cannot be blank!");
      return;
    }
    else if(first=="") {
      $('#firstname').addClass("has-error");
      e.preventDefault();
      $('#msg3').show("slow").html("First name cannot be blank!");
      return;
    }
    else if(last=="") {
      $('#lastname').addClass("has-error");
      e.preventDefault();
      $('#msg3').show("slow").html("Last name cannot be blank!");
      return;
    }
    $.ajax({
      cache:true,
      type:post,
      url:$('information-form-1').attr("action"),
      data:postData,
      dataType:json,
      success:function(data){
        location.reload();
      },
      error:function(){
        alert("aa");
      }

    })
  })
});
