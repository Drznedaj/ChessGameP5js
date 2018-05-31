/*
	Chess game by Nemanja Zaric

	This is the class for all the logic for Knights. 
*/
class Knight extends Piece{
	constructor(field, rectSize, sprite, player){
		super(field, rectSize, sprite, player);
	}

	update(){
		this.field.selected = !this.field.selected;
		let arr = [];
		let fld1 = g.fields[[this.field.x+1,this.field.y-2]];
		let fld2 = g.fields[[this.field.x-1,this.field.y-2]];
		let fld3 = g.fields[[this.field.x+2,this.field.y-1]];
		let fld4 = g.fields[[this.field.x-2,this.field.y-1]];
		let fld5 = g.fields[[this.field.x-1,this.field.y+2]];
		let fld6 = g.fields[[this.field.x+1,this.field.y+2]];
		let fld7 = g.fields[[this.field.x-2,this.field.y+1]];
		let fld8 = g.fields[[this.field.x+2,this.field.y+1]];
		arr.push(fld1);
		arr.push(fld2);
		arr.push(fld3);
		arr.push(fld4);
		arr.push(fld5);
		arr.push(fld6);
		arr.push(fld7);
		arr.push(fld8);

		for (var i = 0; i < arr.length; i++) {
			if(arr[i] != null && (arr[i].piece == null || arr[i].piece.player.name != this.player.name)){
				arr[i].selected = true;
			}
		}
		
	}
	
	toString(){
		return this.player.name + " Knight";
	}
}