import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import Toastify from 'toastify-js';
import './css/transact.css';

const MARKETSTACK_API_KEY = 'b162e11d53f8907c6d4d68a6ac0083e3';  // Replace with your actual API key

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

  const renderSuggestion = (suggestion) => {
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
    <div className="transaction-container">
      <h2>Symbol</h2>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion.symbol}
        renderSuggestion={renderSuggestion}
        inputProps={{
          ...inputProps,
          className: "symbol-input",
        }}
        onSuggestionSelected={onSuggestionSelected}
      />

      <div className="form-row">
        <div className="form-group">
          <label>Action</label>
          <select
            className="form-control"
            onChange={(e) => setIsBuying(e.target.value === 'Buy')}
          >
            <option>Buy</option>
            <option>Sell</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <div className="quantity-group">
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button className="show-max-button">
              Show Max
            </button>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Order Type</label>
          <select className="form-control">
            <option>Market</option>
            <option>Limit</option>
          </select>
        </div>

        <div className="form-group">
          <label>Duration</label>
          <select className="form-control">
            <option>Day Only</option>
            <option>Good Till Cancelled</option>
          </select>
        </div>
      </div>

      <div className="button-group">
        <button className="clear-button" onClick={() => handleTransaction(false)}>CLEAR</button>
        <button className="preview-button" onClick={handleTransaction}>PREVIEW ORDER</button>
      </div>
    </div>
  );
};

export default TransactionPage;
