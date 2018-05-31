/*
	Chess game by Nemanja Zaric

	This is the class for drawing the interface. 

	update() updates the history log. new moves will always be on top.

	draw() just draws the interface on screen.

	I added the buttons here because it makes more sense to make them here,
	than in the Game class.

	Also I tried to remove most of the magic numbers from everywhere. :)
*/

class Interface{

	constructor(x, y){
		this.width = (width - offset - fieldNumSize)/2-fieldNumSize;
		this.height = g.rectSize + g.rectSize*4;
		this.separation = 12;
		this.x = x+this.separation;
		this.y = y;
		this.turnPart = {"label": "Turn:", "player": g.turn, "height": g.rectSize/2};
		this.logPart = {"x": this.x, "y": this.y+this.turnPart.height, "height": g.rectSize*4, "label": "History:"};
		this.checkMatePart = {"label": "", "y": this.logPart.y + this.logPart.height, "height": g.rectSize/2};
		this.buttonWidth = 100;
		this.buttonHeight = 30;


		this.resetButton = new ResetButton(this.x,this.y+this.height,this.buttonWidth,this.buttonHeight,"Reset");
		this.drawButton = new DrawButton(this.x+this.buttonWidth,this.y+this.height,this.buttonWidth,this.buttonHeight,"Remi");
		this.undoButton = new UndoButton(this.x,this.y+this.height+this.buttonHeight,this.buttonWidth,this.buttonHeight,"Undo");
		this.redoButton = new RedoButton(this.x+this.buttonWidth,this.y+this.height+this.buttonHeight,this.buttonWidth,this.buttonHeight,"Redo");
	}

	update(){
		this.turnPart.player = g.turn;
		this.logPart.label = "History: ";
		for (var i = g.log.length - 1; i >= 0; i--) {
			this.logPart.label += "\n" + g.log[i];
		}
		if(g.isCheck){
			this.checkMatePart.label = "Check";
		}else if(g.isMate){
			this.checkMatePart.label = "Check Mate!";
		}else{
			this.checkMatePart.label = "";
		}
	}

	draw(){
		
		stroke(255);
		fill(190);

		rect(this.x, this.y, this.width, this.turnPart.height);
		rect(this.logPart.x, this.logPart.y,this.width, this.logPart.height);
		rect(this.x, this.checkMatePart.y, this.width, this.checkMatePart.height);

		push();
		
		noStroke();

		textAlign(CENTER,TOP);
		textSize(this.turnPart.height-10);
		if(this.turnPart.player === "white"){
			fill(255);
		}else{
			fill(0);
		}
		text(this.turnPart.label + " " + this.turnPart.player, this.x,this.y,this.width,this.turnPart.height);

		fill(0);
		textSize(this.turnPart.height-18);
		text(this.logPart.label, this.x, this.logPart.y,this.width,this.logPart.height);
		
		textSize(this.turnPart.height-10);
		text(this.checkMatePart.label, this.x,this.checkMatePart.y,this.width,this.checkMatePart.height);

		pop();
		this.resetButton.draw();
		this.drawButton.draw();
		this.undoButton.draw();
		this.redoButton.draw();
	}

	onClick(){
		this.resetButton.onClick();
		this.drawButton.onClick();
		this.undoButton.onClick();
		this.redoButton.onClick();
	}
}