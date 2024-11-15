import React, { useState, useMemo } from 'react';
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

const PortfolioChart = ({ myCost, riskLevel, plusData }) => {
  const [selectedStock, setSelectedStock] = useState(null);

  const generateRandomPercentage = () => Math.floor(Math.random() * 100) + 1;

  // 주식 데이터와 랜덤 비율을 한 번만 생성
  const dataWithRandomPercentages = useMemo(() => {
    return plusData.map(stock => ({
      ...stock,
      price : generateRandomPercentage(),
      percentage: generateRandomPercentage(),
    }));
  }, [plusData]);

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

  const dataForPieChart = {
    labels: ['주식', '채권'],
    datasets: [
      {
        data: [70, 30],
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
      title: {
        display: true,
        text: '선택된 주식 비율',
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  const generateStockPriceData = (stock) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: `${stock.name} 주식 가격`,
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 100),
        fill: false,
        borderColor: '#4169E1',
        backgroundColor: '#4169E1',
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  });

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
      setSelectedStock(selected);
    } else {
      setSelectedStock(null);
    }
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
                  <td>70%</td>
                </tr>
                <tr>
                  <td>채권</td>
                  <td>30%</td>
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
                    <td>{stock.price}%</td>
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
