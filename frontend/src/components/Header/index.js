import React from "react";
import logo from '../images/logo.png'
import index from './index.css'

function Header1(){
    return(
    <>
     <div className="header">
        <img src={logo} alt="SKILLOP Logo" />
        <span>SKILLOP</span>
    </div>
    </>);
}
export default Header1;