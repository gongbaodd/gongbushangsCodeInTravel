import * as Pixi from 'pixi.js';
import { Particle } from './particle';

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

let particle: Particle;
const addParticle = () => {
    particle = new Particle();
    particle.setPos(innerWidth/2, innerHeight/2);
    particle.setV(0.4, -1.6);
    stage.addChild(particle.sprite);
}
const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(stage);
    particle && particle.update();
}

loop();
addParticle();