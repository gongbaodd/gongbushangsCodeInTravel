const f1 = (x: number, y: number) => ({ x: 0, y: 0.16 *y });
const f2 = (x: number, y: number) => ({
    x: 0.85* x + 0.04 * y,
    y: -0.04 * x + 0.85 * y + 1.6
});

const f3 = (x: number, y: number) => ({
    x: 0.2*x -0.26 *y,
    y: 0.23 * x + 0.22 * y + 1.6
});

const f4 = (x: number, y: number) => ({
    x:  -0.15 * x + 0.28 *y,
    y: 0.26 * x + 0.24 * y + 0.44
});

export const f = (x: number, y: number) => {
    const r = Math.random();
    if (r <= 0.01) return f1(x, y);
    if (r <= 0.86) return f2(x, y);
    if (r <= 0.93) return f3(x, y);
    return f4(x, y);
}