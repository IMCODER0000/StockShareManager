import React, { useState, useEffect } from "react";
import "./css/Main.css";
import Navigate from "./Navigate";
import PortfolioMain from "./PortfolioMain";
import PortfolioMain2 from "./PortfolioMain2";
import Loading from "./Loading"; 
import PortfolioResult from "./PortfolioResult";
import PortfolioResult2 from "./PortfolioResult2";
import PortfolioMainAi from "./PortfolioMainAi";

function Protfolio2() {
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [riskLevel, setRiskLevel] = useState(''); 
  const [myCost, setMyCost] = useState(0);
  const [plusData, setPlusData] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [stock, setStock] = useState(null);

 

  return (
    <div>
      <div className="main-container">
        <Navigate />
        
     
          
          <PortfolioMainAi
            setStock = {setStock}
            setPageNum={setPageNum} 
            riskLevel={riskLevel} 
            myCost={myCost} 
            setPlusData={setPlusData} 
            plusData={plusData} 
            setIsFinish={setIsFinish} 
          />

        
      </div>
    </div>
  );
}

export default Protfolio2;
