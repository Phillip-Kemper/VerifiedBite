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


    function submitReview(bytes32 receiptCode, uint256 rating) public {
        // is receipt code valid?
        // what restaurant is it for?
        uint256 restaurantId= 10;
        submittedReviews[restaurantId].push(Review(restaurantId, rating));
    } 

}
