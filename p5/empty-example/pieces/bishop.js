/*
	Chess game by Nemanja Zaric

	This is the class for all the logic for Bishops. 

	New and improved update method, i got to copy it to rook and queen cause they move sameish,
	but they need to look at other neighbours.
*/
class Bishop extends Piece{
	constructor(field, rectSize, sprite, player){
		super(field, rectSize, sprite, player);
	}

	update(){
		this.field.selected = !this.field.selected;

		for(var n in this.field.neighbours){
			let neigh = this.field.neighbours[n];
			
			if (this.field.x != neigh.x && this.field.y != neigh.y) {
				let dirX = this.field.x - this.field.neighbours[n].x;
				let dirY = this.field.y - this.field.neighbours[n].y;
				let x = 0;

				while(neigh != null && (neigh.piece == null || neigh.piece.player.name != this.player.name)){

					if(neigh.piece != null && neigh.piece.player.name != this.player.name && !(neigh.piece instanceof King)){
						x++;
					}

					neigh.selected = true;
					neigh = neigh.neighbours[[neigh.x-dirX,neigh.y-dirY]];

					if(x>0){
						break;
					}
					
				}
			}
		}
	}

	toString(){
		return this.player.name + " Bishop";
	}
}