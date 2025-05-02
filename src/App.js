
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { fetchOpenSeaStats, exportToCSV } from "./utils";
import "./App.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const fetchEthMarketData = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30"
    );
    const data = await response.json();
    return data.prices.map((p) => ({
      time: new Date(p[0]).toLocaleDateString(),
      price: p[1],
    }));
  } catch (error) {
    console.error("Error fetching CoinGecko data:", error);
    return [];
  }
};

function App() {
  const [ethData, setEthData] = useState([]);
  const [nftStats, setNftStats] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const prices = await fetchEthMarketData();
      setEthData(prices);

      const stats = await fetchOpenSeaStats("doodles-official");
      setNftStats(stats);
    };
    loadData();
  }, []);

  const chartData = {
    labels: ethData.map((d) => d.time),
    datasets: [
      {
        label: "ETH Price (USD)",
        data: ethData.map((d) => d.price),
        borderColor: "#e056fd",
        backgroundColor: "rgba(224, 86, 253, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Ethereum 30-Day Price Trend" },
    },
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#1e1e2f', color: '#f5f5f5', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Sacred Signals</h1>
        <p style={{ fontSize: '1.1rem', color: '#ccc' }}>Data-led insights on digital asset momentum</p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ background: '#2c2c3d', padding: '1.5rem', borderRadius: '1rem' }}>
          <h2 style={{ color: '#ff79c6', marginBottom: '1rem' }}>ETH Market Activity</h2>
          <Line data={chartData} options={chartOptions} />
          <button
            onClick={() => exportToCSV(ethData)}
            style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1rem',
              background: '#ff79c6',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Export Data
          </button>
        </div>

        <div style={{ background: '#2c2c3d', padding: '1.5rem', borderRadius: '1rem' }}>
          <h2 style={{ color: '#8be9fd' }}>NFT Asset Overview</h2>
          {nftStats ? (
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              <li><strong>Floor Price:</strong> {nftStats.floor_price} ETH</li>
              <li><strong>Total Volume:</strong> {nftStats.total_volume} ETH</li>
              <li><strong>Total Items:</strong> {nftStats.count}</li>
            </ul>
          ) : (
            <p>Loading...</p>
          )}
          <p style={{ marginTop: '1.5rem', color: '#aaa' }}>
            Trends suggest that rising ETH price often precedes NFT market gains.
          </p>
        </div>
      </main>

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#666' }}>
        <p>Built with logic, styled with intent.</p>
      </footer>
    </div>
  );
}

export default App;
