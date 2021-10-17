import React, {Component} from 'react';
import * as THREE from 'three';

import Page from "../lib/page"


class Three extends Component {

    componentDidMount() {
        // * 
        var size = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.z = 5

        var renderer = new THREE.WebGLRenderer({ 
            antialias: true,
        });
        renderer.setSize( window.innerWidth, window.innerHeight );
        this.mount.appendChild( renderer.domElement );
        
        // *
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshNormalMaterial();
        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        var animate = (time)=>{
              requestAnimationFrame( animate );
            //   cube.rotation.x += 0.01;
            //   cube.rotation.y += 0.01;
            cube.rotation.x = time / 2000
            cube.rotation.y = time / 1000
            renderer.render( scene, camera );
        };
        animate();

    }

    render() {
        return(
            <Page>
                <div ref={ref=> (this.mount=ref) } />
            </Page>
        )
    }

}

export default Three;