module.exports = {
	extends: ['@goodrequest/eslint-config-typescript'],
	parserOptions: {
		project: 'tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	rules: {
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_'
			}
		]
	},
	overrides: [
		{
			files: ['tests/**'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/no-unused-expressions': 'off',
				'global-require': 'off',
				'import/no-dynamic-require': 'off',
				'no-console': 'off',
				'@typescript-eslint/no-explicit-any': 'off'
			}
		},
		{
			files: ['src/db/models/**'],
			rules: {
				'import/no-cycle': 'off',
				'no-param-reassign': 'off'
			}
		}
	]
}
