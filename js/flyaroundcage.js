/* A bird that flies and dies when you click him
By Gus Cost & David Ziegler
*/

var window_width = $(window).width();
var window_height = $(window).height();

var paper = Raphael(0, 0, window_width, window_height);

//BACKGROUND
var sky = paper.rect(0,0,window_width, window_height);
sky.attr("fill", "#B9B1BF");

// CAGE
var NUMBER_OF_VERTICAL_BARS = 12;
var NUMBER_OF_HORIZONTAL_BARS = 8
var space_between_vertical_bars = window_width / NUMBER_OF_VERTICAL_BARS;
var space_between_horizontal_bars = window_height / NUMBER_OF_HORIZONTAL_BARS;
var BAR_THICKNESS = 4;
var BAR_COLOR = "#FFD700"

for (i=0; i<NUMBER_OF_VERTICAL_BARS; i++) {
	var bar = paper.rect(i*space_between_vertical_bars, 0, BAR_THICKNESS, window_height);
	bar.attr("fill", BAR_COLOR);
}

for (i=0; i<NUMBER_OF_HORIZONTAL_BARS; i++) {
	var bar = paper.rect(0, i*space_between_horizontal_bars, window_width, BAR_THICKNESS);
	bar.attr("fill", BAR_COLOR);
}

var ORIENTATION = {
	RIGHT: 0,
	LEFT: 1
}

var Point = function(x, y) {
	this.x = x;
	this.y = y;
}

// A BIRD
var Bird = function( name, start_point, speed, init_angle )
{
 	this.name = name;
	this.x = start_point.x;
	this.y = start_point.y;
	this.velocity = {x: 0, y: 0};
	
	var angle = init_angle;
	var speed = speed;

	this.calculateVelocity = function() {
		this.velocity.x = Math.abs( Math.cos(angle)*speed );
		this.velocity.y = Math.abs( Math.sin(angle)*speed );
	};

	// initialize bird images, right and left facing
	var face_right_image = [];
	var face_left_image = [];
	for (i=0; i<4; i++) {
		face_right_image[i] = paper.image('img/right_bird' + i + '.png', 9999, 9999, 40, 40);
		face_left_image[i] = paper.image('img/left_bird' + i + '.png', 9999, 9999, 40, 40);
	};
	
	var oriented_image_sets = [face_right_image, face_left_image];
	this.orientation = ORIENTATION.RIGHT;
	this.current_oriented_image_set = oriented_image_sets[this.orientation];
	this.current_image_index = 0;
	this.fly = function() {

		if ( this.orientation == ORIENTATION.RIGHT ) {

			if ( this.x < (window_width - 50) ) {
				this.x = this.x + this.velocity.x * dt; 
				console.log(this.x);
				} 
			else {
				oriented_image_sets[this.orientation][this.current_image_index].attr( { x: 9999, y: 9999 });
				this.orientation = ORIENTATION.LEFT;
			} 
		}

			if ( this.orientation == ORIENTATION.LEFT ) {

			if ( this.x > 50 ) {
				this.x = this.x - this.velocity.x * dt; 
				console.log(this.x);
				} 
			else {
				oriented_image_sets[this.orientation][this.current_image_index].attr( { x: 9999, y: 9999 });
				this.orientation = ORIENTATION.RIGHT;
			} 
		}

		//TODO:  add y flight
		

		oriented_image_sets[this.orientation][this.current_image_index].attr( { x: 9999, y: 9999 });
		this.current_image_index = ( this.current_image_index + 1 ) % 4;
		oriented_image_sets[this.orientation][this.current_image_index].attr( { x: this.x, y: this.y });

	};
}

 

// make a set of birds
var birds = [];
birds[0] = new Bird("tweetie", new Point(10,10), 0.4, 0);
birds[0].calculateVelocity();
birds[1] = new Bird("sylvester", new Point(10, 80), 0.5, 0);
birds[1].calculateVelocity;

var dt = 50; // refresh rate, in milliseconds
var animate = function() {
	for ( bird_i = 0;  bird_i < birds.length; bird_i++ ) {
		birds[bird_i].fly();
	}
}

// get it all going
window.setInterval(animate, dt);
