/*
	Chess game by Nemanja Zaric

	Here we make the board and the pieces. This is the main class for controling 
	everything.
*/
class Game{

	constructor(offset, boardSize){
		this.player1 = new Player("white");
		this.player2 = new Player("black");
		this.turn = "white";
		this.fields = {};
		this.pieces = [];
		this.selectedPiece;
		this.interface;
		this.border;
		this.rectSize = boardSize/8;
		this.log = [];
		this.isCheck = false;
		this.isMate = false;
		this.isDraw = false;
	}

	createBoard(){
		
		for (var i = 7; i >= 0; i--) {
			for (var j = 7; j >= 0; j--) {
				let x = j;
				let y = i;
				let num = i+1;
				let name = String.fromCharCode(65+j)+num.toString();
				let fld = new Field(x, y, name);
				let xy = [];
				xy.push(x);
				xy.push(y);
				this.fields[xy]=fld;
				if(i == 1 || i == 6){
					let p = new Pawn(fld, this.rectSize);
					if(i == 1){
						p.set_player(this.player2);
					}else{
						p.set_player(this.player1);
					}
					this.pieces.push(p);
				}
			}
		}
		this.createFigures();
		for (var f in this.fields) {
			let ng = [];
			
			let zero = parseInt(f[0]);
			let sec = parseInt(f[2]);
			//console.log([(zero-1),sec]);
			ng.push([(zero-1),sec]);
			ng.push([(zero+1),sec]);
			ng.push([zero,(sec-1)]);
			ng.push([zero,(sec+1)]);
			ng.push([(zero-1),(sec-1)]);
			ng.push([(zero-1),(sec+1)]);
			ng.push([(zero+1),(sec+1)]);
			ng.push([(zero+1),(sec-1)]);
			//console.log(ng);
			for (var i = 0; i < ng.length; i++) {
				let a = this.fields[ng[i]];
				//console.log(ng[i]);
				if(a != null){
					
					this.fields[f].neighbours[ng[i]] = a;
				}
			}
			
		}
		this.interface = new Interface(boardSize,0);
		this.border = new Border();
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
		let offset1 = fieldNumSize/2;
		let bla = [floor((mouseX-offset1)/this.rectSize),floor((mouseY-offset1)/this.rectSize)];
		let fld = this.fields[bla];
		
		let pic;
		
		if (fld != null) {
			pic = fld.get_piece();

			if(fld.selected && pic != null && pic != this.selectedPiece){
				this.log.push(this.selectedPiece.toString() + " from " + this.selectedPiece.field.name + " to " + fld.name);
				this.selectedPiece.eat(fld);
				this.clearAllFields();
				this.changeTurn();
				this.interface.update();
			}else if(pic != null){
				if(this.turn != pic.player.name){
					return;
				}
				if(pic != null && pic instanceof King){
					pic.canLegalMove();
					pic.isCheck();
					pic.isDraw();
					//console.log(g.isDraw);
					pic.isMate();
					//console.log(g.isMate);
				}
				this.selectedPiece = pic;
				this.clearAllFields();
				pic.update();
			}else if(fld.selected){
				this.log.push(this.selectedPiece.toString() + " from " + this.selectedPiece.field.name + " to " + fld.name);
				this.selectedPiece.move(fld);
				this.clearAllFields();
				this.changeTurn();
				this.interface.update();
			}
		}
		
	}

	createFigures(){
		let r1 = new Rook(this.fields[[0,0]],this.rectSize);
		let r2 = new Rook(this.fields[[0,7]],this.rectSize);
		let r3 = new Rook(this.fields[[7,0]],this.rectSize);
		let r4 = new Rook(this.fields[[7,7]],this.rectSize);
		r1.player = this.player2;
		r2.player = this.player1;
		r3.player = this.player2;
		r4.player = this.player1;
		this.pieces.push(r1);
		this.pieces.push(r2);
		this.pieces.push(r3);
		this.pieces.push(r4);
		let b1 = new Bishop(this.fields[[2,0]],this.rectSize);
		let b2 = new Bishop(this.fields[[5,0]],this.rectSize);
		let b3 = new Bishop(this.fields[[5,7]],this.rectSize);
		let b4 = new Bishop(this.fields[[2,7]],this.rectSize);
		b1.player = this.player2;
		b2.player = this.player2;
		b3.player = this.player1;
		b4.player = this.player1;
		this.pieces.push(b1);
		this.pieces.push(b2);
		this.pieces.push(b3);
		this.pieces.push(b4);
		let k1 = new Knight(this.fields[[1,0]],this.rectSize);
		let k2 = new Knight(this.fields[[6,0]],this.rectSize);
		let k3 = new Knight(this.fields[[6,7]],this.rectSize);
		let k4 = new Knight(this.fields[[1,7]],this.rectSize);
		k1.player = this.player2;
		k2.player = this.player2;
		k3.player = this.player1;
		k4.player = this.player1;
		this.pieces.push(k1);
		this.pieces.push(k2);
		this.pieces.push(k3);
		this.pieces.push(k4);
		let kn1 = new King(this.fields[[4,0]],this.rectSize);
		let kn2 = new King(this.fields[[4,7]],this.rectSize);
		kn1.player = this.player2;
		kn2.player = this.player1;
		this.pieces.push(kn1);
		this.pieces.push(kn2);
		let q1 = new Queen(this.fields[[3,0]],this.rectSize);
		let q2 = new Queen(this.fields[[3,7]],this.rectSize);
		q1.player = this.player2;
		q2.player = this.player1;
		this.pieces.push(q1);
		this.pieces.push(q2);
	}

	endCondition(){
		if(this.isCheck && this.isMate){
			let play;
			if(this.turn === "white"){
				play = "Black";
			}else{
				play = "White";
			}
			let text = play + " wins!!!";
			let end = new EndScreen(boardSize/2,boardSize/2,200,50,text);
			end.draw();
		}else if (this.isDraw) {
			let text = "It's a draw";
			let end = new EndScreen(boardSize/2,boardSize/2,200,50,text);
			end.draw();
		}
	}

	clearAllFields(){
		for(var f in this.fields){
			this.fields[f].selected = false;
		}
	}

	changeTurn(){
		if(this.turn === "white"){
			this.turn = "black";
		}else{
			this.turn = "white";
		}
	}
}