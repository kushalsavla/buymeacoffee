import React, { useRef, useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/contractAddress";

//basic eth config
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const buyMeACoffeeContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return buyMeACoffeeContract;
};

//input configuration
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 rounded-sm p-2 outline-none text-black border tex-sm white-glassmorphism input-class"
  />
);

// const transactions = () => {

// }

const Transactions = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const form_hidden = document.getElementsByClassName("form");
  const hiddenRef = useRef();
  const buyAMeCoffeeContract = getEthereumContract();
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
        hiddenRef.current.classList.remove("hidden");
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  //Connect wallet function
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please Install MetaMask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No Ethereum Object");
    }
    isWalletConnected();
  };

  //handle change script
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  // console.log(buyMeCoffeeContract);

  //Buy Coffee Transaction
  const buyACoffee = async (coffee) => {
    try {
      if (!ethereum) return alert("Please Install MetaMask");
      if (buyAMeCoffeeContract) {
        let deposit;
        if (coffee) {
          // true
          deposit = ethers.utils.parseEther("0.001");
        } else {
          // false
          deposit = ethers.utils.parseEther("0.01");
        }
        const txn = await buyAMeCoffeeContract.buyCoffee(name, message, {
          value: deposit,
          gasLimit: 900000,
        });
        setLoading(true);
        await txn.wait();
        setLoading(false);
        setSuccess(true);
      } else {
        setSuccess(false);
        setLoading(false);
        alert("Oops! Something went wrong. Please refresh & try again.");
      }
    } catch (error) {
      setSuccess(false);
      setLoading(false);
      alert("Oops! Something went wrong. Please refresh & try again.");
    }
  };

  console.log(contractAddress);

  return (
    <div className="box flex-1 white-glassmorphism mx-15 py-5 px-10  justify-end items-end">
      <div className="justify-center title">
        <h2 className="text-1xl text-black py-1 prj-title">Buy Me A Coffee</h2>
      </div>
      <div className="justify-center subtitle">
        <h2 className="text-1xl text-black py-1 prj-name">
          Help me in my blockchain journey with a cofee☕
        </h2>
      </div>
      <br></br>
      {!currentAccount && (
        <button
          type="button"
          onClick={connectWallet}
          id="button-connect"
          className="ml-20 wallet-color py-2 px-7 rounded-full cursor-pointer hover:bg-[#fffedc] hover:text-red-800"
        >
          <p className="text-white text-base font-semibold ">Connect Wallet</p>
        </button>
      )}
      <form onSubmit={handleChange} className="hidden form" ref={hiddenRef}>
        <Input
          placeholder="Name"
          name="name"
          type="text"
          handleChange={handleChange}
          className="input-class"
        />
        <Input
          placeholder="Message"
          name="message"
          type="text"
          handleChange={handleChange}
          className="input-class"
        />
        <button
          type="submit"
          onClick={() => buyACoffee(true)}
          className="submit-files"
        >
          Small Coffee
        </button>
        <button
          type="submit"
          onClick={() => buyACoffee(false)}
          className="submit-files"
        >
          Large Coffee
        </button>
      </form>
    </div>
  );
};

export default Transactions;

const buyACoffee = async (coffee) => {
  try {
    if (!ethereum) return alert("Please Install MetaMask");
    const buyAMeCoffeeContract = getEthereumContract();
    if (buyAMeCoffeeContract) {
      let deposit;
      if (coffee) {
        // true
        deposit = ethers.utils.parseEther("0.001");
      } else {
        // false
        deposit = ethers.utils.parseEther("0.01");
      }
      const txn = await buyAMeCoffeeContract.buyCoffee(name, message, {
        value: deposit,
        gasLimit: 900000,
      });
      console.log(`Loading - ${transactionHash}`);
      await txn.wait();
      console.log(`Success - ${transactionHash}`);
    } else {
      alert("Oops! Something went wrong. Please refresh & try again.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("No Ethereum Object");
  }
};
