module.exports = {
	parserPreset: {
		parserOpts: {
			headerCorrespondence: ["bracketType", "type", "scope", "subject"],
			headerPattern: /^(?:\[([^\]]+)\])?(\w+)(?:\(([^)]+)\))?: (.+)$/,
		},
	},
	plugins: [
		{
			rules: {
				"scope-no-persian": ({ scope }) => {
					if (!scope) {
						return [true];
					}
					const persianPattern = /[\u0600-\u06FF]/;
					if (persianPattern.test(scope)) {
						return [
							false,
							"❌ Scope cannot contain Persian characters. Use English only.",
						];
					}
					return [true];
				},
				"subject-no-persian": ({ subject }) => {
					const persianPattern = /[\u0600-\u06FF]/;
					if (persianPattern.test(subject)) {
						return [
							false,
							"❌ Subject cannot contain Persian characters. Use English only.",
						];
					}
					return [true];
				},
			},
		},
	],
	rules: {
		"body-leading-blank": [1, "always"],
		"body-max-line-length": [2, "always", 100],
		"footer-leading-blank": [1, "always"],
		"footer-max-line-length": [2, "always", 100],
		"header-max-length": [2, "always", 100],
		"header-min-length": [2, "always", 10],
		"scope-case": [0],
		"scope-empty": [0],
		"scope-max-length": [2, "always", 20],
		"scope-min-length": [2, "always", 2],
		"scope-no-persian": [2, "always"],
		"subject-case": [0],
		"subject-empty": [2, "never"],
		"subject-exclamation-mark": [2, "never", "!"],
		"subject-full-stop": [2, "never", "."],
		"subject-max-length": [2, "always", 72],
		"subject-min-length": [2, "always", 5],
		"subject-no-persian": [2, "always"],
		"type-case": [0],
		"type-empty": [2, "never"],
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"FEAT",
				"fix",
				"FIX",
				"docs",
				"DOCS",
				"style",
				"STYLE",
				"refactor",
				"REFACTOR",
				"perf",
				"PERF",
				"test",
				"TEST",
				"build",
				"BUILD",
				"ci",
				"CI",
				"chore",
				"CHORE",
				"revert",
				"REVERT",
				"update",
				"UPDATE",
			],
		],
	},
};
