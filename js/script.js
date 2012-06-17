/* Author:

Gus Cost & David Ziegler

*/

var paper = Raphael(0, 0, $(window).width(), $(window).height());

//SCENERY
var sky = paper.rect(0,0,$(window).width(), $(window).height());
sky.attr("fill", "90-#66D:5-#88F:95");

var hill = paper.circle($(window).width(), $(window).height() + 1400, 1600);
hill.attr("fill", "#0A0");
hill.attr("stroke", "#fff");

var hill2 = paper.circle(100, $(window).height() + 1420, 1700);
hill2.attr("fill", "#091");
hill2.attr("stroke", "#fff");

var trunk = paper.rect($(window).width() - 140, $(window).height() - 420, 50, 250);
trunk.attr("fill", "#440");
trunk.attr("stroke", "#330");

for (var x = 0; x < 300; x++)
{
        var t = 2*Math.PI*Math.random();
        var u = Math.random()+Math.random();
        var r = u>1 ? 2-u : u;
        var theX = r*Math.cos(t);
        var theY =  r*Math.sin(t);
        // Creates hill at x = 50, y = 40, with radius 10
        var leaf = paper.circle(($(window).width() - 115 + theX*120), ($(window).height() - 420 + theY*120), 15);
        // Sets the fill attribute of the hill to red (#f00)
        leaf.attr("fill", "#0e0");
        // Sets the stroke attribute of the hill to white
        leaf.attr("stroke", "#0a0");
}

// THE BIRD

//a circle for now
var width = $(window).width();
var height = $(window).height();

var number_of_frames = 100;

var bird_start_X = 10;
var bird_start_Y = 10;

var bird_end_X = width - 115; // from gus's trunk above, middle of it
var bird_end_Y = height - 420; // from gus's trunk above, top of it

var bird_x = bird_start_X;
var bird_y = bird_start_Y;

var bird_is_alive = true;

var deadbird = paper.image('img/deadbird.png', 9999, 9999, 40, 40);
var bird = [];
bird[0] = paper.image('img/bird1.png', 9999, 9999, 40, 40);
bird[1] = paper.image('img/bird2.png', 9999, 9999, 40, 40);
bird[2] = paper.image('img/bird3.png', 9999, 9999, 40, 40);
bird[3] = paper.image('img/bird4.png', 9999, 9999, 40, 40);

bird[0].click(function(){bird_is_alive = false;});
bird[1].click(function(){bird_is_alive = false;});
bird[2].click(function(){bird_is_alive = false;});
bird[3].click(function(){bird_is_alive = false;});

var translate_interval_X = (bird_end_X - bird_start_X) / number_of_frames;
var translate_interval_Y = (bird_end_Y - bird_start_Y) / number_of_frames;

var frame_number = 0
var sprite_number = 0;


window.setInterval(function() {
	
	if (bird_is_alive)
	{
	if (frame_number < number_of_frames) {
		bird_x = bird_x + translate_interval_X;
		bird_y = bird_y + translate_interval_Y;

		frame_number++;

		bird[sprite_number].attr({x: 9999, y: 9999});
		sprite_number = (sprite_number +1) %4;
		bird[sprite_number].attr({x: bird_x, y: bird_y});

	}
	}
	else if (bird_y < height - 100)
	{
		bird_y = bird_y + 20;
		bird[sprite_number].attr({x: bird_x, y: bird_y});
	}
	else
	{
		deadbird.attr({x: bird_x, y: bird_y});
		bird[sprite_number].attr({x: 9999, y: 9999});
	}

	}, 100);
