import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei';
import { CansatModel } from './CansatModel';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';

export function Orientation() {
    const [angs, setAngs] = useState([0,0,0]);
    useEffect(() => {
        ipcRenderer.on('arduino:data', (event, data) => {
            const {gyro: [ang_x, ang_y, ang_z]} = data;
            if(!isNaN(ang_x) && !isNaN(ang_y) && !isNaN(ang_z)) {
                setAngs([
                    ang_x * Math.PI / 180,
                    ang_y * Math.PI / 180,
                    ang_z * Math.PI / 180,
                ]);
            }
        });
    }, []);
    return <>
        <div className='w-full h-full rounded-lg overflow-hidden'>
            <Canvas shadows camera={{position:[10,10,30]}}>
                <pointLight position={[10,10,30]} />
                <pointLight position={[10,20,30]} />
                <pointLight position={[10,-20,30]} intensity={0.5} />
                <axesHelper args={[20]} />
                <CansatModel rotation = {angs} position={[0,0,0]} />
                {/* <Environment preset="sunset" background blur={10} /> */}
                <OrbitControls />
            </Canvas>
        </div>
    </>
}