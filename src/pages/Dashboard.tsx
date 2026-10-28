
import Main from "../components/dashboard/Main.js";
import Sidebar from "../components/dashboard/Sidebar.js"
const Dashboard=()=>{
            return <div className="flex gap-20 ">
                <div><Sidebar/></div>
                <div><Main/></div>
            </div>
          

}

export default Dashboard;