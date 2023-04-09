import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export function Vision3D({props}) {
    const [angulos, setAngulos] = useState({x:0, y:0, z:0});

    return <>
        <div className='w-full h-full '>
            <Canvas>
                <ambientLight intensity={0.1}/>
                <directionalLight color="red" position={[0,0,5]} />
                <mesh
                    rotation-x={angulos.x}
                    rotation-y={angulos.y}
                    rotation-z={angulos.z}
                >
                    <sphereBufferGeometry/>
                    <meshStandardMaterial wireframe/>
                </mesh>
                <OrbitControls />
            </Canvas>
        </div>
    </>
}