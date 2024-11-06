import { parse_model } from "./model_loader.js";
import { update_points, update_sticks } from "./updater.js";
import { render_points, render_sticks } from "./renderer.js";
import { constrain_points } from "./misc.js";

window.onload = function() {
    var canvas = document.getElementById("canvas");

    var context = canvas.getContext("2d");

    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var points = [];
    var sticks = [];

    const bounce = 0.9;
    const gravity = 0.5;
    const friction = 0.999;

    const iterations = 3;

    var model_name = prompt("Enter model name (without the \".json\" extension):");

    console.log(`Loading model "${model_name}"...`);
    $.getJSON(`http://localhost:8000/models/${model_name}.json`, function(data) {
        parse_model(data, points, sticks, update);
    });

    function update() {
        update_points(points, gravity, friction);

        for (var i = 0; i < iterations; i++) {
            update_sticks(sticks);
            constrain_points(points, friction, bounce, width, height);
        }

        context.clearRect(0, 0, width, height);

        render_points(context, points);
        render_sticks(context, sticks);

        requestAnimationFrame(update);
    }
}