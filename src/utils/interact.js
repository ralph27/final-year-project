import env from "react-dotenv";
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contract_abi = require("../utils/contract-abi.json");
console.log("Contract ABI", contract_abi);
const {CONTRACT_ADDRESS} = env;

export const CrowdfundContract = new web3.eth.Contract(
  contract_abi,
  CONTRACT_ADDRESS
);

export const getCampaignsCount = async () => {
  const count = await CrowdfundContract.methods.count().call();
  return count;
}

export const connectWallet = async () => {
   if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return addressArray
        
      } catch (err) {
        return err
      }
    }
};

