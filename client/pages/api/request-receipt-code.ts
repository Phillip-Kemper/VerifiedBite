// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import contractInfo from "../../web3/VerifiedBite.json";
import contractAddressInfo from "../../web3/contractAddress.json";

type Data = {
  receiptCode: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { restaurantId } = req.query;
  const contractAddress = contractAddressInfo.address;
  const rnd = Math.floor(Math.random() * 900000) + 100000;
  const receiptCode = `${rnd}`;
  const receiptCodeHash = ethers.utils.solidityKeccak256(["string"], [`${receiptCode}`]);
  // const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, contractInfo.abi, provider);
  const contractWithSigner = contract.connect(wallet);

  await contractWithSigner.addReceiptCode(receiptCodeHash, `${restaurantId}`);

  res.status(200).json({ receiptCode });
}
