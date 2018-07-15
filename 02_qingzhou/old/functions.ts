const f1 = (x: number, y: number) => ({
    x: 0, 
    y: 0.16*y 
});
const f2 = (x: number, y: number) => ({ 
    x: 0.85 * x + 0.04* y, 
    y: -0.04*x + 0.85*y + 1.6
});
const f3 = (x: number, y: number) => ({ 
    x: 0.2 * x - 0.26 * y, 
    y: 0.23*x + 0.22*y + 1.6 
});
const f4 = (x: number, y: number) => ({ 
    x: -0.15* x + 0.28 * y, 
    y: 0.26 * x + 0.24 * y + 0.44
});
const getRandom = () => Math.floor(Math.random() * 100);
export const f = (x: number, y: number) => {
    const r = getRandom();
    if (r <= 1) {
        return f1(x, y);
    }
    if (r <= 8) {
        return f3(x, y);

    }
    if (r <= 15) {
        return f4(x, y);
    }
    return f2(x, y);
}

// export const f = (x: number, y: number) => {
//     const r = getRandom();
//     let xw = 0; let yw = 0;
//     if (r<=1) {xw=0;yw=0.16*y;}
//     else if (r<=8) {
//         const res = f3(x, y);
//         xw = res.x;
//         yw = res.y;
//     }
//     else if (r<=15) {
//         const res = f4(x, y);
//         xw = res.x;
//         yw = res.y;
//     }
//     else {xw=0.85*x+0.04*y;yw=-0.04*x+0.85*y+1.6;}

//     return {
//         x:  xw, y: yw,
//     }
// }
