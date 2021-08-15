import React, { useEffect, memo } from 'react';
import * as THREE from 'three';

import { moveRightKeyDown, moveLeftKeyDown, spaceKeyDown, rangeValuesEmitter } from "rx/keyboard";

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
  // keys rx handling
  if (moveLeftKeyDown.value) mesh.position.x -= 0.01;
  if (moveRightKeyDown.value) mesh.position.x += 0.01;
  // console.log(spaceKeyDown.value)
  if (spaceKeyDown.value) rangeValuesEmitter.subscribe(val => { // also check that not in a jump state
    console.log(val);
    mesh.position.y += val / 100
  })
  renderer.render( scene, camera );
}

const App = () => {
  if (!isTreeEnvUp) init();
  // let updateId;
  let previousDelta = 0;
  const fpsLimit = 60;

  function update(currentDelta) {
    requestAnimationFrame(animation);
    let delta = currentDelta - previousDelta;

    if (fpsLimit && delta < 1000 / fpsLimit) {
      return;
    }

    previousDelta = currentDelta;
  }

  const keyUpHandler = event => {
    switch(event.code) {
      case 'ArrowRight':
        moveRightKeyDown.next(false);
        break;
      case 'ArrowLeft':
        moveLeftKeyDown.next(false);
        break;
      case 'Space':
        spaceKeyDown.next(false);
        break;
      default:
        break;
    }
  }

  const keyDownHandler = event => {
    console.log(event.code);
    switch(event.code) {
      case 'ArrowRight':
        moveRightKeyDown.next(true);
        break;
      case 'ArrowLeft':
        moveLeftKeyDown.next(true);
        break;
      case 'Space':
        spaceKeyDown.next(true);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', keyUpHandler)
    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keyup', keyUpHandler)
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <div className="App">
      {isTreeEnvUp && update()}
    </div>
  );
}

export default memo(App);
