import { useState, useEffect } from "react";
import { AptosClient } from "../Utils/AptosClient";

const AptosWallet = ({ onWalletConnect }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.martian) {
      try { 
        const account = await window.martian.connect();
        setWalletAddress(account.address);
        onWalletConnect(account.address);
      } catch (error) {
        console.error("Wallet Connection Failed:", error);
      }
    } else {
      alert("Martian Wallet not found! Install it from Chrome Store.");
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h3 className="text-lg font-bold">Aptos Wallet</h3>
      {walletAddress ? (
        <p className="text-green-600">Connected: {walletAddress}</p>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
          onClick={checkWalletConnection}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default AptosWallet;