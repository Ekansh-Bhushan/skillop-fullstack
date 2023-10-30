import React from "react";
import Dashboard from "../dashboard/Slots";
import Pageloader from "../Pagesbar";


function Addskills({ userData, setProgress }) {
    return (<>
        <Dashboard userData={userData} setProgress={setProgress} shouldbevisible={false} />
    </>
    )
}

export default Addskills