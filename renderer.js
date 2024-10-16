export function render_points(context, points) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];

        context.beginPath();
        context.arc(point.x, point.y, 5, 0, Math.PI * 2);
        context.fill();
    }
}

export function render_sticks(context, sticks) {
    for (var i = 0; i < sticks.length; i++) {
        var stick = sticks[i];

        if (!stick.hidden) {
            context.beginPath();

            context.strokeStyle = stick.color ? stick.color : "black";
            context.lineWidth = stick.width ? stick.width : 1;

            context.moveTo(stick.point_a.x, stick.point_a.y);
            context.lineTo(stick.point_b.x, stick.point_b.y);

            context.stroke();
        }
    }
}