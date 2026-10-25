# WalletGuard

A simple Ethereum smart contract that holds ETH and protects withdrawals with an owner-only access control mechanism and a daily withdrawal limit.

Built with Solidity and Hardhat as a portfolio project.

## Features

- **ETH deposits:** Anyone can send ETH to the contract.
- **Owner-only withdrawals:** Only the contract deployer can withdraw funds.
- **Daily withdrawal limit:** Withdrawals cannot exceed the configured limit for the current day.
- **Configurable limit:** The owner can change the daily withdrawal limit.
- **Events:** Emits events for deposits, withdrawals, and limit changes.
- **Custom errors:** Uses explicit errors for unauthorized access, invalid limits, exceeded limits, insufficient balance, and failed transfers.

## Tech Stack

- Solidity
- Hardhat 3
- TypeScript
- Viem
- Yarn

## How It Works

The contract records the address of its deployer as the owner. It accepts ETH deposits and allows the owner to withdraw funds to a specified address.

Each withdrawal is checked against the daily limit. The contract tracks the amount already withdrawn during the current day and rejects withdrawals that would exceed the limit.

The daily limit is expressed in wei, the smallest unit of ETH. For example, `1 ETH = 10^18 wei`.

The daily spending counter resets logically when a new day begins, based on the blockchain timestamp.

## Security Considerations

- Only the owner can withdraw funds or change the daily limit.
- A zero daily limit is rejected.
- Withdrawals to the zero address