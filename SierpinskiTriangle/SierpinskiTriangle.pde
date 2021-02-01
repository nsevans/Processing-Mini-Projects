

int corner_count;  // Number of corners on the ngon

// Numbers used for calculating new point position
float multiplier;
float divider;


int new_corner_count;  // Used to set new ngon with slider
int min_corners;       // Min number of points an ngon can have
int max_corners;      // Max number of points an ngon can have

// x and y positions of each corner of the shape
float[][] corner_positions;

// The current x and y position of the most recent point drawn
float curx;
float cury;

// The position of the last point drawn
// Used for redrawing last circle with different colour
float prevx;
float prevy;

// Radius of each new point drawn
float circle_size;

int iters;      // Counter for the number of times the simulation will calculate a new point
int max_iters;  // Limit for total number of points drawn during the life of the program

int[] rand_count;  // Tally of each dice roll, index 0 = dice roll 1, etc.

HScrollbar scrollbar;  // Scrollbar used to change the size of the ngon
float change_sep;      // Used for equal seperation of values when scrubbing on the scroll bar

Button resetButton;    // Button used to reset the simulation after changing the size of the ngon

void setup(){
  	size(800,600);
	background(0);
	
	// Info will be shown to the left of this line, the simulation
	// will show to the right
	stroke(255);
	line(200,0,200,600);
	
	corner_count = 3;
	multiplier = (float)corner_count-2;
	divider = (float)corner_count-1;
	
	new_corner_count = 5;
	min_corners = 3;
	max_corners = 10;
	
	corner_positions = new float[corner_count][2];
	
	prevx = curx;
	prevy = cury;

	circle_size = 1;

	iters = 0;
	max_iters = 10000000;
	
	rand_count = new int[corner_count];
	
	// Calculate and draw ngon
	stroke(0,255,0);
	fill(0,255,0);
	drawNgon(500,300,85,corner_count);
	
	// Starting point
	curx = (corner_positions[0][0] + corner_positions[1][0] * multiplier)/divider;
	cury = (corner_positions[0][1] + corner_positions[1][1] * multiplier)/divider;
	circle(curx,cury,circle_size);
	
	// Setup scrollbar for ngon count
	scrollbar = new HScrollbar(10, height-100, 180, 20, 1);
	change_sep = scrollbar.swidth/(max_corners-min_corners);
	
	// Setup button for reseting simulation
	resetButton = new Button(10,height-50,100,30, "Reset");
  
}

void drawNgon(float x, float y, float radius, float npoints){
	/*
	 * Used part of the example found here: https://processing.org/examples/regularpolygon.html
	 */
	float angle = TWO_PI / npoints;
	int index = 0;
	for(float a = 0; a < TWO_PI+0; a += angle){
		// Avoids going out of bounds when storing points in array
		if(index >= npoints){
			break;
		}
		// Calculate the position of the point
		float sx = x + cos(a) * radius * 3;
		float sy = y + sin(a) * radius * 3;
		// Store the values of the point
		corner_positions[index][0] = sx;
		corner_positions[index][1] = sy;

		//Draw the point
		circle(sx,sy,10);
		index += 1;
  	}
  
}

void draw(){
  
  	drawLeftDisplay();
  
	if(iters <= max_iters){
		drawPoint();
		//delay(100);
	}
  
	if(resetButton.pressed == true){
		reset();
	}
  
	// Calculate the new corner count for if/when the user resets the simulation
	new_corner_count = (int)(scrollbar.getPos()/change_sep) + min_corners;

	scrollbar.update();
	scrollbar.display();
	resetButton.update();
	resetButton.display();
}

void reset(){
	// Clear everything on the screen
	clear();

	// Reset values for new simulation
	corner_count = new_corner_count;
	iters = 0;
	rand_count = new int[corner_count];
	corner_positions = new float[corner_count][2];
	
	multiplier = (float)corner_count-2;
	divider = (float)corner_count-1;
	
	stroke(255);
	line(200,0,200,600);
	
	stroke(0,255,0);
	fill(0,255,0);
	drawNgon(500,300,85,corner_count);
	
	// Starting point
	curx = (corner_positions[0][0] + corner_positions[1][0] * multiplier)/divider;
	cury = (corner_positions[0][1] + corner_positions[1][1] * multiplier)/divider;
	circle(curx,cury,circle_size);
}

void drawPoint(){
	int rand = int(random(corner_count)); // Returns a value between 1 and 6
	rand_count[rand] += 1;
	// Redraw at the last point with a white cricle to cover over the red circle
	prevx = curx;
	prevy = cury;
	circle(prevx,prevy,circle_size);
	
	fill(255,0,0);
	stroke(255,0,0);
	curx = (curx + corner_positions[rand][0] * multiplier)/divider;
	cury = (cury + corner_positions[rand][1] * multiplier)/divider;
	//delay(1000);
	circle(curx,cury,circle_size);
	
	iters += 1;
}

void drawLeftDisplay(){
	// Clear text from screen each loop
	fill(0);
	noStroke();
	rect(0,0,200,height);
	rect(0,height-200,200,height-100);
	fill(0);
	stroke(255);
	fill(255);
	fill(255);
	
	int text_x = 10;
	int text_y = 50;
	
	textSize(16);
	// Number of points drawn / iterations
	text("Points Drawn: "+iters,text_x,text_y);
	text_y += 25;
	
	// Tracks each dice roll and displays a tally of
	// each number
	text("Dice rolls:",text_x,text_y);
	text_y += 25;
	for(int i=0; i<rand_count.length; i++){
		text("   "+(i+1)+": "+rand_count[i], text_x, text_y);
		text_y+= 25;
	}

	// Show the current position of the newest point
	text("Current position:",text_x, text_y);
	text_y += 25;
	fill(255,0,0);
	text("   ("+int(curx)+","+int(cury)+")",text_x,text_y);
	fill(255);
	
	// Shows the new number of corners that will be used once the 
	// display is reset
	text_y = height-125;
	text("Corners: "+new_corner_count, text_x, text_y);
}
