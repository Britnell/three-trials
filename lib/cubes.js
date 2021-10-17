import React, {Component} from 'react';
import ReactDOM from "react-dom";
import * as THREE from 'three';
import { OrbitControls } from '../lib/OrbitControls';

import Page from "../lib/page"

function random_i(min,max){
    return Math.floor( min + Math.random() *(max-min)  )
}

class Three extends Component {

    componentDidMount() {
        // * 
        let size, camera, controls, scene, light, renderer


        size = {    width: window.innerWidth,   height: window.innerHeight  }
        renderer = new THREE.WebGLRenderer({ antialias: true,  });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( size.width, size.height );
        this.mount.appendChild( renderer.domElement );

        // * Camera
        camera = new THREE.PerspectiveCamera( 75, size.width/size.height, 0.1, 1000 );
        // camera = new THREE.PerspectiveCamera( 70, size.width/size.height, 0.1, 10000 );
        camera.position.set( 10,10,20 );
        controls = new OrbitControls(camera, renderer.domElement )
        controls.enableDamping = true;      controls.dampingFactor = 0.5
        controls.autoRotate = true;         controls.autoRotateSpeed = 2
        controls.update();
        
        // * Scene
        scene = new THREE.Scene();
        
        scene.background = new THREE.Color( 0xf0f0f0 );
        scene.add( new THREE.AmbientLight( 0xffffff, 0.5 ) );
        
        // light = new THREE.DirectionalLight( 0xffffff, 0.6 );
        // light.position.set( 1, 1, 1 ).normalize();
        // scene.add( light );
        
        const spot = new THREE.SpotLight( 0xffffff, 0.8 );
        spot.position.set( 0, 500, 2000 );
        scene.add( spot );


        
        // * Geometries
        const geom = {}
        geom.box = new THREE.BoxGeometry( 2,3,1 );
        geom.square = new THREE.BoxGeometry(1,1,1)

        // * Materials
        const materials  = {
            normal: new THREE.MeshNormalMaterial(),
            wire: new THREE.MeshBasicMaterial({ wireframe: true,    color: 0x0308e0 }),
            line: new THREE.LineBasicMaterial({ color: 0x0004e0 }),
            green: new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
        }

        // * Objects
        for(let x=0; x<500; x++){
            const object = new THREE.Mesh( geom.square, new THREE.MeshLambertMaterial( { color: new THREE.Color(`hsl(${random_i(0,360)}, 50%, ${random_i(20,80)}%)`) } ) ); 
            let M = 10
            object.position.set(random_i(-M,M),random_i(-M,M),random_i(-M,M))
            scene.add(object)
        }


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