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



const PortfolioChart = ({ myCost, riskLevel, plusData, im }) => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockGData, setStockGData] = useState([]);



  useEffect(() => {
    const fetchData = async (plusDataD) => {
      console.log("plusDataD.ticker : ", plusDataD.ticker);
      try {
        const response = await fetch(`http://localhost:4000/api/stocks/${plusDataD.ticker+'.KS'}/history`);
        const data = await response.json();
  
        if (data) {
          setStockGData(prev => ({
            ...prev,
            [plusDataD.name]: {
              name: plusDataD.name,
              GData: data.quotes,
            },
          }));
        }
  
  
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다:", error);
      }
    };
  
    for (let i = 0; i < plusData.length; i++) {
      fetchData(plusData[i]);

    }


  
  }, [plusData]);
  

const priceMatch = (stock) => {
  console.log('im:', im);
  console.log('stock:', stock);
  console.log('im.data:', im.data);
  const price = Object.entries(im.data).filter(([key, value]) => key === stock.name);
  console.log('price after filter:', price);
  const priceValue = price.length > 0 ? price[0][1] : null;
  return priceValue;
}

const PercentageManch = (stock) => {
  if (!im?.data?.total || !im?.data?.rf) return 0;
  const sum = im.data.total - im.data.rf;
  if (sum === 0) return 0;
  const stockPrice = priceMatch(stock);
  if (!stockPrice) return 0;
  const per = (stockPrice / sum) * 100;
  return per;
}




  const dataWithRandomPercentages = useMemo(() => {



    return plusData.map(stock => ({
      ...stock,
      price : priceMatch(stock),
      percentage: PercentageManch(stock),
    }));
  }, [plusData]);

  useEffect(() => {
    console.log("dataWithRandomPercentages : ", dataWithRandomPercentages);
  }, [dataWithRandomPercentages]);

  const dataForBarChart = {
    labels: dataWithRandomPercentages.map(stock => stock.name),
    datasets: [
      {
        label: '주식 비율',
        data: dataWithRandomPercentages.map(stock => stock.percentage),
        backgroundColor: '#4169E1',
        borderColor: '#4169E1',
        borderWidth: 2,
      },
    ],
  };

  const rfPercentage = () => {
    const per = im.data.rf/myCost*100;
    console.log("rfPercentage : ", per);
    return per;
  }
  const nonRfPercentage = () => {
    const per = (myCost-im.data.rf)/myCost*100;
    console.log("nonRfPercentage : ", per);
    return per;
  }

  useEffect(() => {
    nonRfPercentage();
    rfPercentage();
  }, []);
  


  const dataForPieChart = {
    labels: ['주식', '채권'],
    datasets: [
      {
        data: [nonRfPercentage(), rfPercentage()],
        backgroundColor: ['#4169E1', '#6495ED'],
        hoverBackgroundColor: ['#4169E1', '#6495ED'],
      },
    ],
  };

  const optionsForPieChart = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
  };

  const optionsForBarChart = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#fff',
          font: {
            size: 15,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#fff',
          font: {
            size: 15,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      
    },
  };
  

  const generateStockPriceData = (stock) => {
    // stockGData에서 주식 데이터 가져오기
    const stockData = stockGData[stock.name];  // stock.name이 'LG에너지솔루션'이면 stockGData['LG에너지솔루션']
  
    // stockData가 없으면 오류 처리
    if (!stockData) {
      console.error(`주식 데이터를 찾을 수 없습니다: ${stock.name}`);
      return {
        labels: [],
        datasets: [],
        startYear: null,
        endYear: null,
      };
    }
  
    // stockData.GData에서 high 가격을 기준으로 날짜별 데이터 추출
    const stockGraph = stockData.GData;
  
    // 날짜와 high 가격을 기반으로 월별 데이터 생성
    const labels = stockGraph.map((data) => {
      const date = new Date(data.date);
      return `${date.getMonth() + 1}월`; // 월(1~12)을 기준으로 레이블 생성
    });
  
    const prices = stockGraph.map((data) => data.high);  // 각 월의 'high' 가격을 데이터로 사용
  
    // 첫 번째 데이터와 마지막 데이터에서 연도 추출
    const startYear = new Date(stockGraph[0].date).getFullYear();
    const endYear = new Date(stockGraph[stockGraph.length - 1].date).getFullYear();
  
    console.log("stockGraph : ", stockGraph);
  
    return {
      labels,  // 월별 레이블
      datasets: [
        {
          label: `${stock.name} 주식 가격`,
          data: prices,  // 'high' 가격 데이터
          fill: false,
          borderColor: '#4169E1',
          backgroundColor: '#4169E1',
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
      startYear,  // 시작 년도
      endYear,    // 끝 년도
    };
  };
  

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
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
    },
  };

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const stockName = dataForBarChart.labels[index];
      const selected = dataWithRandomPercentages.find(stock => stock.name === stockName);
      console.log('stockGData : ', stockGData);
      setSelectedStock(selected);
    } else {
      setSelectedStock(null);
    }
  };

  const costMatch = (stock) => {
    const formattedPrice = stock.price.toLocaleString(); 
    return formattedPrice;
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-container">
        <div className="pie-chart">
          <h3 className="chart-title">자산 비율</h3>
          <Pie data={dataForPieChart} options={optionsForPieChart} />
        </div>
        <div className="bar-chart">
          <h3 className="chart-title">선택된 주식 비율</h3>
          <Bar 
            data={dataForBarChart} 
            options={{
              ...optionsForBarChart,
              onClick: handleBarClick
            }} 
          />
        </div>
        <div className="tables">
          <div className="investment-ratio-table">
            <h3 className="chart-title">자산 비율 표</h3>
            <table>
              <thead>
                <tr>
                  <th>자산 종류</th>
                  <th>비율</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>주식</td>
                  <td>{nonRfPercentage()}%</td>
                </tr>
                <tr>
                  <td>채권</td>
                  <td>{rfPercentage()}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="stock-table">
            <h3 className="chart-title">주식 비율</h3>
            <table>
              <thead>
                <tr>
                  <th>주식명</th>
                  <th>금액</th>
                  <th>비율</th>
                </tr>
              </thead>
              <tbody>
                {dataWithRandomPercentages.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{costMatch(stock)}원</td>
                    <td>{stock.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedStock && (
        <div className="stock-price-chart">
          <h3 className="chart-title">{selectedStock.name} 주가 그래프</h3>
          <Line data={generateStockPriceData(selectedStock)} options={lineChartOptions} />
        </div>
      )}
    </div>
  );
};

export default PortfolioChart;
