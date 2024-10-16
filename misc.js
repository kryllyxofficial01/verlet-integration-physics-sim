export function constrain_points(points, friction, bounce, canvas_width, canvas_height) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];

        if (!point.pinned) {
            var vx = (point.x - point.old_x) * friction;
            var vy = (point.y - point.old_y) * friction;

            handle_horizontal_collision(point, vx, bounce, canvas_width);
            handle_vertical_collision(point, vy, bounce, canvas_height);
        }
    }
}

export function handle_horizontal_collision(point, vx, bounce, canvas_width) {
    if (point.x > canvas_width) {
        point.x = canvas_width;
        point.old_x = point.x + vx * bounce;
    }
    else if (point.x < 0) {
        point.x = 0;
        point.old_x = point.x + vx * bounce;
    }
}

export function handle_vertical_collision(point, vy, bounce, canvas_height) {
    if (point.y > canvas_height) {
        point.y = canvas_height;
        point.old_y = point.y + vy * bounce;
    }
    else if (point.y < 0) {
        point.y = 0;
        point.old_y = point.y + vy * bounce;
    }
}

export function distance(point_a, point_b) {
    var dx = point_a.x - point_b.x;
    var dy = point_a.y - point_b.y;

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}