import React, { useState, useMemo, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';

import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  Title
} from 'chart.js';
import './PortfolioChart.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title
);

const PortfolioChart2 = ({ ticker, name }) => {

  console.log("Received props:", { ticker, name });

  const [stockGData, setStockGData] = useState([]);
  const [stockEx, setStockEx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!ticker) {
        console.error("No ticker provided");
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:4000/api/stocks/${ticker}.KS/history2`);
        const data = await response.json();
  
        if (data) {
          console.log("Fetched data:", data);
          setStockGData(prev => ({
            ...prev,
            [name]: {
              name: name,
              GData: data.quotes,
            },
          }));
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
    setStockEx(58900);
  }, [ticker, name]);




  const generateStockPriceData = (name) => {
    const stockData = stockGData[name];

    if (!stockData) {
      console.error(`주식 데이터를 찾을 수 없습니다: ${name}`);
      return {
        labels: [],
        datasets: [],
      };
    }

    const stockGraph = stockData.GData;
    
    // 마지막 날짜 다음 날 추가
    const lastDate = new Date(stockGraph[stockGraph.length - 1].date);
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 1);

    // 날짜와 가격 데이터 생성
    const labels = [
      ...stockGraph.map((data) => {
        const date = new Date(data.date);
        return `${date.getMonth() + 1}월 ${date.getDate()}일`;
      }),
      `${nextDate.getMonth() + 1}월 ${nextDate.getDate()}일 (예측)`
    ];

    const historicalPrices = stockGraph.map((data) => data.high);
    const lastPrice = historicalPrices[historicalPrices.length - 1];

    // 실제 데이터와 예측 데이터 분리
    const realData = [...historicalPrices];
    const predictionData = Array(historicalPrices.length - 1).fill(null);
    predictionData.push(lastPrice, stockEx); // 마지막 실제 데이터와 예측값 연결

    console.log("Data check:", {
      labels,
      realData,
      predictionData,
      lastPrice,
      stockEx
    });

    return {
      labels,
      datasets: [
        {
          label: `${name} 실제 주가`,
          data: realData,
          fill: false,
          borderColor: '#4169E1',
          backgroundColor: '#4169E1',
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: '예측 주가',
          data: predictionData,
          fill: false,
          borderColor: '#FF6B6B',
          backgroundColor: '#FF6B6B',
          borderDash: [5, 5],
          tension: 0.1,
          pointRadius: (ctx) => {
            // 마지막 두 포인트만 표시 (연결점과 예측점)
            return ctx.dataIndex >= ctx.dataset.data.length - 2 ? 8 : 0;
          },
          pointStyle: (ctx) => {
            // 마지막 포인트만 별 모양으로 표시
            return ctx.dataIndex === ctx.dataset.data.length - 1 ? 'star' : 'circle';
          },
          pointHoverRadius: 10,
          pointBackgroundColor: (ctx) => {
            // 연결점은 파란색, 예측점은 빨간색
            return ctx.dataIndex === ctx.dataset.data.length - 2 ? '#4169E1' : '#FF6B6B';
          }
        }
      ],
    };
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
          font: {
            size: 12,
          },
          callback: function(value) {
            return value.toLocaleString() + '원';
          }
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label;
            const value = context.parsed.y;
            if (label === '예측 주가' && context.dataIndex === context.dataset.data.length - 1) {
              return `${label}: ${value.toLocaleString()}원 (AI 예측)`;
            }
            return `${label}: ${value.toLocaleString()}원`;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-container">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>AI 주가 예측 중입니다.</p>
          </div>
        ) : (
          <div className="stock-price-chart">
            <h3 className="chart-title">{name} 주가 그래프</h3>
            <Line data={generateStockPriceData(name)} options={lineChartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioChart2;
