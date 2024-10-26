// src/views/Reseptit.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Reseptit = () => {
  const apiKey = 'AIzaSyC_mV1wuzRSe_2o_D4Mq5B9fWkTuUS9270';
  const spreadsheetId = '1c3weLl4mjZl9jLt-5VY3akNhkBfokAHt-JT0fXhOmGE';
  const defaultRange = 'KaikkiReseptit!A1:D20';

  const [data, setData] = useState([]);
  const [images, setImages] = useState({});
  const [randomItems, setRandomItems] = useState(null); // State to store randomly selected items

  useEffect(() => {
    fetchSheetData();
  }, []);

  // Fetch the main sheet data
  const fetchSheetData = async () => {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${defaultRange}?key=${apiKey}`;
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        const fetchedData = result.values.slice(1); // Skip the header row
        setData(fetchedData);
        fetchedData.forEach(row => {
          fetchImageForSheet(row[0]); // Fetch image for each sheet based on the sheet ID in column A
        });
      } else {
        console.error('Error fetching data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch the image for each individual sheet
  const fetchImageForSheet = async (sheetId) => {
    try {
      const imageRange = `${sheetId}!B1`; // Image URL location in each individual sheet
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${imageRange}?key=${apiKey}`;
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setImages(prevImages => ({
          ...prevImages,
          [sheetId]: result.values ? result.values[0][0] : '', // Store the image URL for this sheetId
        }));
      } else {
        console.error(`Error fetching image for sheet ${sheetId}:`, response.status, response.statusText);
      }
    } catch (error) {
      console.error(`Error fetching image for sheet ${sheetId}:`, error);
    }
  };

  // Function to show two random items from the list
  const showTwoRandomItems = () => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setRandomItems(shuffled.slice(0, 2)); // Show two random items
  };

  // Function to show all items again
  const showAllItems = () => {
    setRandomItems(null); // Reset to show all items
  };

  // Render the list (either all items or the two random items)
  const renderList = (items) => (
    <ul>
      {items.map((row, index) => (
        <li key={index}>
          <Link to={`/resepti/${row[0]}`}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ddd', margin: '5px 0' }}>
              {images[row[0]] && (
                <img
                  src={images[row[0]]}
                  alt={`Image for ${row[1]}`}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
                />
              )}
              <div>
                <h3>{row[1]}</h3> {/* Value from column B */}
                <p>{row[2]}</p> {/* Value from column C */}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <h1>Reseptit List</h1>
      <button onClick={showTwoRandomItems} style={{ marginBottom: '10px' }}>
        Show Two Random Items
      </button>
      <button onClick={showAllItems} style={{ marginLeft: '10px', marginBottom: '10px' }}>
        Show All Items
      </button>
      {/* Render the random items if available, otherwise render all items */}
      {randomItems ? renderList(randomItems) : renderList(data)}
    </div>
  );
};

export default Reseptit;
