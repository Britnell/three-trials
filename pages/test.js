import React, {Component} from 'react';
import ReactDOM from "react-dom";
import * as THREE from 'three';
// import { OrbitControls } from '../lib/OrbitControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


import Page from "../lib/page"


class Three extends Component {

    componentDidMount() {
        // * 
        var size = {
            width: window.innerWidth,
            height: window.innerHeight,
            prop: ()=> this.width/this.height
        }
        var renderer = new THREE.WebGLRenderer({ 
            antialias: true,
        });
        renderer.setSize( window.innerWidth, window.innerHeight );
        this.mount.appendChild( renderer.domElement );

        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // * Fixed cam
        // camera.position.z = 5        
        const controls = new OrbitControls(camera, renderer.domElement )
        controls.enableDamping = true
        controls.dampingFactor = 0.5
        controls.autoRotate = true
        controls.autoRotateSpeed = 2
        camera.position.set( 8,2,8 );
        controls.update();
        
        
        // * Scene
        var scene = new THREE.Scene();
        const geom = {}
        geom.box = new THREE.BoxGeometry( 1, 1, 1 );
        geom.largebox = new THREE.BoxGeometry( 3,3,3 );

        const materials  = {
            normal: new THREE.MeshNormalMaterial(),
            wire: new THREE.MeshBasicMaterial({
                wireframe: true,
                color: 0x0308e0,
            }),
            line: new THREE.LineBasicMaterial({ color: 0x0004e0 }),
            green: new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
        }

        // * Cube
        
        var cube = new THREE.Mesh( geom.largebox , materials.wire );
        scene.add( cube );

        // * cubes
        let N = 42
        let R = 8
        for(let x=0; x<N; x++){
            let angl = 2 * Math.PI * x / N
            let c = new THREE.Mesh( geom.box, materials.normal );
            c.position.x = Math.cos(angl) * R
            c.position.y = Math.sin(angl) * R
            c.rotation.z = angl
            scene.add(c)
        }

        // * Line
        const points = []
        points.push(new THREE.Vector3(0,4,0) )
        points.push(new THREE.Vector3(0,0,4) )
        points.push(new THREE.Vector3(0,-4,0) )
        points.push(new THREE.Vector3(0,0,-4) )
        points.push(new THREE.Vector3(0,4,0) )
        geom.line = new THREE.BufferGeometry().setFromPoints( points );
        // * Lines
        const l1 = new THREE.Line( geom.line, materials.green );
        scene.add(l1)
        const l2 = new THREE.Line( geom.line, materials.green );
        l2.rotation.x += 0.35
        scene.add(l2)
        const l3 = new THREE.Line( geom.line, materials.green );
        l3.rotation.x += 0.7
        scene.add(l3)
        
        // * Extrude
        const randomPoints = [];
        let eR = 4
        for ( let i = 0; i < 10; i ++ ) 
            randomPoints.push( new THREE.Vector3( ( i - 4.5 ) * eR, THREE.MathUtils.randFloat( - eR,eR ), THREE.MathUtils.randFloat( - eR,eR ) ) );
        const randomSpline = new THREE.CatmullRomCurve3( randomPoints );
        const extrudeSettings = {
            steps: 200,
            bevelEnabled: false,
            extrudePath: randomSpline
        };
        const pts2 = [], numPts = 6;
        for ( let i = 0; i < numPts * 2; i ++ ) {
            const l = i % 2 == 1 ? 0.8:1;
            const a = i / numPts * Math.PI;
            pts2.push( new THREE.Vector2( Math.cos( a ) * l, Math.sin( a ) * l ) );
        }
        const shape2 = new THREE.Shape( pts2 );
        const geometry2 = new THREE.ExtrudeGeometry( shape2, extrudeSettings );
        const mesh2 = new THREE.Mesh( geometry2, materials.normal );
        scene.add( mesh2 );




        // * Animation
        var animate = (time)=>{
            requestAnimationFrame( animate );
            // cube.rotation.x = time / 2000
            // cube.rotation.y = time / 1000
            controls.update();
            renderer.render( scene, camera );
        };
        animate();

    }

    render() {
        return(
            <Page>
                <div ref={ref=> (this.mount=ref) } />
                <div style={{
                    color:'#fff', 
                    position:'absolute', top: '10px', zIndex: '20',
                }}>
                    Three JS example
                </div>
            </Page>
        )
    }

}

export default Three;