# Processing Mini Projects

This repository has mini projects created with the p5.js library.  

## Boids Flocking Simluation

This flocking simulation is based on Craig Reynolds Boids simulation, which simulates the birds and their flocking behaviour.
			
A boid follows these three main rules: 

* Separation: Steer to avoid crowding local flockmates.
* Alignment: Steer towards the average heading of local flockmates.
* Cohesion: Steer to move toward the average position of local flockmates.

The idea for the simulation can be found [here](https://www.youtube.com/watch?v=mhjuuHl6qHM), and more information on Boids can be found [here](https://en.wikipedia.org/wiki/Boids).

## Conway's Game of Life

Conway's Game of Life is a famous cellular automaton created by John Horton Conway. It's a game where the evolution of each pixel is determined by its surrounding neighbours.

The rules of the Game of Life are as follows:

* Any living cell with 2 or 3 living neighbours lives.
* Any dead cell with 3 living neighbours becomes a living cell.
* All other living cells that doesn't meet the first rule dies, and any dead cell that doesn't meet the second rule stays dead.


Most simulations allow the user to select which cells are dead or alive before starting the simulation (which may be implemented at a future time), however this simulation selects the dead or alive cells at random and can be reset with the 'Restart Simulation' button below.

More information about Conway's Game of Life can be found [here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

## Chaos Game - Sierpinski Triangle

This is a simulation of a chaos game. A chaos game is a method of creating a fractal, in this simulation a Sierpinski Triangle, using the three points of the triangle and a starting point randomly selected within the bounds of the triangle. The fractal is created by continuously drawing points, starting at the initial random point and selecting one of the three points of the triangle at random. A new point is then drawn halfway between the two points, and the process repeats as the Sierpinski Triangle will begin to be revealed.

More information on chaos games can be found [here](https://en.wikipedia.org/wiki/Chaos_game) and more information about Sierpinski Triangles can be found [here](https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle).

## Fireworks

This is a little simulation of particle emission and fireworks.

The idea for the simulation can be found [here](https://www.youtube.com/watch?v=CKeyIbT3vXI).

## Square Filler

This is a project that places squares randomly on the canvas and each time one is placed the size of the next square shrinks.

The rule that this simulation follows is that no square can be colliding with another square.

It takes a second for the simulation to really get going as the squares start off fairly large, but once the size shrinks enough
the smaller square start to fill in the cracks between the larger squares and it creates something nice to look at.

## Prime Counter

This is a little project that draws a green pixel on each prime spot, starting from the top left all the way to the bottom right.

## Worley Noise

p>Worley noise is a noise algorithm initially introduced by Steven Worley. It is used to create procedural textures and it comes close to simulating textures like water, stone and biological cells. The algorithm chooses random points on the canvas, and then it colors each pixel on the screen depending on how close it is to one of the randomly placed points

There are different options to play with at the bottom of the screen that will result in different patterns. Whenever the options change, press the 'Restart Simulation' button to see what effects it will have.

The idea for this project can be found [here](https://www.youtube.com/watch?v=4066MndcyCk) and more information about Worley Noise can be found [here](https://en.wikipedia.org/wiki/Worley_noise).

## Sorting Algorithm

Still a work in progress