import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

export function Velocity() {
    const chartRef = useRef(null);
    const chart = chartRef.current;
    useEffect(() => {

        if(chart){
            console.log('CanvasRenderingContext2D', chart.ctx);
            console.log('HTMLCanvasElement', chart.canvas);
            chart.ctx.fillRect(25, 25, 100, 100);
            chart.ctx.clearRect(45, 45, 60, 60);
            chart.ctx.strokeRect(50, 50, 50, 50);
        }
        
        

    }, []);

    
    const data = {
        title: "Velocity",
        label: [],
        datasets: [
        {
            label: '# of Votes',
            data: [5,3,2],
            backgroundColor: [
            'rgba(69, 196, 39)',
            'rgba(226, 215, 36)',
            'rgba(199, 0, 57)',
            ],
            borderColor: [
            'rgba(69, 196, 39)',
            'rgba(226, 215, 36)',
            'rgba(199, 0, 57)',
        ],
            needleValue: 30,
            borderWidth: 1,
            cutout: '90%',
            circumference: 180,
            rotation: 270,
            borderRadius: 5,
        },
    ],
    };
  
    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Velocity',
        },
        },
    }
    
    const  gaugeNeedle = {
        

    }


    return <>
        <Doughnut ref={chartRef}  data={data} options={options}/>
    </>
}