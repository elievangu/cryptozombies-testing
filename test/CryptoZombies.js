//Build Artifacts
const CryptoZombies = artifacts.require("CryptoZombies");

//The contract() function
contract("CryptoZombies", (accounts) => {
  //initiate "alice" and "bob"
  let [alice, bob] = accounts;
  it("should be able to create a new zombie", async () => {

    //Creation of an instance of our contract
    const contractInstance = await CryptoZombies.new();

    //Declaration of a const named result and set it equal to the result of contractInstance.createRandomZombie
    const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});

    //Once we have the result, call assert.equal with two arguments- result.receipt.status and true.
    assert.equal(result.receipt.status, true);
    
    //Check if result.logs[0].args.name equals to zombieNames[0] using assert.equal
    assert.equal(result.logs[0].args.name, zombieNames[0]);
  })
})