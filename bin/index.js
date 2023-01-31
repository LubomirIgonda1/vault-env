#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const config_1 = __importDefault(require("config"));
const node_vault_1 = __importDefault(require("node-vault"));
// vars
const envFilePath = path_1.default.resolve(process.cwd(), '.env.vault');
const vaultConfig = config_1.default.get('vault');
async function getVaultSecrets() {
    if (!vaultConfig.url) {
        throw new Error('vault url is missing!');
    }
    if (!vaultConfig.roleID) {
        throw new Error('vault roleID is missing!');
    }
    if (!vaultConfig.secretID) {
        throw new Error('vault roleID is missing!');
    }
    if (!vaultConfig.secretsPath) {
        throw new Error('vault secretsPath is missing!');
    }
    const vault = (0, node_vault_1.default)({
        endpoint: vaultConfig.url
    });
    await vault.approleLogin({
        role_id: vaultConfig.roleID,
        secret_id: vaultConfig.secretID
    });
    const vaultSecrets = await vault.read(vaultConfig.secretsPath);
    const envVars = Object.keys(vaultSecrets.data).map((key) => `${key}=${vaultSecrets.data[key]}`);
    fs_1.default.writeFileSync(envFilePath, envVars.join(os_1.default.EOL));
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
