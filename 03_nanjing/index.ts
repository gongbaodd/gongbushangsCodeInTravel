import * as PIXI from 'pixi.js';

const width = 600;
const height = 600;
const app = new PIXI.Application({
    width, height, transparent: true,
})
document.getElementById('canvas').appendChild(app.view);

const scene = app.stage;

const oneAngle = Math.PI / 6;
const oneLine = 35;

let x = 0;
let y = 0;
let angle = Math.PI/2;
const stores = [];

// var F+-[]
// axiom F
// rules F -> FF+[+F-F-F]-[-F+F+F]

let str = 'F';
const axiom = 'F';
const rules = {
    [axiom]: 'FF+[+F-F-F]-[-F+F+F]'
};

function generate() {
    let newS = '';
    str.split('').forEach(c => {
        if(rules[c]) {
            newS += rules[c];
        } else {
            newS += c;
        }
    });
    turtle();
    str = newS;
}

let graphics = new PIXI.Graphics();

function turtle() {
    str.split('').forEach(c => {
        switch(c) {
            case 'F': {
                graphics.lineStyle(10, 0x00ff00);
                graphics.moveTo(x, y);
                x = x + oneLine * Math.cos(angle);
                y = y + oneLine * Math.sin(angle);
                graphics.lineTo(x, y);
                break;
            }
            case '+': {
                angle = angle + oneAngle;
                break;
            }
            case '-': {
                angle = angle - oneAngle;
                break;
            }
            case '[': {
                scene.addChild(graphics);
                const store = { x, y, angle };
                stores.push(store);
                break;
            }
            case ']': {
                graphics = new PIXI.Graphics();
                const store = stores.pop();
                x = store.x;
                y = store.y;
                angle = store.angle
                break;
            }
        }
    });
}
let scale = 1;
document.body.addEventListener('click', ({ target }) => {
    if ((target as HTMLElement).className === 'button') {
        generate();
        scene.scale.set(scale, scale);
        scene.pivot.set(scale, scale);
        scene.position.set(width/2, 0);
        scale = scale / 4 * 3;
   }
}, false);
