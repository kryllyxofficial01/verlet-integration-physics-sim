export const ITERATIONS = 3;

export const physics_constants = {
    bounce: 0.9,
    gravity: 0.5,
    friction: 0.999
}

export function constrain_points(points, canvas_dimensions) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];

        if (!point.pinned) {
            var vx = (point.x - point.old_x) * physics_constants.friction;
            var vy = (point.y - point.old_y) * physics_constants.friction;

            handle_horizontal_collision(point, vx, canvas_dimensions.width);
            handle_vertical_collision(point, vy, canvas_dimensions.height);
        }
    }
}

export function handle_horizontal_collision(point, vx, canvas_width) {
    if (point.x > canvas_width) {
        point.x = canvas_width;
        point.old_x = point.x + vx * physics_constants.bounce;
    }
    else if (point.x < 0) {
        point.x = 0;
        point.old_x = point.x + vx * physics_constants.bounce;
    }
}

export function handle_vertical_collision(point, vy, canvas_height) {
    if (point.y > canvas_height) {
        point.y = canvas_height;
        point.old_y = point.y + vy * physics_constants.bounce;
    }
    else if (point.y < 0) {
        point.y = 0;
        point.old_y = point.y + vy * physics_constants.bounce;
    }
}

export function distance(point_a, point_b) {
    var dx = point_a.x - point_b.x;
    var dy = point_a.y - point_b.y;

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}