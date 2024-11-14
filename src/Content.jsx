import React, { useEffect, useState } from "react";
import "./Quiz/css/Quiz.css";
import Navigate from "./Navigate";
import { useNavigate } from 'react-router-dom';
import "./Content.css"

function Content() {
  const [quizData, setQuizData] = useState([]); 

  const navigate = useNavigate();

  const MP = () => {
    navigate(`/portfolio`);
  };

  const JP = () => {
    navigate(`/ai`);
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

 
  useEffect(() => {

    fetch('http://localhost:4000/api/quizClass/all')
      .then(response => response.json())
      .then(data => setQuizData(data))  
      .catch(error => console.error('데이터 가져오기 실패:', error));
  }, []);

  return (
    <div className="content-container">
                                        
            
            <div className="Main-page-layout">
                <div className="left-side">
                    <div className="left-texts1">
                      <div className="left-text"> MARKET CIRCLE1 </div>
                      <div className="left-text2"> 모든 투자자를 위한 웹 서비스 MARKET CIRCLE<br />
                                                    여러 투자 정보와 나의 자산 포트폴리오 주가 예측 등 주식의 필요한 웹 서비스를 제공 합니다.<br />
                                                    올해 다들 모두 행복하시고 건강한 한 해 되시길 바랍니다. 감사합니다.   </div>

                    </div>
                    <img className="left-img" src="/main/2.jpeg"></img>
                </div>
                <div className="right-side">
                    <div className="top-half">
                        <div className="main-contents">
                            <div className="half1" onClick={MP}>
                                <div></div>
                                <div className="half1-title">내 자산 분배</div>
                                <div className="half1-desciption">내 자산을 원하는 주식과 채권 투자 비율을 통해<br /> 내 자산 포트폴리오를 추천해드립니다.</div>
                                <div className="half1-start">시작하기 --&gt;</div>
                            </div>
                            <div className="half2" onClick={JP}>
                                <div></div>
                                <div className="half2-title">내 자산 분배</div>
                                <div className="half2-desciption">내 자산을 원하는 주식과 채권 투자 비율을 통해<br /> 내 자산 포트폴리오를 추천해드립니다.</div>
                                <div className="half2-start">시작하기 --&gt;</div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-half">
                      <div className="left-texts2">
                          <div className="left-text3">안녕하세요</div>
                          <div className="left-text4">
                              안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 <br />
                              안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
                          </div>
                          <div className="left-text5">서비스 소개 ---&gt;</div>
                      </div>
                      <img className="bottom-img" src="/main/6.png" alt="배경 이미지" />
                  </div>
                </div>
            </div>

     
    </div>
  );
}

export default Content;
