/*
	Chess game by Nemanja Zaric

	Here we make the board and the pieces. This is the main class for controling 
	everything.

	Now the number of fields can be changed to an arbitrary number that is 8 or larger.
	Figured that if you have more fields than 8 the figures that should be added are Bishops,
	since they are the lowest ranking piece after pawns.
*/
let asciiForA = 65;

class Game{

	constructor(offset, boardSize){
		this.player1 = new Player("white");
		this.player2 = new Player("black");
		this.turn = "white";
		this.fields = {};
		this.pieces = [];
		this.selectedPiece;
		this.interface;
		this.remiScreen;
		this.border;
		this.rectSize = boardSize/numberOfFields;
		this.log = [];
		this.isCheck = false;
		this.isMate = false;
		this.isDraw = false;
		this.wantRemi = false;
		this.pause = false;
	}

	createBoard(){
		this.createFields();
		this.addNeighboursToFields();
		this.createFigures();
		this.interface = new Interface(boardSize,0);
		this.border = new Border();
	}

	createFields(){
		for (var i = numberOfFields-1; i >= 0; i--) {
			for (var j = numberOfFields-1; j >= 0; j--) {
				let x = j;
				let y = i;
				let num = i+1;
				let name = String.fromCharCode(asciiForA+j)+num.toString();
				let fld = new Field(x, y, name);
				let xy = [];
				xy.push(x);
				xy.push(y);
				this.fields[xy]=fld;
			}
		}
	}

	addNeighboursToFields(){
		for (var f in this.fields) {
			let ng = [];
			
			let zero = parseInt(f[0]);
			let sec = parseInt(f[2]);

			ng.push([(zero-1),sec]);
			ng.push([(zero+1),sec]);
			ng.push([zero,(sec-1)]);
			ng.push([zero,(sec+1)]);
			ng.push([(zero-1),(sec-1)]);
			ng.push([(zero-1),(sec+1)]);
			ng.push([(zero+1),(sec+1)]);
			ng.push([(zero+1),(sec-1)]);

			for (var i = 0; i < ng.length; i++) {
				let a = this.fields[ng[i]];
				if(a != null){
					
					this.fields[f].neighbours[ng[i]] = a;
				}
			}
		}
	}

	drawBoard(){
		
		this.border.draw();
		translate(fieldNumSize/2,fieldNumSize/2);

		for (var f in this.fields) {
			this.fields[f].draw(this.rectSize);
		}

		for (var i=0; i < this.pieces.length ; i++) {
			let p = this.pieces[i];
			p.draw();
			
		}
		this.endCondition();
		this.interface.draw();
	}

	onClick(){
		if(this.remiScreen){
			this.remiScreen.onClick();
		}
		this.interface.onClick();
		if (this.pause) {
			return;
		}
		let offset1 = fieldNumSize/2;
		let bla = [floor((mouseX-offset1)/this.rectSize),floor((mouseY-offset1)/this.rectSize)];
		let fld = this.fields[bla];
		let pic;
		
		if (fld != null) {
			pic = fld.getPiece();
			//console.log(fld);

			if(fld.selected && pic != null && pic != this.selectedPiece){
				if (this.selectedPiece.canEat(fld)) {
					
					this.log.push(this.selectedPiece.toString() + " from " + this.selectedPiece.field.name + " to " + fld.name);
					this.clearAllFields();
					this.selectedPiece.eat(fld);
					this.endCheck();
					this.changeTurn();
					this.interface.update();
					//saveContext();
				}
			}else if(pic != null){
				if(this.turn != pic.player.name){
					return;
				}
				this.selectedPiece = pic;
				this.clearAllFields();
				pic.update();
			}else if(fld.selected){
				
				this.log.push(this.selectedPiece.toString() + " from " + this.selectedPiece.field.name + " to " + fld.name);
				this.clearAllFields();
				this.selectedPiece.move(fld);
				this.endCheck();
				let kingToLook;
				if(this.turn === "black"){
					kingToLook = this.player1.king;
				}else{
					kingToLook = this.player2.king;
				}
				this.changeTurn();
				this.interface.update();
				//saveContext();
			}
		}
		
	}

