<div align="center">

# 🦆 Duck Hunt Game
### Play-to-Earn Arcade • Fully Encrypted Gameplay • Blockchain Rewards

[![Live Demo](https://img.shields.io/badge/🎮_Play_Now-Live_Demo-success?style=for-the-badge)](https://zamafhe-silk.vercel.app/)
[![Powered by Zama](https://img.shields.io/badge/Powered_by-Zama_FHEVM-blue?style=for-the-badge)](https://www.zama.ai/)
[![Network](https://img.shields.io/badge/Network-Sepolia_Testnet-orange?style=for-the-badge)](https://sepolia.etherscan.io/)

**An encrypted and provably fair shooting arcade game built with Zama's FHEVM**  
_Confidential rewards • Secure gameplay • On-chain encryption_

[🎮 Play Game](https://zamafhe-silk.vercel.app/) • [📜 Smart Contract](https://sepolia.etherscan.io/address/0xA433850DC1738b07393ea54F7FE4e825924aC9b8) • [🐦 Twitter](https://x.com/Huytran23994)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🎮 How to Play](#-how-to-play)
- [🚀 Quick Start](#-quick-start)
- [🔧 Smart Contracts](#-smart-contracts)
- [🛠️ Development](#️-development)
- [🔒 Security](#-security)
- [🌐 Network Info](#-network-info)

---

## ✨ Features

### 🔐 Confidential Gameplay Model

<table>
<tr>
<td width="50%">

**🔒 On-Chain Encrypted State**  
Player info (races, ETH, scores) fully encrypted on blockchain

**🎯 Confidential Actions**  
All in-game moves use encrypted inputs

</td>
<td width="50%">

**✅ ZK Verification**  
Validate gameplay via zero-knowledge proofs

**🔑 Player-Controlled Decryption**  
Only you can decrypt your data

</td>
</tr>
</table>

### 🎮 Game Mechanics

| Feature | Description |
|---------|-------------|
| 🦆 **Duck Hunt** | Classic arcade shooting gameplay |
| ⏱️ **Duration** | 30-second hunting rounds |
| 🎯 **Controls** | Click/Tap to shoot flying ducks |
| 🔫 **Ammo System** | Limited bullets - aim carefully! |
| 🦆 **Targets** | Ducks fly from grass in random patterns |
| 📊 **Scoring** | Points per duck hit (varies by difficulty) |
| 💰 **Rewards** | Score-based ETH rewards |
| 🏆 **Leaderboard** | Daily competitions |
| 🔐 **KMS Claim** | Decentralized ETH withdrawal |

---

## 🚀 Quick Start

### 📋 Prerequisites

```
✅ Node.js 20+
✅ MetaMask wallet
✅ Sepolia ETH (for gas fees)
```

### 🛠️ Installation

#### **Step 1: Clone the repository**
```bash
git clone https://github.com/khongconick/zama_dunt.git
cd zamafhe
```

#### **Step 2: Install dependencies**
```bash
# Frontend
cd frontend-fhe-dunt
npm install

# Backend (optional)
cd ../server
npm install
```

#### **Step 3: Configure environment**
Create a `.env` file in `frontend-fhe-dunt/`:

```env
REACT_APP_FHEVM_CONTRACT_ADDRESS=0xA433850DC1738b07393ea54F7FE4e825924aC9b8
REACT_APP_RELAYER_URL=https://relayer.testnet.zama.cloud
REACT_APP_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
REACT_APP_ETHERSCAN_API_KEY=your-etherscan-api-key
```

#### **Step 4: Start the application**
```bash
cd frontend-fhe-dunt
npm start
```

🎉 Open http://localhost:3000 in your browser!

#### **Step 5: Connect your wallet**
1. 🦊 Open MetaMask and switch to **Sepolia Testnet**
2. 🔗 Click "Connect Wallet" in the app
3. ✅ Grant user-decrypt authorization when prompted

---

## 🎯 How to Play

<div align="center">

### 🎮 Three Simple Steps

</div>

```
┌─────────────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│  1️⃣ Get Started    │  →   │  2️⃣ Hunt & Shoot   │  →   │  3️⃣ Submit & Win   │
└─────────────────────┘      └─────────────────────┘      └─────────────────────┘
```

### 1️⃣ **Get Started**
- 🔗 Connect your MetaMask wallet
- 💳 Buy plays with ETH to start gaming
- ✨ Daily check-in for free plays!

### 2️⃣ **Hunt the Ducks**

<table>
<tr>
<td width="50%">

**🎮 Gameplay**
- Click **"🦆 Start Hunting"** to begin
- 30-second rounds
- Ducks fly from grass randomly
- Limited ammo per round
- Each hit = points!

</td>
<td width="50%">

**🖱️ Controls**
- **Click/Tap** = Shoot
- **Aim carefully** - bullets are limited! 🔫
- **Hit ducks** = Score points! 🎯
- **Miss too much** = Lower score 💨

</td>
</tr>
</table>

> 💡 **Pro Tip**: Lead your shots! Ducks move fast, so aim slightly ahead of their flight path for better accuracy.

### 3️⃣ **Submit Score & Compete**
- 📤 **Submit Total Score**: Upload your accumulated score to blockchain
- 🏆 **Leaderboard**: Compete with players worldwide
- 💰 **Claim Rewards**: Earn ETH based on your performance

---

## 🔧 Smart Contracts

### 📍 Contract Addresses

<div align="center">

| Network | Contract Name | Address |
|---------|--------------|---------|
| 🔷 **Sepolia Testnet** | ZamaFheDunt_KMS_Final | [`0xA433...C9b8`](https://sepolia.etherscan.io/address/0xA433850DC1738b07393ea54F7FE4e825924aC9b8) |

</div>

### 🔑 Key Functions

| Function | Description | Usage |
|----------|-------------|-------|
| 📤 `publishScore(uint256)` | Submit score to blockchain | End of game |
| 🎁 `dailyGm()` | Daily check-in for free plays | Once per day |
| 💳 `buyGmTokensFHE()` | Buy GM tokens with ETH | Purchase plays |
| 💰 `requestClaimETH(uint256)` | Request ETH withdrawal | Claim rewards |
| 🔒 `getEncryptedPendingEthWei(address)` | Get encrypted pending ETH | View balance |
| 📊 `getEncryptedScore(address)` | Get encrypted score | View stats |

---

## 🛠️ Development

### 📁 Project Structure

```
zamafhe/
├── 📄 contracts/              # Smart contracts (Solidity)
├── 🎨 frontend-fhe-dunt/     # React frontend application
├── 🖥️  server/                # Express API server
├── 🚀 deploy/                # Deployment scripts
├── 🔧 scripts/               # Utility scripts
└── 📖 README.md
```

### 💻 Development Commands

```bash
# Compile smart contracts
npx hardhat compile

# Deploy to Sepolia testnet
npx hardhat run deploy/06b_deploy_kms_final_js.js --network sepolia

# Start frontend development server
cd frontend-fhe-dunt && npm start

# Build for production
cd frontend-fhe-dunt && npm run build
```

---

## 🔒 Security

<div align="center">

### 🛡️ Multi-Layer Security Architecture

</div>

| Layer | Technology | Purpose |
|-------|-----------|---------|
| 🔐 **Encryption** | Zama FHEVM | All sensitive data encrypted on-chain |
| 🎫 **Access Control** | ACL System | Granular data permissions |
| ✍️ **Verification** | EIP-712 Signatures | Secure authorization |
| 🔏 **Commitment** | Cryptographic Scheme | Immutable race outcomes |

> 🔒 **Privacy First**: Your gameplay data remains confidential while being verifiable on-chain.

---

## 🌐 Network Info

### Sepolia Testnet Configuration

| Parameter | Value |
|-----------|-------|
| 🌐 **RPC URL** | `https://rpc.sepolia.org` |
| 🔢 **Chain ID** | `11155111` |
| 🔍 **Explorer** | [sepolia.etherscan.io](https://sepolia.etherscan.io) |
| 💧 **Faucet** | [sepoliafaucet.com](https://sepoliafaucet.com) |

---

## 🙏 Acknowledgments

<div align="center">

**Built with ❤️ using cutting-edge blockchain technology**

| Team | Contribution |
|------|--------------|
| 🔐 **Zama** | FHEVM technology & encryption infrastructure |
| ⚡ **Ethereum** | Blockchain infrastructure & testnet |
| 🦊 **MetaMask** | Wallet integration & user authentication |

</div>

---

<div align="center">

### 👨‍💻 Created by

**[Huytran23994](https://x.com/Huytran23994)**

[![Twitter](https://img.shields.io/badge/Follow-@Huytran23994-1DA1F2?style=for-the-badge&logo=twitter)](https://x.com/Huytran23994)
[![GitHub](https://img.shields.io/badge/GitHub-khongconick-181717?style=for-the-badge&logo=github)](https://github.com/khongconick)

---

**⭐ Star this repo if you found it helpful!**

[🎮 Play Now](https://zamafhe-silk.vercel.app/) • [📜 View Contract](https://sepolia.etherscan.io/address/0xA433850DC1738b07393ea54F7FE4e825924aC9b8) • [🐛 Report Bug](https://github.com/khongconick/zama_fhe_dunt/issues)

</div>
