/*
	Chess game by Nemanja Zaric

	This is the class for the fields of the board. 
*/
class Field{

	constructor(x, y, name){

		this.x = x;
		this.y = y;
		this.neighbours = {};
		this.name = name;
		this.color;
		this.selected = false;
		this.attacked = false;
		this.piece;

	}

	draw(rectSize){
		stroke(0);

		if (this.attacked) {
			let c = color(150,0,50);
			this.color = c;
		}else if(this.selected){
			let c = color(0,150,50);
			//this.attacked = true;
			this.color = c;
		}else if((this.x + this.y)%2 == 0){
			let c = color(242,207,140);
			//this.attacked = false;
			this.color = c;
		}else{
			let c = color(92,68,53);
			//this.attacked = false;
			this.color=c;
		}

		fill(this.color);
		rect(this.x*rectSize,this.y*rectSize,rectSize,rectSize);
	}

	get_piece(){
		return this.piece;
	}

	set_piece(piece){
		this.piece = piece;
	}

}