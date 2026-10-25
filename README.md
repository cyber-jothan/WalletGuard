# WalletGuard

WalletGuard is a Solidity smart contract that holds ETH and protects withdrawals with owner-only access control and a configurable daily withdrawal limit.

Built with Solidity, Hardhat, and TypeScript as a smart contract development portfolio project.

## Features

- **ETH deposits:** Anyone can deposit ETH into the contract.
- **Owner-only withdrawals:** Only the contract deployer can withdraw funds.
- **Daily withdrawal limit:** Withdrawals that would exceed the configured daily limit are rejected.
- **Configurable limit:** The owner can update the daily withdrawal limit.
- **Event logging:** Emits events for deposits, withdrawals, and daily limit changes.
- **Custom errors:** Uses explicit errors for unauthorized access, invalid limits, exceeded withdrawal limits, insufficient balance, and failed transfers.

## Tech Stack

- Solidity
- Hardhat 3
- TypeScript
- Viem
- Yarn

## How It Works

The contract records the deployer's address as its owner and accepts ETH deposits from any address.

Only the owner can withdraw funds or change the daily withdrawal limit. Before processing a withdrawal, the contract checks the requested amount against the remaining daily allowance and verifies that sufficient ETH is available.

Daily spending is tracked using the blockchain timestamp. When a new UTC day begins, the spending counter resets logically, without requiring a separate reset transaction.

The daily withdrawal limit is denominated in wei, the smallest unit of ETH.

**Example:** A daily limit of `0.01 ETH` equals `10000000000000000 wei`.

## Security Considerations

- Only the owner can withdraw funds or modify the daily limit.
- A zero daily limit is rejected.
- Withdrawals to the zero address are rejected.
- Withdrawals exceeding the daily limit or available contract balance are rejected.
- ETH transfers use a low-level call, and failed transfers revert the transaction.
- Spending state is updated before the external transfer, following the checks-effects-interactions pattern.

**Limitations:**

- This project uses a single-owner access control model. If the owner's private key is compromised, an attacker could withdraw available funds within the configured limits.
- The daily limit is a spending restriction, not a guarantee that funds are safe from every possible vulnerability.
- This is a portfolio project and has not undergone a professional security audit. It should not be used to custody significant amounts of real ETH without further review.

## Getting Started

### Prerequisites

- Node.js
- Yarn
- Git

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/walletguard.git
cd walletguard
yarn install
```

Replace `YOUR_USERNAME` with your GitHub username.

### Run Tests

```bash
yarn hardhat test
```

### Local Development

Start a local Hardhat node:

```bash
yarn hardhat node
```

In a separate terminal, deploy the contract using the project's Ignition module and the appropriate local network configuration.

## Deployment

WalletGuard has been deployed to the Sepolia testnet.

- **Network:** Sepolia
- **Contract address:** `YOUR_SEPOLIA_CONTRACT_ADDRESS`
- **Verified source code:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/)

Replace the placeholder with your deployed contract address and link directly to its Etherscan page.

## License

This project is licensed under the MIT License.
