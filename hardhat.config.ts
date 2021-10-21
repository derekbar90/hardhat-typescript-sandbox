import 'dotenv/config';
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import '@openzeppelin/hardhat-upgrades';
import { HardhatUserConfig } from "hardhat/config";
import 'hardhat-deploy';
import "@nomiclabs/hardhat-ethers";
import {node_url, accounts} from './utils/configs';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts.slice(0, 7)) {
    const balance = await account.getBalance();
    console.log(`${account.address} - ${hre.ethers.utils.formatEther(balance.toString())}`);
  }
});

// Example: npx hardhat send_eth --accountindex 0 --amount .3 --accounttoindex 11 --network kovan  
task("send_eth", "Send ETH from account to account")
.addParam("accountindex", "The account index")
.addParam("amount", "The amount to send")
.addParam("accounttoindex", "The address to send to")
.setAction(async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  const chosenAccount = accounts[args.accountindex]
  const toAccount = accounts[args.accounttoindex].address

  await chosenAccount.sendTransaction({
    to: toAccount,
    value: hre.ethers.utils.parseEther(args.amount)
  });
});

task("send_token", "Send ETH from account to account")
.addParam("accountindex", "The account index")
.addParam("amount", "The amount to send")
.addParam("accounttoindex", "The address to send to")
.setAction(async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  const chosenAccount = accounts[args.accountindex]
  const toAccount = accounts[args.accounttoindex].address
  const testTokenDeployment = await hre.deployments.get('TestToken');
  const tokenContract = await hre.ethers.getContractAt("TestToken", testTokenDeployment.address, chosenAccount);
  await tokenContract.transfer(toAccount, hre.ethers.utils.parseEther(args.amount));
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
  networks: {
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('a'),
    },
    kovan: {
      url: node_url('kovan'),
      accounts: accounts('a'),
    },
  },
  solidity: {
    version: "0.8.5",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  namedAccounts: {
    deployer: 0,
    test_1: 1,
    test_2: 2,
    test_3: 3,
    test_4: 4,
    test_5: 5,
    test_6: 6,
    test_7: 7,
    test_8: 8,
    test_9: 9,
    test_10: 10,
  },
  
};

export default config;