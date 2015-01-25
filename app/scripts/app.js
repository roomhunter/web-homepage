'use strict';

/**
 * @ngdoc overview
 * @name UniversityLocatorApp
 * @description
 * # UniversityLocatorApp
 *
 * Main module of the application.
 */
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });

    cb(matches);
  };
};

var universities = ['Columbia University', 'New York University', 'Stony Brook University', 'City University of New York'];
var nameToLink = {
  'Columbia University': 'columbia',
  'New York University': 'nyu',
  'Stony Brook University': 'stony',
  'City University of New York': 'cuny'
};

var appHost = 'http://app.roomhunter.us';

$('.newLink').hide();

$( document ).ready(function($) {
  $('.university-typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'states',
    displayKey: 'value',
    source: substringMatcher(universities)
  });
  $('#search-btn').click(function(e){
    window.location = appHost + '/#/li/' + nameToLink[$('#search-str').val()];
  });


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


  $('#login-form').submit(function(e){
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
    $.ajax({
      cache:true,
      type:post,
      url:$('login-form').attr("action"),
      data:postData,
      dataType:json,
      success:function(data){
        $('.oldLink').hide();
        location.reload();
        $('.newLink').find('a').attr("href","/profile?username="+username).html(username);
        $('.newLink').show();
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
