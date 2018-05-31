/*
	Chess game by Nemanja Zaric

	This is a prototype class for screens that show stuff on the center of the canvas.
*/

class MyScreen{

	constructor(x, y, width, height, text){
		this.text = text;
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
		text(this.text, this.x, this.y, this.width, this.height);
		pop();

	}
}