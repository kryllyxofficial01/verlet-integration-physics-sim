import { distance } from "./misc.js";

export function parse_model(model_data, points, sticks, model_update_func) {
    for (var i = 0; i < model_data.points.length; i++) {
        points[i] = model_data.points[i];
    }

    for (var i = 0; i < model_data.sticks.length; i++) {
        var stick = model_data.sticks[i];

        stick.point_a = points[stick.point_a];
        stick.point_b = points[stick.point_b];
        stick.length = distance(stick.point_a, stick.point_b);

        sticks[i] = stick;
    }

    console.log("Model loaded");

    model_update_func();
}