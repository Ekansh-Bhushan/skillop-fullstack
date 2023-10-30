import React from "react";
import Common from "../common";

import Postlist from "../Postlist";


export const DisplayPosts = ({setProgress}) => {
  return (
      <>
          <Common setProgress={setProgress} />
          <div style={{display:'flex',justifyContent:'center',position:'relative',top:'50px'}}>
              <Postlist setProgress={setProgress}/>
          </div>
          
      </>
  )
}

