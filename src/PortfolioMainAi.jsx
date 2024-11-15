import React, { useEffect, useState } from "react";
import "./Quiz/css/Quiz.css";
import Navigate from "./Navigate";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./Content.css"
import "./PortfolioMain.css"

function PortfolioMainAi({ setPageNum, myCost, riskLevel,setPlusData,plusData,setIsFinish, setStock }) {

    const [searchText, setSearchText] = useState('');
    const [searchData, setSearchData] = useState([]);
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

    fetchTop10Stocks()
    console.log("올  : " ,allData);
    console.log("올  : " , top10);

   

  




}, []);

const fetchTop10Stocks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/stocks");
      const data = await response.json();

      if (data) {
       console.log("Data : ", data);
        

        setAllData(data);
        const top = data.filter(item => item.rank >= 1 && item.rank <= 5);
        setTop10(top);  
        
      }
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다:", error);
    }
  };


const handleChange = (event) => {
    setSearchText(event.target.value);
};

const handleSearch = () => {

    const foundData = allData.filter((data) => data.name.toLowerCase().includes(searchText.toLowerCase()));
    setSearchData(foundData);
    console.log("!!!! : ", searchData);

};

const plus = (stock) => {
  console.log("new Stock : ", stock);  // stock 데이터 확인

  Swal.fire({
    title: '주식을 선택 하시겠습니까?',
    icon: 'question',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    showCancelButton: true,  // 취소 버튼을 표시
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("new Stock2 : ", stock);
      navigate('/ai/result', { state: { stock } });  // 주식 데이터를 전달
    } else if (result.isDismissed) {
      console.log('취소 클릭');
    }
  });
};





  return (
    <div className="content-container">
        <div className="portfolio-main-box">
            <div className="nom"></div>
            <div className="p-total-content">
            <div className="p-left">
                <div className="Main-Search">
                        <input
                            type="text"
                            className="search-input"
                            value={searchText}
                            onChange={handleChange}
                            placeholder="검색어를 입력하세요..."
                        />
                        <button className="search-button" onClick={handleSearch}>
                            <FaSearch />
                        </button>
                    </div>
                    <div className="stock-list">
                        {searchData.length === 0 ? (
                            top10.map(stock => (
                            <div key={stock.rank} className="stock-item" onClick={() => plus(stock) }>
                                <span className="rank">{stock.rank}</span>
                                <span className="name">{stock.name}</span>
                                <span className="price-change">
                                <span className="marketCap">{stock.marketCap}<span className="marketCapText">&nbsp;(억원)</span></span>
                                <span className="price">{stock.price}<span className="priceText">&nbsp;(원)</span></span>
                                <span className="change" style={{ color: stock.color }}>{stock.change}</span>
                                </span>
                            </div>
                            ))
                        ) : (
                            searchData.map(stock => (
                            <div key={stock.rank} className="stock-item" onClick={() => plus(stock) }>
                                <span className="rank">{stock.rank}</span>
                                <span className="name">{stock.name}</span>
                                <span className="price-change">
                                <span className="marketCap">{stock.marketCap}<span className="marketCapText">&nbsp;(억원)</span></span>
                                <span className="price">{stock.price}<span className="priceText">&nbsp;(원)</span></span>
                                <span className="change" style={{ color: stock.color }}>{stock.change}</span>
                                </span>
                            </div>
                            ))
                        )}
                        </div>

                </div>
            
                    
                </div>
            

        </div>
    </div>
  );
}

export default PortfolioMainAi;

