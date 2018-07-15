import * as PIXI from 'pixi.js';
import { green } from './image';

const {
    innerWidth: width,
    innerHeight: height,
} = window;
const renderer = PIXI.autoDetectRenderer(width, height, { transparent: true });
document.body.appendChild(renderer.view);
const scene = new PIXI.Container();

/**
 * barnsley fern
 * x > -2.1820 && x < 2.6558
 * y >=0 && y<= 9.9983
 * f1 = () =>{x:0, y: 0.16*y} 0.01
 * f2 = () => {x：0.85*x + 0.04*y, y: -0.04*x + 0.85*y + 1.6} 0.86
 * f3 = () => { x: 0.2* x - 0.26*y, y: 0.23*x + 0.22*y + 1.6 } 0.93
 * f4 = () => { x: -0.15*x + 0.28*y, y: 0.26*x + 0.24*y + 0.44} 1
 * @class Particle
 */
const f1 = (x: number, y: number) => ({ x: 0, y: 0.16*y });
const f2 = (x: number, y: number) => ({ x: 0.85 * x + 0.04* y, y: -0.04* + 0.85*y + 1.6});
const f3 = (x: number, y: number) => ({ x: 0.2 * x - 0.26 * y, y: 0.23*x + 0.22*y + 1.6 });
const f4 = (x: number, y: number) => ({ x: -0.15* x + 0.28 * y, y: 0.26 * x + 0.24 * y + 0.44});
const f = (x: number, y: number) => {
    const r = Math.random();
    if (r< 0.01) {
        return f1(x, y);
    }
    if (r< 0.86) {
        return f2(x, y);
    }
    if(r<0.93) {
        return f3(x, y);
    }
    return f4(x, y);
}

class Particle {
    sprite = PIXI.Sprite.fromImage(green);
    setPos(x: number, y: number) {
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    }
}

const number = 200000;
let x = 0;
let y = 0;
let count = 0;

while(count < number) {
    const p = new Particle();
        const res = f(x, y);
        x = res.x;
        y = res.y;
        p.setPos(x * 100 + width/2, y * 100 + height/2);
        scene.addChild(p.sprite);
        count++;
}

function loop() {
    requestAnimationFrame(loop);
    renderer.render(scene);
}
loop();