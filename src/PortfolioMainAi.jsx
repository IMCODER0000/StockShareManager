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
    const [isLoading, setIsLoading] = useState(false);

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

const plus = async (stock) => {
  console.log("new Stock : ", stock);

  Swal.fire({
    title: '주식을 선택 하시겠습니까?',
    icon: 'question',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    showCancelButton: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:4000/api/ai/${stock.name}`);
        const aiData = await response.json();

        console.log("AI Data : ", aiData);

        if (aiData) {
          // aiData에서 price 값 추출
          const { price } = aiData;
          console.log("Received Price5555555555: ", price);

          navigate('/ai/result', {
            state: {
              stock,
              aiData
            }
          });
        }
      } catch (error) {
        console.error("AI 데이터를 불러오는데 실패했습니다:", error);
        Swal.fire({
          title: '오류',
          text: 'AI 분석 중 오류가 발생했습니다.',
          icon: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    }
  });
};







  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>AI 주가 예측 중입니다.</p>
        </div>
      ) : (
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
                      <div key={stock.rank} className="stock-item" onClick={() => plus(stock)}>
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
                      <div key={stock.rank} className="stock-item" onClick={() => plus(stock)}>
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
      )}
    </div>
  );
}

export default PortfolioMainAi;
