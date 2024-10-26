// src/views/Reseptit.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GoogleSheets = () => {
  const [sheetData, setSheetData] = useState([]);
  const apiKey = 'AIzaSyC_mV1wuzRSe_2o_D4Mq5B9fWkTuUS9270';
  const defaultSpreadsheetId = '1c3weLl4mjZl9jLt-5VY3akNhkBfokAHt-JT0fXhOmGE';
  const defaultRange = 'KaikkiReseptit!A1:D20';

  useEffect(() => {
    fetchSheetData(defaultSpreadsheetId, defaultRange);
  }, []);

  const fetchSheetData = async (spreadsheetId, range) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSheetData(data.values); // Store the fetched data in the state
      } else {
        console.error('Error fetching data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
    }
  };

  return (
    <div>
      <h1>Feed the Hippos</h1>
      {sheetData.length > 0 ? (
        <table>
          <thead>
            <tr>
              {sheetData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheetData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {/* Link to the new sheet view */}
                    {cellIndex === 0 ? (
                      <Link to={`/resepti/${cell}`}>
                        {cell}
                      </Link>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default GoogleSheets;
