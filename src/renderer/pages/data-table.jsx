import CsvButton from "../components/data-table/CsvButton.jsx";
import { DataTable } from "../components/data-table/DataTable.jsx";
import Layout from "./panel-layout.jsx";
import ArduinoControls from "../components/Layout/ArduinoControls";


export default function() {
  return (<>
    <Layout title={"Home"} aside={<ArduinoControls/>} >
      <div className="w-full">
        <div className="flex justify-end mb-3">
          <CsvButton/>
        </div>
        <DataTable/>
      </div>
    </Layout>
  </>);
}