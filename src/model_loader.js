import * as updater from "./updater.js"
import * as utils from "./misc.js";

export function parse_model(model_JSON_data, points, sticks, canvas_context, canvas_dimensions) {
    for (var i = 0; i < model_JSON_data.points.length; i++) {
        points[i] = model_JSON_data.points[i];
    }

    for (var i = 0; i < model_JSON_data.sticks.length; i++) {
        var stick = model_JSON_data.sticks[i];

        stick.point_a = points[stick.point_a];
        stick.point_b = points[stick.point_b];
        stick.length = utils.distance(stick.point_a, stick.point_b);

        sticks[i] = stick;
    }

    console.log("Model loaded");

    updater.update(points, sticks, canvas_context, canvas_dimensions);
}