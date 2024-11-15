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

  useEffect(() => {
    if (pageNum === 2) { // 로딩 페이지가 렌더링될 때
      const timer = setTimeout(() => {
        setLoading(false); // 3초 후에 로딩 종료
      }, 3000);
      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 클리어
    }
  }, [pageNum]); // pageNum이 2일 때 로딩 시작

  // 로딩 상태가 끝난 후 바로 PortfolioResult로 이동
  useEffect(() => {
    if (!loading && pageNum === 2) {
      setPageNum(3);  // 페이지 번호를 3으로 설정하여 PortfolioResult로 이동
    }
  }, [loading, pageNum]);

  return (
    <div>
      <div className="main-container">
        <Navigate />
        
        {pageNum === 0 ? (
          
          <PortfolioMainAi
            setPageNum={setPageNum} 
            riskLevel={riskLevel} 
            myCost={myCost} 
            setPlusData={setPlusData} 
            plusData={plusData} 
            setIsFinish={setIsFinish} 
          />
        ) : pageNum === 1 && loading ? ( 
          <Loading />
        ) : pageNum === 2 && !loading && isFinish ? (
          <PortfolioResult2
            myCost={myCost} 
            riskLevel={riskLevel} 
            plusData={plusData}
            setPageNum={setPageNum}
          /> 
        ) : null}
      </div>
    </div>
  );
}

export default Protfolio2;
