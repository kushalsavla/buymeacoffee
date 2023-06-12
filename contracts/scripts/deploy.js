// scripts/deploy.js

const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // We get the contract to deploy.
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  console.log("Deploying contract...");
  console.log("Awaiting confirmations");

  await buyMeACoffee.deployed();

  console.log("Completed!");
  console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);

  fs.writeFileSync(
    "../client/client-side/src/utils/contractAddress.js",
    `export const contractAddress = "${buyMeACoffee.address}"`
  );
  console.log(
    "Contract Address Saved At ../client/client-side/src/utils/contractAddress.js"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
