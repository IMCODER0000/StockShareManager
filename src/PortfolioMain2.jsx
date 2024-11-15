import React, { useState, useEffect } from "react";
import "./Quiz/css/Quiz.css";
import Navigate from "./Navigate";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./Content.css";
import "./PortfolioMain.css";

function PortfolioMain2({ setPageNum, setRiskLevel, riskLevel, setMyCost }) {
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [plusData, setPlusData] = useState([]);
  const [top10, setTop10] = useState([]);
  const [allData, setAllData] = useState([]);


  const navigate = useNavigate();

  const MP = () => {
    navigate(`/portfolio`);
  };

  const JP = () => {
    navigate(`/ai`);
  };



  const handleChange = (event) => {
    setMyCost(event.target.value);
    
  };

  
 

 

  const Next = () => {
    setPageNum(prev => prev + 1);
  };

  const handleRiskSelection = (level) => {
   
      setRiskLevel(level);
    
  };



  return (
    <div className="content-container">
      <div className="portfolio-main-box2">
        <div className="myF">나의 자산</div>
        <div className="Main-Search2">
          <input
            type="text"
            className="search-input2"
            onChange={handleChange}
            placeholder="금액... (원)"
          />
        </div>

        <div className="myF">위험 리스크</div>
        <div>
          <button
            className={`submit2 ${riskLevel === 3 ? 'selected' : ''}`} // 선택된 버튼 스타일 변경
            onClick={() => handleRiskSelection(3)}
          >
            저 위험
          </button>
          <button
            className={`submit2 ${riskLevel === 5 ? 'selected' : ''}`} // 선택된 버튼 스타일 변경
            onClick={() => handleRiskSelection(5)}
          >
            중간
          </button>
          <button
            className={`submit2 ${riskLevel === 7 ? 'selected' : ''}`} // 선택된 버튼 스타일 변경
            onClick={() => handleRiskSelection(7)}
          >
            고 위험
          </button>
        </div>

        <div className="submit-box2">
          <button className="submit2" onClick={Next}> 다음 </button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioMain2;
