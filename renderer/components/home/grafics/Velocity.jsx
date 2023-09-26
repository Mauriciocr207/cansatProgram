import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { useRef } from 'react';


export function Velocity() {
  const bar = useRef();
  const needle = useRef();
  const velocityValue = useRef();

  function setCSS(value) {
    const degrees = value / 40 * 180
    needle.current.style.transform = `rotate(${-90 + degrees}deg)`
    bar.current.style.transform = `rotate(${-90 + degrees}deg)`
    velocityValue.current.textContent = value;
  }


  // Calculo de la velocidad instantánea
  let vf = 0;
  let ti = 0;
  function calcVelocity(vi,ti,tf,a) {
    const vf = vi + a * (tf - ti);
    return vf;
  }

  useEffect(() => {
    setCSS(35);
    

  }, [bar, needle]);

  return <>
    <div className='w-full h-full flex items-center'>
      <div className="gauge">
        <div className="progress">
          <div ref={bar} className="bar"></div>
          <div ref={needle} className="needle"></div>
        </div>
        <p className='text'><span ref={velocityValue} className='value'>12</span> m/s</p>
      </div>
    </div>

  </>

    // return <Line options={options} data={data} />;
}