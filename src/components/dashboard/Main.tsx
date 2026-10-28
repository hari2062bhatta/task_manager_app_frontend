import {Outlet} from "react-router-dom"

const Main=()=>{

    return <div>
                <div className="text-center text-2xl  text-blue-400">Manage Your Own Task</div>
            
            <div>
            <Outlet/>

            </div>
    </div>

}

export default Main;