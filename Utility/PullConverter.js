const fs = require('fs');
const path = require('path');
const https = require('https');
const Decompress = require('decompress');

/*if (!fs.existsSync(path.join(__dirname, "..", "Data", "palworld-save-tools-9b318faad574fb192c457471367cdbe407010c56", "uesave.exe"))) {
	const UESaveURL = "https://github.com/trumank/uesave-rs/releases/download/v0.3.0/uesave-x86_64-pc-windows-msvc.zip";
	const UESaveFile = fs.createWriteStream(path.join(__dirname, "..", "Data", "UESave.zip"));
	
	https.get(UESaveURL, (res) => {
		const CanonURL = res.headers['Location'];
		https.get(CanonURL, (Output) => {
			Output.pipe(UESaveFile);
		});
	});
	UESaveFile.on('finish', () => {
		Decompress(path.join(__dirname, "..", "Data", "UESave.zip"), path.join(__dirname, "..", "Data", "palworld-save-tools"));
	});
}*/

if (!fs.existsSync(path.join(__dirname, "..", "Data", "palworld-save-tools-9b318faad574fb192c457471367cdbe407010c56", "convert.py"))) {
	const ZipURL = "https://codeload.github.com/cheahjs/palworld-save-tools/zip/9b318faad574fb192c457471367cdbe407010c56";
	const ZipFile = fs.createWriteStream(path.join(__dirname, "..", "Data", "PST.zip"))

	https.get(ZipURL, (Output) => {
		Output.pipe(ZipFile);
	});
	ZipFile.on('finish', () => {
		Decompress(path.join(__dirname, "..", "Data", "PST.zip"), path.join(__dirname, "..", "Data"));
		fs.unlinkSync(path.join(__dirname, "..", "Data", "PST.zip"));
	});
}