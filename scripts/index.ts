#! /usr/bin/env node
import fs from 'fs'
import os from 'os'
import config from 'config'
import Vault from 'node-vault'

// utils
import { checkConfigVars, checkGitIgnoreFileAndGetEnvFilePath } from './utils/helpers'

// types
import { IVaultConfig } from './types/config'

// vars
const vaultConfig = config.get('vault') as IVaultConfig

async function getVaultSecrets() {
	// check if all config variables are set
	checkConfigVars(vaultConfig)
	// get env file path and add vault env file to .gitignore
	const envFilePath = checkGitIgnoreFileAndGetEnvFilePath()
	const vault = Vault({
		endpoint: vaultConfig.url
	})

	if (!vault) {
		throw new Error('Vault var is not defined')
	}

	await vault.approleLogin({
		role_id: vaultConfig.roleID,
		secret_id: vaultConfig.secretID
	})

	const vaultSecrets = await vault.read(vaultConfig.secretsPath)
	const envVars = Object.keys(vaultSecrets.data).map((key) => `${key}=${vaultSecrets.data[key]}`)
	fs.writeFileSync(envFilePath, envVars.join(os.EOL))
}

export default (async () => {
	try {
		await getVaultSecrets()
	} catch (error) {
		/* eslint-disable-next-line no-console */
		console.log(error)
	}
})()
