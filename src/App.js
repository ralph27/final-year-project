import './App.css';
import React, { useEffect, useState } from 'react';
import { connectWallet, getCampaignsCount } from './utils/interact';

function App() {

  const [wallet, setWallet] = useState("");
  const [count, setCount] = useState(1);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  }

  const getCount = async () => {
    const res = await getCampaignsCount();
    console.log('res', res);
    setCount(res);
  }

  const connectWalletPressed = async () => {
    const res = await connectWallet();
    console.log(res);
  }

  useEffect(() => {
    addWalletListener();
  }, []);

  return (
    <div className="App">
      <h1 onClick={connectWalletPressed}>{wallet ? wallet : 'Connect'}</h1>
      <h1 onClick={getCount}>Get Count: {count}</h1>
    </div>
  );
}

export default App;
