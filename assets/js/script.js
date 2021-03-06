/*
Loads data from the html form in index.html into script.js
Used for:
  - container width
  - container height
 */
function loadData(form) {

  const oneInchUnit = 11;
 /*
Background changer for stage & select drop down boxes.
  Available Backgrounds:
    - blueWall
    - brick
    - whiteBrick
    - whiteWall
    - wood
    - whiteSwirl
  */
  $('select').change(function(){
    if($(this).val() == 'A'){
      $("select, #container").css('background-image', 'url(assets/css/img/blueWall.jpg)');
      $("select, #container").css('background-size', 'cover');
      $("select, #container").css('color', 'transparent');
      $("select, #container").css('font-style', 'bold');
      ruler();
    }
    if($(this).val() == 'B'){
      $("select, #container").css('background-image', 'url(assets/css/img/brick.jpg)');
      $("select, #container").css('background-size', 'cover');
      $("select, #container").css('color', 'transparent');
      $("select, #container").css('font-style', 'bold');
      ruler();
    }
    if($(this).val() == 'C'){
      $("select, #container").css('background-image', 'url(assets/css/img/whiteBrick.jpg)');
      $("select, #container").css('background-size', 'cover');
      $("select, #container").css('color', 'transparent');
      $("select, #container").css('font-style', 'bold');
      ruler();
    }
    if($(this).val() == 'D'){
      $("select, #container").css('background-image', 'url(assets/css/img/whiteWall.jpg)');
      $("select, #container").css('background-size', 'cover');
      $("select, #container").css('color', 'transparent');
      $("select, #container").css('font-style', 'bold');
      ruler();
    }
    if($(this).val() == 'E'){
      $("select, #container").css('background-image', 'url(assets/css/img/wood.jpg)');
      $("select, #container").css('background-size', 'cover');
      $("select, #container").css('color', 'transparent');
      $("select, #container").css('font-style', 'bold');
      ruler();
    }
    if($(this).val() == 'F'){
      $("select, #container").css('background-image', 'url(assets/css/img/whiteSwirl.jpg)');
      $("select, #container").css('background-size', 'cover');
      $("select, #container").css('color', 'transparent');
      $("select, #container").css('font-style', 'bold');
      ruler();
    }
  });



/*
Frame Changer for select drop down box
  Available Frame Sizes:
    - 5 x 7
    - 8 x 10
    - 11 x 14
    - 16 x 20
    - 18 x 24
    - 20 x 24
    - 24 x 36

Warning: To select the same frame size more than once, you must choose the
blank option to reset the choice. Once that is done you can then select the
frame size again.
 */
$('select').change(function(){

  if($(this).val() == 'fivebyseven'){
    fivebyseven();
  }

  if($(this).val() == 'eightbyten'){
    eightbyten();
  }

  if($(this).val() == 'elevenbyfourteen'){
    elevenbyfourteen();
  }

  if($(this).val() == 'sixteenbytwenty'){
    sixteenbytwenty();
  }

  if($(this).val() == 'eighteenbytwentyfour'){
    eighteenbytwentyfour();
  }

  if($(this).val() == 'twentybytwentyfour'){
    twentybytwentyfour();
  }

  if($(this).val() == 'twentyfourbythirtysix'){
    twentyfourbythirtysix();
  }





});



/*
1. Grabbing the width of the #container based on input (form.wallWidth.value)
from the html form in index.html.
Cannot put them in a function due to the need to have them global so that
they can be pulled into the Konva.Stage below.

2.  Grabbing the height of the #container based on input (form.wallHeight.value)
from the html form in index.html.
Cannot put them in a function due to the need to have them global so that
they can be pulled into the Konva.Stage below

3. Creating a variable 'control' that acts as a holder for my buttons and
drop down boxes. Below I add it to a layer so the background doesnt cover it
and to do that I have to call it from index.html into script.js
 through --> document.getElementById('controlPanel').
 */
  var width = form.wallWidth.value * 12;
  var height = form.wallHeight.value * 12;
  var container = document.getElementById('container');

  container.style.width = width + 'px';
  container.style.height = height + 'px';
  console.log("Width: " + container.style.width);
  console.log("Height: " + container.style.height);

  var control = document.getElementById('controlPanel');



/*
1.Created a variable named 'stage' that creates a new Konva.Stage, notice here
the container is referencing the html div id #container in index.html.

2. The 'width: width' is referencing up above.

3. The 'height: height' is referencing up above
*/

  var stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height,
  });


