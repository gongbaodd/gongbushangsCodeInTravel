import * as THREE from 'three';
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

function setup() {
    setScene();
    setCamera();
    setRenderer();
    setParticles();
}

function setScene() {
    scene = new THREE.Scene();
}

function setCamera() {
    let res = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(70, res, 1, 10000);
}

function setRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function setParticles() {
    let geometry = new THREE.Geometry();
    let len = 1000000;
    addLorenzVertices(geometry, len);
    let color = new THREE.Color(0xbb00ff);
    for(let i = 0; i < len; i++) {
        geometry.colors.push(color);
    }
    let material = new THREE.PointsMaterial({
        size: 1,
        vertexColors: THREE.VertexColors,
        depthTest:  false,
        opacity: 0.3,
        sizeAttenuation: false,
        transparent: true,
    });
    let mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
    
}

function addLorenzVertices(geometry: THREE.Geometry, len: number) {
    let x = 0.1;
    let y = 0.1;
    let z = 0.1;
    let h = 0.001;
    let a = 10;
    let b = 28;
    let c = 8/3;

    for (let i = 0; i < len; i++) {
        let vertex = new THREE.Vector3(x, y, x - 24);
        geometry.vertices.push(vertex);
        let _x = x + h * a * (y - x);
        let _y = y + h * (x*(b - z) - y);
        let _z = z + h * (x * y -c * z);
        x = _x;
        y = _y;
        z = _z;
    }
}

function draw() {
    camera.lookAt(scene.position);
    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}

setup();
draw();
