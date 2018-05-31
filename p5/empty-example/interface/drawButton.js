/*
	Chess game by Nemanja Zaric

	This is the class for the draw button, currently it just makes the game a draw
	by pressing on it with the mouse.
	
*/
class DrawButton extends Button{

	constructor(x, y, width, height, name){
		super(x, y, width, height, name);
	}

	onClick(){
		let i = floor(mouseX-fieldNumSize/2);
		let j = floor(mouseY-fieldNumSize/2);
		if((i >= this.x) && (i <= (this.x + this.width)) && (j >= this.y) && (j <= (this.y + this.height))){
			g.wantRemi = true;
		}
	}
}