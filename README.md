# Vault-env
The script adds .env.vault to the project and .gitignore file. According the *Vault* project configuration, script downloads relevant **env variables**

## Description
Script creates *.env.vault* file and add it to *.gitignore* file. In *.env.vault* fille are stored all env variables and secrets form *Vault* for project. Every env variable is possible to override in *.env* file

## Prerequisites
Project has to have implemented the identity-based secrets and encryption management system management [Vault](https://www.vaultproject.io/). 

**For using in Goodrequest** you have to be in **Goodrequest VPN**
## Usage
It is a good idea to clear the *npx cache* before running the script by following command (MacOs):
```bash
rm -rf ~/.npm/_npx
```
**Add Vault script to package.json**
```
"vault": "npx --yes https://github.com/GoodRequest/vault-env"
```

**Update scripts where you would like to run Vault script**
```
"prestart": "npm run vault && ...",
"debug": "npm run vault && ..."
```

**Add vaultConfig script**
```
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// eslint-disable-next-line
['.env.vault', '.env'].forEach((name) => fs.existsSync(path.resolve(__dirname, `../../${name}`)) && dotenv.config({ path: name, override: true }))
```

**Add config**
```
vault: {
	url: process.env.VAULT_URL,
	roleID: process.env.VAULT_ROLE_ID,
	secretID: process.env.VAULT_SECRET_ID,
	secretsPath: process.env.VAULT_SECRETS_PATH || 'backend/PROJECT_NAME/backend/dev'
}
```

**Add config type**
```
export interface IVaultConfig {
	url: string
	roleID: string
	secretID: string
	secretsPath: string
}
```

**Update config/default.ts**
```
import 'dotenv/config' // As a first line
...
```

**Update src/index.ts config/database.ts envValidation.ts**
```
import './utils/vaultConfig' // As a first line
...
```




