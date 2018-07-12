import * as Pixi from 'pixi.js';
export class Particle {
    sprite =  Pixi.Sprite.fromImage(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBI
    WXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4gcMFi4AfAKlbwAAABl0RVh0Q29tbWVudABDcmVhdGVk
    IHdpdGggR0lNUFeBDhcAAABZSURBVBjTjZCxEYAwEMNEWpZijeyUCVgm9KwTiq9EQ0rgfafKOhdG
    RSWwBvbA8dAD6+yn1AJ9oanMJX+oS2AHNr5zLIEDWH/Eq5BMAc6EdxZgT4h7/p7s4TfWw5ggZDLf
    bQAAAABJRU5ErkJggg==`);
    velocity = { x: 0, y: 0 };
    constructor() {
        this.sprite.scale.x = 0.4;
        this.sprite.scale.y = 0.4;
    }
    setPos(x: number, y: number) {
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    }
    setV(x: number, y: number) {
        this.velocity = {x, y};
    }
    update() {
        this.setPos(
            this.sprite.position.x + this.velocity.x,
            this.sprite.position.y + this.velocity.y,
        );
    }
 }