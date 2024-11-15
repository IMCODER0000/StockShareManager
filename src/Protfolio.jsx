import React, { useState } from "react";
import "./css/Main.css";
import Navigate from "./Navigate";
import PortfolioMain from "./PortfolioMain";
import PortfolioMain2 from "./PortfolioMain2";
import PortfolioResult from "./PortfolioResult";

function Protfolio() {
  const [pageNum, setPageNum] = useState(0);
  const [riskLevel, setRiskLevel] = useState(0); 
  const [myCost, setMyCost] = useState(0);
  const [plusData, setPlusData] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [im, setIm] = useState({});

  return (
    <div>
      <div className="main-container">
        <Navigate />
        
        {pageNum === 0 ? (
          <PortfolioMain2 setPageNum={setPageNum} setRiskLevel={setRiskLevel} riskLevel={riskLevel} setMyCost={setMyCost}/>
        ) : pageNum === 1 ? (
          <PortfolioMain 
            setPageNum={setPageNum} 
            riskLevel={riskLevel} 
            myCost={myCost} 
            setPlusData={setPlusData} 
            plusData={plusData} 
            setIsFinish={setIsFinish} 
            setIm={setIm}
            im={im}
          />
        ) : pageNum === 2 ? (
          <PortfolioResult 
            myCost={myCost} 
            riskLevel={riskLevel} 
            plusData={plusData}
            setPageNum={setPageNum}
            im={im}
          /> 
        ) : null}
      </div>
    </div>
  );
}

export default Protfolio;