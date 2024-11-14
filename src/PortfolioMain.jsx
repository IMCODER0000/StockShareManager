import React, { useEffect, useState } from "react";
import "./Quiz/css/Quiz.css";
import Navigate from "./Navigate";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./Content.css"
import "./PortfolioMain.css"

function PortfolioMain({ setPageNum, myCost, riskLevel,setPlusData,plusData,setIsFinish }) {
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
    setSearchText(event.target.value);
};
const handleSearch = () => {

    const foundData = allData.filter((data) => data.name.toLowerCase().includes(searchText.toLowerCase()));
    setSearchData(foundData);
    console.log("!!!! : ", searchData);

};

const plus = (stock) => {
    setPlusData(prevData => [...prevData, stock]);
  }

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

}

const Prev = () =>{
    setPageNum(prev => prev - 1);
}
 
  useEffect(() => {

    fetch('http://localhost:4000/api/quizClass/all')
      .then(response => response.json())
      .catch(error => console.error('데이터 가져오기 실패:', error));
  }, []);

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
                                <span className="change" style={{ color: stock.color }}>{stock.change}</span>
                                <span className="price">{stock.price}</span>
                                </span>
                            </div>
                            ))
                        ) : (
                            searchData.map(stock => (
                            <div key={stock.rank} className="stock-item" onClick={() => plus(stock) }>
                                <span className="rank">{stock.rank}</span>
                                <span className="name">{stock.name}</span>
                                <span className="price-change">
                                <span className="change" style={{ color: stock.color }}>{stock.change}</span>
                                <span className="price">{stock.price}</span>
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

