class Button {
	float xpos, ypos, bw, bh;    // The x and y position and the width and height 
	boolean pressed;             // Check whether the button is pressed to perform actions
	String bText;                // Text the button will display
	Button(float x, float y, float w, float h, String text){
		xpos = x;
		ypos = y;
		bw = w;
		bh = h;
		bText = text;
		pressed = false;
	}
 
 void update(){
	// Check if mouse is in bounds of the button
	if(mouseX > xpos && mouseX <xpos + bw && mouseY > ypos && mouseY < ypos + bh){
		if(mousePressed){
			pressed = true;
		}else{
			pressed = false; 
		}
	}
 }
 
 	void display(){
		fill(255);
		stroke(150);
		strokeWeight(2);
		if(pressed){
			fill(180); 
		}
		rect(xpos,ypos,bw,bh);
		strokeWeight(1);
		stroke(255);
		fill(0);
		textSize(16);
		// Draw text to center of button
		float textXPos = xpos+bw/2-textWidth("Reset")/2;
		float textYPos = ypos+bh/1.5;
		text("Reset",textXPos, textYPos);
		fill(255);
	}
}
