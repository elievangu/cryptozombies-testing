//Initialize `truffle-hdwallet-provider`
var HDWalletProvider = require("truffle-hdwallet-provider");

//Initialize LoomTruffleProvider
const LoomTruffleProvider = require('loom-truffle-provider');

// Set your own mnemonic here
const mnemonic = "YOUR_MNEMONIC";

const { readFileSync } = require('fs');
const path = require('path');
const { join } = require('path');

//Function that reads the private key from a file and initializes a new LoomTruffleProvider
function getLoomProviderWithPrivateKey (privateKeyPath, chainId, writeUrl, readUrl) {
  const privateKey = readFileSync(privateKeyPath, 'utf-8');
  return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
}

// Module exports to make this configuration available to Truffle itself
module.exports = {
  // Object with configuration for each network
  networks: {
    // Configuration for mainnet
    mainnet: {
      provider: function () {
        // Setting the provider with the Infura Rinkeby address and Token
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/YOUR_TOKEN")
      },
      network_id: "1"
    },
    // Configuration for rinkeby network
    rinkeby: {
      // Special function to setup the provider
      provider: function () {
        // Setting the provider with the Infura Rinkeby address and Token
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/YOUR_TOKEN")
      },
      //Network id is 4 for Rinkeby
      network_id: "4"
    },
    //Put here the configuration for loom_dapp_chain
    loom_testnet: {
      provider: function() {
        const privateKey = 'YOUR_PRIVATE_KEY'
        const chainId = 'extdev-plasma-us1';
        const writeUrl = 'http://extdev-plasma-us1.dappchains.com:80/rpc';
        const readUrl = 'http://extdev-plasma-us1.dappchains.com:80/query';
        return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
        },
      network_id: '9545242630824'
    },
    
    basechain: {
      provider: function() {
        const chainId = 'default';
        const writeUrl = 'http://basechain.dappchains.com/rpc';
        const readUrl = 'http://basechain.dappchains.com/query';
        return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
        const privateKeyPath = path.join(__dirname, 'mainnet_private_key');
        const loomTruffleProvider = getLoomProviderWithPrivateKey(privateKeyPath, chainId, writeUrl, readUrl);
        return loomTruffleProvider;
        },
      // Network id is * for Basechain
      network_id: '*'
    }
  }
}; 
