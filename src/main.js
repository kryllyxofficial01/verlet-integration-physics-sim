import * as loader from "./model_loader.js";
import * as updater from "./updater.js";
import * as renderer from "./renderer.js";
import * as utils from "./misc.js";

window.onload = function() {
    var canvas = document.getElementById("canvas");

    var context = canvas.getContext("2d");

    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var points = [];
    var sticks = [];

    const physics_constants = {
        bounce: 0.9,
        gravity: 0.5,
        friction: 0.999
    }

    const iterations = 3;

    var model_name = prompt("Enter model name (without the \".json\" extension):");

    console.log(`Loading model "${model_name}"...`);
    $.getJSON(`http://localhost:8000/models/${model_name}.json`, function(data) {
        loader.parse_model(data, points, sticks, update);
    });

    function update() {
        updater.update_points(points, physics_constants);

        for (var i = 0; i < iterations; i++) {
            updater.update_sticks(sticks);
            utils.constrain_points(points, physics_constants, width, height);
        }

        context.clearRect(0, 0, width, height);

        renderer.render_points(context, points);
        renderer.render_sticks(context, sticks);

        requestAnimationFrame(update);
    }
}