/*
1. Create a line on the stage
2. Create a line every ___ pixels
3. Add numbered tooltips on lines for size pointers
*/
var ruler = function() {
  
  var rulerLayer = new Konva.Layer();

  var rulerXGroup = new Konva.Group({
    draggable: false
  });

  var rulerYGroup = new Konva.Group({
    draggable: false
  });

  var rulerTooltipLayer = new Konva.Layer();

  console.log("Ruler: " + width)

  for(var x=0; x<width; x+=143){
    
      var myXLines = new Konva.Line({
        // points: [0, 0, 10, 0], <-- starting point
        points: [x, 0, x+5, 0],
        stroke: 'red',
        strokeWidth: 15,
      });
    
    // ex: x1 y1 x2 y2
    //     0  0  12 0
    //     12 12 24 12
    //     24 24 36 24
      rulerXGroup.add(myXLines);
      console.log("x: "+ x);
    
  }

  for(var y=0; y<width; y+=143){
    
    var myYLines = new Konva.Line({
      points: [0, y, 0, y+5],
      stroke: 'red',
      strokeWidth: 15,
    });

    rulerYGroup.add(myYLines);
    console.log("y: "+ y);
  
}

  
  rulerLayer.add(rulerXGroup);
  rulerLayer.add(rulerYGroup);
  stage.add(rulerLayer);
}





/*
Function fivebyseven(): Encompasses a function that on click will create a frame
(w/ var parentContainer & var circle) on the stage.

Function cirlce.on(): Acts as the marker for the frame (parentContainer). On
click it triggers the tooltip to be printed on the frame.

Var parentContainer creates a new Konva.Rect that acts as the frame

Var circle creates a new Konva.Circle that I attached to the the parentContainer
to act as a nail and a marker.

Var tooltip creates a text layer that I use to display the tooltip
 */
var fivebyseven = function() {

  document.getElementById('hide').addEventListener('click', function() {
      tooltip.hide();
      tooltipLayer.draw();
  }, false);

  var layer = new Konva.Layer();

  var group = new Konva.Group({
    draggable: true
  });

  var tooltipLayer = new Konva.Layer();

  var parentContainer = new Konva.Rect({
    x: 200,
    y: 200,
    width: 5 * oneInchUnit,
    height: 7 * oneInchUnit,
    fill: '#65666c',
    stroke: '#3c1704',
    strokeWidth: 13,
    ShadowOffsetX: -7,
    ShadowOffsetY: 4,
    ShadowBlur: 10,
    opacity: .9,
    draggable: false
  });

  var circle = new Konva.Circle({
    x: 200 + parentContainer.getWidth()/2,
    y: 195,
    radius: 5,
    fill: 'black',
    stroke: 'grey',
    strokeWidth: '2',
    draggable: false
  });

  //Creating tooltipOne
  var tooltip = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 13,
    padding: 5,
    visible: false,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });
  var tooltip2 = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 10,
    padding: 7,
    visible: true,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });

  group.add(parentContainer, circle);
  layer.add(group);

  tooltipLayer.add(tooltip, tooltip2);

  stage.add(layer);
  stage.add(tooltipLayer);

  circle.on('click', function() {

    var mousePos = stage.getPointerPosition();
    tooltip.position({
      x: mousePos.x - 23,
      y: mousePos.y + 20
    });
    tooltip.text("←: " + Math.round((stage.width() - (stage.width() - stage.getPointerPosition().x))/12) + '"' + "\n" +
      "→: " + Math.round((stage.width() - stage.getPointerPosition().x)/12) + '"' + "\n" +
      "↑: " + Math.round((stage.height() - (stage.height() - stage.getPointerPosition().y))/12) + '"' + "\n" +
      "↓: " + Math.round((stage.height() - stage.getPointerPosition().y)/12) + '"' 
    );
    tooltip.show();
    tooltipLayer.batchDraw();
  });


parentContainer.on("mousemove", function(){
       var mousePos = stage.getPointerPosition();
       tooltip2.position({
           x : mousePos.x + 3,
           y : mousePos.y + 3
       });
       tooltip2.text("5 in x 7 in");
       tooltip2.show();
       tooltipLayer.batchDraw();
   });
   parentContainer.on("mouseout", function(){
       tooltip2.hide();
       tooltipLayer.draw();
   });
}

