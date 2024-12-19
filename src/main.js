import * as loader from "./model_loader.js";

window.onload = function() {
    var canvas = document.getElementById("canvas");

    var context = canvas.getContext("2d");

    const canvas_dimensions = {
        width: canvas.width = window.innerWidth,
        height: canvas.height = window.innerHeight
    }

    var points = [];
    var sticks = [];

    var model_name = prompt("Enter model name (without the \".json\" extension):");

    console.log(`Loading model "${model_name}"...`);
    $.getJSON(`http://localhost:8000/models/${model_name}.json`, function(model_JSON_data) {
        loader.parse_model(model_JSON_data, points, sticks, context, canvas_dimensions);
    });
}