import React from "react";
import index from "./index.css";
import tick1 from './../images/gray.png'
import { useNavigate } from "react-router-dom";


function Pageloader({ givecolor2, givecolor3, givecolor4, givecolor5, givecolor6, givecolor7, givecolor8, isactive2, isactive3, isactive4, isactive5, isactive6, isactive7, isactive8 }) {
  const navigate = useNavigate()
  const a = {"1": "/skills", "2": "/jobtitles", "3": "/collegedetails", "4": "/pic", "5": "/laststep" }
  const red = (x) => {
    navigate(a[x])
  }
  return (
    <>
      <div className="topper">
        <div className="load-main">
          <div className="circle-1 color-blue">1</div>
          <div className="line-1 bgcolor-blue"></div>
        </div>
        <div className="load-main" onClick={() => { red("1") }} >
          <div className={`${givecolor2 ? "circle-1 " : "circle-1 color-blue"} ${isactive2 ? "hover-current" : ""}`} >2</div>
          <div className={givecolor2 ? "line-1" : "line-1 bgcolor-blue"}></div>
        </div>
        <div className="load-main" onClick={() => { red("2") }}>
          <div className={`${givecolor3 ? "circle-1 " : "circle-1 color-blue"} ${isactive3 ? "hover-current" : ""}`}>3</div>
          <div className={givecolor3 ? "line-1" : "line-1 bgcolor-blue"}></div>
        </div>
        <div className="load-main" onClick={() => { red("3") }}>
          <div className={`${givecolor4 ? "circle-1 " : "circle-1 color-blue"} ${isactive4 ? "hover-current" : ""}`}>4</div>
          <div className={givecolor4 ? "line-1" : "line-1 bgcolor-blue"}></div>
        </div>
        <div className="load-main" onClick={() => { red("4") }}>
          <div className={`${givecolor5 ? "circle-1 " : "circle-1 color-blue"} ${isactive5 ? "hover-current" : ""}`}>5</div>
          <div className={givecolor5 ? "line-1" : "line-1 bgcolor-blue"}></div>
        </div>
        {/* <div className="load-main" onClick={() => { red("5") }}>
          <div className={`${givecolor6 ? "circle-1 " : "circle-1 color-blue"} ${isactive6 ? "hover-current" : ""}`}>6</div>
          <div className={givecolor6 ? "line-1" : "line-1 bgcolor-blue"}></div>
        </div> */}
        {/* <div className="load-main" onClick={() => { red("6") }}> */}
          {/* <div className={`${givecolor7 ? "circle-1 " :"circle-1 color-blue"} ${isactive7 ?"hover-current" :"" }`}>7</div> */}
          {/* <div className={givecolor7 ? "line-1" :"line-1 bgcolor-blue"}></div> */}
        {/* </div> */}
        <div className="load-main" onClick={() => { red("5") }}>
          <div className={`${givecolor6 ? "circle-1 " : "circle-1 color-blue"} ${isactive6 ? "hover-current" : ""}`}><img src={tick1} style={{ height: '20px' }} /></div>
        </div>

      </div>

    </>
  );
}

export default Pageloader;
