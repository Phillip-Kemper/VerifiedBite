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

    function addReceiptCode(bytes32 receiptCode, uint256 restaurantId) public {
        unusedReceiptCodes[receiptCode] = restaurantId;
    }

    function submitReview(bytes32 receiptCode, uint256 rating) public validRating(rating) {
        uint256 restaurantId = unusedReceiptCodes[receiptCode];
        require(restaurantId != 0, "Receipt code not found");
        submittedReviews[restaurantId].push(Review(msg.sender, rating));
    }

}
