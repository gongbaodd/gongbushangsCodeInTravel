import { f } from './function';
const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const {
    width,
    height,
} = canvas;

const count = 100000;
let x = 0;
let y = 0;
let index = 0;

function loop() {
    requestAnimationFrame(loop);
    if (index < count) {
        for (let i = 0; i < 100; i++) {
            const res = f(x, y);
            x = res.x;
            y = res.y;
            ctx.fillStyle = 'green';
            ctx.fillRect(x * 100 + 200, y * 100, 1, 1);
            index++;
        }
    }
}
loop();


