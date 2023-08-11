// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract VerifiedBite {
    mapping(uint256 => Review[]) public submittedReviews;
    mapping(bytes32 => uint256) public unusedReceiptCodes;

    struct Review {
        uint256 restaurantId;
        uint256 rating;
    }

    modifier validRating(uint256 rating) {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        _;
    }

    constructor() {
        // Adding 3 sample reviews with more realistic uint256 IDs
        uint256 userId1 = 1234567890123456789012345678901234567890;
        uint256 userId2 = 2345678901234567890123456789012345678901;
        uint256 userId3 = 3456789012345678901234567890123456789012;

        submittedReviews[userId1].push(Review(101, 5)); // restaurantId: 101, rating: 5
        submittedReviews[userId2].push(Review(102, 4)); // restaurantId: 102, rating: 4
        submittedReviews[userId3].push(Review(103, 3)); // restaurantId: 103, rating: 3
    }

    function addReceiptCode(bytes32 receiptCode, uint256 restaurantId) public {
        unusedReceiptCodes[receiptCode] = restaurantId;
    }

    function submitReview(bytes32 receiptCode, uint256 rating) public {
        uint256 restaurantId= unusedReceiptCodes[receiptCode];
        require(restaurantId != 0, "Receipt code not found");
        submittedReviews[restaurantId].push(Review(restaurantId, rating));
    } 

}
