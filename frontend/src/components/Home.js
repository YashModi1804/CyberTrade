import React, { useState, useEffect } from 'react';
import './css/home.css'

export default function Home(){
  let stockPrice;
  const Nifty50StockBox = () => {
    // State to store the current stock price
    const [stockPrice, setStockPrice] = useState(null);
  
    // Fetch Nifty 50 stock price from an API
    useEffect(() => {
      // Dummy API endpoint for demonstration purposes
      const fetchStockPrice = async () => {
        try {
          const response = await fetch('https://api.example.com/nifty50/stockprice');
          const data = await response.json();
          setStockPrice(data.price);
        } catch (error) {
          console.error('Error fetching stock price:', error);
        }
      };
  
      fetchStockPrice();
    }, []);
  }

    return(
      <div className='container-home'>
        <div class="animated-title">
        <div class="text-top">
          <div>
            <span className='text-top-1'>Investing</span>
            <span>Made Simple.</span>
          </div>
        </div>
        <div class="text-bottom">
          <div>For You!!</div>
        </div>
      </div>
    <div className='container-nifty'>
      <div className='title'>
        <h3>Nifty 50 Stock Price</h3>
        <p>{stockPrice ? `₹ ${stockPrice}` : 'Loading...'}</p>
      </div>
      <div className='nifty-graph'>
        {/* Placeholder for the stock price graph */}
        <h3>Stock Price Graph (5 Years)</h3>
        <div className='placeholder'></div>
      </div>
    </div>


      </div>
    )

  }
