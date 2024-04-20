import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from './config/configFirebase';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [ipAddresses, setIpAddresses] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [averageTimeLength, setAverageTimeLength] = useState(null);
  const [error, setError] = useState(null);
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const db = getDatabase(app);
    const rootRef = ref(db);

    const intervalId = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);

    onValue(rootRef, (snapshot) => {
      try {
        const data = snapshot.val();
        setJsonData(data);

        const sessions = data?.sessions || {};
        let totalDuration = 0;
        let sessionCount = 0;

        // Calculate time length for each session and total duration
        Object.values(sessions).forEach(session => {
          if (session.sessionStart && session.sessionEnd) {
            const startTime = new Date(session.sessionStart);
            const endTime = new Date(session.sessionEnd);
            const timeLength = endTime - startTime;

            totalDuration += timeLength;
            sessionCount++;

            // Update session object with duration
            session.duration = timeLength;
          }

          if (session.ipAddress && !ipAddresses.includes(session.ipAddress)) {
            setIpAddresses(prevIpAddresses => [...prevIpAddresses, session.ipAddress]);

            // Fetch coordinates for new IP address
            getCoordinates(session.ipAddress)
              .then(coord => {
                setCoordinates(prevCoordinates => ({
                  ...prevCoordinates,
                  [session.ipAddress]: coord
                }));
              })
              .catch(error => {
                console.error("Error fetching coordinates:", error);
              });
          }
        });

        // Calculate average time length for all sessions
        const averageTime = sessionCount > 0 ? totalDuration / sessionCount : 0;
        setAverageTimeLength(averageTime);
        setTotalUsers(sessionCount);
      } catch (error) {
        console.error("Error calculating average time length:", error);
        setError(error.message || 'Failed to calculate average time length');
      }
    }, (error) => {
      console.error("Error fetching data:", error);
      setError(error.message || 'Failed to fetch data');
    });

    return () => clearInterval(intervalId);
  }, [ipAddresses]); // Added ipAddresses dependency to rerender when IP addresses change

  // Function to fetch coordinates for an IP address using IPinfo API
  const getCoordinates = async (ipAddress) => {
    try {
      const token = '8b3a7d7e2ddb26'; // Your IPinfo API token
      const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=${token}`);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      // Extract latitude and longitude information from the response
      const { loc } = data;
      const [latitude, longitude] = loc.split(',').map(parseFloat);
      return { latitude, longitude };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null; // Return null if coordinates couldn't be fetched
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ backgroundColor: '#d49d06', padding: '10px', textAlign: 'center' }}>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{dateTime}</p>
      </div>
      <h1>Firebase Dashboard</h1>
      <h2>Total Users: {totalUsers}</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h2>Map with IP Addresses</h2>
          <MapContainer style={{ height: "400px", margin: "0 auto" }} center={[0, 0]} zoom={2}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {ipAddresses.map((ip, index) => (
              coordinates[ip] && (
                <Marker
                  key={index}
                  position={[coordinates[ip].latitude, coordinates[ip].longitude]}
                >
                  <Popup>{ip}</Popup>
                </Marker>
              )
            ))}
          </MapContainer>
          <h2>Average Time Length for All Users</h2>
          <p>{averageTimeLength ? `${averageTimeLength} milliseconds` : 'N/A'}</p>
          <h2>Duration for Each User</h2>
          <div>
            {jsonData && Object.values(jsonData.sessions).map((session, index) => (
              <div key={index}>
                <p>{`User ${index + 1}: ${session.duration || 'N/A'} milliseconds`}</p>
              </div>
            ))}
          </div>
          <h2>Complete JSON Data</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
