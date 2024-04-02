import Layout from "./"
import { Sidebar } from "../components/Layout/SideBar/";
import {ArduinoControls} from "../components/Home/ArduinoControls/";
import { Graphics } from "../components/Home/Graphics";
import { Panel } from "../components/Layout/Panel.jsx";


export default function() {
  return (<>
    <Layout title={"Home"}>
      <Sidebar className={"bg-slate-400 overflow-scroll p-2"}>
        <ArduinoControls/>
      </Sidebar>
      <Panel className={"row-span-1 col-span-1 rounded-[10px] overflow-y-auto relative transition-color duration-300 "}>
        <Graphics/>
      </Panel>
    </Layout>
  </>);
}
