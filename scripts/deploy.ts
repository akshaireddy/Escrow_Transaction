import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const payerAddress = process.env.PAYER_ADDRESS;
  const payeeAddress = process.env.PAYEE_ADDRESS;
  const arbiterAddress = process.env.ARBITER_ADDRESS;

  if (!payerAddress || !payeeAddress || !arbiterAddress) {
    throw new Error("One or more required environment variables are missing.");
  }

  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(payerAddress, payeeAddress, arbiterAddress);

  await escrow.deployed();

  console.log("Escrow deployed to:", escrow.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
