/*
	Chess game by Nemanja Zaric

	This is the class for the reset button. 
*/

class Button{

	constructor(x, y, width, height, name){
		this.name = name;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	draw(){
		push();
		fill(190);
		stroke(255);
		textSize(16);
		rect(this.x, this.y, this.width, this.height);
		noStroke();
		fill(0);
		textAlign(CENTER,CENTER);
		text(this.name, this.x, this.y, this.width, this.height);
		pop();
	}

}