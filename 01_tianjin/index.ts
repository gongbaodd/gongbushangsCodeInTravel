import * as PIXI from 'pixi.js';

const {
    offsetHeight: height,
    offsetWidth: width,
} = document.body;

const renderer = PIXI.autoDetectRenderer(width, height, {
    transparent: true,
});

const stage =　new PIXI.Container();

renderer.render(stage);


