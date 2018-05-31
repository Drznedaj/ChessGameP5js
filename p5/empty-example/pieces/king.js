/*
	Chess game by Nemanja Zaric

	This is the class for all the logic for Kings. Tried to make them castle
	but it doesnt work right now.
*/

class King extends Piece{

	constructor(field, rectSize, sprite, player){
		super(field, rectSize, sprite, player);
		this.canCastle = false;
	}

	update(){
		this.field.selected = !this.field.selected;

		this.selectCastle();
		this.selectValidNeighbours();
	}
	
	isCheck(){
		let x = 0;

		for (var i = 0; i < g.pieces.length; i++) {
			if(g.pieces[i] != this && g.pieces[i].player.name != this.player.name){
				g.pieces[i].update();

				if(this.field.selected){
					x++;
				}
				
				g.clearAllFields();
				if (x>0) {
					break;
				}
			}
		}

		if(x > 0){
			return true;
		}
		return false;
	}

	selectCastle(){
		if (!this.moved) {
			let left = this.field.neighbours[[this.field.x-1,this.field.y]];
			let right = this.field.neighbours[[this.field.x+1,this.field.y]];

			while(left.neighbours[[left.x-1,left.y]] && !(left.neighbours[[left.x-1,left.y]].piece)){
				left = left.neighbours[[left.x-1,left.y]];
			}
			while(right.neighbours[[right.x+1,right.y]] && !(right.neighbours[[right.x+1,right.y]].piece)){
				right = right.neighbours[[right.x+1,right.y]];
			}
			let lefpic;
			if(left.neighbours[[left.x-1,left.y]]){
				lefpic = left.neighbours[[left.x-1,left.y]].piece;
			}
			let rigpic;
			if(right.neighbours[[right.x+1,right.y]]){
				rigpic = right.neighbours[[right.x+1,right.y]].piece;
			}
			if(lefpic instanceof Rook && !lefpic.moved){
				left.selected = true;
				this.canCastle = true;
			}
			if(rigpic instanceof Rook && !rigpic.moved){
				right.selected = true;
				this.canCastle = true;
			}

		}else{
			this.canCastle = false;
		}
	}

	canLegalMove(){
		let attackedNeighbours = 0;
		let numOfNeighbours = 0;

		for (var n in this.field.neighbours){
			let piec = this.field.neighbours[n].piece;
			if(piec == null || (piec != null && piec.player.name !== this.player.name)){
				numOfNeighbours++;
				if(this.field.neighbours[n].attacked){
					attackedNeighbours++;
				}
			}
		}

		if(numOfNeighbours > attackedNeighbours){
			return true;
		}
		return false;
	}

	areNeighboursSame(){
		for (var n in this.field.neighbours){
			let z = this.field.neighbours[n];
			if (z.piece != null && z.piece.player.name === this.player.name) {
				return true;
			}
		}
		return false;
	}

	selectValidNeighbours(){
		for (var n in this.field.neighbours){
			let fi = this.field.neighbours[n];
			if(!fi.attacked && (fi.piece == null || fi.piece.player.name != this.player.name)){	
				fi.selected = true;
			}
		}
	}

	toString(){
		return this.player.name + " King";
	}
}