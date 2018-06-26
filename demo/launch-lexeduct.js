function launch(prefix, container, config) {
  if (typeof container === 'string') {
    container = document.getElementById(container);
  }
  config = config || {};

  function loadThese(deps, callback) {
    var loaded = 0;
    for (var i = 0; i < deps.length; i++) {
      var elem = document.createElement('script');
      elem.src = prefix + deps[i];
      elem.onload = function() {
        if (++loaded < deps.length) return;
        callback();
      }
      document.body.appendChild(elem);
    }
  }

  loadThese([
    "lexeduct-transformers.js",
    "yoob/element-factory.js",
    "lexeduct-browser.js"
  ], function() {
    var initialText = "" +
      "A thing of beauty is a joy for ever:\n" +
      "Its loveliness increases; it will never\n" +
      "Pass into nothingness; but still will keep\n" +
      "A bower quiet for us, and a sleep\n" +
      "Full of sweet dreams, and health, and quiet breathing.\n" +
      "Therefore, on every morrow, are we wreathing\n" +
      "A flowery band to bind us to the earth,\n" +
      "Spite of despondence, of the inhuman dearth\n" +
      "Of noble natures, of the gloomy days,\n" +
      "Of all the unhealthy and o'er-darkened ways\n" +
      "Made for our searching: yes, in spite of all,\n" +
      "Some shape of beauty moves away the pall\n" +
      "From our dark spirits. Such the sun, the moon,\n" +
      "Trees old and young, sprouting a shady boon\n" +
      "For simple sheep; and such are daffodils\n" +
      "With the green world they live in; and clear rills\n" +
      "That for themselves a cooling covert make\n" +
      "'Gainst the hot season; the mid forest brake,\n" +
      "Rich with a sprinkling of fair musk-rose blooms:\n" +
      "And such too is the grandeur of the dooms\n" +
      "We have imagined for the mighty dead;\n" +
      "All lovely tales that we have heard or read:\n" +
      "An endless fountain of immortal drink,\n" +
      "Pouring unto us from the heaven's brink.\n";
    
    (new LexeductUI()).init({
        container: container,
        initialText: initialText,
        liveMode: true
    });
  });
}
