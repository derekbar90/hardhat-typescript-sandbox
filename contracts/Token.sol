// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";


contract TestToken is 
    ERC20PresetMinterPauserUpgradeable,
    ERC20SnapshotUpgradeable,
    OwnableUpgradeable {

    function initializeToken(uint256 initialSupply) public initializer {
        __Ownable_init();
        __ERC20Snapshot_init();
        __ERC20PresetMinterPauser_init("Shadow Coder Project", "TEST");
        _mint(msg.sender, initialSupply);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    )
        internal
        virtual
        override (
            ERC20SnapshotUpgradeable,
            ERC20PresetMinterPauserUpgradeable
        )
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function createSnapshot() public virtual returns (uint256) {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "ERC20PresetMinterPauser: must have admin role to snapshot"
        );
        return _snapshot();
    }
}