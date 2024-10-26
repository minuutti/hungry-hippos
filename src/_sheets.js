const { google } = require('googleapis');

// Your Google Sheets API key
const apiKey = 'YOUR_API_KEY';
const spreadsheetId = 'YOUR_SPREADSHEET_ID';
const range = 'Sheet1!A1:D10'; // Specify the range of cells you want to fetch

async function fetchSheetData() {
  const sheets = google.sheets({ version: 'v4', auth: apiKey });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows.length) {
      console.log('Data fetched from Google Sheets:');
      rows.forEach(row => {
        console.log(row);
      });
    } else {
      console.log('No data found.');
    }
  } catch (err) {
    console.error('Error fetching data from Google Sheets:', err);
  }
}

fetchSheetData();
