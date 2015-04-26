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
    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({value: str, img: universityMap[str]['img']});
      }
    });

    cb(matches);
  };
};

var universityMap = {
  'Columbia University': {
    token: 'columbia',
    img: 'https://d1mnrj0eye9ccu.cloudfront.net/images/columbia-icon.jpeg'
  },
  'New York University': {
    token: 'nyu',
    img: 'https://d1mnrj0eye9ccu.cloudfront.net/images/nyu-icon.jpg'
  },
  'Fordham University': {
    token: 'fordham',
    img: 'https://d1mnrj0eye9ccu.cloudfront.net/images/fordham-icon.jpg'
  },
  'Parsons The New School': {
    token: 'parsons',
    img: 'https://d1mnrj0eye9ccu.cloudfront.net/images/parsons-icon.png'
  },
  'City University of New York': {
    token: 'cuny',
    img: 'https://d1mnrj0eye9ccu.cloudfront.net/images/cuny-icon.png'
  },
  'Fashion Institute of Technology': {
    token: 'fit',
    img: 'https://d1mnrj0eye9ccu.cloudfront.net/images/fit-icon.gif'
  },
  'New York Institute of Technology': {
    token: 'nyit',
    img: 'https://d1mnrj0eye9ccu.cloudfront.net/images/nyit-icon.jpg'
  },
  'Pratt Institute': {
    token: 'pratt',
    img: 'https://d1mnrj0eye9ccu.cloudfront.net/images/pratt-icon.jpg'
  },
  'Pace University': {
    token: 'pace',
    img: 'https://d1mnrj0eye9ccu.cloudfront.net/images/pace-icon.jpg'
  }
};

var schoolInput;
schoolInput = {

  formSubmit: function () {
    $('#query-form').submit(function (e) {
      var input = $('#search-str').val();
      var url = universityMap[input]['token'];

      if (!url) {
        return false;
      }

      e.preventDefault();
      localStorage.setItem('toSchool', input);
      window.location = 'app/#/list/' + url;
    });

  },
  compileTemplate: function (context) {
    return '<img width="26" src="' + context.img + '"><span>' + context.value + '</span>';
  },
  init: function (emptyMessage) {
    $('#search-str').typeahead('destroy');
    var input = $('#search-str').typeahead({
        hint: true,
        highlight: true,
        minLength: 0
      },
      {
        name: 'schools',
        displayKey: 'value',
        source: substringMatcher(Object.keys(universityMap)),
        templates: {
          empty: [
            '<div class="tt-empty-message text-muted">',
            '<i class="icon-frown"></i>',
            emptyMessage,
            '</div>'
          ].join('\n'),
          suggestion: schoolInput.compileTemplate
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
        var url = universityMap[input]['token'];

        if (!url) {
          return false;
        }
        localStorage.setItem('toSchool', input);
        window.location = 'app/#/list/' + url;
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
        if (input === '') {
          langSwitch.initLang();
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
    inputTypeahead.click(function () {
      var val = inputTypeahead.typeahead('val');
      if (val === '') {
        // trick, force to trigger updating query
        inputTypeahead.typeahead('val', 'c');
        inputTypeahead.typeahead('val', '');
        inputTypeahead.attr('placeholder', '');
      }
    });
  }
};
