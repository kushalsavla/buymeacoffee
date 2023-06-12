import React, { useRef, useState, useEffect } from "react";
import { ethers, Signer } from "ethers";
import { contractAddress } from "../utils/contractAddress";
import abi from "/home/theparadoxwhotalks/fcc-hardhat-tut/learn-web3/BuyMeACoffee/client/client-side/src/utils/BuyMeACoffee.json";
//basic eth config
const { ethereum } = window;
const contractABI = abi.abi;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const buyMeACoffeeContract = new ethers.Contract(
    contractAddress,
    contractABI,
    provider.getSigner(0)
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
  const [formData, setFormData] = useState({
    named: "",
    message: "",
  });
  const buyMeACoffeeContract = getEthereumContract();
  const ownerRef = useRef();

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
        const owner = await buyMeACoffeeContract.getOwner();
        console.log("owner is " + owner);
        if (account == owner.toString().toLowerCase()) {
          ownerRef.current.classList.remove("hidden");
          console.log("you are the owner");
        }
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
  const handleChange = (e, named) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, [named]: e.target.value }));
  };
  // console.log(buyMeCoffeeContract);
  console.log(formData);

  //Buy Coffee Transaction
  const buyACoffee = async (coffee) => {
    // try {
    if (!ethereum) return alert("Please Install MetaMask");

    console.log(buyMeACoffeeContract);
    if (coffee == "small") {
      // true
      const txn = await buyMeACoffeeContract.buyCoffee(
        formData.named,
        formData.message,
        {
          value: ethers.utils.parseEther((0.001).toString()),
          gasLimit: 900000,
        }
      );
      console.log(txn);
    } else {
      // false
      const txn = await buyMeACoffeeContract.buyCoffee(
        formData.named,
        formData.message,
        {
          value: ethers.utils.parseEther((0.01).toString()),
          gasLimit: 900000,
        }
      );
      console.log(txn);
    }
    console.log(`Loading - ${txn}`);
    await txn.wait();
    console.log(`Success - ${txn}`);
    // } catch (error) {
    //   console.log(error);
    //   throw new Error("No Ethereum Object");
    // }
  };

  console.log(contractAddress);
  console.log(buyMeACoffeeContract);
  // console.log(buyMeACoffeeContract.signer);

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
          name="named"
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
          onClick={() => buyACoffee("small")}
          id="small-coffee"
        >
          Small Coffee
        </button>
        <button
          type="submit"
          onClick={() => buyACoffee("large")}
          id="large-coffee"
        >
          Large Coffee
        </button>

        <button
          type="submit"
          onClick={() => withdrawFunds()}
          id="withdrawer"
          ref={ownerRef}
          className="hidden withdraw"
        >
          Withdraw
        </button>
      </form>
    </div>
  );
};

export default Transactions;
