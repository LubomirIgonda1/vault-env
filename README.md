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
"vault": "npx --yes --node-options='-r ts-node/register -r ./dotenv.ts' https://github.com/GoodRequest/vault-env"
```

**Update scripts where you would like to run Vault script**
```
"prestart": "npm run vault && ...",
"debug": "npm run vault && ..."
```

**Add dotenv.ts script**
```
import dotenv from 'dotenv'


// eslint-disable-next-line
dotenv.config({ path: ['.env.vault', '.env'], override: true })
```

**Set process.env variables**
```
VAULT_URL
VAULT_ROLE_ID
VAULT_SECRET_ID
VAULT_SECRETS_PATH
```

**Load two .env and .env.vault by using dotenv.ts script**
```
"start": "node -r ts-node/register -r ./dotenv.ts index.ts"
```
