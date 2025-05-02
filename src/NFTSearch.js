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
