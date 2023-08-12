// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {VerifiedBite} from "../src/VerifiedBite.sol";

contract VerifiedBiteTest is Test {
    VerifiedBite verifiedBite;
    function setUp() public {
        verifiedBite = new VerifiedBite(address(this));
    }

    function test_AdminSetCorrectly() public {
        assertEq(verifiedBite.admin(),address(this));
    }

    // function test_SubmittedReviewsSetCorrectly() public {
    //     assertEq(verifiedBite.submittedReviews(), 5);
    // }
}
