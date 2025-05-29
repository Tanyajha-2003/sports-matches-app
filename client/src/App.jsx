import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5050/api/matches")
      .then(res => {
        setMatches(res.data.slice(0, 10));
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch match data');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Upcoming Soccer Matches</h1>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        matches.map((match, index) => (
          <div key={index} className="match-card">
            <h3>⚽ {match.title}</h3>

            <p>
              <strong>Date:</strong> {new Date(match.date).toLocaleDateString()}<br />
              <strong>Time:</strong> {new Date(match.date).toLocaleTimeString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
