import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NiftyChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Check if data is already cached
      const cachedData = localStorage.getItem('stockData');
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        // Fetch data from the API
        const response = await axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'TIME_SERIES_DAILY_ADJUSTED',
            symbol: 'RELIANCE.BSE',
            outputsize: 'full', // Limit data to the most recent 100 data points
            apikey: 'demo'  // Replace with your actual API key
          }
        });

        const timeSeries = response.data['Time Series (Daily)'];
        if (!timeSeries) {
          throw new Error('Data not found');
        }

        // Process data
        const parsedData = Object.keys(timeSeries).map(date => ({
          date,
          open: parseFloat(timeSeries[date]['1. open'])
        })).reverse();

        // Cache the data
        localStorage.setItem('stockData', JSON.stringify(parsedData));
        setData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="open" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NiftyChart;
