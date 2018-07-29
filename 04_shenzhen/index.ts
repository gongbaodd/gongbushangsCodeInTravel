import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

const {
    innerHeight: height,
    innerWidth: width,
} = window;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, width/ height, 1, 10000);
camera.position.z = 50;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

let x = 0.1;
let y = 0.1;
let z = 0.1;
let dt = 0.001;
let max = 100;

class LorenzGeo {
    geo: THREE.Geometry;
    mat = new THREE.PointsMaterial({
        size: 1,
        vertexColors: THREE.VertexColors,
        depthTest: false,
        opacity: 0.3,
        sizeAttenuation:  false,
        transparent: true,
    });
    mesh: THREE.Points;
    len = 1000000;
    makeMesh(scene: THREE.Scene) {
        this.addVertices();
        scene.remove(this.mesh);
        this.mesh = new THREE.Points(this.geo, this.mat);
        scene.add(this.mesh);
    }
    addVertices() {
        this.geo = new THREE.Geometry();
        
        let a = 10;
        let b = 28;
        let c = 8/3;
        let _r = 0;
        let _g = 0;
        let _b = 0;

        for (let i = 0; i < max; i++) {
            let color = new THREE.Color(`rgb(${(_r + i) % 255},${(_g + i) %255},${(_b + i) % 255})`);
            let vertice = new THREE.Vector3(x, y, z);
            this.geo.vertices.push(vertice);
            this.geo.colors.push(color);
            let dx = dt * a * (y - x);
            let dy = dt * (x*(b - z) - y);
            let dz = dt * (x * y - c * z);
            x += dx;
            y += dy;
            z += dz;
        }

        max+=max;
    }
}

const geo = new LorenzGeo();

function draw() {
    if (max < 1000000) {
        geo.makeMesh(scene);
    }
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}
draw();
