"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGitIgnoreFileAndGetEnvFilePath = exports.checkConfigVars = void 0;
// native node packages
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// 3rd party packages
const lodash_1 = require("lodash");
// check if all config variables are set
const checkConfigVars = (vaultConfig) => {
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
};
exports.checkConfigVars = checkConfigVars;
// get env file path and add vault env file to .gitignore
const checkGitIgnoreFileAndGetEnvFilePath = (envVaultFileName = undefined) => {
    const envVaultFile = envVaultFileName || '.env.vault';
    const gitIgnorePath = path_1.default.resolve(process.cwd(), '.gitignore');
    if (!fs_1.default.existsSync(gitIgnorePath)) {
        fs_1.default.writeFileSync(gitIgnorePath, `# Vault -> preventing the publication of secret keys \n${envVaultFile}`);
    }
    else {
        const gitIgnoreFile = fs_1.default.readFileSync(gitIgnorePath, 'utf-8');
        if (!(0, lodash_1.includes)(gitIgnoreFile, envVaultFile)) {
            fs_1.default.appendFileSync(gitIgnorePath, envVaultFile);
        }
    }
    const envFilePath = path_1.default.resolve(process.cwd(), envVaultFile);
    return envFilePath;
};
exports.checkGitIgnoreFileAndGetEnvFilePath = checkGitIgnoreFileAndGetEnvFilePath;
