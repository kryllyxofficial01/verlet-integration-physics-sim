import * as renderer from "./renderer.js"
import * as utils from "./misc.js";

export function update(points, sticks, canvas_context, canvas_dimensions) {
    update_points(points);

    for (var i = 0; i < utils.ITERATIONS; i++) {
        update_sticks(sticks);
        utils.constrain_points(points, canvas_dimensions);
    }

    canvas_context.clearRect(0, 0, canvas_dimensions.width, canvas_dimensions.height);

    renderer.render_points(canvas_context, points);
    renderer.render_sticks(canvas_context, sticks);

    requestAnimationFrame(function() {
        update(points, sticks, canvas_context, canvas_dimensions)
    });
}

export function update_points(points) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];

        if (!point.pinned) {
            var vx = (point.x - point.old_x) * utils.physics_constants.friction;
            var vy = (point.y - point.old_y) * utils.physics_constants.friction;

            point.old_x = point.x;
            point.old_y = point.y;

            point.x += vx;
            point.y += vy;
            point.y += utils.physics_constants.gravity;
        }
    }
}

export function update_sticks(sticks) {
    for (var i = 0; i < sticks.length; i++) {
        var stick = sticks[i];

        var dx = stick.point_b.x - stick.point_a.x;
        var dy = stick.point_b.y - stick.point_a.y;

        var distance = utils.distance(stick.point_a, stick.point_b);

        var difference = stick.length - distance;
        var offset_percent = difference / distance / 2;

        var offset_x = dx * offset_percent;
        var offset_y = dy * offset_percent;

        if (!stick.point_a.pinned) {
            stick.point_a.x -= offset_x;
            stick.point_a.y -= offset_y;
        }

        if (!stick.point_b.pinned) {
            stick.point_b.x += offset_x;
            stick.point_b.y += offset_y;
        }
    }
}