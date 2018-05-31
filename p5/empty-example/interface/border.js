/*
	Chess game by Nemanja Zaric

	This is the class for drawing the border numbers and letters representing the 
	row and column names. 
*/
class Border{

	constructor(){
		this.x = 0;
		this.y = 0;
	}

	draw(){
		push();
		noStroke();
		let c = color(89,106,114);
		fill(255);
		textSize(fieldNumSize/4);
		textFont("Courier New");
		let j = numberOfFields;
		for (var i in g.fields) {
			if(g.fields[i].x == 0){
				text(j--,g.fields[i].x,g.fields[i].y*g.rectSize+fieldNumSize,g.rectSize,g.rectSize);
			}
			if(g.fields[i].y == 0){
				text(g.fields[i].name[0],g.fields[i].x*g.rectSize+fieldNumSize,g.fields[i].y,g.rectSize,g.rectSize);
			}
		}
		pop();
	}

}