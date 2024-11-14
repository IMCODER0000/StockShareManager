import React from "react";
import "./css/Main.css"
import Navigate from "./Navigate";
import Content from "./Content";
import "./Content.css"

function MainPage() {

    


  return (
    <div>
    <div className="main-container">
        <Navigate />
       
   


    {/* <div className="Main-Box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'  }}> */}
    {/* <div className="content-container"> */}
        <Content />
    {/* </div> */}
    
    </div>

  
    </div>
  );
}

export default MainPage;
