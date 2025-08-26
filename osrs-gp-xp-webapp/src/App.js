import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const customUserAgent = 'OSRS-GP-XP-Webapp/0.1, Discord: Shirt9276, Training calculator for Old School RuneScape';

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
    }}, []);

    if (loading) {
      return <div>Loading...</div>;
    } else {
    return (
      <div className="App">
        {
          data.map((data) => (
            <div key={data.id}>
              <h2>{data.name}</h2>
              <p>Price: {data.price}</p>
            </div>
          ))
        }
      </div>
      );
    }
}

export default App;
