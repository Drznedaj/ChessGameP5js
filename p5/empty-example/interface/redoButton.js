/*
	Chess game by Nemanja Zaric

	This is the class for the redo button.
	
*/
class RedoButton extends Button{

	constructor(x, y, width, height, name){
		super(x, y, width, height, name);
	}

	onClick(){
		let i = floor(mouseX-fieldNumSize/2);
		let j = floor(mouseY-fieldNumSize/2);
		if((i >= this.x) && (i <= (this.x + this.width)) && (j >= this.y) && (j <= (this.y + this.height))){
			// if(!(numOfSaves <= 1)){
			// 	indexUndo++;
			// 	if(indexUndo >= numUndos){
			// 		indexUndo = numUndos-1;
			// 	}
			// 	loadContext(indexUndo);
			// 	console.log(indexUndo);
			// }
		}
	}
}