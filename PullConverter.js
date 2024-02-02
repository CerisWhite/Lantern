const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.join(__dirname, "palworld-save-tools-9b318faad574fb192c457471367cdbe407010c56", "convert.py"))) {
	const https = require('https');
	const Decompress = require('decompress');
	const ZipURL = "https://codeload.github.com/cheahjs/palworld-save-tools/zip/9b318faad574fb192c457471367cdbe407010c56";
	const ZipFile = fs.createWriteStream(path.join(__dirname, "PST.zip"))

	https.get(ZipURL, (Output) => {
		Output.pipe(ZipFile);
	});
	ZipFile.on('finish', () => {
		Decompress(path.join(__dirname, "PST.zip"), __dirname);
		fs.unlinkSync(path.join(__dirname, "PST.zip"));
	});
}