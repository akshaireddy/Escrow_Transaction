// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public payer;
    address public payee;
    address public arbiter;
    uint256 public amount;
    bool public released;
    bool public refunded;

    constructor(address _payer, address _payee, address _arbiter) {
        payer = _payer;
        payee = _payee;
        arbiter = _arbiter;
        released = false;
        refunded = false;
    }

    function deposit() external payable {
        require(msg.sender == payer, "Only the payer can deposit.");
        require(!released && !refunded, "Escrow has already been released or refunded.");
        amount += msg.value;
    }

    function release() external {
        require(msg.sender == arbiter, "Only the arbiter can release funds.");
        require(!released && !refunded, "Escrow has already been released or refunded.");
        released = true;
        payable(payee).transfer(amount);
    }

    function refund() external {
        require(msg.sender == arbiter, "Only the arbiter can refund funds.");
        require(!released && !refunded, "Escrow has already been released or refunded.");
        refunded = true;
        payable(payer).transfer(amount);
    }
}
