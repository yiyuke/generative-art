const frame = new Frame("fit", 1024, 768, white, black);
frame.on("ready", () => {
  // ES6 Arrow Function - similar to function(){}
  zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

  // often need below - so consider it part of the template
  let stage = frame.stage;
  let stageW = frame.width;
  let stageH = frame.height;

  // REFERENCES for ZIM at http://zimjs.com
  // see http://zimjs.com/learn.html for video and code tutorials
  // see http://zimjs.com/docs.html for documentation
  // see https://www.youtube.com/watch?v=pUjHFptXspM for INTRO to ZIM
  // see https://www.youtube.com/watch?v=v7OT0YrDWiY for INTRO to CODE

  // CODE HERE

  // create grey scale border by tiling rectangles
  // we could tile an arrow function but we will split it up into steps here
  // return a black rectangle with a random alpha
  function makeRectangle() {
    return new Rectangle(stageW / 10, stageH, `rgba(0,0,0,${rand(0.02, 0.2)})`);
  }
  const tile = new Tile({
    obj: makeRectangle,
    cols: 10,
    clone: false, // otherwise would clone the first rectangle made
  }).addTo();

  // optionally scroll the Tile - cache it for better performance on mobile
  const scroller = new Scroller(tile.cache(), 0.3);

  // add a white central core - optional
  new Rectangle(stageW, stageH * 0.8, white).cache().center();

  // create a Blob to animate - give it a large controlLength to make curves smoother
  // then loop through the control points and wiggle them by
  // property, baseAmount, minAmount, maxAmount, minTime, maxTime
  // update the Blob in a Ticker (otherwise will not see the animation)
  const blob = new Blob({
    color: black,
    points: 10,
    controlLength: 500,
    interactive: false,
  }).center();
  loop(blob.pointControls, (point) => {
    point.wiggle("x", point.x, 100, 400, 2500, 5500);
    point.wiggle("y", point.y, 50, 200, 2500, 5500);
    point.wiggle("rotation", 0, 100, 300, 5500, 15000);
  });
  Ticker.add(() => {
    blob.update();
  });

  // DOCS FOR ITEMS USED
  // https://zimjs.com/docs.html?item=Frame
  // https://zimjs.com/docs.html?item=Rectangle
  // https://zimjs.com/docs.html?item=Blob
  // https://zimjs.com/docs.html?item=Tile
  // https://zimjs.com/docs.html?item=wiggle
  // https://zimjs.com/docs.html?item=loop
  // https://zimjs.com/docs.html?item=addTo
  // https://zimjs.com/docs.html?item=removeFrom
  // https://zimjs.com/docs.html?item=center
  // https://zimjs.com/docs.html?item=Scroller
  // https://zimjs.com/docs.html?item=timeout
  // https://zimjs.com/docs.html?item=zog
  // https://zimjs.com/docs.html?item=Ticker

  // FOOTER
  createIcon(26, 26);
  const greet = createGreet();
  timeout(2000, () => {
    greet.removeFrom();
  });
}); // end of ready
