// fork getUserMedia for multiple browser versions, for those
// that need prefixes
navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia);

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var stream;

//set up the different audio nodes we will use for the app
var analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

// set up canvas context for visualizer
//main block for doing the audio recording
if (navigator.getUserMedia) {
   navigator.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      },

      // Success callback
      function(stream) {
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        /*chrome.storage.sync.get('visualSetting', function(items) {
          var visualSetting = items.visualSetting || 'spectrum';
          document.querySelector('#visual-setting').value = visualSetting;
          visualize(items.visualSetting || 'spectrum');
        });*/
      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

function avg(dataArray, start, end) {
      return dataArray.slice(start, end).reduce(function(sum, bin) {
          return sum + bin
      }) / (end - start);
}

function visualize() {
    analyser.fftSize = 64;
    var hiClip = 10;
    var loClip = 50;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var angularStep = (2 * Math.PI) / (bufferLength - loClip);

    function draw() {
      analyser.getByteFrequencyData(dataArray);

      const lowFreqAvg = dataArray.slice(0, loClip).reduce(function(sum, bin) {
          return sum + bin
      }) / loClip;
      const th = 180;
      const l1 = Math.floor(Math.min(avg(dataArray, 0, 3), th) / th * 4);
      const l2 = Math.floor(Math.min(avg(dataArray, 8, 10), th) / th * 4);
      const l3 = Math.floor(Math.min(avg(dataArray, 17, 20), th) / th * 4);
      const l4 = Math.floor(Math.min(avg(dataArray, 45, 49), th) / th * 4);

      port.send(textEncoder.encode('' + l1 + l2 + l3 + l4))
      setTimeout(visualize, 50)
    }
    draw();
}

setTimeout(visualize, 200);
