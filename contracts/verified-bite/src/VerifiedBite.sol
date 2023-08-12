// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { ERC2771Context } from "@gelatonetwork/relay-context/contracts/vendor/ERC2771Context.sol";

contract VerifiedBite is ERC2771Context {
    address public admin;
    mapping(uint256 => Review[]) public submittedReviews;
    mapping(bytes32 => uint256) public unusedReceiptCodes;

    struct Review {
        address userId;
        uint256 rating;
    }

    event ReceiptCodeStored(bytes32 receiptCode, uint256 restaurantId);
    event ReviewSubmitted(bytes32 receiptCode, uint256 restaurantId, uint256 rating);


    modifier validRating(uint256 rating) {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        _;
    }

    modifier onlyAdmin() {
        require(_msgSender() == admin, "Only admin can call this function");
        _;
    }

    constructor(address _admin, address trustedForwarder) ERC2771Context(trustedForwarder) {
        admin = _admin;
        uint256 restaurantId1 = 1;
        uint256 restaurantId2 = 2;
        uint256 restaurantId3 = 3;

        submittedReviews[restaurantId1].push(Review(0x6CbAa746E1F17804E9b2b81222C9f4a0A50a64A9, 5));
        submittedReviews[restaurantId2].push(Review(0x6CbAa746E1F17804E9b2b81222C9f4a0A50a64A9, 4));
        submittedReviews[restaurantId3].push(Review(0x6CbAa746E1F17804E9b2b81222C9f4a0A50a64A9, 3));
    }

    function getReviews(uint256 restaurantId) public view returns (Review[] memory) {
        return submittedReviews[restaurantId];
    }

    function addReceiptCode(bytes32 receiptCode, uint256 restaurantId) public onlyAdmin() {
        unusedReceiptCodes[receiptCode] = restaurantId;
        emit ReceiptCodeStored(receiptCode, restaurantId);
    }

    function getReceiptCode(bytes32 receiptCode) public view returns (uint256) {
        return unusedReceiptCodes[receiptCode];
    }

    function submitReview(string memory receiptCode, uint256 rating) public validRating(rating) {
        bytes32 receiptCodeHash = keccak256(abi.encodePacked(receiptCode));

        uint256 restaurantId = unusedReceiptCodes[receiptCodeHash];
        require(restaurantId != 0, "Receipt code not found");
        submittedReviews[restaurantId].push(Review(_msgSender(), rating));

        unusedReceiptCodes[receiptCodeHash] = 0;
    }

}
