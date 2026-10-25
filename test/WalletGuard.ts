
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { network } from "hardhat";
import { parseEther } from "viem";

describe("WalletGuard", async function () {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();
  const [owner, other, recipient] = await viem.getWalletClients();

  it("sets the owner and daily limit", async function () {
    const guard = await viem.deployContract("WalletGuard", [
      parseEther("2"),
    ]);

    assert.equal(
      (await guard.read.owner()).toLowerCase(),
      owner.account.address.toLowerCase(),
    );
    assert.equal(await guard.read.dailyLimit(), parseEther("2"));
  });

  it("accepts ETH deposits", async function () {
    const guard = await viem.deployContract("WalletGuard", [
      parseEther("2"),
    ]);


  it("allows a withdrawal within the daily limit", async function () {
    const guard = await viem.deployContract("WalletGuard", [
      parseEther("2"),
    ]);

    await owner.sendTransaction({
      to: guard.address,
      value: parseEther("3"),
    });

    await guard.write.withdraw([
      recipient.account.address,
      parseEther("1"),
    ]);

    assert.equal(
      await publicClient.getBalance({ address: guard.address }),
      parseEther("2"),
    );

    assert.equal(await guard.read.spentToday(), parseEther("1"));
  });

  it("rejects a withdrawal exceeding the daily limit", async function () {
    const guard = await viem.deployContract("WalletGuard", [
      parseEther("2"),
    ]);

    await owner.sendTransaction({
      to: guard.address,
      value: parseEther("3"),
    });

    await assert.rejects(
      guard.write.withdraw([
        recipient.account.address,
        parseEther("3"),
      ]),
    );

    assert.equal(
      await publicClient.getBalance({ address: guard.address }),
      parseEther("3"),
    );

    assert.equal(await guard.read.spentToday(), 0n);
  });

    await owner.sendTransaction({
      to: guard.address,
      value: parseEther("1"),
    });

    assert.equal(
      await publicClient.getBalance({ address: guard.address }),
      parseEther("1"),
    );
  });
  it("allows the owner to change the daily limit", async function () {
  const walletGuard = await viem.deployContract("WalletGuard", [
    parseEther("2"),
  ]);

  await walletGuard.write.setDailyLimit([parseEther("5")]);

  assert.equal(
    await walletGuard.read.dailyLimit(),
    parseEther("5"),
  );
});

it("rejects changing the daily limit from non-owners", async function () {
  const walletGuard = await viem.deployContract("WalletGuard", [
    parseEther("2"),
  ]);

  await assert.rejects(
    walletGuard.write.setDailyLimit(
      [parseEther("5")],
      { account: other.account },
    ),
  );

  assert.equal(
    await walletGuard.read.dailyLimit(),
    parseEther("2"),
  );
});

  it("rejects withdrawals from non-owners", async function () {
    const guard = await viem.deployContract("WalletGuard", [
      parseEther("2"),
    ]);

    await assert.rejects(
      guard.write.withdraw(
        [recipient.account.address, parseEther("1")],
        { account: other.account },
      ),
    );
  });
});
