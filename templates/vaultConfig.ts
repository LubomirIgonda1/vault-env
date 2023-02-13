import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// eslint-disable-next-line
['.env.vault', '.env'].forEach((name) => fs.existsSync(path.resolve(process.cwd(), `${name}`)) && dotenv.config({ path: name, override: true }))
