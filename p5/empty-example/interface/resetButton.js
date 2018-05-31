/*
	Chess game by Nemanja Zaric

	This is the class for the reset button. 
*/

class ResetButton extends Button{

	constructor(x, y, width, height, name){
		super(x, y, width, height, name);
	}

	onClick(){
		let i = floor(mouseX-fieldNumSize/2);
		let j = floor(mouseY-fieldNumSize/2);
		if((i >= this.x) && (i <= (this.x + this.width)) && (j >= this.y) && (j <= (this.y + this.height))){
			g = new Game(offset,boardSize);
			g.createBoard();
		}
	}
}