module.exports = (plop) => {
	plop.setGenerator("icon", {
		actions: [
			{
				path: "src/icons/path/{{pascalCase name}}.tsx",
				templateFile: "plop-templates/icon.hbs",
				type: "add",
			},
			{
				path: "src/icons/index.ts",
				template:
					'export { default as {{pascalCase name}} } from "./path/{{pascalCase name}}";',
				type: "append",
			},
		],
		description: "Create a new icon component",
		prompts: [
			{
				message: "Icon name (for example: Arrow, Home, User):",
				name: "name",
				type: "input",
				validate: (value) => {
					if (!value) {
						return "Name of icon is required";
					}
					if (!/^[A-Z]/.test(value)) {
						return "Icon name should start with uppercase letter (PascalCase)";
					}
					return true;
				},
			},
		],
	});
};
