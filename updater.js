import { distance } from "./misc.js";

export function update_points(points, gravity, friction) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];

        if (!point.pinned) {
            var vx = (point.x - point.old_x) * friction;
            var vy = (point.y - point.old_y) * friction;

            point.old_x = point.x;
            point.old_y = point.y;

            point.x += vx;
            point.y += vy;
            point.y += gravity;
        }
    }
}

export function update_sticks(sticks) {
    for (var i = 0; i < sticks.length; i++) {
        var stick = sticks[i];

        var dx = stick.point_b.x - stick.point_a.x;
        var dy = stick.point_b.y - stick.point_a.y;

        var _distance = distance(stick.point_a, stick.point_b);

        var difference = stick.length - _distance;
        var offset_percent = difference / _distance / 2;

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