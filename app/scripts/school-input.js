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
    img: 'http://roomhunter-images.b0.upaiyun.com/apartments/030972072134d06caef7867d83ca027c.jpeg'
  },
  'New York University': {
    token: 'nyu',
    img: 'http://roomhunter-images.b0.upaiyun.com/apartments/35ad361d583743f33bbe0b276a84a142.jpg'
  },
  'Stony Brook University': {
    token: 'stony',
    img: 'http://roomhunter-images.b0.upaiyun.com/apartments/44291985f3ea88a843917730ce6537e2.jpeg'
  },
  'City University of New York': {
    token: 'cuny',
    img: 'http://roomhunter-images.b0.upaiyun.com/apartments/9ac2e000c2e38fe7b16af83874292d62.png'
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
      window.location = 'app/#/li/' + url;
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
