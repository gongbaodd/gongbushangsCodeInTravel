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
    parts: Particle[] = [];
    steps = Math.floor( 50 * Math.random() ) + 10;
    radius = 5*Math.random() + 3;
    isFirework = false;
    explode = false;
    constructor(isFirework?: boolean) {
        this.isFirework = isFirework;
        this.sprite.scale.x = 0.5;
        this.sprite.scale.y = 0.5;
        this.setPos(0, 0);
        if (isFirework) {
            for (let i = 0; i< this.steps; i++) {
                const part = new Particle();
                part.sprite.alpha = 0;
                this.parts.push(part);
            }
        }
    }
    setPos(x: number, y: number) {
        this.sprite.x = x;
        this.sprite.y = y;
    }
    setV(x:number, y: number) {
        this.v = { x, y };
    }
    update() {
        if (this.sprite.y > this.maxHeight) {
            this.setPos(
                this.sprite.x - this.v.x,
                this.sprite.y - this.v.y,
            );
        }
        if (this.sprite.y <= this.maxHeight && !this.explode) {
            this.sprite.alpha = 0;
            this.parts.forEach((p, i) => {
                p.sprite.alpha = 1;
                p.setPos(this.sprite.x, this.sprite.y);
                p.setV(
                    this.radius * Math.cos(2* Math.PI*i/this.steps),
                    this.radius * Math.sin(2*Math.PI*i/this.steps)
                );                
            });
            this.explode = true;
        }
        if (this.explode) {
            this.parts.forEach(p => p.partUpdate());
        }
    }
    partUpdate() {
        this.setPos(
            this.sprite.x - this.v.x,
            this.sprite.y - this.v.y,
        );
        this.sprite.alpha -= 0.02;
    }
}

const particles: Particle[] = [];
for (let i = 0; i < 10; i++) {
    const p = new Particle(true);
    p.setPos(width * Math.random(), height);
    p.setV(0, 1);
    particles.push(p);
    stage.addChild(p.sprite); 
    p.parts.forEach(_p => stage.addChild(_p.sprite)); 
}
document.body.appendChild(renderer.view);

function loop() {
    renderer.render(stage);
    particles.forEach(p => p.update());
    requestAnimationFrame(loop);
}

loop();

