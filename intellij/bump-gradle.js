module.exports.readVersion = (body) => {
	return body.match(/group '.*?'\nversion '(?<version>.*?)'/)?.groups.version;
};

module.exports.writeVersion = (body, version) => {
	return body.replace(/(group '.*?'\nversion) '.*?'/, `$1 '${version}'`);
};
