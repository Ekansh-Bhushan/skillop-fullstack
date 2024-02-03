import React from "react";
import Dashboard from "../dashboard/Slots";


function Addskills({ userData, setProgress }) {
    return (<>
        <Dashboard userData={userData} setProgress={setProgress} shouldbevisible={false} />
    </>
    )
}

export default Addskills