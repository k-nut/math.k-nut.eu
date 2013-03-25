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
var plotdata_einheitskreis = 
[
	{data: topcircle,    color: "black"}, 
	{data: bottomcircle, color: "black"}
];

var einheitskreis = $.plot($("#einheitskreis"),  plotdata_einheitskreis,
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

o = einheitskreis.pointOffset({ x: 1, y: 0});
$("#einheitskreis").append('<div id="test" style="position:absolute;left:' + (o.left+5) + 'px;top:' + (o.top-27/2) + 'px;color:#666;font-size:smaller">0/2\u03c0</div>');
o = einheitskreis.pointOffset({ x: 0, y: 1});
$("#einheitskreis").append('<div id="test" style="position:absolute;left:' + (o.left-5) + 'px;top:' + (o.top-27) + 'px;color:#666;font-size:smaller">\u03c0/2</div>');
o = einheitskreis.pointOffset({ x: -1, y: 0});
$("#einheitskreis").append('<div id="test" style="position:absolute;left:' + (o.left-15) + 'px;top:' + (o.top-27/2) + 'px;color:#666;font-size:smaller">\u03c0</div>');
o = einheitskreis.pointOffset({ x: 0, y: -1});
$("#einheitskreis").append('<div id="test" style="position:absolute;left:' + (o.left-10) + 'px;top:' + (o.top) + 'px;color:#666;font-size:smaller">3\u03c0/2</div>');

function newsin(){
	var sinepointer = [];
	var angle = $("#angle").val();
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

	var new_plotdata_einheitskreis = plotdata_einheitskreis;
	new_plotdata_einheitskreis[2] = {data: sinepointer, color:"blue"};
	new_plotdata_einheitskreis[3] = {data: sinus, color:"red"};

	einheitskreis.setData(new_plotdata_einheitskreis);
	einheitskreis.draw();

	// Set Degree legend
	var angle_in_degree = Math.round(angle*180/Math.PI);
	$("#degree").val(angle_in_degree);
	$("#rad").val(tofraction(Math.round(angle/Math.PI*100)/100) + "\u03c0");
	$("#sin").val(Math.round(height*100)/100);
}

function tofraction(n){
	if (n === 0){
		return 0;
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
			return zaehler + "/"+ nenner;
		}
	}
}
