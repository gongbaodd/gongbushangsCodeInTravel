import * as PIXI from 'pixi.js';
import {
    red,
    blue,
    green,
    yellow,
} from './images';

const {
    innerHeight: height,
    innerWidth: width,
} = window;
const renderer = PIXI.autoDetectRenderer(width, height, { transparent: true });
document.body.appendChild(renderer.view);
const scene = new PIXI.Container();



function loop() {
    requestAnimationFrame(loop);
    renderer.render(scene);
}
loop();