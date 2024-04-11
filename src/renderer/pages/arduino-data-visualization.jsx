import Layout from "./panel-layout.jsx";
import ArduinoControls from "../components/Layout/ArduinoControls";
import Graphics from "../components/arduino-data-visualization/Graphics";


export default function() {
  return (<>
    <Layout title={"Home"} aside={<ArduinoControls/>} >
      <div className="w-full">
        <Graphics/>
      </div>
    </Layout>
  </>);
}
