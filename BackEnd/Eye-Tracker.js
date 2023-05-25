let xprediction;
let yprediction;
webgazer
  .setGazeListener(function (data, elapsedTime) {
    if (data == null) {
      return;
    }
    xprediction = data.x; //these x coordinates are relative to the viewport
    yprediction = data.y; //these y coordinates are relative to the viewport
    console.log(elapsedTime); //elapsed time is based on time since begin was called
  })
  .begin();

webgazer.setTracker("TFFacemesh"); //set a tracker module
webgazer.addTrackerModule("newTracker", NewTrackerConstructor); //add a new tracker module
webgazer.setRegression("ridge"); //set a regression module
webgazer.addRegressionModule("newReg", NewRegConstructor); //add a new regression module

webgazer.util.bound(prediction);
prediction.x; //now always in the bounds of the viewport
prediction.y; //now always in the bounds of the viewport

/*
if (yprediction < 50) {
  $(window).scrollTop($(window).scrollTop() - 5);
}
if (yprediction > window.innerHeight - 50) {
  $(window).scrollTop($(window).scrollTop() + 5);
} 
*/
