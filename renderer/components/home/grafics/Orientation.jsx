import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei';
import { Cansat } from './cansatGLTF/Cansat';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';

export function Orientation({props}) {
    const pi = 3.14159;
    const [angs, setAngs] = useState({x: 0, y: 0, z: 0});
    useEffect(() => {
        ipcRenderer.on('Arduino:data', (event, data) => {
            const {ang_x, ang_y, ang_z} = data;
            if(ang_x * ang_y * ang_z != NaN) {
                setAngs({
                    x: ang_x * Math.PI / 180,
                    y: ang_y * Math.PI / 180,
                    z: ang_z * Math.PI / 180,
                });
            }
        });
    },[angs]);
    return <>
        <div className='w-full h-full '>
            <Canvas shadows camera={{position:[10,10,30]}}>
                
                <pointLight position={[10,10,30]} />
                <pointLight position={[10,20,30]} />
                <pointLight position={[10,-20,30]} intensity={0.5} />
                <axesHelper args={[20]} />
                {/* <mesh
                    rotation-x={angulos.x}2
                    rotation-y={angulos.y}
                    rotation-z={angulos.z}
                >
                    <meshStandardMaterial wireframe/>
                </mesh> */}
                <Cansat rotation = {[angs.x, angs.z, -angs.y]}
                    position={[0,0,0]}
                />
                <Environment preset="city" background blur={10} />
                <OrbitControls />
            </Canvas>
        </div>
    </>
}