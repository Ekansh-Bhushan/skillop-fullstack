import React from "react";
import index from './index.css'
import Header1 from "../Header";
import { useNavigate } from 'react-router-dom';
import Pageloader from "../Pagesbar";
import Dashboard from "../dashboard/Slots";

function Auth6Component({setProgress}){
    const navigate = useNavigate();
  
    const redirectToPage7 = () => {
    setProgress(30);
     
      navigate('/laststep');
      setProgress(100);
    };

    return(
        <>
        <Header1/>
        <div className="main-6">
            <Pageloader givecolor2={false} givecolor3={false} givecolor4={false} givecolor5={false} givecolor6={true} givecolor7={true}/>
            <div className="head-6">
                Great ! Set Your Availability
            </div>
            <div className="title-6">
                Let Your Peer Know Your Availability
            </div>
           
        </div>
        </>
    )
}

export default Auth6Component