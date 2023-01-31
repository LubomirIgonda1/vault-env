#! /usr/bin/env node
import path from 'path'
import fs from 'fs'
import os from 'os'
import config from 'config'
import Vault from 'node-vault'

// types
import { IVaultConfig } from './types/config'

// vars
const envFilePath = path.resolve(process.cwd(), '.env.vault')
const vaultConfig = config.get('vault') as IVaultConfig

async function getVaultSecrets() {
	if (!vaultConfig.url) {
		throw new Error('vault url is missing!')
	}

	if (!vaultConfig.roleID) {
		throw new Error('vault roleID is missing!')
	}

	if (!vaultConfig.secretID) {
		throw new Error('vault roleID is missing!')
	}

	if (!vaultConfig.secretsPath) {
		throw new Error('vault secretsPath is missing!')
	}

	const vault = Vault({
		endpoint: vaultConfig.url
	})

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
		process.exit(1)
	}
})()
