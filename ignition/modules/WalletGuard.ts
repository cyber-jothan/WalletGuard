import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const WalletGuardModule = buildModule("WalletGuardModule", (m) => {
	const dailyLimit = parseEther("1");
	const walletGuard = m.contract("WalletGuard", [dailyLimit]);

	return { walletGuard };
});

export default WalletGuardModule;