const https = require('https');

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      // Collect the data chunks
      res.on('data', (chunk) => {
        data += chunk;
      });

      // On response end, parse and resolve
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data); // Parse the JSON
          resolve(jsonData); // Resolve the promise with the parsed data
        } catch (error) {
          reject(error); // Handle JSON parsing errors
        }
      });
    }).on('error', (err) => {
      reject(err); // Reject the promise on request errors
    });
  });
}

// Usage example
// const url = 'https://s.getgems.io/nft/c/665e159af36b2ac24a85be74/32/meta.json';

// fetchData(url)
//   .then(data => {
//     console.log('Fetched Data:', data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error.message);
//   });

module.exports = { fetchData }