'use strict';

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

var universityMap = {
  'Columbia University': 'columbia',
  'New York University': 'nyu',
  'Stony Brook University': 'stony',
  'City University of New York': 'cuny'
};

//var universityArray =

var appHost = 'http://app.roomhunter.us';

if(location.hostname !== 'roomhunter.us' && location.hostname !== 'www.roomhunter.us') {
  appHost = 'http://' + location.hostname + ':2001';
}

$( document ).ready(function($) {

  var inputTypeahead = $('#search-str').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'schools',
    displayKey: 'value',
    source: substringMatcher(Object.keys(universityMap)),
    templates: {
      empty: [
        '<div class="tt-empty-message text-muted">',
        '<i class="fa fa-frown-o"></i>',
        'unable to find any schools matching current query',
        '</div>'
      ].join('\n')
    }
  });

  inputTypeahead
    .on('typeahead:selected', function(){
      var input = $('#search-str').val();
      var url = universityMap[input];

      if(!url) {
        return false;
      }

      window.location = appHost + '/#/li/' + url;
  })
    .on('typeahead:cursorchanged', function () {
      console.log($('#search-str').val());
      console.log('autocomplete');
      var btn = $('#search-btn');
      btn.removeClass('disabled');
  })
    .on('typeahead:closed', function () {
      var input = $('#search-str').val();
      var btn = $('#search-btn');
      var url = universityMap[input];

      if(!url) {
        console.log('invalid');

        btn.addClass('disabled');
      }
      else {
        console.log('valid');
        btn.removeClass('disabled');
      }
    });

  inputTypeahead.keyup(function () {
    var input = $('#search-str').val();
    var btn = $('#search-btn');
    var url = universityMap[input];

    if(!url) {
      console.log('invalid');

      btn.addClass('disabled');
    }
    else {
      console.log('valid');
      btn.removeClass('disabled');
    }
  });
  //.on('input', function(){
  //  var input = $('#search-str').val();
  //  var btn = $('#search-btn');
  //  var url = universityMap[input];
  //
  //  if(!url) {
  //    console.log('invalid');
  //
  //    btn.addClass('disabled');
  //  }
  //  else {
  //    console.log('valid');
  //    btn.removeClass('disabled');
  //  }
  //});

  $('#query-form').submit(function(e){
    var input = $('#search-str').val();
    var url = universityMap[input];

    if(!url) {
      return false;
    }

    e.preventDefault();
    window.location = appHost + '/#/li/' + url;
  });

  $('a.popular-university-container').click(function(e){
    e.preventDefault();
    window.location = appHost + $(this).attr('href');
  });

  $('.help-contact')
    .mouseenter(function(){
    $('.help-dropdown').addClass('show');
  })
    .mouseleave(function(){
      $('.help-dropdown').removeClass('show');
    });
});
