import * as Pixi from 'pixi.js';
import { Particle } from './particle.old';

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

const particles: Particle[] = [];

document.body.appendChild(renderer.view);
const stage = new Pixi.Container();

const addParticle = () => {
    const particle = new Particle();
    particle.setPos(innerWidth * Math.random(), innerHeight);
    particle.setV(0, -1.6 + Math.random());
    particle.toExplode = true;
    stage.addChild(particle.sprite);
    particles.push(particle);

    // setTimeout(addParticle, 200 + Math.random()*600);
}
const loop = () => {
    renderer.render(stage);
    // particles.forEach(p => {
    //     p.update(stage);
    //     p.particles.forEach(_p => _p.update());
    // });

    for (let i = 0; i< particles.length; i--) {
        const p = particles[i];
        // if (p && p.explode) {
        //     if (p.particles[0] && p.particles[0].sprite.alpha <= 0) {
        //         particles.splice(i, 1);
        //     }
        // }
    }
}

loop();
// requestAnimationFrame(loop);
addParticle();