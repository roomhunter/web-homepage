'use strict';
var video1 = document.getElementsByTagName("video")[0];
// video's default 'canplaythrough' doesn't work well
video1.waiting = function () {
  video1.stop();
  video1.progress = function (){
    if(video1.buffered.length < 1) {
      return;
    }
    var percentage = video1.buffered.end(0) / video1.duration;
    if (percentage > 0.3) {
      video1.play();
      video1.removeEventListener('progress');
    }
  };
};

