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
    isExploded = false;
    sparkles: Particle[] = [];
    sparkleCount = Math.floor(Math.random() * 10) + 10;
    radius = Math.random() * 5 + 5;
    isFirework = false;
    reset() {
        this.isExploded = false;
        this.setPos(width * Math.random(), height * Math.random());
        this.sprite.alpha = 1;
    }
    constructor(isFirework?: boolean) {
        this.sprite.scale.x = 0.5;
        this.sprite.scale.y = 0.5; 
        this.isFirework = isFirework;

        if (this.isFirework) {
            for (let i =0; i< this.sparkleCount; i++) {
                const p = new Particle();
                p.sprite.alpha = 0;
                this.sparkles[i] = p;
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
        if (this.sprite.alpha > 0) {
            this.setPos(
                this.sprite.position.x + this.v.x,
                this.sprite.position.y - this.v.y
            );
            this.sprite.alpha -= 0.01;
        } else {
            this.sprite.alpha = 0;
            exploder.reset();
        }
    }
    update() {
        if (this.maxHeight < this.sprite.position.y) {
            this.setPos(
                this.sprite.position.x + this.v.x,
                this.sprite.position.y - this.v.y
            );
        }
        if (!this.isExploded && this.maxHeight >= this.sprite.position.y) {
            this.sprite.alpha = 0;
            this.isExploded = true;
            this.sparkles.forEach((s, i) => {
                s.setPos(
                    this.sprite.position.x,
                    this.sprite.position.y,
                );

                s.setV(
                    this.radius * Math.cos(2* Math.PI /this.sparkleCount * i),
                    this.radius * Math.sin(2* Math.PI /this.sparkleCount * i),
                );

                s.sprite.alpha = 1;
            });
        }

        if (this.isExploded) {
            this.sparkles.forEach(s => s.sparkleUpdate(this));
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