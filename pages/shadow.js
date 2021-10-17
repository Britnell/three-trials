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

    componentDidMount() {
        // * 
        
        const size = {    width: window.innerWidth,   height: window.innerHeight  }
        const renderer = new THREE.WebGLRenderer({ antialias: true,  });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( size.width, size.height );
        
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.mount.appendChild( renderer.domElement );

        // * Camera
        const camera = new THREE.PerspectiveCamera( 75, size.width/size.height, 0.1, 1000 );
        // camera = new THREE.PerspectiveCamera( 70, size.width/size.height, 0.1, 10000 );
        camera.position.set( 18,5,14 );
        const controls = new OrbitControls(camera, renderer.domElement )
        controls.enableDamping = true;      controls.dampingFactor = 0.5
        controls.autoRotate = true;         controls.autoRotateSpeed = 2
        controls.update();
        
        // * Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x808080 );

        // * Light
        // from example 
        // https://github.com/mrdoob/three.js/blob/master/examples/webgl_camera_array.html

        scene.add( new THREE.AmbientLight( 0x222244 , 1 ) );

        const light = new THREE.DirectionalLight( 0xffe0c0, 0.6 );
        light.position.set( 10,10,20 )   //.normalize();
        light.castShadow = true
        light.shadow.mapSize.width =  200;  // default 512
        light.shadow.mapSize.height = 200;  // default 512
        light.shadow.camera.far = 500;      // default 500
        light.shadow.camera.near = 0.5;     // default 0.5
        // light.shadow.camera.zoom = 1        // tighter shadow map
        scene.add( light );
        
        // * Geometries
        // flat : new THREE.PlaneGeometry( 1,1 ),

        const geom = {
            box : new THREE.BoxGeometry(4,4,4),
            plane : new THREE.PlaneGeometry(30,30, 1,1 ),
            sphere: new THREE.SphereGeometry( 2, 16, 8 ),
        }

        // * Materials
        // normal: new THREE.MeshNormalMaterial(),
        // standard: new THREE.MeshStandardMaterial({ color: 0xe08020 }),
        // wire: new THREE.MeshBasicMaterial({ wireframe: true,    color: 0x0308e0 }),
        // line: new THREE.LineBasicMaterial({ color: 0x0004e0 }),
        // green: new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
        // plane: new THREE.MeshLambertMaterial( { color: 0xe0f0c0, side: THREE.DoubleSide } ),
        // phong: new THREE.MeshPhongMaterial({ color: 0x020202 }),
        
        const plane = new THREE.Mesh(geom.plane, new THREE.MeshLambertMaterial( { 
            color: 0xe0f0c0, 
            side: THREE.DoubleSide 
        }))
        plane.receiveShadow = true
        plane.rotation.x = - Math.PI / 2
        scene.add(plane)
        
        const cube = new THREE.Mesh( geom.box, new THREE.MeshStandardMaterial({ color: 0xe08020 }) ); 
        cube.position.set(-4,2,0)
        cube.castShadow = true
        scene.add(cube)

        const cube2 = new THREE.Mesh( geom.box, new THREE.MeshStandardMaterial({ color: 0xe08020 }) ); 
        cube2.position.set(4,2,0)
        cube2.castShadow = true
        scene.add(cube2)

        // const sphere = new THREE.Mesh(geom.sphere, new THREE.MeshStandardMaterial({ color: 0x2080e0 }) )
        // sphere.position.set(4,2,0)
        // sphere.castShadow = true
        // scene.add(sphere)


        // * Animation
        var animate = (time)=>{
            requestAnimationFrame( animate );
            controls.update();
            renderer.render( scene, camera );
        };
        animate();

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