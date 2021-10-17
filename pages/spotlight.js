import React, {Component} from 'react';
// import ReactDOM from "react-dom";
import * as THREE from 'three';
// import {OrbitControls} from '../lib/OrbitControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Page from "../lib/page"

function random_i(min,max){
    return Math.floor( min + Math.random() *(max-min)  )
}

class Three extends Component {

    threeRender(){
        
    }

    componentDidMount() {
        // * 
        
        const size = {    width: window.innerWidth,   height: window.innerHeight  }
        const renderer = new THREE.WebGLRenderer({ antialias: true,  });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( size.width, size.height );
        this.mount.appendChild( renderer.domElement );
        
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;


        // * Camera
        const camera = new THREE.PerspectiveCamera( 75, size.width/size.height, 0.1, 1000 );
        camera.position.set( 10,100,100 );

        const controls = new OrbitControls(camera, renderer.domElement )
        controls.addEventListener( 'change', sceneRender );
        controls.enableDamping = true;      controls.dampingFactor = 0.5
        controls.autoRotate = true;         controls.autoRotateSpeed = 2
        controls.enablePan = false;
        // controls.update();
        
        // * Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x808080 );

        // * Light
        // from example 
        // https://github.com/mrdoob/three.js/blob/master/examples/webgl_camera_array.html

        scene.add( new THREE.AmbientLight( 0xffffff, 0.1 ) );
        
        const light = new THREE.SpotLight( 0xffee80, 1 );
        
        light.position.set( 30,80,60 )    
        light.angle = Math.PI /3;
        // light.penumbra = 0.1;
        // light.decay = 2
        // light.distance = 200;   
        
        light.castShadow = true
        light.shadow.mapSize.width =  512;  // default 512
        light.shadow.mapSize.height = 512;  // default 512

        light.shadow.camera.near = 10;     // default 0.5
        light.shadow.camera.far  = 200;      // default 500
        light.shadow.camera.focus = 1;      // default 1
        light.shadow.camera.zoom = 4        // tighter shadow map
        
        scene.add( light );

        const lightHelper = new THREE.SpotLightHelper(light)
        scene.add(lightHelper)

        const shadowCameraHelper = new THREE.CameraHelper( light.shadow.camera );
        scene.add( shadowCameraHelper );

        // * ---------------- Plane
        const planeMatt = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );

        const plane = new THREE.Mesh( new THREE.PlaneGeometry(200,200, 1,1 ), planeMatt )
        plane.receiveShadow = true
        plane.rotation.x = - Math.PI / 2
        scene.add(plane)

        // * ---------------- Boxes

        const box = new THREE.BoxGeometry(20,20,20)
        
        const cube = new THREE.Mesh( box, new THREE.MeshStandardMaterial({ color: 0xe08020 }) ); 
        cube.position.set(-20,11,0)
        cube.castShadow = true
        scene.add(cube)

        const cube2 = new THREE.Mesh( box, new THREE.MeshStandardMaterial({ color: 0xe08020 }) ); 
        cube2.position.set(20,11,0)
        cube2.castShadow = true
        scene.add(cube2)

        // * ------------------------ Render

        function sceneRender(){
            lightHelper.update()
            shadowCameraHelper.update()
            renderer.render(scene,camera)
        }
        sceneRender();
    }

    render() {
        return(
            <Page>
                <div ref={ref=> (this.mount=ref) } />
                {/* <div style={{ position:'absolute', top: '10px', zIndex: '20',
                    color:'#fff', 
                }}>Three JS example</div> */}
            </Page>
        )
    }

}

export default Three;