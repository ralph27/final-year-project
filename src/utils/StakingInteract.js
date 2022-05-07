import env from "react-dotenv";
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contract_abi = require("./staking-abi.json");
const {STAKING_ADDRESS} = env;

export const StakingContract = new web3.eth.Contract(
   contract_abi,
   STAKING_ADDRESS
 );

 