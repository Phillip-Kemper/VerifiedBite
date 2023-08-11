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

    function getAllSubmittedReviews() public view returns (Review[] memory) {
        return submittedReviews;
    }


    function submitReview(bytes32 receiptCode, uint256 rating) public {
        uint256 restaurantId= unusedReceiptCodes[receiptCode];
        require(restaurantId != 0, "Receipt code not found");
        submittedReviews[restaurantId].push(Review(restaurantId, rating));
    } 

}
