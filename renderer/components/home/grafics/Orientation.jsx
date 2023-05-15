import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei';
import { Cansat } from './cansatGLTF/Cansat';

export function Orientation({props}) {
    return <>
        <div className='w-full h-full '>
            <Canvas shadows camera={{position:[10,10,30]}}>
                
                <pointLight position={[10,10,30]} />
                <pointLight position={[10,20,30]} />
                <pointLight position={[10,-20,30]} intensity={0.5} />
                <axesHelper args={[20]} />
                {/* <mesh
                    rotation-x={angulos.x}
                    rotation-y={angulos.y}
                    rotation-z={angulos.z}
                >
                    <meshStandardMaterial wireframe/>
                </mesh> */}
                <Cansat rotation = {[
                    -Math.PI/2 + 0,
                    0,
                    0
                ]}
                position = {[-9,-11,5]}
                />
                <Environment preset="city" background blur={10} />
                <OrbitControls />
            </Canvas>
        </div>
    </>
}