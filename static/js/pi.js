function setup(){
	// Make an instance of two and place it on the page.
	var elem = document.getElementById('draw-shapes').children[0];
	var params = { width: 400, height: 400};
	two = new Two(params).appendTo(elem);
}

function calculate_pi(grid_size, number_of_circles) {
	if (number_of_circles > 20) {
		return;
	}
	two.clear();
	var unit_circle = two.makeCircle(0, 400, 400);
	unit_circle.stroke = "blue";
	unit_circle.linewidth = 2;

	var circle_count, total, step, half_step;

	circle_count = 0;
	total = number_of_circles * number_of_circles;
	step = grid_size / number_of_circles;
	half_step = step / 2;

	for (var x = half_step; x < grid_size; x += step){
		for (var y = half_step; y <= grid_size; y += step){
			var circle = two.makeCircle(x,y, half_step);
			var cordinate_x = x/grid_size;
			var cordinate_y = convert_to_math_cordinates(y/grid_size, 1);
			if (is_inside_of_unit_circle(cordinate_x, cordinate_y)){
				circle.fill = "green";
				circle_count++;
			}
			else {
				circle.fill = "red";
			}
			circle.opacity = 0.7;
			circle.linewidth = 1;
		}
	}
	var pi_value = document.getElementById("pi_value");
	pi_value.innerHTML = 4 * circle_count / total;
	two.update();
}

function random_int(maximum){
	return Math.floor((Math.random()*maximum)+1);
}

function calculate_pi_random(grid_size, number_of_circles) {
	if (number_of_circles > 2000) {
		return;
	}
	two.clear();
	var unit_circle = two.makeCircle(0, 400, 400);
	unit_circle.stroke = "blue";
	unit_circle.linewidth = 2;

	var circle_count, total, step, half_step;
	circle_count = 0;

	for (var i = 0; i < number_of_circles; i++){
		var x = random_int(grid_size);
		var y = random_int(grid_size);
		var circle = two.makeCircle(x,y, 2);
		var cordinate_x = x/grid_size;
		var cordinate_y = convert_to_math_cordinates(y/grid_size, 1);
		if (is_inside_of_unit_circle(cordinate_x, cordinate_y)){
			circle.stroke = circle.fill = "green";
			circle_count++;
		}
		else {
			circle.stroke = circle.fill = "red";
		}
		circle.opacity = 0.7;
		circle.linewidth = 1;
	}
	var pi_value = document.getElementById("pi_value");
	console.log(circle_count);
	pi_value.innerHTML = 4 * circle_count / number_of_circles;
	two.update();
}


function convert_to_math_cordinates(y_point, grid_size){
	return Math.abs(y_point-grid_size);
}

function is_inside_of_unit_circle(x, y){
	if (x*x + y*y < 1){
		return true;
	}
	return false;
}

function recalculate_grid( ) {
	var number_of_points = document.getElementById("number_of_points").value;
	calculate_pi(400, number_of_points);
}

function recalculate_random( ) {
	var number_of_points = document.getElementById("number_of_points_random").value;
	calculate_pi_random(400, number_of_points);
}
