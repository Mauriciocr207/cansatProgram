import Layout from "./layout.jsx";
import { Sidebar } from "../../components/Layout/SideBar/";
import {ArduinoControls} from "../../components/Home/ArduinoControls/";
import { Graphics } from "../../components/Home/Graphics";
import { Panel } from "../../components/Layout/Panel.jsx";


export default function() {
  return (<>
    <Layout title={"Home"} aside={<ArduinoControls/>} >
      <div className="w-full">
        <Graphics/>
      </div>
    </Layout>
  </>);
}
