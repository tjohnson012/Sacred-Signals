
# Sacred Signals

**Sacred Signals** is a handcrafted dashboard designed to explore Ethereum pricing trends and NFT market indicators in real-time. Unlike typical NFT search tools, this project was built from the ground up to emphasize data-driven storytelling, interactive charting, and a clean modern interface.

---

## What Makes This Project Unique

- **Live Crypto Market Data** — ETH price history pulled dynamically from CoinGecko
- **NFT Collection Metrics** — Floor price, volume, and supply using OpenSea’s API
- **Interactive Charting** — Built with Chart.js, styled for clarity and performance
- **CSV Export** — Download ETH pricing trends with a single click
- **Mocked Fallback Support** — View stats even without an active OpenSea key
- **Fire Emblem-Inspired Identity** — Subtle, abstract theming in name and tone
- **Modern UI Aesthetic** — Grid layout, smooth spacing, and a soft neon palette
- **Expandable Logic Architecture** — Separated API logic and component render logic (via `utils.js`)

---

## How to Run

```bash
npm install
npm start
```

> Make sure you have Node.js and npm installed. You can get them from [https://nodejs.org](https://nodejs.org).

---

## Using Your OpenSea API Key

1. Log into OpenSea
2. Request an API key under your Developer Settings
3. Replace the placeholder in `src/utils.js`:

```js
headers: {
  'X-API-KEY': 'your_api_key_here'
}
```

4. Change the collection slug if desired:

```js
fetchOpenSeaStats("doodles-official")
```

---

## Technologies Used

- React (functional components)
- Chart.js & react-chartjs-2
- CoinGecko API
- OpenSea API
- Custom CSS (no framework)

---

## Why This Project Exists

This app was created not as an assignment or tutorial project, but as a standalone showcase of:
- Applied systems thinking
- Macro-data integration
- Financial analytics styling
- React frontend architecture
- Personal creative vision

---

## 📂 File Structure

```
sacred-signals/
├── src/
│   ├── App.js          # main app layout
│   ├── utils.js        # API fetch + data export
│   ├── index.js
│   ├── App.css
├── public/
├── package.json
└── README.md
```

---

## 🤝 Contributing

This is a personal creative build and is open for pull requests.

---

## ⚡ Author Notes

This dashboard is a reflection of both technical design and thematic abstraction. It’s intended to be extended, adapted, or discussed — not simply run.

