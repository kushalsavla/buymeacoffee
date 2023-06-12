import { Loader } from ".";
import React, { useEffect, UseEffect, useState, UseState } from "react";

export const TransactionsContext = React.createContext();

const { ethereum } = window;

const Navbar = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  return (
    <nav className="navbar w-full flex md:justify-center justify-between items-center p-4 navbar-items">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <h2 className="text-4xl uni-name">Kushal's Coffee DApp</h2>
      </div>
    </nav>
  );
};

export default Navbar;
