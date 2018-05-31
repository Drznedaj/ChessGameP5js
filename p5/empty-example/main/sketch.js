/*
	Chess game by Nemanja Zaric

	In sketch we preload all the sprites, draw the board and the pieces and
	deals with the mouse input.

	Save and Load context do not work properly, I am having trouble with saving
	instances of objects. Javascript does not like to save instance of an object,
	it just saves the reference to the object and that is not what i want here.
	I want to save game instances as they are so that I can undo the moves and
	stuff. I tried multiple workarounds and none seem to work. :(
*/
let numberOfFields = 8;
let offset = 200;
let fieldNumSize = 50;
let boardSize = 500;
let g;

let resetButton;
let drawButton;
let pawnSpriteB;
let pawnSpriteW;
let rookSpriteB;
let rookSpriteW;
let bishopSpriteB;
let bishopSpriteW;
let knightSpriteB;
let knightSpriteW;
let queenSpriteB;
let queenSpriteW;
let kingSpriteB;
let kingSpriteW;

let numUndos = 2;
let indexUndo = 0;
let numOfSaves = 0;
let previousMoves = [];

let backgroundColor = [53,62,66];
let selectedColor = [0,150,50];
let lastTurnColor = [0,50,150];
let darkFieldColor = [242,207,140];
let lightFieldColor = [92,68,53];

var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function preload(){
	pawnSpriteB = loadImage('../empty-example/graphics/pawnSpriteB.png');
	pawnSpriteW = loadImage('../empty-example/graphics/pawnSpriteW.png');
	rookSpriteB = loadImage('../empty-example/graphics/rookSpriteB.png');
	rookSpriteW = loadImage('../empty-example/graphics/rookSpriteW.png');
	bishopSpriteB = loadImage('../empty-example/graphics/bishopSpriteB.png');
	bishopSpriteW = loadImage('../empty-example/graphics/bishopSpriteW.png');
	knightSpriteB = loadImage('../empty-example/graphics/knightSpriteB.png');
	knightSpriteW = loadImage('../empty-example/graphics/knightSpriteW.png');
	queenSpriteB = loadImage('../empty-example/graphics/queenSpriteB.png');
	queenSpriteW = loadImage('../empty-example/graphics/queenSpriteW.png');
	kingSpriteB = loadImage('../empty-example/graphics/kingSpriteB.png');
	kingSpriteW = loadImage('../empty-example/graphics/kingSpriteW.png');
}

function setup() {

	g = new Game(offset,boardSize);

	cnv = createCanvas(boardSize+offset+fieldNumSize,boardSize+fieldNumSize);
	centerCanvas();
	background(backgroundColor);
	g.createBoard();
	numOfSaves++;
	previousMoves.push(g.saveState(new Game(offset,boardSize)));
}

function draw() {
  	
  	g.drawBoard();

}

function mousePressed(){
	g.onClick();
}

function saveContext(){
	numOfSaves++;
	if(numOfSaves <= numUndos){
		indexUndo = numOfSaves;
		console.log("Saving context");
		previousMoves.push(g.saveState(new Game(offset,boardSize)));
		console.log(previousMoves);
	}else{
		previousMoves.shift();
		console.log("Saving context");
		previousMoves.push(g.saveState(new Game(offset,boardSize)));
		console.log(previousMoves);
		numOfSaves = numUndos+1;
	}
}

function loadContext(indexUndo){
	console.log(indexUndo);
	console.log("Loading context");
	g = previousMoves[indexUndo];
	console.log(previousMoves);	
}