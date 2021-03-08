import * as THREE from 'three';

import { moveRightKeyDown, moveLeftKeyDown } from "rx/keyboard";

import './App.css';

let mesh;
let camera;
let scene;
let renderer;
let isTreeEnvUp = false;

function init() {

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;

  scene = new THREE.Scene();

  let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
  let material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setAnimationLoop( animation );
  document.body.appendChild( renderer.domElement );
  isTreeEnvUp = true;
}

function animation() {

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render( scene, camera );
}

function App() {
  if (!isTreeEnvUp) init();
  let updateId;
  let previousDelta = 0;
  const fpsLimit = 30;

  function update(currentDelta) {
    requestAnimationFrame(animation);
    let delta = currentDelta - previousDelta;

    if (fpsLimit && delta < 1000 / fpsLimit) {
      return;
    }

    previousDelta = currentDelta;
  }

  window.addEventListener('keydown', (event) => {
    console.log(event.currentTarget);
    moveRightKeyDown.next();
    moveLeftKeyDown.next();
  });

  return (
    <div className="App">
      {isTreeEnvUp && update()}
    </div>
  );
}

export default App;