/*
Function eightbyten(): Encompasses a function that on click will create a frame
(w/ var parentContainer & var circle) on the stage.

Function cirlce.on(): Acts as the marker for the frame (parentContainer). On
click it triggers the tooltip to be printed on the frame.

Var parentContainer creates a new Konva.Rect that acts as the frame

Var circle creates a new Konva.Circle that I attached to the the parentContainer
to act as a nail and a marker.

Var tooltip creates a text layer that I use to display the tooltip
 */
var eightbyten = function() {

  document.getElementById('hide').addEventListener('click', function() {
      tooltip.hide();
      tooltipLayer.draw();
  }, false);

  var layer = new Konva.Layer();

  var group = new Konva.Group({
    draggable: true
  });

  var tooltipLayer = new Konva.Layer();

  var parentContainer = new Konva.Rect({
    x: 200,
    y: 200,
    width: 8 * oneInchUnit,
    height: 10 * oneInchUnit,
    fill: '#65666c',
    stroke: '#3c1704',
    strokeWidth: 13,
    ShadowOffsetX: -7,
    ShadowOffsetY: 4,
    ShadowBlur: 10,
    opacity: .9,
    draggable: false
  });

  var circle = new Konva.Circle({
    x: 200 + parentContainer.getWidth()/2,
    y: 195,
    radius: 5,
    fill: 'black',
    stroke: 'grey',
    strokeWidth: '2',
    draggable: false
  });

  //Creating tooltipOne
  var tooltip = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 17,
    padding: 5,
    visible: false,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });
  var tooltip2 = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 10,
    padding: 7,
    visible: true,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });


  group.add(parentContainer, circle);
  layer.add(group);

  tooltipLayer.add(tooltip, tooltip2);

  stage.add(layer);
  stage.add(tooltipLayer);

  circle.on('click', function() {

    var mousePos = stage.getPointerPosition();
    tooltip.position({
      x: mousePos.x - 23,
      y: mousePos.y + 20
    });
    tooltip.text("←: " + Math.round((stage.width() - (stage.width() - stage.getPointerPosition().x))/12) + '"' + "\n" +
      "→: " + Math.round((stage.width() - stage.getPointerPosition().x)/12) + '"' + "\n" +
      "↑: " + Math.round((stage.height() - (stage.height() - stage.getPointerPosition().y))/12) + '"' + "\n" +
      "↓: " + Math.round((stage.height() - stage.getPointerPosition().y)/12) + '"' 
    );
    tooltip.show();
    tooltipLayer.batchDraw();
  });


parentContainer.on("mousemove", function(){
       var mousePos = stage.getPointerPosition();
       tooltip2.position({
           x : mousePos.x + 3,
           y : mousePos.y + 3
       });
       tooltip2.text("8 in x 10 in");
       tooltip2.show();
       tooltipLayer.batchDraw();
   });
   parentContainer.on("mouseout", function(){
       tooltip2.hide();
       tooltipLayer.draw();
   });
}

/*
Function elevenbyfourteen(): Encompasses a function that on click will create a frame
(w/ var parentContainer & var circle) on the stage.

Function cirlce.on(): Acts as the marker for the frame (parentContainer). On
click it triggers the tooltip to be printed on the frame.

Var parentContainer creates a new Konva.Rect that acts as the frame

Var circle creates a new Konva.Circle that I attached to the the parentContainer
to act as a nail and a marker.

Var tooltip creates a text layer that I use to display the tooltip
 */
var elevenbyfourteen = function() {

  document.getElementById('hide').addEventListener('click', function() {
      tooltip.hide();
      tooltipLayer.draw();
  }, false);

  var layer = new Konva.Layer();

  var group = new Konva.Group({
    draggable: true
  });

  var tooltipLayer = new Konva.Layer();

  var parentContainer = new Konva.Rect({
    x: 200,
    y: 200,
    width: 11 * oneInchUnit,
    height: 14 * oneInchUnit,
    fill: '#65666c',
    stroke: '#3c1704',
    strokeWidth: 13,
    ShadowOffsetX: -7,
    ShadowOffsetY: 4,
    ShadowBlur: 10,
    opacity: .9,
    draggable: false
  });

  var circle = new Konva.Circle({
    x: 200 + parentContainer.getWidth()/2,
    y: 195,
    radius: 5,
    fill: 'black',
    stroke: 'grey',
    strokeWidth: '2',
    draggable: false
  });

  //Creating tooltipOne
  var tooltip = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 22,
    padding: 5,
    visible: false,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });
  var tooltip2 = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 15,
    padding: 7,
    visible: true,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });

  group.add(parentContainer, circle);
  layer.add(group);

  tooltipLayer.add(tooltip, tooltip2);

  stage.add(layer);
  stage.add(tooltipLayer);

  circle.on('click', function() {

    var mousePos = stage.getPointerPosition();
    tooltip.position({
      x: mousePos.x - 23,
      y: mousePos.y + 20
    });
    tooltip.text("←: " + Math.round((stage.width() - (stage.width() - stage.getPointerPosition().x))/12) + '"' + "\n" +
      "→: " + Math.round((stage.width() - stage.getPointerPosition().x)/12) + '"' + "\n" +
      "↑: " + Math.round((stage.height() - (stage.height() - stage.getPointerPosition().y))/12) + '"' + "\n" +
      "↓: " + Math.round((stage.height() - stage.getPointerPosition().y)/12) + '"' 
    );
    tooltip.show();
    tooltipLayer.batchDraw();
  });


