async function main() {
   const Crowdfund = await ethers.getContractFactory("Crowdfund");

   // Start deployment, returning a promise that resolves to a contract object
   const Crowdfund_deployed = await Crowdfund.deploy();
   console.log("Contract deployed to address:", Crowdfund_deployed.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });