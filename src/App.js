import './App.css';
import React, { useEffect, useState } from 'react';
import { connectWallet, getCampaignsCount, pedgeAmount } from './utils/CrowdfundInteract';
import { mint, getTotalSupply, subscribeToTransfer, balanceOf } from './utils/ERC20Interact';
import axios from 'axios';

function App() {

  const [wallet, setWallet] = useState("");
  const [count, setCount] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);
  const [myBalance, setMyBalance] = useState("");
  const [campaigns, setCampaigns] = useState([])

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
    setWallet(res[0]);
  }

  const mintClicked = async () => {
    await mint(wallet, 10000);
    const supply = await getTotalSupply();
    console.log('supply', supply);
    setTotalSupply(supply);
  }

  const getBalanceOf = async () => {
    await balanceOf("0x84A470313091D4d24A21B8411A73FCc4f134817e");
  }

  const getMyBalance = async () => {
    console.log('wallet',wallet);
    if (wallet !== '') {
      const bal = await balanceOf(wallet);
      console.log('bal', bal);
      setMyBalance(bal);

    } else {
      setMyBalance("1");
  } 
  }

  const getCampaigns = async () => {
      await axios
         .get("http://localhost:8080/all-blog")
         .then((res) => setCampaigns(res.data))
         .catch(err => console.log(err));
   
  }

  console.log(campaigns);
  useEffect(() => {
  ( async () => {
    await connectWalletPressed();
    addWalletListener();
    const supply = await getTotalSupply();
    setTotalSupply(supply);
    subscribeToTransfer();
    await getMyBalance();

  }
  )();
}, [wallet]);

  return (
    <div className="App">
      <h1 onClick={connectWalletPressed}>{wallet ? wallet : 'Connect'}</h1>
      <h1>My balance: {myBalance}</h1>
      <h1 onClick={getCount}>Get Count: {count}</h1>
      <h1 onClick={mintClicked}>Mint</h1>
      <h1>Total Supply: {totalSupply}</h1>
      <h1 onClick={getBalanceOf}>Balance of</h1>
      <h1 onClick={getCampaigns}>Get Campaigns</h1>
    </div>
  );
}

export default App;
