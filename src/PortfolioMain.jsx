import React, { useEffect, useState } from "react";
import "./Quiz/css/Quiz.css";
import Navigate from "./Navigate";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Content.css"
import "./PortfolioMain.css"

function PortfolioMain({ setPageNum, myCost, riskLevel,setPlusData,plusData,setIsFinish,setIm, im }) {
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



const handleSubmit = async () => {
  const inputData = {
    totalInvestment: myCost,
    risk: riskLevel,
    company1: plusData[0].name,
    company2: plusData[1].name,
    company3: plusData[2].name,
  };

  console.log("inputData : ", inputData);

  try {
    // POST 요청 보내기
    const response = await axios.post("http://localhost:4000/api/runPython", inputData, {
      headers: {
        'Content-Type': 'application/json',  // 명시적으로 Content-Type 설정
      },
    });

    const data = response.data;

    console.log("data123 : ", data);

   

    // 예: 상태 설정
    setIm({
      data,
    });

    console.log("setIm : ", im);

    console.log("Response : ", response.data);
  } catch (err) {
    console.error("Error : ", err);
  }
};



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
  if (stock) {
    setPlusData(prevData => {
      if (prevData.includes(stock)) {
        return prevData.filter(item => item !== stock);
      } else {
        return [...prevData, stock];
      }
    });
  }
};


const Minus = (stock) => {
    console.log("new Stock : ", stock);
    setPlusData(prevData => prevData.filter(item => item.name !== stock.name));
    console.log("@@@@@@ : ", plusData);
}
  
const Next = () =>{
    setPageNum(prev => prev + 1);
    setIsFinish(true);
    console.log("자산 : ", myCost);
    console.log("리스크 : ", riskLevel);
    console.log("주식들 : ", plusData);
    handleSubmit();

}

const Prev = () =>{
    setPageNum(prev => prev - 1);
}
 

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
                 <div className="p-right">
                    <div className="p-selected">
                        {plusData.map(stock => (
                            <div className="p-selected-content" onClick={() => Minus(stock)}>
                                {stock.name}
                                <span> X </span>
                            </div>

                        ))}
                    
                    </div>
                    <div className="submit-box">
                        <button className="submit" onClick={Prev}> 이전 </button>
                        <button className="submit" onClick={Next}> 다음 </button>
                    </div>
                    
                </div>
                    
                </div>
            

        </div>
    </div>
  );
}

export default PortfolioMain;

