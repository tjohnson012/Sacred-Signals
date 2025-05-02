# NFT SEARCH TOOL


## HOW TO USE THE BLOCKSPAN API TO SEARCH FOR NFTS BY NAME

Blockspan is a leading provider of NFT API services, enabling developers to easily interact with the world of non-fungible tokens (NFTs). NFTs represent ownership of a unique item or piece of content on the blockchain. An NFT search tool will help you find NFTs that contain a particular string in them


## REQUIREMENTS:
- Node.js and npm installed on your system.
- Basic knowledge of React.js
- Blockspan API key


## STEP 1: SET UP YOU REACT APPLICATION

First, you'll need to set up your React application. If you already have a React application set up, you can skip this step.

`npx create-react-app nft-search-tool` 
`cd nft-search-tool`

This will create a new React application named `nft-search-tool` and navigate into the new directory.


## STEP 2: INSTALL AXIOS

We'll be using Axios to send HTTP requests to the Blockspan API. Install it with the following command:

`npm install axios`


## STEP 3: CREATE YOUR REACT COMPONENT

Next, you'll need to create a React component that uses the Blockspan API to fetch portfolio data. Create a new file in the `src` directory called `NFTSearch.js` and include the following code:

```
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const NFTSearch = () => {
  const [blockchain, setBlockchain] = useState('eth-main');
  const [nfts, setNfts] = useState(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('token_name')
  const [loading, setLoading] = useState(false)

  const fetchNFTs = async () => {
    setLoading(true)
    const options = {
      method: 'GET',
      url: `https://api.blockspan.com/v1/nfts/search?chain=${blockchain}&q=${query}&filter=${filter}`,
      headers: { accept: 'application/json', 'X-API-KEY': 'YOUR_BLOCKSPAN_API_KEY' },
    };

    try {
      const response = await axios.request(options);
      console.log(response)
      setNfts(response.data.results);
      setError(null);
      setLoading(false)
    } catch (error) {
      setNfts(null);
      if (query === '') {
        setError('Query must be non empty string!')
      } else {
        setError('No NFTs found!');
      }
      setLoading(false)
    }
  };

  const handleBlockchainChange = (event) => {
    setBlockchain(event.target.value);
  };

  const checkData = (data) => (data ? data : 'N/A');

  return (
    <div>
      <h1 className="title">NFT Search Tool</h1>
      <p className="message">
        Select a chain, select a filter and type a query string to search for NFTs with that string.
      </p>
      <div className="inputContainer">
        <select name="blockchain" value={blockchain} onChange={handleBlockchainChange}>
          <option value="eth-main">eth-main</option>
          <option value="arbitrum-main">arbitrum-main</option>
          <option value="optimism-main">optimism-main</option>
          <option value="poly-main">poly-main</option>
          <option value="bsc-main">bsc-main</option>
          <option value="eth-goerli">eth-goerli</option>
        </select>
        <select name="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="token_name">Token Name</option>
          <option value="token_description">Token Description</option>
          <option value="token_attributes">Token Attributes</option>
          <option value="all">All</option>
        </select>
        <input type="text" placeholder="Query String" onChange={(e) => setQuery(e.target.value)} />
        <button onClick={fetchNFTs}>Search</button>
      </div>
      {loading && (
        <p className='message'>Loading ...</p>
      )}
      {!loading && (
        error ? (
          <p className="errorMessage">{error}</p>
        ) : (
          nfts && (
            <table>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th>No.</th>
                  <th>Contract Address</th>
                  <th>Example Token Description</th>
                  <th>Example Token ID</th>
                  <th>Example Token Name</th>
                  <th>Token Type</th>
                </tr>
              </thead>
              <tbody>
                {nfts.map((nft, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                    <td>{index+1}</td>
                    <td>{checkData(nft.contract_address)}</td>
                    <td>{checkData(nft.example_token_description)}</td>
                    <td>{checkData(nft.example_token_id)}</td>
                    <td>{checkData(nft.example_token_name)}</td>
                    <td>{checkData(nft.token_type)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )
      )}
    </div>
  );
};

export default NFTSearch;

```

Remember to replace `YOUR_BLOCKSPAN_API_KEY` with your actual Blockspan API key.


## STEP 4: UPDATING THE STYLES WITHIN CSS FILE

To enhance the user interface in the browser, replace all code in the App.css file with the following:

```
.App {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: auto;
}

.title {
  margin-top: 20px;
  margin-bottom: 0;
  text-align: center;
}

.errorMessage {
  text-align: center;
  color: red;
  font-weight: bold;
}

.message {
  text-align: center;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputContainer {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.inputContainer input {
  padding: 10px;
  font-size: 1em;
  width: 200px;
}

.inputContainer button {
  padding: 10px;
  font-size: 1em;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}

.inputContainer button:hover {
  background-color: #0056b3;
}

.imageContainer {
  display: flex;
  justify-content: center;
  width: 100%; 
}

.imageContainer img {
  width: 100%; 
  max-width: 100px;
  height: auto; 
}
.nftData {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.nftData .image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nftData h2 {
  margin: 10px 0;
}

.nftData p {
  font-size: 1.2em;
  font-weight: bold;
}

td {
  padding: 10px;
  text-align: left;
}

th {
  padding: 10px;
  text-align: left;
}

.tableContainer {
  display: flex;
  justify-content: center;
}


th:nth-child(1),
td:nth-child(1) {
  width: 15px;
}

th:nth-child(2),
td:nth-child(2) {
  width: 50px;
}

th:nth-child(3),
td:nth-child(3) {
  width: 150px;
}

th:nth-child(4),
td:nth-child(4) {
  width: 50px;
}

th:nth-child(5),
td:nth-child(5) {
  width: 100px;
}

th:nth-child(6),
td:nth-child(6) {
  width: 100px;
}

```


## STEP 5: INTEGRATING COMPONENTS IN THE APP

Finally, let's use the `NFTSearch` component in our main `App` component.

Open App.js and modify it as follows:

```
import React from 'react';
import NFTSearch from './NFTSearch.js';

function App() {

  return (
    <div className="App">
      <NFTSearch/>
    </div>
  );
}

export default App;
```

Now, start the app with the following command:

`npm start`

You should now see the following:

- A drop down menu to select a blockchain and a filter
- A text box for query string
- A search button

Input the query string you wish to see NFTs for, and click the search button. You should then see a table with multiple NFTs with that string in the target property. 

That's it! You've built an nft search tool using Blockspan API and ReactJS! This is a simple example, but with the power of Blockspan API, you can build even more comprehensive and interactive NFT explorers. Happy coding!
