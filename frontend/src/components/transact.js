import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import Toastify from 'toastify-js';

const ALPHA_VANTAGE_API_KEY = 'TMLYFP0EL1FSYKSZ';  // Replace with your actual API key

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
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: value,
          apikey: ALPHA_VANTAGE_API_KEY,
        },
      });

      const results = response.data.bestMatches || [];
      // If no results, add a "No results found" entry
      setSuggestions(results.length > 0 ? results : [{ '1. symbol': '', '2. name': 'No results found' }]);
    } catch (error) {
      console.error('Error fetching search results', error);
      setSuggestions([{ '1. symbol': '', '2. name': 'No results found' }]);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = async (event, { suggestion }) => {
    if (suggestion['2. name'] === 'No results found') {
      // Prevent action if "No results found" is selected
      return;
    }

    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: suggestion['1. symbol'],
          apikey: ALPHA_VANTAGE_API_KEY,
        },
      });

      setSelectedStock({
        symbol: suggestion['1. symbol'],
        price: response.data['Global Quote']['05. price'],
      });
      setQuery(suggestion['1. symbol']);
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

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion['1. symbol'] || ''} - {suggestion['2. name']}
    </div>
  );

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
        getSuggestionValue={(suggestion) => suggestion['1. symbol']}
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