	createFigures(){
		for(var i = 0; i < numberOfFields; i++){
			for(var j = 0; j < numberOfFields; j++){
				if(i == 1 || i == numberOfFields-2){
					if(i == 1){
						let p = new Pawn(this.fields[[j,i]], this.rectSize, pawnSpriteB, this.player2);
						this.pieces.push(p);
					}else{
						let p = new Pawn(this.fields[[j,i]], this.rectSize, pawnSpriteW, this.player1);
						this.pieces.push(p);
					}
				}else if (i == 0) {
					if(j == 0 || j == numberOfFields-1){
						let p = new Rook(this.fields[[j,i]], this.rectSize, rookSpriteB, this.player2);
						this.pieces.push(p);
					}else if(j == 1 || j == numberOfFields-2){
						let p = new Knight(this.fields[[j,i]], this.rectSize, knightSpriteB, this.player2);
						this.pieces.push(p);
					}else if(j == floor(numberOfFields/2)-1){
						let p = new Queen(this.fields[[j,i]], this.rectSize, queenSpriteB, this.player2);
						this.pieces.push(p);
					}else if(j == floor(numberOfFields/2)){
						let p = new King(this.fields[[j,i]], this.rectSize, kingSpriteB, this.player2);
						this.pieces.push(p);
						this.player2.king = p;
					}else{
						let p = new Bishop(this.fields[[j,i]], this.rectSize, bishopSpriteB, this.player2);
						this.pieces.push(p);
					}
				}else if(i == numberOfFields-1){
					if(j == 0 || j == numberOfFields-1){
						let p = new Rook(this.fields[[j,i]], this.rectSize, rookSpriteW, this.player1);
						this.pieces.push(p);
					}else if(j == 1 || j == numberOfFields-2){
						let p = new Knight(this.fields[[j,i]], this.rectSize, knightSpriteW, this.player1);
						this.pieces.push(p);
					}else if(j == floor(numberOfFields/2)-1){
						let p = new Queen(this.fields[[j,i]], this.rectSize, queenSpriteW, this.player1);
						this.pieces.push(p);
					}else if(j == floor(numberOfFields/2)){
						let p = new King(this.fields[[j,i]], this.rectSize, kingSpriteW, this.player1);
						this.pieces.push(p);
						this.player1.king = p;
					}else{
						let p = new Bishop(this.fields[[j,i]], this.rectSize, bishopSpriteW, this.player1);
						this.pieces.push(p);
					}
				}
			}
		}
	}

	endCondition(){
		let screenWidth = 200;
		let screenHeight = 100;
		if(this.isCheck && this.isMate){
			let play;
			if(this.turn === "white"){
				play = "Black";
			}else{
				play = "White";
			}
			let text = play + " wins!!!";
			let end = new EndScreen(boardSize/3,boardSize/3,screenWidth,screenHeight,text);
			end.draw();
			this.pause = true;
		}
		if (this.isDraw) {
			let text = "It's a draw";
			let end = new EndScreen(boardSize/3,boardSize/3,screenWidth,screenHeight,text);
			end.draw();
			this.pause = true;
		}
		if (this.wantRemi) {
			let text = "Do you want to draw?";
			this.remiScreen = new RemiScreen(boardSize/3,boardSize/3,screenWidth,screenHeight,text);
			this.remiScreen.draw();
			this.pause = true;
		}
	}

	clearAllFields(){

		for(var f in this.fields){
			this.fields[f].selected = false;
		}
	}

	clearAttackedFields(king){
		
		let arr = [];
		arr.push(king.field);
		for(var n in king.field.neighbours){
			arr.push(king.field.neighbours[n]);
		}
		for (var i = 0; i < arr.length; i++) {
			arr[i].attacked = false;
		}
	}

	clearLastTurns(){
		for(var f in this.fields){
			this.fields[f].lastTurn = false;
		}
	}

	activatePieces(king){
		for(let i=0 ; i<this.pieces.length ; i++){
			if(this.pieces[i].player.name === king.player.name){
				this.pieces[i].active = true;
			}
		}
	}

