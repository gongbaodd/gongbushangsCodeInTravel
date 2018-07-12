import * as Pixi from 'pixi.js';

const {
    innerHeight,
    innerWidth,
} = window;

const renderer = Pixi.autoDetectRenderer(
    innerWidth, innerHeight,
    {
        transparent: true,
    }
);

document.body.appendChild(renderer.view);
const stage = new Pixi.Container();

const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(stage);
}

loop();