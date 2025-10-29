const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying ZamaFheDunt_Simple...");
  
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📋 Deploying with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy the contract
  const ZamaFheDunt_Simple = await ethers.getContractFactory("ZamaFheDunt_Simple");
  const contract = await ZamaFheDunt_Simple.deploy();
  
  await contract.waitForDeployment();
  
  const contractAddress = await contract.getAddress();
  console.log("✅ ZamaFheDunt_Simple deployed to:", contractAddress);
  
  // Verify deployment
  console.log("🔍 Verifying deployment...");
  const code = await deployer.provider.getCode(contractAddress);
  console.log("📊 Contract code size:", code.length);
  
  return contractAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
