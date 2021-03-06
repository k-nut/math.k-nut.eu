var sinewave = [];
for (var i = 0; i < 2*Math.PI+0.2; i += 0.1){
	sinewave.push([i, Math.sin(i)]);
}
var sinewave_plot = $.plot($("#placeholder"), [sinewave],
{
	canvas: true,
	xaxis: {
		min: 0,
		max: Math.PI*2,
		ticks: [
			0, [ Math.PI/2, "\u03c0/2" ], [ Math.PI, "\u03c0" ],
			[ Math.PI * 3/2, "3\u03c0/2" ], [ Math.PI * 2, "2\u03c0" ]
		]
	},
	yaxis: {
		min: -1.5,
		max: 1.5
	}
});

// Draw Einheitskreis 
var topcircle = [];
var bottomcircle = [];

// Use integers for the loop to avoid rounding issues
for (var x=-100; x<=100; x += 1){
	xValue = x/100;
	positiveYvalue = Math.sqrt(1-Math.pow(xValue,2));
	topcircle.push([xValue,positiveYvalue]);
	bottomcircle.push([xValue, -1*positiveYvalue]);
}
var plotdata_unit_circle = 
[
	{data: topcircle,    color: "black"}, 
	{data: bottomcircle, color: "black"}
];

var unit_circle = $.plot($("#unit_circle"),  plotdata_unit_circle,
{
	xaxis:{
		min :-1.5,
		max: 1.5
	},
	yaxis:{
		min :-1.5,
		max: 1.5
	}
}
);

// Add markings to the unit circle 
o = unit_circle.pointOffset({ x: 1, y: 0});
$("#unit_circle").append('<div id="test" style="position:absolute;left:' + (o.left+5) + 'px;top:' + (o.top-27/2) + 'px;color:#666;font-size:smaller">0/2\u03c0</div>');
o = unit_circle.pointOffset({ x: 0, y: 1});
$("#unit_circle").append('<div id="test" style="position:absolute;left:' + (o.left-5) + 'px;top:' + (o.top-27) + 'px;color:#666;font-size:smaller">\u03c0/2</div>');
o = unit_circle.pointOffset({ x: -1, y: 0});
$("#unit_circle").append('<div id="test" style="position:absolute;left:' + (o.left-15) + 'px;top:' + (o.top-27/2) + 'px;color:#666;font-size:smaller">\u03c0</div>');
o = unit_circle.pointOffset({ x: 0, y: -1});
$("#unit_circle").append('<div id="test" style="position:absolute;left:' + (o.left-10) + 'px;top:' + (o.top) + 'px;color:#666;font-size:smaller">3\u03c0/2</div>');


function newsin(){
	var sinepointer = [];
	var angle = $("#angle").val() * Math.PI; //* Math.PI;
	var height = Math.sin(angle);
	var distance = Math.cos(angle);
	var sinus = [[distance, 0], [distance, height]];

	sinepointer.push([0,0], [distance, height]);

	sinewave_plot.setData( 
		[{data: sinewave},
			{data: [[angle, 0], [angle, height]],
				color: "red"
			}
	]);
	sinewave_plot.draw();

	var new_plotdata_unit_circle = plotdata_unit_circle;
	new_plotdata_unit_circle[2] = {data: sinepointer, color:"blue"};
	new_plotdata_unit_circle[3] = {data: sinus, color:"red"};

	unit_circle.setData(new_plotdata_unit_circle);
	unit_circle.draw();
	draw_legend(angle, height);

}

function draw_legend(angle, sinvalue){
	// Set Degree legend
	var angle_in_degree = Math.round(angle*180/Math.PI);
	$("#degree").text(angle_in_degree);

	var parts = tofraction(Math.round(angle/Math.PI*100)/100);
	if (parts[1] === 1){
		$("#fraction").hide();
		$("#whole_number").text(parts[0]).show();
	}
	else{
		$("#whole_number").hide();
		$("#fraction").show();
		$("#zaehler").text(parts[0]);
		$("#nenner").text(parts[1]);
	}
	$("#sin").text(Math.round(sinvalue*10000)/10000);
}


function tofraction(n){
	// Takes a float and returns the reduced fraction
	if (n % 1 === 0){
		return [n,1];
	}
	var length = n.toString().length -2;
	var nenner = Math.pow(10, length);
	var zaehler = parseInt(nenner*n, 10);
	var on;
	while (true){
		for (x=zaehler; x>=1; x--){
			on = nenner;
			if (zaehler % x === 0 && nenner % x === 0){
				zaehler /= x;
				nenner /= x;
			}
		}
		if (on === nenner){
			return [zaehler, nenner];
		}
	}
}
