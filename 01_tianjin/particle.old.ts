import * as Pixi from 'pixi.js';
export class Particle {
    sprite =  Pixi.Sprite.fromImage(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBI
    WXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4gcMFi4AfAKlbwAAABl0RVh0Q29tbWVudABDcmVhdGVk
    IHdpdGggR0lNUFeBDhcAAABZSURBVBjTjZCxEYAwEMNEWpZijeyUCVgm9KwTiq9EQ0rgfafKOhdG
    RSWwBvbA8dAD6+yn1AJ9oanMJX+oS2AHNr5zLIEDWH/Eq5BMAc6EdxZgT4h7/p7s4TfWw5ggZDLf
    bQAAAABJRU5ErkJggg==`);
    velocity = { x: 0, y: 0 };
    exploded = false;
    toExplode = false;
    particles: Particle[] = [];
    fade = false;
    explodeHeight = 0.4 + Math.random()*0.5;
    constructor() {
        this.sprite.scale.x = 0.4;
        this.sprite.scale.y = 0.4;
    }
    reset() {
        this.velocity = { x: 0, y: 0 };
        this.exploded = false;
        this.toExplode = false;
        this.explodeHeight = 0.4 + Math.random()*0.5;
    }
    setPos(x: number, y: number) {
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    }
    setV(x: number, y: number) {
        this.velocity = {x, y};
    }
    update(stage?: Pixi.Container) {
        this.setPos(
            this.sprite.position.x + this.velocity.x,
            this.sprite.position.y + this.velocity.y,
        );

        if (this.toExplode && !this.exploded) {
            if (this.sprite.position.y < window.innerHeight * this.explodeHeight) {
                this.explode(stage);
            }
        }

        if (this.fade) {
            this.sprite.alpha -= 0.01;
        }
    }
    explode(stage: Pixi.Container) {
        this.sprite.alpha = 0;
        this.exploded = true;

        const step = 10;
        const radius = 4;

        for(let i = 0; i< step; i++) {
            const particle = new Particle();
            particle.fade = true;
            particle.setPos(this.sprite.position.x, this.sprite.position.y);
            const x = radius * Math.cos(2* Math.PI * i/step);
            const y = radius * Math.sin(2*Math.PI*i/step);
            particle.setV(x, y);
            stage.addChild(particle.sprite);
            this.particles.push(particle);
        }
    }
 }