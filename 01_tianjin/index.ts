import * as PIXI from 'pixi.js';
import { image1 } from './images';

const {
    innerHeight: height,
    innerWidth: width,
} = window;

const renderer = PIXI.autoDetectRenderer(width, height, {
    transparent: true,
});

const stage =　new PIXI.Container();

class Particle {
    sprite = PIXI.Sprite.fromImage(image1);
    v = {x: 0, y: 0};
    maxHeight = Math.random() * height;
    constructor() {
        this.sprite.scale.x = 0.5;
        this.sprite.scale.y = 0.5;
        this.setPos(0, 0);
    }
    setPos(x: number, y: number) {
        this.sprite.x = x;
        this.sprite.y = y;
    }
    setV(x:number, y: number) {
        this.v = { x, y };
    }
    update() {
        if (this.sprite.y >= this.maxHeight) {
            this.setPos(
                this.sprite.x + this.v.x,
                this.sprite.y + this.v.y,
            );
        }
    }
}

const particles: Particle[] = [];
for (let i = 0; i < 10; i++) {
    const p = new Particle();
    p.setPos(width * Math.random(), height);
    p.setV(0, -1);
    particles.push(p);
    stage.addChild(p.sprite);  
}
document.body.appendChild(renderer.view);

function loop() {
    renderer.render(stage);
    particles.forEach(p => p.update());
    requestAnimationFrame(loop);
}

loop();

