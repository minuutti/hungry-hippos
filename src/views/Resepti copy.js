// src/views/Resepti.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SheetView = () => {
  const { sheetId } = useParams();
  const apiKey = 'AIzaSyC_mV1wuzRSe_2o_D4Mq5B9fWkTuUS9270';
  const defaultSpreadsheetId = '1c3weLl4mjZl9jLt-5VY3akNhkBfokAHt-JT0fXhOmGE';

  const [title, setTitle] = useState('');
  const [listOne, setListOne] = useState([]);
  const [listTwo, setListTwo] = useState([]);

  useEffect(() => {
    fetchSheetData();
  }, [sheetId]);

  const fetchSheetData = async () => {
    try {
      // Fetch the title from cell A1
      const titleRange = `${sheetId}!A1:A1`;
      const titleData = await fetchSheetRange(defaultSpreadsheetId, titleRange);
      if (titleData && titleData.values) {
        setTitle(titleData.values[0][0]);
      }

      // Fetch the data for list one from range B3:B30
      const listOneRange = `${sheetId}!B3:B30`;
      const listOneData = await fetchSheetRange(defaultSpreadsheetId, listOneRange);
      if (listOneData && listOneData.values) {
        setListOne(listOneData.values.map((item) => item[0])); // Flatten the array
      }

      // Fetch the data for list two from range C3:C30
      const listTwoRange = `${sheetId}!C3:C30`;
      const listTwoData = await fetchSheetRange(defaultSpreadsheetId, listTwoRange);
      if (listTwoData && listTwoData.values) {
        setListTwo(listTwoData.values.map((item) => item[0])); // Flatten the array
      }
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
    }
  };

  const fetchSheetRange = async (spreadsheetId, range) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Error fetching data:', response.status, response.statusText);
      return null;
    }
  };

  return (
    <div>
      <Link to="/reseptit/">Back to List</Link>
      <h1>{title}</h1>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        {/* First list (B3:B30) */}
        <div>
          <h2>Raaka-aineet</h2>
          <ul>
            {listOne.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Second list (C3:C30) */}
        <div>
          <h2>Valmistus</h2>
          <ul>
            {listTwo.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SheetView;
