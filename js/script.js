/* A bird that flies and dies when you click him
By Gus Cost & David Ziegler
*/

var window_width = $(window).width();
var window_height = $(window).height();

var paper = Raphael(0, 0, window_width, window_height);

//SCENERY
var sky = paper.rect(0,0,window_width, window_height);
sky.attr("fill", "90-#66D:5-#88F:95");

var hill = paper.circle(window_width, window_height + 1400, 1600);
hill.attr("fill", "#0A0");
hill.attr("stroke", "#fff");

var hill2 = paper.circle(100, window_height + 1420, 1700);
hill2.attr("fill", "#091");
hill2.attr("stroke", "#fff");

var trunk = paper.rect(window_width - 140, window_height - 420, 50, 250);
trunk.attr("fill", "#440");
trunk.attr("stroke", "#330");

for (var x = 0; x < 300; x++)
{
  var t = 2*Math.PI*Math.random();
  var u = Math.random()+Math.random();
  var r = u>1 ? 2-u : u;
  var theX = r*Math.cos(t);
  var theY =  r*Math.sin(t);
  // Creates leaf at x = 50, y = 40, with radius 10
  var leaf = paper.circle((window_width - 115 + theX*120), (window_height - 420 + theY*120), 15);
  // Sets the fill attribute of the leaf to green 
  leaf.attr("fill", "#060");
  // Sets the stroke attribute of the leaf to light green
  leaf.attr("stroke", "#0c0");
}

var GROUND_Y = window_height - 100;

var Point = function(x, y) {
	this.x = x;
	this.y = y;
}

// THE BIRD

var Bird = function( name, start_point, end_point, flight_time )
{
	this.alive = true;
	this.name = name;
	this.x = start_point.x;
	this.y = start_point.y;
	this.velocity_x = 0;
	this.velocity_y = 0;
	
	var angle = Math.atan( (end_point.y - start_point.y) / (end_point.x - start_point.x) );
	var speed = (Math.sqrt( Math.pow((end_point.y - start_point.y), 2) 
														+ Math.pow((end_point.x - start_point.x), 2) )) / flight_time;

	this.velocity_x = Math.abs( Math.cos(angle)*speed );
	this.velocity_y = Math.abs( Math.sin(angle)*speed );

	this.freefall_time = 0;

	// bird images and kill event on each image
	this.flight_image = [];
	for (i=0; i<4; i++) {
		this.flight_image[i] = paper.image('img/bird' + i + '.png', 9999, 9999, 40, 40);
		this.flight_image[i].click( function() {
			this.alive = false;
		});
	};

	this.current_image_index = 0;
	this.deadbird_image = paper.image('img/deadbird.png', 9999, 9999, 40, 40);

	this.move = function() {

		if ( this.alive ) {
				
			if ( this.x < end_point.x && this.y < end_point.y ) {
				this.x = this.x + (this.velocity_x * dt);
				this.y = this.y + (this.velocity_y * dt);

if (this.x > (start_point.x+end_point.x)/2) {this.alive = false;}

				this.flight_image[this.current_image_index].attr( { x: 9999, y: 9999 } );
				this.current_image_index = (this.current_image_index + 1 ) % 4;
				this.flight_image[this.current_image_index].attr( { x: this.x, y: this.y } );
			}
		}

		else if ( this.y < GROUND_Y ) {
			this.x = this.x + this.velocity_x * dt;
			this.velocity_y = this.velocity_y + 0.025 // acceleration due to gravity
			this.y = this.y + this.velocity_y * dt;
			this.flight_image[this.current_image_index].attr( {x: this.x, y: this.y } );
		
		}

		else {
			this.deadbird_image.attr( {x: this.x, y: GROUND_Y} );
	 		this.flight_image[this.current_image_index].attr( {x: 9999, y: 9999} );
		}

	}

};

 
var max_duration_of_animation = 10000; // in milliseconds
var dt = 50; // refresh rate, in milliseconds
var time = 0;

var birds = [];

//tweetie
birds[0] = new Bird("tweetie", new Point(10,10), new Point(window_width - 115, window_height - 420), 10000);
birds[1] = new Bird("toucansam", new Point(30,30), new Point(window_width - 175, window_height - 100), 8000);
birds[2] = new Bird("polly", new Point(50, 30), new Point(window_width - 225, window_height - 100), 9000);
birds[3] = new Bird("woodstock", new Point(10, 50), new Point(window_width - 150, window_height - 420), 5000);


var current_bird = null;

var animate = function() {
	if ( time < max_duration_of_animation ) {

		for ( bird_i = 0;  bird_i < birds.length; bird_i++ )
			{
				birds[bird_i].move();
			}

		time =  time + dt;

	}
}


window.setInterval(animate, dt);

// var number_of_frames = 100;

// var frame_number = 0
// var sprite_number = 0;

// var dt = 100;
// var death_ticks = 1;
// var death_y = window_height - 100;

// var bird_end_X = window_width - 115; // from gus's trunk above, middle of it
// var bird_end_Y = window_height - 420; // from gus's trunk above, top of it



// window.setInterval(function() {
	
// 	var b = new Bird('tweetie', 10, 10);

// 	if (bird_is_alive)
// 	{
// 		if (frame_number < number_of_frames) {
// 			bird_x = bird_x + dx;
// 			bird_y = bird_y + dy;

// 			frame_number++;

// 			bird[sprite_number].attr({x: 9999, y: 9999});
// 			sprite_number = (sprite_number +1) % 4;
// 			bird[sprite_number].attr({x: bird_x, y: bird_y});

// 		}
// 	}
// 	else if (bird_y < death_y)
// 	{
// 		// bird with gravity pulling him down:
// 		bird[sprite_number].attr({x: bird_x, y: bird_y});
// 		bird_x = bird_x + dx;
// 		bird_y = bird_y + 20 * (death_ticks);
// 		death_ticks += 1; 
// 	}
// 	else
// 	{
// 		deadbird.attr({x: bird_x, y: death_y});
// 		bird[sprite_number].attr({x: 9999, y: 9999});
// 	}

// 	}, dt);
