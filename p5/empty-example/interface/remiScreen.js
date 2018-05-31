/*
	Chess game by Nemanja Zaric

	This is the class for showing the screen when someone wants to end the game in a draw.
*/

class RemiScreen extends MyScreen{

	constructor(x, y, width, height, text){
		super(x, y, width, height, text);
		this.buttonWidth = 100;
		this.buttonHeight = 30;
		this.yesButton = new YesButton(this.x,this.y+this.height,this.buttonWidth,this.buttonHeight,"Yes");
		this.noButton = new NoButton(this.x+this.buttonWidth,this.y+this.height,this.buttonWidth,this.buttonHeight,"No");
	}

	draw(){
		super.draw();

		this.yesButton.draw();
		this.noButton.draw();
	}

	onClick(){
		this.yesButton.onClick();
		this.noButton.onClick();
	}
}