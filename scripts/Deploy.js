async function main() {
   const Crowdfund = await ethers.getContractFactory("Crowdfund");

   const Crowdfund_deployed = await Crowdfund.deploy();
   console.log("Contract deployed to address:", Crowdfund_deployed.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });