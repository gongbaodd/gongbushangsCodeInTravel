import * as PIXI from 'pixi.js';

const width = 600;
const height = 600;
const app = new PIXI.Application({
    width, height, transparent: true,
})

document.getElementById('canvas').appendChild(app.view);

const scene = app.stage;

// var F+-[]
// axiom F
// rules F -> FF+[+F-F-F]-[-F+F+F]

let str = 'F';
const axiom = 'F';
const rules = {
    [axiom]: 'FF+[+F-F-F]-[-F+F+F]',
};

function generate() {
    let newStr = '';
    str.split('').forEach(c => {
        if (c === axiom) {
            newStr += rules[axiom];
        } else {
            newStr += c;
        }
    });
    turtle();
    str = newStr;
}

let graphics = new PIXI.Graphics();
const length = 30;
let angle = Math.PI / 2;
const segAngle = Math.PI / 6;
let x = 0;
let y = 0;
const store: {x:number, y:number, angle: number}[] = [];

function turtle() {
    str.split('').forEach(c => {
        switch(c) {
            case 'F': {
                graphics.lineStyle(10, 0x00ff00);
                graphics.moveTo(x, y);
                x = x + length * Math.cos(angle);
                y = y + length * Math.sin(angle);
                graphics.lineTo(x, y);
                break;
            }
            case '+': {
                angle += segAngle;
                break;
            }
            case '-': {
                angle -= segAngle;
                break;
            }
            case '[': {
                store.push({ x, y, angle });
                break;
            }
            case ']': {
                const s = store.pop();
                x = s.x;
                y = s.y;
                angle = s.angle;
                break;
            }
        }
    });
    scene.addChild(graphics);
}

let scale = 1;

window.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.className === 'button') {
        generate();
        scene.scale.set(scale, scale);
        scene.pivot.set(scale, scale);
        scene.position.set(width/2 , 0);
        scale = scale * 0.75;
    }
}, false);

