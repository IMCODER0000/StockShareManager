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

  useEffect(() => {
    setTop10([
      { rank: 1, name: '엔비디아', change: '+1.1%', price: '195,096원', color: 'red', image: '/E.png' },
      { rank: 2, name: 'SK하이닉스', change: '+1.1%', price: '198,200원', color: 'red', image: '/SK.png' },
      { rank: 3, name: '삼성전자', change: '-4.2%', price: '56,600원', color: 'blue', image: '/SA.png' },
      { rank: 4, name: 'NAVER', change: '-0.2%', price: '172,100원', color: 'gray', image: '/N.png' },
      { rank: 5, name: '카카오', change: '-0.6%', price: '37,450원', color: 'gray', image: '/K.png' },
      { rank: 6, name: 'CJ씨푸드', change: '-2.0%', price: '3,090원', color: 'blue', image: '/C.png' },
    ]);

    setAllData([
      { rank: 1, name: '엔비디아', change: '+1.1%', price: '195,096원', color: 'red', image: '/E.png' },
      { rank: 2, name: 'SK하이닉스', change: '+1.1%', price: '198,200원', color: 'red', image: '/SK.png' },
      { rank: 3, name: '삼성전자', change: '-4.2%', price: '56,600원', color: 'blue', image: '/SA.png' },
      { rank: 4, name: 'NAVER', change: '-0.2%', price: '172,100원', color: 'gray', image: '/N.png' },
      { rank: 5, name: '카카오', change: '-0.6%', price: '37,450원', color: 'gray', image: '/K.png' },
      { rank: 6, name: 'CJ씨푸드', change: '-2.0%', price: '3,090원', color: 'blue', image: '/C.png' },
    ]);
  }, []);

  const handleChange = (event) => {
    setMyCost(event.target.value);
  };

  const handleSearch = () => {
    const foundData = allData.filter((data) => data.name.toLowerCase().includes(searchText.toLowerCase()));
    setSearchData(foundData);
    console.log("!!!! : ", searchData);
  };

  const plus = (stock) => {
    setPlusData(prevData => [...prevData, stock]);
  };

  const Minus = (stock) => {
    console.log("new Stock : ", stock);
    setPlusData(prevData => prevData.filter(item => item.name !== stock.name));
    console.log("@@@@@@ : ", plusData);
  };

  const Next = () => {
    setPageNum(prev => prev + 1);
  };

  const handleRiskSelection = (level) => {
    setRiskLevel(level); // 선택된 위험 리스크 상태 저장
  };

  useEffect(() => {
    fetch('http://localhost:4000/api/quizClass/all')
      .then(response => response.json())
      .catch(error => console.error('데이터 가져오기 실패:', error));
  }, []);

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
            className={`submit2 ${riskLevel === 'low' ? 'selected' : ''}`} // 선택된 버튼 스타일 변경
            onClick={() => handleRiskSelection('low')}
          >
            저 위험
          </button>
          <button
            className={`submit2 ${riskLevel === 'medium' ? 'selected' : ''}`} // 선택된 버튼 스타일 변경
            onClick={() => handleRiskSelection('medium')}
          >
            중간
          </button>
          <button
            className={`submit2 ${riskLevel === 'high' ? 'selected' : ''}`} // 선택된 버튼 스타일 변경
            onClick={() => handleRiskSelection('high')}
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
