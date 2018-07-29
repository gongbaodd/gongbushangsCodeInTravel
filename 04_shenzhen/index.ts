import Controls from 'three-orbitcontrols';
import { WebGLRenderer, PerspectiveCamera, Scene } from 'three';

const {
    innerHeight: height,
    innerWidth: width,
} = window;
const scene = new Scene();
const camera = new PerspectiveCamera(70, width/height, 1, 10000);
camera.position.z = 50;
const renderer = new WebGLRenderer();
renderer.setSize(width, height);
const controls = new Controls(camera, renderer.domElement);
document.body.appendChild(renderer.domElement);

// dx = dt * a * (y - x)
// dy = dt * x * (b - z) - y
// dz = dt * (x * y - c * z)
class LorezSys {
    add(scene: Scene) {
        
    }
    init() {

    }
}

function draw() {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}
draw();