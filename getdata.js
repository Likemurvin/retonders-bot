const https = require('https');

// RETONDERS: EQDozSelAkli4bhpG_3SPi7RLLT_cxGYjbKsTVTCKv4zHzCg
// REKWIZIT: EQBPJCOTvf7_mm8QfHmdm8nhxOMjJZxQlm9r3MGCJsWxL1GW

function getWalletInformation(wallet, collection_adr) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'toncenter.com',
    //   path: '/api/v3/walletInformation?address='+wallet+'&use_v2=false',
      path: '/api/v3/nft/items?owner_address='+wallet+'&collection_address=' + collection_adr + '&limit=10&offset=0',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    };
    const req = https.request(options, (res) => {
      let data = '';

      // Collect the response chunks
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Process the complete response
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData); // Resolve the promise with the parsed data
        } catch (error) {
          reject(error); // Handle JSON parsing errors
        }
      });
    });

    // Handle errors
    req.on('error', (error) => {
      reject(error); // Reject the promise with the error
    });

    req.end();
  });
}

// get_data = ''
// Example usage
// getWalletInformation()
//   .then(data => {
//     const walletInfo = data; // Store the data in a variable
//     console.log('Wallet Information:', walletInfo);
//   })
//   .catch(error => console.error('Error:', error.message));


module.exports = { getWalletInformation }