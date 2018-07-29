import Controls from 'three-orbitcontrols';
import { WebGLRenderer, PerspectiveCamera, Scene, Geometry, PointsMaterial, VertexColors, Points } from 'three';

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
// a = 28
// b = 10
// c = 8/3
class LorezSys {
    geo = new Geometry();
    mat = new PointsMaterial({
        size: 1,
        vertexColors: VertexColors,
        depthTest: false,
        opacity: 0.2,
        sizeAttenuation: false,
        transparent: true,
    });
    mesh: Points;
    add(scene: Scene) {
        this.init();
        this.mesh = new Points(this.geo, this.mat);
        scene.add(this.mesh);
    }
    init() {

    }
}

const geo = new LorezSys();
geo.add(scene);
function draw() {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}
draw();