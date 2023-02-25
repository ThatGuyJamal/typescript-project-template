const { Changelog, Release } = require("keep-a-changelog");
const fs = require("node:fs");

function createChangeLog() {
	//Try to read a changelog file
	try {
		fs.readFileSync("./.github/CHANGELOG.md", "UTF-8");
	} catch (err) {
		//If there is an error, create a new changelog file
		if (err.code === "ENOENT") {
			fs.writeFileSync("./.github/CHANGELOG.md", "");
			console.log("Created a new ./.github/CHANGELOG.md file.");
			return createChangeLog();
		}
		throw err;
	}

	const changelog = new Changelog(
		"your-project-name",
		"your-project-description"
	).addRelease(
		new Release("1.0.0", "2021-01-01", "Initial release.")
			.added("Added a new feature.")
			.fixed("Fixed a bug.")
			.changed("Changed something.")
			.security("Fixed a security issue.")
			.removed("Removed something.")
	);

	//Write the changelog to a file
	fs.writeFileSync("./.github/CHANGELOG.md", changelog.toString())
    console.log("Created a new ./.github/CHANGELOG.md file.");
}

createChangeLog();
