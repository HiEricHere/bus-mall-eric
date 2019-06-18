'use strict';

var picHistory = [];
var globalClick = 0;
var imageData = [
  ['bag','./images/bag.jpg'],
  ['banana','./images/banana.jpg'],
  ['bathroom','./images/bathroom.jpg'],
  ['boots','./images/boots.jpg'],
  ['breakfast','./images/breakfast.jpg'],
  ['bubblegum','./images/bubblegum.jpg'],
  ['chair','./images/chair.jpg'],
  ['cthulu','./images/cthulhu.jpg'],
  ['dogduck','./images/dog-duck.jpg'],
  ['dragon','./images/dragon.jpg'],
  ['pen','./images/pen.jpg'],
  ['petsweep','./images/pet-sweep.jpg'],
  ['scissors','./images/scissors.jpg'],
  ['shark','./images/shark.jpg'],
  ['sweep','./images/sweep.png'],
  ['tauntaun','./images/tauntaun.jpg'],
  ['unicorn','./images/unicorn.jpg'],
  ['usb','./images/usb.gif'],
  ['watercan','./images/water-can.jpg'],
  ['wineglass','./images/wine-glass.jpg'],
];

function Image ( name, filepath ){
  this.name = name;
  this.filepath = filepath;
  this.displayCount = 0;
  this.likeCount = 0;
  this.id;
  Image.objectList.push(this);
}

Image.objectList = [];

function loadData(){
  for ( var i = 0; i < imageData.length; i++ ){
    new Image ( imageData[i][0], imageData[i][1] );
    Image.objectList[i].id = i;
  }
}

function getRandomNumber(){
  return Math.floor( Math.random() * Image.objectList.length );
}

function checkDupe( testNum ){
  var dupeCount = 0;
  for( var i = 0; i < picHistory.length; i++ ){
    if( testNum === picHistory[i] ){
      dupeCount++;
    }
  }
  return dupeCount;
}

function displayPic ( indexNum ) {
  var picWindow = document.getElementById( 'picWindow' );
  var img = document.createElement( 'img' );
  img.src = Image.objectList[indexNum].filepath;
  img.alt = Image.objectList[indexNum].name;
  img.id = indexNum;
  picWindow.appendChild( img );
  Image.objectList[indexNum].displayCount++;
}

function removePic() {
  var picWindow = document.getElementById( 'picWindow' );
  picWindow.removeChild( picWindow.lastChild );
}

function getRandomImage(){

  var testNum;

  if ( picHistory.length === 6 ){
    for ( var x = 0; x < 3; x++ ){
      picHistory.shift();
      removePic();
    }
  }

  while ( picHistory.length < 6 ){
    testNum = getRandomNumber();
    if ( checkDupe( testNum ) === 0 ) {
      picHistory.push( testNum );
    }
  }

  for ( var i = 3; i < picHistory.length; i++ ){
    var indexNum = picHistory[i];
    displayPic( indexNum );
  }
}

function setupListener(){
  var picWindow = document.getElementById( 'picWindow' );
  picWindow.addEventListener('click', handleClick);
}

function disableListener(){
  var picWindow = document.getElementById( 'picWindow' );
  picWindow.removeEventListener('click', handleClick);
}

function handleClick(event){
  event.preventDefault();
  for ( var i = 0; i < Image.objectList.length; i++ ){
    console.log('ID: ' + event.target.id + ' ObjID: ' + Image.objectList[i].id);
    if ( Image.objectList[i].id === parseInt(event.target.id, 10) ){
      Image.objectList[i].likeCount++;
      globalClick++;
      console.log(globalClick);
      break;
    }
  }
  if ( globalClick === 25 ){
    disableListener();
  }
  getRandomImage();
}

//function(render out the results, add to disablelistener)

function init(){
  loadData();
  getRandomImage();
  setupListener();
}

init();

