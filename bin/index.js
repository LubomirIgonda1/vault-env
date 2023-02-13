#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const config_1 = __importDefault(require("config"));
const node_vault_1 = __importDefault(require("node-vault"));
// utils
const helpers_1 = require("./utils/helpers");
// vars
const vaultConfig = config_1.default.get('vault');
async function getVaultSecrets() {
    // check if all config variables are set
    (0, helpers_1.checkConfigVars)(vaultConfig);
    // get env file path and add vault env file to .gitignore
    const envFilePath = (0, helpers_1.checkGitIgnoreFileAndGetEnvFilePath)();
    const vault = (0, node_vault_1.default)({
        endpoint: vaultConfig.url
    });
    if (!vault) {
        throw new Error('Vault var is not defined');
    }
    await vault.approleLogin({
        role_id: vaultConfig.roleID,
        secret_id: vaultConfig.secretID
    });
    const vaultSecrets = await vault.read(vaultConfig.secretsPath);
    const envVars = Object.keys(vaultSecrets.data).map((key) => `${key}=${vaultSecrets.data[key]}`);
    fs_1.default.writeFileSync(envFilePath, envVars.join(os_1.default.EOL));
    // add script for the overriding
    await (0, helpers_1.addConfigScript)();
    (0, helpers_1.addConfigImportToIndex)();
}
exports.default = (async () => {
    try {
        await getVaultSecrets();
    }
    catch (error) {
        /* eslint-disable-next-line no-console */
        console.log(error);
        process.exit(1);
    }
})();
