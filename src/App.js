import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import logo from './logo.svg';
import './App.css'; 

const wallets = [
  'ExnVLJszScgqxZa44UTdTNeaG9PjXVjNvx6xYNUDTDYb',
  '78y7pfJ4eJ9N6aL8h7dvUcfYk3Gw8hDe9G93QQHmiSiz',
  'FkXo6pwD4LzC2obupejhQdp3jHfABG2tXLyhXkXRCaA',
  '83NKMWJDHhULbD9s9baeSrFikdQMiRxfci6WgprhCeQE',
  'BHZWfsJvFvif7qAWzkRtfR4Cny4ugXuaHDNht5S13F4T',
  'EEx9rjSNWMSdCpfeNKB3jCMkYe3cHvF6YZkCudNNLzXd',
  'ChDvn2ckvmXE5CYQAGu5gh2UrK3q2QtzxpDBPajZhzBT',
];

function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const connection = new Connection('wss://api.mainnet-beta.solana.com');

    wallets.forEach((wallet) => {
      const pubkey = new PublicKey(wallet);
      connection.onAccountChange(pubkey, (info, ctx) => {
        setLogs((prev) => [
          {
            wallet,
            time: new Date().toLocaleTimeString(),
            slot: ctx.slot,
          },
          ...prev,
        ]);
      });
    });
  }, []);
  return (
    <div style={{ padding: 20 }}>
    <h2>🔔 Solana Wallet Notifier</h2>
    <p>Tracking {wallets.length} wallets in real-time</p>
    <ul>
      {logs.map((log, index) => (
        <li key={index}>
          ✅ Tx on <strong>{log.wallet.slice(0, 6)}...</strong> at {log.time} (slot {log.slot})
        </li>
      ))}
    </ul>
  </div>
  );
}

export default App;
