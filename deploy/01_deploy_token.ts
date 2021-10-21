import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { utils } from 'ethers';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer, user, master_node, operator_node } = await getNamedAccounts();

    await deploy('TestToken', {
        from: deployer,
        proxy: {
            owner: deployer,
            proxyContract: 'OpenZeppelinTransparentProxy',
            execute: {
                init: {
                    args: [utils.parseEther('100000000000000')],
                    methodName: 'initializeToken'
                }
            }
        },
        log: true,
        deterministicDeployment: process.env.DETERMINISTIC === 'true',
    });
};

export default func;
func.tags = ['Token'];