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
});
