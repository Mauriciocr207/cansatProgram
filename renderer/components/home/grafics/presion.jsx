import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {Line} from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


export function Presion() {
    const data = {
        labels: [
            '10/04/2018', '10/05/2018',
            '10/06/2018', '10/07/2018', 
            '10/08/2018', '10/09/2018', 
            '10/10/2018', '10/11/2018', 
            '10/12/2018', '10/13/2018', 
            '10/14/2018', '10/15/2018',
            '10/16/2018'
          ],
          datasets: [
            {
              label: 'Temperature',
              data: [22,19,27,23,22,24,17,25,23,24,20,19, 22],
              fill: false,          // Don't fill area under the line
              borderColor: 'white'  // Line color
            }
          ]
    }

    const options = {
        maintainAspectRatio: false	// Don't maintain w/h ratio
      }

    return <>
        <Line data={data} options={options}/>
    </>
}