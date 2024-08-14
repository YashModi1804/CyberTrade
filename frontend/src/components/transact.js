import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import Toastify from 'toastify-js';

const MARKETSTACK_API_KEY = 'ffd6aec9ae3e02bedc60e9057a7b5c15';  // Replace with your actual API key

const TransactionPage = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [isBuying, setIsBuying] = useState(true);

  // Fetch suggestions based on user input
  const getSuggestions = async (value) => {
    try {
      const response = await axios.get('https://api.marketstack.com/v1/tickers', {
        params: {
          access_key: MARKETSTACK_API_KEY,
          search: value,
          limit: 100,  // Adjust if needed
        },
      });

      // Filter NSE results and limit to top 5
      const results = response.data.data
        .filter(stock => stock.stock_exchange.acronym === 'NSE')
        .slice(0, 5);

      // If no results, add a "No results found" entry
      setSuggestions(results.length > 0 ? results : [{ symbol: '', name: 'No results found' }]);
    } catch (error) {
      console.error('Error fetching search results', error);
      setSuggestions([{ symbol: '', name: 'No results found' }]);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = async (event, { suggestion }) => {
    if (suggestion.name === 'No results found') {
      // Prevent action if "No results found" is selected
      return;
    }

    try {
      // Fetch real-time stock data if available
      const response = await axios.get(`https://api.marketstack.com/v1/tickers/${suggestion.symbol}/intraday/latest`, {
        params: {
          access_key: MARKETSTACK_API_KEY,
        },
      });

      const lastPrice = response.data.data && response.data.data.length > 0 ? response.data.data[0].last : 'N/A';
      
      setSelectedStock({
        symbol: suggestion.symbol,
        price: lastPrice,  // Get the latest price or set to 'N/A'
      });
      setQuery(suggestion.symbol);
    } catch (error) {
      console.error('Error fetching stock data', error);
    }
  };

  const handleTransaction = () => {
    if (!selectedStock) {
      Toastify({
        text: 'Please select a valid stock before proceeding',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#f44336',
      }).showToast();
      return;
    }
  
    // Implement transaction logic here
    Toastify({
      text: `Successfully ${isBuying ? 'bought' : 'sold'} ${quantity} of ${selectedStock.symbol} at target price of ${targetPrice}`,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: '#4caf50',
    }).showToast();
  
    // Reset form
    setQuery('');
    setSuggestions([]);
    setSelectedStock(null);
    setQuantity('');
    setTargetPrice('');
  };
  

  const renderSuggestion = (suggestion, { query }) => {
    const text = `${suggestion.symbol} - ${suggestion.name}`;
    return (
      <div className="suggestion-container">
        {text}
      </div>
    );
  };
  
  const inputProps = {
    placeholder: 'Search for a stock...',
    value: query,
    onChange: (e, { newValue }) => setQuery(newValue),
  };

  return (
    <div>
      <h1>Transaction Page</h1>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.symbol}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
      />
      {selectedStock && (
  <div>
    <h2>{selectedStock.symbol}</h2>
    <p>Current Price: {selectedStock.price}</p>
    <div>
      <button onClick={() => setIsBuying(true)}>Buy</button>
      <button onClick={() => setIsBuying(false)}>Sell</button>
    </div>
    <div>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <input
        type="number"
        value={targetPrice}
        onChange={(e) => setTargetPrice(e.target.value)}
        placeholder="Target Price"
      />
      <button onClick={handleTransaction}>
        {isBuying ? 'Buy' : 'Sell'}
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default TransactionPage;
