import React, { useState, useEffect } from 'react';
import './css/dashboard.css';

const Dashboard = ({
  portfolioValue = 0,
  todaysProfitLoss = { value: 0, percentage: 0 },
  allTimeProfitLoss = { value: 0, percentage: 0 },
  stocks = []
}) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY');
        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="logo">Stock Dashboard</div>
      <div className="navbar">
        <a href="#home">Home</a>
        <a href="#transactions">Transactions</a>
        <a href="#latest-news">Latest News</a>
      </div>
      <div className="main-content">
        <div className="metrics">
          <div className="metric-box portfolio-value">
            <h1>Portfolio Value</h1>
            <p>${portfolioValue.toFixed(2)}</p>
          </div>
          <div className="metric-box profit-loss">
            <h2>Today's Profit/Loss</h2>
            <p>{todaysProfitLoss.value >= 0 ? '+' : ''}${todaysProfitLoss.value.toFixed(2)}</p>
            <p>({todaysProfitLoss.percentage.toFixed(2)}%)</p>
          </div>
          <div className="metric-box profit-loss">
            <h2>All-Time Profit/Loss</h2>
            <p>{allTimeProfitLoss.value >= 0 ? '+' : ''}${allTimeProfitLoss.value.toFixed(2)}</p>
            <p>({allTimeProfitLoss.percentage.toFixed(2)}%)</p>
          </div>
        </div>
        <div className="stocks-table">
          <h2>Portfolio Stocks</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price Bought</th>
                <th>Current Price</th>
                <th>Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.quantity}</td>
                  <td>${stock.priceBought.toFixed(2)}</td>
                  <td>${stock.currentPrice.toFixed(2)}</td>
                  <td>{stock.profitLoss >= 0 ? '+' : ''}${stock.profitLoss.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
