# VerfiedBite
Verified Bite puts restaurant reviews on chain.
Developed @ ETHMunich - by PretzelDAO

## Try it yourself:
1) [Here's the overview with all reviews](https://verified-bite.vercel.app/)

2) [Theoretically done by Restaurant] 
[Request receipt code for a new order at Elite Sushi](https://verified-bite.vercel.app/request-receipt-code/198e27834_3_hf237h)

3) [Use receipt code](https://verified-bite.vercel.app/submit-review) or shown QR-Code to submit a review

## How it works:
For each order, restaurants can request a new receipt from a centralized backend.
*The VerfiedBite backend then generates a random receipt code and puts its keccak256 hash on-chain.*

The resulting QRCode is printed on the receipt.
Customers can then use the provided link to submit reviews on-chain.
*VerfiedBite hashes the receipt code inside the smart contract to verify the order.*

To make it as easy as possible for customers to submit reviews, all transactions are **gasless**!  🎉
*We use Gelato to enable gasless transactions.*

*VerifiedBite is deployed on Polygon zkEVM for highly efficient transactions.*

*Check out ./contracts/fe/ for a simplified version of our contract written in FE.*