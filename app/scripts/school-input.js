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

var schoolInput;
schoolInput = {

  formSubmit: function () {
    $('#query-form').submit(function (e) {
      var input = $('#search-str').val();
      var url = universityMap[input];

      if (!url) {
        return false;
      }

      e.preventDefault();
      window.location = 'app/#/li/' + url;
    });

  },
  init: function (emptyMessage) {
    $('#search-str').typeahead('destroy');
    var input = $('#search-str').typeahead({
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
            emptyMessage,
            '</div>'
          ].join('\n')
        }
      });
    return input;
  },
  typeAhead: function () {
    var inputTypeahead = $('#search-str');
    //if (localStorage.getItem('userLang') === 'en') {
    //  inputTypeahead = schoolInput.init('unable to find any schools matching current query');
    //}
    //else {
    //  inputTypeahead = schoolInput.init('无法找到匹配的学校');
    //}

    inputTypeahead
      .on('typeahead:selected', function () {
        var input = $('#search-str').val();
        var url = universityMap[input];

        if (!url) {
          return false;
        }

        window.location = 'app/#/li/' + url;
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

        if (!url) {
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

      if (!url) {
        console.log('invalid');

        btn.addClass('disabled');
      }
      else {
        console.log('valid');
        btn.removeClass('disabled');
      }
    });
  }
};
