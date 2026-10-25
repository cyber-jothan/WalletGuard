
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract WalletGuard {
    address public immutable owner;
    uint256 public dailyLimit;

    uint256 public lastResetDay;
    uint256 public spentToday;

    event Deposited(address indexed from, uint256 amount);
    event Withdrawn(address indexed to, uint256 amount);
    event DailyLimitChanged(uint256 oldLimit, uint256 newLimit);

    error NotOwner();
    error InvalidLimit();
    error DailyLimitExceeded();
    error InsufficientBalance();
    error TransferFailed();

    constructor(uint256 _dailyLimit) {
        if (_dailyLimit == 0) revert InvalidLimit();

        owner = msg.sender;
        dailyLimit = _dailyLimit;
        lastResetDay = block.timestamp / 1 days;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    receive() external payable {
        emit Deposited(msg.sender, msg.value);
    }

    function setDailyLimit(uint256 newLimit) external onlyOwner {
        if (newLimit == 0) revert InvalidLimit();

        uint256 oldLimit = dailyLimit;
        dailyLimit = newLimit;

        emit DailyLimitChanged(oldLimit, newLimit);
    }

    function withdraw(address payable to, uint256 amount)
        external
        onlyOwner
    {
        if (to == address(0)) revert TransferFailed();

        uint256 currentDay = block.timestamp / 1 days;

        uint256 currentSpent = currentDay == lastResetDay
            ? spentToday
            : 0;

        if (currentSpent + amount > dailyLimit) {
            revert DailyLimitExceeded();
        }

        if (address(this).balance < amount) {
            revert InsufficientBalance();
        }

        lastResetDay = currentDay;
        spentToday = currentSpent + amount;

        (bool success, ) = to.call{value: amount}("");
        if (!success) revert TransferFailed();

        emit Withdrawn(to, amount);
    }
}