// native node packages
import fs from 'fs'
import path from 'path'

// 3rd party packages
import { includes } from 'lodash'

// types
import { IVaultConfig } from '../types/config'

// check if all config variables are set
export const checkConfigVars = (vaultConfig: IVaultConfig): void | never => {
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
}

// get env file path and add vault env file to .gitignore
export const checkGitIgnoreFileAndGetEnvFilePath = (envVaultFileName: undefined | string = undefined): string => {
	const envVaultFile = envVaultFileName || '.env.vault'
	const gitIgnorePath = path.resolve(process.cwd(), '.gitignore')

	if (!fs.existsSync(gitIgnorePath)) {
		fs.writeFileSync(gitIgnorePath, `# Vault -> preventing the publication of secret keys \n${envVaultFile}`)
	} else {
		const gitIgnoreFile = fs.readFileSync(gitIgnorePath, 'utf-8')
		if (!includes(gitIgnoreFile, envVaultFile)) {
			fs.appendFileSync(gitIgnorePath, envVaultFile)
		}
	}
	const envFilePath = path.resolve(process.cwd(), envVaultFile)

	return envFilePath
}