parentContainer.on("mousemove", function(){
       var mousePos = stage.getPointerPosition();
       tooltip2.position({
           x : mousePos.x + 3,
           y : mousePos.y + 3
       });
       tooltip2.text("11 in x 14 in");
       tooltip2.show();
       tooltipLayer.batchDraw();
   });
   parentContainer.on("mouseout", function(){
       tooltip2.hide();
       tooltipLayer.draw();
   });
}

/*
Function sixteenbytwenty(): Encompasses a function that on click will create a frame
(w/ var parentContainer & var circle) on the stage.

Function cirlce.on(): Acts as the marker for the frame (parentContainer). On
click it triggers the tooltip to be printed on the frame.

Var parentContainer creates a new Konva.Rect that acts as the frame

Var circle creates a new Konva.Circle that I attached to the the parentContainer
to act as a nail and a marker.

Var tooltip creates a text layer that I use to display the tooltip
 */
var sixteenbytwenty = function() {

  document.getElementById('hide').addEventListener('click', function() {
      tooltip.hide();
      tooltipLayer.draw();
  }, false);

  var layer = new Konva.Layer();

  var group = new Konva.Group({
    draggable: true
  });

  var tooltipLayer = new Konva.Layer();

  var parentContainer = new Konva.Rect({
    x: 200,
    y: 200,
    width: 16 * oneInchUnit,
    height: 20 * oneInchUnit,
    fill: '#65666c',
    stroke: '#3c1704',
    strokeWidth: 13,
    ShadowOffsetX: -7,
    ShadowOffsetY: 4,
    ShadowBlur: 10,
    opacity: .9,
    draggable: false
  });

  var circle = new Konva.Circle({
    x: 200 + parentContainer.getWidth()/2,
    y: 195,
    radius: 5,
    fill: 'black',
    stroke: 'grey',
    strokeWidth: '2',
    draggable: false
  });

  //Creating tooltipOne
  var tooltip = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 28,
    padding: 5,
    visible: false,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });
  var tooltip2 = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 28,
    padding: 7,
    visible: true,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });

  group.add(parentContainer, circle);
  layer.add(group);

  tooltipLayer.add(tooltip, tooltip2);

  stage.add(layer);
  stage.add(tooltipLayer);

  circle.on('click', function() {

    var mousePos = stage.getPointerPosition();
    tooltip.position({
      x: mousePos.x - 23,
      y: mousePos.y + 20
    });
    tooltip.text("←: " + Math.round((stage.width() - (stage.width() - stage.getPointerPosition().x))/12) + '"' + "\n" +
      "→: " + Math.round((stage.width() - stage.getPointerPosition().x)/12) + '"' + "\n" +
      "↑: " + Math.round((stage.height() - (stage.height() - stage.getPointerPosition().y))/12) + '"' + "\n" +
      "↓: " + Math.round((stage.height() - stage.getPointerPosition().y)/12) + '"' 
    );
    tooltip.show();
    tooltipLayer.batchDraw();
  });


parentContainer.on("mousemove", function(){
       var mousePos = stage.getPointerPosition();
       tooltip2.position({
           x : mousePos.x + 3,
           y : mousePos.y + 3
       });
       tooltip2.text("16 in x 20 in");
       tooltip2.show();
       tooltipLayer.batchDraw();
   });
   parentContainer.on("mouseout", function(){
       tooltip2.hide();
       tooltipLayer.draw();
   });
}

