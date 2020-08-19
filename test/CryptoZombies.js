//Build Artifacts
const CryptoZombies = artifacts.require("CryptoZombies");

//The contract() function
contract("CryptoZombies", (accounts) => {
  //initiate "alice" and "bob"
  let [alice, bob] = accounts;
  
  //variable limited in scope to the block in witch it's defined
  let contractInstance;

  //instead of writing contract.new() several times we use beforeEach()
  beforeEach(async () => {
    // let's put here the code that creates a new contract instance
    contractInstance = await CryptoZombies.new();
  });

  /*selfdestruct is the only way for code at a certain address to be removed from the blockchain
    function kill() public onlyOwner {
      selfdestruct(owner());
    }
  */

  //Truffle will make sure this function is called after a test gets executed
  afterEach(async () => {
    await contractInstance.kill();
  });

  it("should be able to create a new zombie", async () => {

    //Creation of an instance of our contract
    //contractInstance = await CryptoZombies.new();

    

    //Declaration of a const named result and set it equal to the result of contractInstance.createRandomZombie
    const result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});

    //Once we have the result, call assert.equal with two arguments- result.receipt.status and true.
    assert.equal(result.receipt.status, true);
    
    //Check if result.logs[0].args.name equals to zombieNames[0] using assert.equal
    assert.equal(result.logs[0].args.name, zombieNames[0]);
  })

  //define the new it() function
  it("should not allow two zombies", async () => {

  })
})