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

var universitiesMap = {
  'Columbia University': 'columbia',
  'New York University': 'nyu',
  'Stony Brook University': 'stony',
  'City University of New York': 'cuny'
};

var appHost = 'http://app.roomhunter.us';

if(location.hostname !== 'roomhunter.us' && location.hostname !== 'www.roomhunter.us') {
  appHost = 'http://' + location.hostname + ':2001';
}

$( document ).ready(function($) {

  $('.university-typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'schools',
    displayKey: 'value',
    source: substringMatcher(Object.keys(universitiesMap)),
    templates: {
      empty: [
        '<div class="tt-empty-message text-muted">',
        '<i class="fa fa-frown-o"></i>',
        'unable to find any schools matching current query',
        '</div>'
      ].join('\n')
    }
  });

  $('#search-str').change(function(){
    var input = $('#search-str');
    var btn = $('#search-btn');

    if(input.val() in universitiesMap) {
      btn.attr('disabled', 'disabled');
    }
    else {
      btn.removeAttr('disabled');
    }
  });

  $('#query-form').submit(function(e){
    e.preventDefault();
    //console.log($('#search-str').val());
    window.location = appHost + '/#/li/' + universitiesMap[$('#search-str').val()];
  });

  $('a.popular-university-container').click(function(e){
    e.preventDefault();
    window.location = appHost + $(this).attr('href');
  });
});