/*
Function eighteenbytwentyfour(): Encompasses a function that on click will create a frame
(w/ var parentContainer & var circle) on the stage.

Function cirlce.on(): Acts as the marker for the frame (parentContainer). On
click it triggers the tooltip to be printed on the frame.

Var parentContainer creates a new Konva.Rect that acts as the frame

Var circle creates a new Konva.Circle that I attached to the the parentContainer
to act as a nail and a marker.

Var tooltip creates a text layer that I use to display the tooltip
 */
var eighteenbytwentyfour = function() {

  document.getElementById('hide').addEventListener('click', function() {
      tooltip.hide();
      tooltipLayer.draw();
  }, false);

  var layer = new Konva.Layer();

  var group = new Konva.Group({
    draggable: true
  });

  var tooltipLayer = new Konva.Layer();

  var parentContainer = new Konva.Rect({
    x: 200,
    y: 200,
    width: 18 * oneInchUnit,
    height: 24 * oneInchUnit,
    fill: '#65666c',
    stroke: '#3c1704',
    strokeWidth: 13,
    ShadowOffsetX: -7,
    ShadowOffsetY: 4,
    ShadowBlur: 10,
    opacity: .9,
    draggable: false
  });

  var circle = new Konva.Circle({
    x: 200 + parentContainer.getWidth()/2,
    y: 195,
    radius: 5,
    fill: 'black',
    stroke: 'grey',
    strokeWidth: '2',
    draggable: false
  });

  //Creating tooltipOne
  var tooltip = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 31,
    padding: 5,
    visible: false,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });
  var tooltip2 = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 31,
    padding: 7,
    visible: true,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });

  group.add(parentContainer, circle);
  layer.add(group);

  tooltipLayer.add(tooltip, tooltip2);

  stage.add(layer);
  stage.add(tooltipLayer);

  circle.on('click', function() {

    var mousePos = stage.getPointerPosition();
    tooltip.position({
      x: mousePos.x - 23,
      y: mousePos.y + 20
    });
    tooltip.text("←: " + Math.round((stage.width() - (stage.width() - stage.getPointerPosition().x))/12) + '"' + "\n" +
      "→: " + Math.round((stage.width() - stage.getPointerPosition().x)/12) + '"' + "\n" +
      "↑: " + Math.round((stage.height() - (stage.height() - stage.getPointerPosition().y))/12) + '"' + "\n" +
      "↓: " + Math.round((stage.height() - stage.getPointerPosition().y)/12) + '"' 
    );
    tooltip.show();
    tooltipLayer.batchDraw();
  });


  parentContainer.on("mousemove", function(){
       var mousePos = stage.getPointerPosition();
       tooltip2.position({
           x : mousePos.x + 3,
           y : mousePos.y + 3
       });
       tooltip2.text("18 in x 24 in");
       tooltip2.show();
       tooltipLayer.batchDraw();
   });
   parentContainer.on("mouseout", function(){
       tooltip2.hide();
       tooltipLayer.draw();
   });

}

/*
Function twentybytwentyfour(): Encompasses a function that on click will create a frame
(w/ var parentContainer & var circle) on the stage.

Function cirlce.on(): Acts as the marker for the frame (parentContainer). On
click it triggers the tooltip to be printed on the frame.

Var parentContainer creates a new Konva.Rect that acts as the frame

Var circle creates a new Konva.Circle that I attached to the the parentContainer
to act as a nail and a marker.

Var tooltip creates a text layer that I use to display the tooltip
 */
var twentybytwentyfour = function() {

  document.getElementById('hide').addEventListener('click', function() {
      tooltip.hide();
      tooltipLayer.draw();
  }, false);

  var layer = new Konva.Layer();

  var group = new Konva.Group({
    draggable: true
  });

  var tooltipLayer = new Konva.Layer();

  var parentContainer = new Konva.Rect({
    x: 200,
    y: 200,
    width: 20 * oneInchUnit,
    height: 24 * oneInchUnit,
    fill: '#65666c',
    stroke: '#3c1704',
    strokeWidth: 13,
    ShadowOffsetX: -7,
    ShadowOffsetY: 4,
    ShadowBlur: 10,
    opacity: .9,
    draggable: false
  });

  var circle = new Konva.Circle({
    x: 200 + parentContainer.getWidth()/2,
    y: 195,
    radius: 5,
    fill: 'black',
    stroke: 'grey',
    strokeWidth: '2',
    draggable: false
  });

  //Creating tooltipOne
  var tooltip = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 33,
    padding: 5,
    visible: false,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });
  var tooltip2 = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 33,
    padding: 7,
    visible: true,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });

  group.add(parentContainer, circle);
  layer.add(group);

  tooltipLayer.add(tooltip, tooltip2);

  stage.add(layer);
  stage.add(tooltipLayer);

  circle.on('click', function() {

    var mousePos = stage.getPointerPosition();
    tooltip.position({
      x: mousePos.x - 23,
      y: mousePos.y + 20
    });
    tooltip.text("←: " + Math.round((stage.width() - (stage.width() - stage.getPointerPosition().x))/12) + '"' + "\n" +
      "→: " + Math.round((stage.width() - stage.getPointerPosition().x)/12) + '"' + "\n" +
      "↑: " + Math.round((stage.height() - (stage.height() - stage.getPointerPosition().y))/12) + '"' + "\n" +
      "↓: " + Math.round((stage.height() - stage.getPointerPosition().y)/12) + '"' 
    );
    tooltip.show();
    tooltipLayer.batchDraw();
  });


