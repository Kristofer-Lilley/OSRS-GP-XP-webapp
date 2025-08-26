import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import itemIdList from './ItemID.json';



function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemIds, setItemIds] = useState(itemIdList);
  const customUserAgent = 'OSRS-GP-XP-Webapp/0.1, Discord: Shirt9276, Training calculator for Old School RuneScape';

  function handleItemIDChange() {
    const sortedEntries = Object.entries(itemIds).sort((a, b) => a[1] - b[1]);
    const swappedEntries = sortedEntries.map(([key, value]) => [value, key]);
    const sortedJsonObject = Object.fromEntries(swappedEntries);
    setItemIds(sortedJsonObject);
    console.log(sortedJsonObject)
  }



  useEffect(() => {
    const fetchData = () => {
      axios.get('prices.runescape.wiki/api/v1/osrs/latest', 
        {
          headers: {
            'User-Agent': customUserAgent
            }
        }
      )
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
    };
    handleItemIDChange();
    fetchData();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    } else {
    return (
      <div className="App">
        {Object.entries(itemIds).map(([key, val]) => (
          <p key={key}>
          {val}
        </p>
      ))}
      </div>
      );
    }
}

export default App;
