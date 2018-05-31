/*
	Chess game by Nemanja Zaric

	In sketch we preload all the sprites, draw the board and the pieces and
	deals with the mouse input.
*/
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
	resetButton = new Button(boardSize+50,boardSize-50,100,30,"Reset");
	drawButton = new DrawButton(boardSize+50,boardSize-100,100,30,"Remi");
	createCanvas(boardSize+offset+fieldNumSize,boardSize+fieldNumSize);
	let c = color(53,62,66);
	background(c);

	g.createBoard();

}

function draw() {
  	
  	g.drawBoard();
  	resetButton.draw();
  	drawButton.draw();
  	//noLoop();

}

function mousePressed(){
	g.onClick();
	resetButton.onClick();
	drawButton.onClick();
}