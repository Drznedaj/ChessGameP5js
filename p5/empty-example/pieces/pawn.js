/*
	Chess game by Nemanja Zaric

	This is the class for all the logic for Pawns. 

	update() method is responsible for selecting fields that this piece can move.

	draw() just draws the piece on its field.

	move() moves the piece to a diferen field.

	eat() eats the opposing piece and moves the piece to the new location.

	This is the same in all piece classes, with the exception of kings,
	because they are special pieces.
*/
class Pawn extends Piece{
	constructor(field, rectSize, sprite, player){
		super(field, rectSize, sprite, player);
		this.enPassant = false;
	}

	update(){
		let x = this.field.x;
		let y = this.field.y;		
		let yn;
		let xn;
		let n;
		let nn;
		this.field.selected = !this.field.selected;

		if(this.player.name === "white"){
			y-=1;
			yn = y-1;
		}else{
			y+=1;
			yn = y+1;
		}
		n = g.fields[[x,y]];
		nn = g.fields[[x,yn]];

		if(n != null && n.getPiece() == null){
			if(n != null){
				n.selected = !n.selected;	
			}
		}
		if(!this.moved){
			if(nn != null && nn.getPiece() == null && n.piece == null){
				if (nn != null){
					nn.selected = !nn.selected;
				}
			}
		}

		let left;
		let right;
		if(this.player.name === "white"){
			left = g.fields[[this.field.x-1,this.field.y-1]];
			right = g.fields[[this.field.x+1,this.field.y-1]];
		}else{
			left = g.fields[[this.field.x-1,this.field.y+1]];
			right = g.fields[[this.field.x+1,this.field.y+1]];
		}

		if (left != null && left.getPiece() != null && left.getPiece().player.name != this.player.name) {
			left.selected = !left.selected;
		}
		if(right != null && right.getPiece() != null && right.getPiece().player.name != this.player.name){	
			right.selected = !right.selected;
		}
		left = this.field.neighbours[[this.field.x-1,this.field.y]];
		right = this.field.neighbours[[this.field.x+1,this.field.y]];
		if(left && left.piece && left.piece.player.name != this.player.name && left.piece instanceof Pawn && left.piece.enPassant){
			left.selected = true;
		}
		if(right && right.piece && right.piece.player.name != this.player.name && right.piece instanceof Pawn && right.piece.enPassant){
			right.selected = true;
		}
	}

	toString(){
		return this.player.name + " Pawn";
	}
}