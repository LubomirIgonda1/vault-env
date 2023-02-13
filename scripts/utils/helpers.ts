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

// add config script to the utils directory (config script enables overriding the .env file)
export const addConfigScript = async () => {
	const configScriptPath = path.resolve(process.cwd(), 'src', 'utils', 'vaultConfig.ts')
	// create vault script in utils !!! project must have src/utils directory
	const templatePath = path.resolve(__dirname, '..', '..', 'templates', 'vaultConfig.ts')
	const vaultScript = fs.readFileSync(templatePath, 'utf-8')
	fs.writeFileSync(configScriptPath, vaultScript)
}

export const addConfigImportToIndex = () => {
	const indexFilePath = path.resolve(process.cwd(), 'src', 'index.ts')
	const vaultConfigImport = "import './utils/vaultConfig'\n\n"
	const indexContent = fs.readFileSync(indexFilePath, 'utf-8')

	if (!includes(indexContent, "import './utils/vaultConfig'")) {
		fs.rmSync(indexFilePath)
		fs.writeFileSync(indexFilePath, `${vaultConfigImport}${indexContent}`)
	}
}
