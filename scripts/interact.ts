// import { ethers } from "hardhat";
// import dotenv from "dotenv";

// dotenv.config();

// async function main() {
//   const [deployer, payer, payee, arbiter] = await ethers.getSigners();

//   // Load the deployed contract
//   const escrowAddress = process.env.ESCROW_ADDRESS;
//   const Escrow = await ethers.getContractFactory("Escrow");
//   const escrow = await Escrow.attach(escrowAddress!); // Add "!" to assert that the value is not undefined

//   // Deposit funds to the escrow contract
//   const depositAmount = ethers.utils.parseEther("1.0");
//   await escrow.connect(payer).deposit({ value: depositAmount });

//   // Perform some actions...

//   // Release or refund the escrowed amount by the arbiter
//   const shouldRelease: boolean = true; // Set to false for refund
//   if (shouldRelease) {
//     await escrow.connect(arbiter).release();
//     console.log("Funds released from escrow.");
//   } else {
//     await escrow.connect(arbiter).refund();
//     console.log("Funds refunded from escrow.");
//   }
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });


import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer, payer, payee, arbiter] = await ethers.getSigners();

  // Load the deployed contract
  const escrowAddress = process.env.ESCROW_ADDRESS;
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.attach(escrowAddress!);

  // Deposit funds to the escrow contract with a specific gas limit
  const depositAmount = ethers.utils.parseEther("1.0");
  const gasLimit = 300000; // Specify your desired gas limit here
  await escrow.connect(payer).deposit({ value: depositAmount, gasLimit });

  // Perform some actions...

  // Release or refund the escrowed amount by the arbiter with a specific gas limit
  const shouldRelease: boolean = true; // Set to false for refund
  const releaseOrRefundGasLimit = 200000; // Specify your desired gas limit here
  if (shouldRelease) {
    await escrow.connect(arbiter).release({ gasLimit: releaseOrRefundGasLimit });
    console.log("Funds released from escrow.");
  } else {
    await escrow.connect(arbiter).refund({ gasLimit: releaseOrRefundGasLimit });
    console.log("Funds refunded from escrow.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
