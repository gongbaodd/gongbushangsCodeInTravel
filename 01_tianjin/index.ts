import * as PIXI from 'pixi.js';
import {
    red,
    blue,
    green,
    yellow,
} from './images';

const images = [red, blue, green, yellow];
const {
    innerHeight: height,
    innerWidth: width,
} = window;
const renderer = PIXI.autoDetectRenderer(width, height, { transparent: true });
document.body.appendChild(renderer.view);
const scene = new PIXI.Container();

class Particle {
    sprite = PIXI.Sprite.fromImage(images[Math.floor(Math.random()*images.length)]);
    v = { x:0, y:0 }
    maxHeight　= Math.random() * height;
    sparkles: Particle[] = [];
    sparkleCount = Math.floor(Math.random()) * 20 + 10;
    isFirework = false;
    explode = false;
    radius = Math.random() * 10 + 2;
    reset() {
        this.explode = false;
        this.setPos(width * Math.random(), height * Math.random());
    }
    constructor(isFirework?: boolean) {
        this.sprite.scale.x = 0.5;
        this.sprite.scale.y = 0.5;

        this.isFirework = isFirework;

        if (isFirework) {
            for (let i = 0; i< this.sparkleCount; i++) {
                const s = new Particle();
                s.sprite.alpha = 0;
                this.sparkles.push(s);
            }
        }        
    }
    setPos(x: number, y: number) {
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    }
    setV(x: number, y: number) {
        this.v = {x, y};
    }
    sparkleUpdate(exploder: Particle) {
        if (this.sprite.alpha <= 0) {
            exploder.reset();
        } else {
            this.sprite.position.x += this.v.x;
            this.sprite.position.y -= this.v.y;
            this.sprite.alpha -= 0.01;
        }
    }
    update() {
        if (this.maxHeight < this.sprite.position.y) {
            this.sprite.position.x += this.v.x;
            this.sprite.position.y -= this.v.y;
        }
        if (!this.explode && this.maxHeight >= this.sprite.position.y) {
            this.explode = true;
            this.sprite.alpha = 0;
            this.sparkles.forEach((s, i) => { 
                s.sprite.alpha = 1;
                s.setPos(this.sprite.x, this.sprite.y);
                s.setV(
                    this.radius * Math.cos(Math.PI * 2 * i/this.sparkleCount),
                    this.radius * Math.sin(Math.PI * 2 * i/this.sparkleCount)
                );
            });
        }
        if (this.explode) {
            this.sparkles.forEach(p => p.sparkleUpdate(this));
        }   
    }
}

const particles: Particle[] = [];

for(let i=0; i<100; i++) {
    const p = new Particle(true);
    p.setPos(width * Math.random(), height * Math.random());
    p.setV(0, 1);
    particles.push(p);
    p.sparkles.forEach(s => scene.addChild(s.sprite));
    scene.addChild(p.sprite);
}

function loop() {
    requestAnimationFrame(loop);
    renderer.render(scene);
    particles.forEach(p => p.update());
}
loop();