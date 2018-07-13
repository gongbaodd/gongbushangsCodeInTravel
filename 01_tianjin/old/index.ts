import * as PIXI from 'pixi.js';
import { red } from './images';

const {
    innerHeight: height,
    innerWidth: width,
} = window;

const renderer = PIXI.autoDetectRenderer(width, height, {
    transparent: true,
});

const stage =　new PIXI.Container();

class Particle {
    sprite = PIXI.Sprite.fromImage(red);
    v = {x: 0, y: 0};
    maxHeight = Math.random() * height;
    parts: Particle[] = [];
    steps = Math.floor( 50 * Math.random() ) + 10;
    radius = 5*Math.random() + 3;
    isFirework = false;
    explode = false;
    faded = false;
    gravity = 0.03;
    constructor(isFirework?: boolean) {
        this.isFirework = isFirework;
        this.sprite.scale.x = 0.5;
        this.sprite.scale.y = 0.5;
        this.reset();
        if (this.isFirework) {
            this.sprite.alpha = 1;
            for (let i = 0; i< this.steps; i++) {
                const part = new Particle();
                part.sprite.alpha = 0;
                this.parts.push(part);
            }
        }
    }
    reset() {
        this.setPos(0, height);
        if (this.isFirework) this.sprite.alpha = 1;
        this.explode = false;
    }
    setPos(x: number, y: number) {
        this.sprite.x = x;
        this.sprite.y = y;
    }
    setV(x:number, y: number) {
        this.v = { x, y };
    }
    update(stage: PIXI.Container) {
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
            this.parts.forEach(p => p.partUpdate(stage, this));
        }
    }
    partUpdate(stage: PIXI.Container, exploder: Particle) {
        this.setPos(
            this.sprite.x - this.v.x,
            this.sprite.y - this.v.y + 3,
        );
        this.sprite.alpha -= 0.02;
        if (this.sprite.alpha <= 0 && !this.faded) {
            exploder.reset();
        }
    }
}

const particles: Particle[] = [];
for (let i = 0; i < 25; i++) {
    const p = new Particle(true);
    particles.push(p);
    stage.addChild(p.sprite); 
    p.parts.forEach(_p => stage.addChild(_p.sprite)); 
}
document.body.appendChild(renderer.view);

function loop() {
    renderer.render(stage);
    particles.forEach(p => {
        p.update(stage);

        if (p.sprite.y === height) {
            p.setPos((width/2) * Math.random()+ width/4, height * 0.8 * Math.random());
            p.setV(0, 1);
        }
    });
    requestAnimationFrame(loop);
}

loop();