	changeTurn(){
		if(this.turn === "white"){
			this.turn = "black";
		}else{
			this.turn = "white";
		}
	}

	endCheck(){

		let kingToLook1 = this.player1.king;
		let kingToLook2 = this.player2.king;

		if(kingToLook1.isCheck() || kingToLook2.isCheck()){
			this.isCheck = true;
		}else{
			this.isCheck = false;
		}
		
		let valid1 = this.canCurrKingValidMove(kingToLook1);
		let valid2 = this.canCurrKingValidMove(kingToLook2);
		let block1 = false;
		let block2 = false;
		if(kingToLook1.isCheck()){
			block1 = this.canCurrKingsBuddiesBlock(kingToLook1);
			//console.log(block1);
		}else{
			this.activatePieces(kingToLook1);
		}
		if(kingToLook2.isCheck()){
			block2 = this.canCurrKingsBuddiesBlock(kingToLook2);
			//console.log(block2);
		}else{
			this.activatePieces(kingToLook2);
		}

		if(this.isCheck && (!valid1 || !valid2) && !(block1 || block2)){
			this.isMate = true;
		}else{
			this.isMate = false;
		}
		let areSame1;
		if(!kingToLook1.isCheck()){
			areSame1 = kingToLook1.areNeighboursSame();
			console.log(areSame1);
		}
		
		let areSame2;
		if(!kingToLook2.isCheck()){
			areSame2 = kingToLook2.areNeighboursSame();
			console.log(areSame2);
		}
		if(!this.isCheck && !valid1 && !areSame1){
			this.isDraw = true;
		}
		if(!this.isCheck && !valid2 && !areSame2){
			this.isDraw = true;
		}
	}

	canCurrKingValidMove(king){

		this.clearAttackedFields(king);
		for (var i=0; i < this.pieces.length ; i++) {
			let p = this.pieces[i];
			if(p.player.name !== king.player.name){
				p.attackOposKing(king);
			}
		}
		return king.canLegalMove();
	}

	canCurrKingsBuddiesBlock(king){ 	//this one does not work completely right, i can't seem to figure out why.
		let play = king.player.name;	//please help :)
		let cans = [];
		for (var i = 0; i < this.pieces.length; i++) {
			let pic = this.pieces[i];
			if(pic != king && pic.player.name === play){
				pic.update();
				for(let j in this.fields){
					if(this.fields[j].selected && this.fields[j] != pic.field && this.fields[j].piece == null){
						// console.log(pic.field);
						pic.justChecking = true;
						let oldFld = pic.field;
						pic.move(this.fields[j]);
						// console.log(pic.field);
						if(king.isCheck()){
							this.canCurrKingValidMove(king);
						}
						// console.log(king.isCheck());
						if(!king.isCheck()){
							cans.push(pic);
							//pic.active = true;
						}else{
							pic.active = false;
						}
						pic.move(oldFld);
						pic.justChecking = false;
					}
				}
				this.clearAllFields();
			}
		}
		console.log(cans);
		if(cans.length > 0){
			return true;
		}
		return false;
	}

	saveState(newGame){
		if(newGame instanceof Game){
			//let clone = Object.assign( Object.create( Object.getPrototypeOf(this)), this);
			let newFields = {};
			for(let f in this.fields){
				newFields[f] = this.fields[f];
			}
			let newPieces = [];;
			for (var i = 0; i < this.pieces.length; i++) {
				newPieces[i] = this.pieces[i];
			}
			let newSelPic;
			if (this.selectedPiece) {
				newSelPic = Object.assign( Piece, this.selectedPiece);
			}
			let newInterface = Object.assign( Interface, this.interface);
			let newBorder = Object.assign( Border, this.border);
			let newLog = Object.assign( [], this.log);

			newGame.fields = newFields;
			newGame.pieces = newPieces;
			newGame.selectedPiece = newSelPic;
			newGame.interface = newInterface;
			newGame.border = newBorder;
			newGame.log = newLog;

			return newGame;
		}

		return null;
	}
}