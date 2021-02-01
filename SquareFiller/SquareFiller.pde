import java.util.ArrayList;

ArrayList<float[]> square_array = new ArrayList<float[]>();  // Array to store positional and size data of each square

int square_count;    		// Number of squares drawn and tries at drawing squares
float current_length;    	// Current length of the square being drawn
float buffer;        		// Space between drawn squares

int max_squares;  			// Max number of squares to draw
int max_tries;      		// Max number of tries to draw a square

float shrink_rate;			// Rate of how quickly the square being drawn gets smaller

void setup() {
	size(900,600);
	background(0);

	current_length = width/3;

	square_count = 0;
	buffer = 5;
	max_squares = 5000;
	max_tries = 50;	
	shrink_rate = 1.002
}

void draw() {

	if(square_count <= max_squares){
		// Generate random colour
		float r = random(0,254);
		float g = random(0,254);
		float b = random(0,254);
		
		// Generate random position
		float x = random(0,width);
		float y = random(0,height);
		
		int tries = 0;
		boolean fits = false;

		// Make sure square will fit
		while(fits == false && tries < max_tries){

			boolean collision = false;

			for(int i=0; i<square_array.size(); i++){

				// Check if square collides
				float other_x = square_array.get(i)[0];
				float other_y = square_array.get(i)[1];
				float other_s = square_array.get(i)[2];
				float s = current_length;

				// Type 1 Collision - Top Left Corner
				if((x + s >= other_x - buffer && x + s <= other_x + other_s + buffer) &&
				(y + s >= other_y - buffer && y + s <= other_y + other_s + buffer)){
					collision = true;
					break;
				
				// Type 2 Collision - Top Right Corner
				}else if((x >= other_x - buffer && x <= other_x + other_s + buffer) &&
				(y + s >= other_y - buffer && y + s <= other_y + other_s + buffer)){
					collision = true;
					break;
				
				// Type 3 & 5 Collision - Center & Bottom Right Corner
				}else if((x >= other_x - buffer && x <= other_x + other_s + buffer) &&
				(y >= other_y - buffer && y <= other_y + other_s + buffer)){
					collision = true;
					break;
				
				// Type 4 Collision - Bottom Left Corner
				}else if((x + s >= other_x - buffer && x + s <= other_x + other_s + buffer) &&
				(y >= other_y - buffer && y <= other_y + other_s + buffer)){
					collision = true;
					break; 
				}
			}
			
			if(collision == false){
				// No collision for this position so exit the loopp
				fits = true;  
			}else{
				// There was a collision so try a new random position
				x = random(0,width);
				y = random(0,height);
				tries++;
			}
		
		}
		if(tries < 10){
			// Save random position
			float[] data = {x,y,current_length};
			square_array.add(new float[3]);
			square_array.add(data);
			
			// Draw square to screen
			fill(r,g,b);
			stroke(r,g,b);
			square(x,y,current_length);
		}
    
		// Update square size
		current_length /= shrink_rate;
		
		// Update number of squares
		square_count++;
  	}
}
