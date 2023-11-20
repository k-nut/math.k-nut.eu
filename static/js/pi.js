function setup() {
	svg = d3.select('#draw-shapes')
		.append('svg')
		.attr('width', 400)
		.attr('height', 400);
}


const addUnitCircle = () => {
	svg.append('circle')
		.attr('cx', 0)
		.attr('cy', 400)
		.attr('r', 400)
		.style('stroke', 'blue')
		.style('stroke-width', 2)
		.style('fill', 'none');

}

function calculate_pi(grid_size, number_of_circles) {
	if (number_of_circles > 20) {
		return;
	}
	svg.selectAll('*').remove();
	addUnitCircle();

	var circle_count = 0;
	var total = number_of_circles * number_of_circles;
	var step = grid_size / number_of_circles;
	var half_step = step / 2;

	for (var x = half_step; x < grid_size; x += step) {
		for (var y = half_step; y <= grid_size; y += step) {
			var circle = svg.append('circle')
				.attr('cx', x)
				.attr('cy', y)
				.attr('r', half_step)
				.style('opacity', 0.7)
				.style('stroke-width', 1);

			var coordinate_x = x / grid_size;
			var coordinate_y = convert_to_math_coordinates(y / grid_size, 1);

			if (is_inside_of_unit_circle(coordinate_x, coordinate_y)) {
				circle.style('fill', 'green');
				circle_count++;
			} else {
				circle.style('fill', 'red');
			}
		}
	}

	var pi_value = document.getElementById("pi_value");
	pi_value.innerHTML = 4 * circle_count / total;
}

function random_int(maximum) {
	return Math.floor((Math.random() * maximum) + 1);
}

function calculate_pi_random(grid_size, number_of_circles) {
	if (number_of_circles > 2000) {
		return;
	}
	svg.selectAll('*').remove();
	addUnitCircle();

	var circle_count = 0;

	for (var i = 0; i < number_of_circles; i++) {
		var x = random_int(grid_size);
		var y = random_int(grid_size);

		var circle = svg.append('circle')
			.attr('cx', x)
			.attr('cy', y)
			.attr('r', 2)
			.style('opacity', 0.7)
			.style('stroke-width', 1);

		var coordinate_x = x / grid_size;
		var coordinate_y = convert_to_math_coordinates(y / grid_size, 1);

		if (is_inside_of_unit_circle(coordinate_x, coordinate_y)) {
			circle.style('fill', 'green');
			circle_count++;
		} else {
			circle.style('fill', 'red');
		}
	}

	var pi_value = document.getElementById("pi_value");
	pi_value.innerHTML = 4 * circle_count / number_of_circles;
}

function convert_to_math_coordinates(y_point, grid_size) {
	return Math.abs(y_point - grid_size);
}

function is_inside_of_unit_circle(x, y) {
	return x * x + y * y < 1;
}

function recalculate_grid() {
	var number_of_points = document.getElementById("number_of_points").value;
	calculate_pi(400, number_of_points);
}

function recalculate_random() {
	var number_of_points = document.getElementById("number_of_points_random").value;
	calculate_pi_random(400, number_of_points);
}
