class Piece{
	constructor(field, rectSize, sprite, player){
		this.player = player;
		this.field = field;
		this.size = rectSize/2;
		this.moved = false;
		field.setPiece(this);
		this.sprite = sprite;
		this.justChecking = false;
		this.active = true;
	}

	move(field){
		if(this instanceof King && this.canCastle){
			let left = field.neighbours[[field.x-1,field.y]];
			let right = field.neighbours[[field.x+1,field.y]];
			if(left.piece && left.piece instanceof Rook){
				left.piece.move(right);
			}else if(right.piece && right.piece instanceof Rook){
				right.piece.move(left);
			}
			let oldFld = this.field;
			oldFld.setPiece(null);
			this.field = field;
			field.setPiece(this);
			if (!this.justChecking) {
				g.clearLastTurns();
				field.lastTurn = true;
				this.moved = true;
			}
			
		}else{
			let oldFld = this.field;
			oldFld.setPiece(null);
			this.field = field;
			field.setPiece(this);
			if (!this.justChecking) {
				g.clearLastTurns();
				field.lastTurn = true;
				this.moved = true;
			}
			if(this instanceof Pawn && !this.enPassant){
				this.enPassant = true;
			}else if(this instanceof Pawn){
				this.enPassant = false;
			}
			
		}

	}

	canEat(field){
		if(field.piece.player.name != this.player.name && !(field.piece instanceof King)){
			return true;
		}
		return false;
	}

	eat(field){
		for (var i = 0; i < g.pieces.length; i++) {
			if(g.pieces[i] == field.getPiece()){
				g.pieces.splice(i,1);
				break;
			}
		}
		this.move(field);
	}

	draw(){
		push();
		image(this.sprite, this.field.x*this.size*2, this.field.y*this.size*2, this.size*2, this.size*2);
		pop();
	}

	attackOposKing(king){
		if(!(this instanceof King)){
			let play = this.player.name;
			let kingToAttack = king;

			if(this instanceof Pawn){
				if(this.player.name === "white"){
					if (this.field.neighbours[[this.field.x-1,this.field.y-1]]) {
						this.field.neighbours[[this.field.x-1,this.field.y-1]].selected = true;
					}
					if (this.field.neighbours[[this.field.x+1,this.field.y-1]]) {
						this.field.neighbours[[this.field.x+1,this.field.y-1]].selected = true;
					}
				}else{
					if (this.field.neighbours[[this.field.x-1,this.field.y+1]]) {
						this.field.neighbours[[this.field.x-1,this.field.y+1]].selected = true;
					}
					if (this.field.neighbours[[this.field.x+1,this.field.y+1]]) {
						this.field.neighbours[[this.field.x+1,this.field.y+1]].selected = true;
					}
				}
			}else{
				this.update();	
			}
			
			for(var n in kingToAttack.field.neighbours){
				if(kingToAttack.field.neighbours[n].selected){
					kingToAttack.field.neighbours[n].attacked = true;
				}
			}
			if(kingToAttack.field.selected){
				kingToAttack.field.attacked = true;
			}
			g.clearAllFields();
		}
	}
}