parentContainer.on("mousemove", function(){
       var mousePos = stage.getPointerPosition();
       tooltip2.position({
           x : mousePos.x + 3,
           y : mousePos.y + 3
       });
       tooltip2.text("20 in x 24 in");
       tooltip2.show();
       tooltipLayer.batchDraw();
   });
   parentContainer.on("mouseout", function(){
       tooltip2.hide();
       tooltipLayer.draw();
   });
}

/*
Function twentyfourbythirtysix(): Encompasses a function that on click will create a frame
(w/ var parentContainer & var circle) on the stage.

Function cirlce.on(): Acts as the marker for the frame (parentContainer). On
click it triggers the tooltip to be printed on the frame.

Var parentContainer creates a new Konva.Rect that acts as the frame

Var circle creates a new Konva.Circle that I attached to the the parentContainer
to act as a nail and a marker.

Var tooltip creates a text layer that I use to display the tooltip
 */
var twentyfourbythirtysix = function() {

  document.getElementById('hide').addEventListener('click', function() {
      tooltip.hide();
      tooltipLayer.draw();
  }, false);

  var layer = new Konva.Layer();

  var group = new Konva.Group({
    draggable: true
  });

  var tooltipLayer = new Konva.Layer();

  var parentContainer = new Konva.Rect({
    x: 200,
    y: 200,
    width: 24 * oneInchUnit,
    height: 36 * oneInchUnit,
    fill: '#65666c',
    stroke: '#3c1704',
    strokeWidth: 13,
    ShadowOffsetX: -7,
    ShadowOffsetY: 4,
    ShadowBlur: 10,
    opacity: .9,
    draggable: false
  });

  var circle = new Konva.Circle({
    x: 200 + parentContainer.getWidth()/2,
    y: 195,
    radius: 5,
    fill: 'black',
    stroke: 'grey',
    strokeWidth: '2',
    draggable: false
  });

  //Creating tooltipOne
  var tooltip = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 35,
    padding: 5,
    visible: false,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });
  var tooltip2 = new Konva.Text({
    text: "",
    fontFamily: "Calibri",
    fontStyle: "bold",
    fontSize: 35,
    padding: 7,
    visible: true,
    fill: "white",
    opacity: 0.75,
    textFill: "white"
  });

  group.add(parentContainer, circle);
  layer.add(group);

  tooltipLayer.add(tooltip, tooltip2);

  stage.add(layer);
  stage.add(tooltipLayer);

  circle.on('click', function() {

    var mousePos = stage.getPointerPosition();
    tooltip.position({
      x: mousePos.x - 23,
      y: mousePos.y + 20
    });
    tooltip.text("←: " + Math.round((stage.width() - (stage.width() - stage.getPointerPosition().x))/12) + '"' + "\n" +
      "→: " + Math.round((stage.width() - stage.getPointerPosition().x)/12) + '"' + "\n" +
      "↑: " + Math.round((stage.height() - (stage.height() - stage.getPointerPosition().y))/12) + '"' + "\n" +
      "↓: " + Math.round((stage.height() - stage.getPointerPosition().y)/12) + '"' 
    );
    tooltip.show();
    tooltipLayer.batchDraw();
  });

  parentContainer.on("mousemove", function(){
       var mousePos = stage.getPointerPosition();
       tooltip2.position({
           x : mousePos.x + 3,
           y : mousePos.y + 3
       });
       tooltip2.text("24 in x 36 in");
       tooltip2.show();
       tooltipLayer.batchDraw();
   });
   parentContainer.on("mouseout", function(){
       tooltip2.hide();
       tooltipLayer.draw();
   });
}
}
