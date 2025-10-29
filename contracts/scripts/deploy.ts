import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment...");

  // Get the contract factory
  const CryptoDinoRun = await ethers.getContractFactory("CryptoDinoRun_KMS_Final");
  
  console.log("📝 Deploying CryptoDinoRun_KMS_Final...");
  
  // Deploy the contract
  const contract = await CryptoDinoRun.deploy();
  
  // Wait for deployment to finish
  await contract.waitForDeployment();
  
  const address = await contract.getAddress();
  
  console.log("✅ Contract deployed successfully!");
  console.log("📍 Contract address:", address);
  console.log("");
  console.log("🔗 Sepolia Etherscan:");
  console.log(`https://sepolia.etherscan.io/address/${address}`);
  console.log("");
  console.log("📋 Next steps:");
  console.log("1. Update frontend-fhe-race/src/config.ts");
  console.log("2. Update frontend-fhe-race/.env.local");
  console.log(`   REACT_APP_FHEVM_CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

