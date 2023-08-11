// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract VerifiedBite {
    address public admin;
    mapping(uint256 => Review[]) public submittedReviews;
    mapping(bytes32 => uint256) public unusedReceiptCodes;

    struct Review {
        address userId;
        uint256 rating;
    }

    modifier validRating(uint256 rating) {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor(address _admin) {
        admin = _admin;
        uint256 userId1 = 1234567890123456789012345678901234567890;
        uint256 userId2 = 2345678901234567890123456789012345678901;
        uint256 userId3 = 3456789012345678901234567890123456789012;

        submittedReviews[userId1].push(Review(0x6CbAa746E1F17804E9b2b81222C9f4a0A50a64A9, 5));
        submittedReviews[userId2].push(Review(0x6CbAa746E1F17804E9b2b81222C9f4a0A50a64A9, 4));
        submittedReviews[userId3].push(Review(0x6CbAa746E1F17804E9b2b81222C9f4a0A50a64A9, 3));
    }

    function addReceiptCode(bytes32 receiptCode, uint256 restaurantId) public onlyAdmin() {
        unusedReceiptCodes[receiptCode] = restaurantId;
    }

    function submitReview(bytes32 receiptCode, uint256 rating) public {
        uint256 restaurantId = unusedReceiptCodes[receiptCode];
        require(restaurantId != 0, "Receipt code not found");
        submittedReviews[restaurantId].push(Review(msg.sender, rating));
    }
}
