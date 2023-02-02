# Vault-env
The script adds .env.vault to the project and .gitignore file. According the *Vault* project configuration, script downloads relevant **env variables**

## Prerequisite
Project has to have implemented the identity-based secrets and encryption management system management [Vault](https://www.vaultproject.io/). In project config file must be set *vault object* using interface:
```javascript
export interface IVaultConfig {
	url: string
	roleID: string
	secretID: string
	secretsPath: string
}
```

And in *.env* file must be set the following variables
```env
VAULT_URL=******
VAULT_ROLE_ID=******
VAULT_SECRET_ID=******
```
## Usage
It is a good idea to clear the *npx cache* before running the script by following command (MacOs):
```bash
rm -rf ~/.npm/_npx
```

Script starts with the following command:
``` bash
npx GoodRequest/vault-env
```

## Description
Script creates *.env.vault* file and add it to *.gitignore* file. In *.env.vault* fille are stored all env variables and secrets form *Vault* for project. Every env variable is possible to override in *.env* file




