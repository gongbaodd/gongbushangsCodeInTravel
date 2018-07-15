import { f } from './functions';
const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const {
    width, height,
} = canvas;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, width, height);

const count = 100000;
let x = 0; let y = 0;
for (let i = 0; i<count; i++) {
    const res = f(x, y);
    x = res.x;
    y = res.y;
    ctx.fillStyle = '#0f0';
    ctx.fillRect(x * 100 + 250, y * 100, 1, 1);
}