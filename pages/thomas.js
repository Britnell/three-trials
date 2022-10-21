import React, {Component} from 'react';
import ReactDOM from "react-dom";
import * as THREE from 'three';
// import {OrbitControls} from '../lib/OrbitControls'
// import { SVGLoader } from '../lib/SVGLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';


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
        camera.position.set( 10,10,150 );

        const controls = new OrbitControls(camera, renderer.domElement )
        controls.addEventListener( 'change', sceneRender );
        controls.enableDamping = true;      controls.dampingFactor = 0.5
        controls.autoRotate = true;         controls.autoRotateSpeed = 2
        controls.enablePan =  true;
        // controls.update();
        
        // * Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x808080 );

        // * Light
        // from example 
        // https://github.com/mrdoob/three.js/blob/master/examples/webgl_camera_array.html

        scene.add( new THREE.AmbientLight( 0xffffff, 0.1 ) );
        
        const light = new THREE.SpotLight( 0xffee80, 1 );
        
        light.position.set( 20,-20, 80 )
        light.angle = Math.PI /3;
        light.penumbra = 0.05;
        // light.decay = 2
        light.distance = 350;   // 0 default = no limit
        
        light.castShadow = true

        light.shadow.mapSize.width =  2024;  // default 512
        light.shadow.mapSize.height = 2024;  // default 512
        
        light.shadow.focus = 1;
        light.shadow.camera.near = 10;     // default 0.5
        light.shadow.camera.far  = 200;      // default 500
        // light.shadow.camera.fov = 3;      // default 1
        // light.shadow.camera.zoom = 4        // tighter shadow map
        
        scene.add( light );
        
        const lightHelper = new THREE.SpotLightHelper(light)
        scene.add(lightHelper)
        const shadowCameraHelper = new THREE.CameraHelper( light.shadow.camera );
        scene.add( shadowCameraHelper );

        // * ---------------- Plane

        const matt = new THREE.MeshLambertMaterial( {   color: 0xf0a0c0,    })
        
        const planeMatt = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );
        const plane = new THREE.Mesh( new THREE.PlaneGeometry(600,600, 1,1 ), planeMatt )
        plane.receiveShadow = true
        // plane.rotation.x = - Math.PI / 2
        plane.position.z = -100
        scene.add(plane)

        // * ---------------- Objects
        const loader = new SVGLoader()
        
        async function loadSVG(){
            const data = await loader.loadAsync('/thomas.svg')
            data.paths.forEach(path=>{

                // const path = data.paths[0]
                const svgShape = SVGLoader.createShapes(path)[0]
                const extrude = new THREE.ExtrudeGeometry(svgShape,{  depth: 3,    bevelEnabled: false,  })
                const exGeo = new THREE.Mesh(extrude, matt )
                // exGeo.position.set(-20, 20, 1)
                exGeo.position.x += -100
                // exGeo.position.z = 5
                exGeo.rotation.x = Math.PI
                exGeo.castShadow = true
                scene.add(exGeo)
                sceneRender()
            })

            // Eo loader
        }
        loadSVG()


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