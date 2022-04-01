module.exports.readVersion = (body) => {
	return body.match(/<version>(?<version>.*?)<\/version>/)?.groups.version;
};

module.exports.writeVersion = (body, version) => {
	return body.replace(
		/<version>.*?<\/version>/,
		`<version>${version}</version>`,
	);
};
