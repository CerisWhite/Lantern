# Lantern, a Palworld save-splitting/importing tool
This is a NodeJS script made for assisting with the modification of Palworld save data by extracting parts of the massive (usually > 1GB) JSON file produced by [Cheahjs' converter](https://github.com/cheahjs/palworld-save-tools) into smaller and far easier to manage files.

Currently this supports the following options:
- `ExportPals` | `node Lantern.js ExportPals ./Level.sav.json`
  - Splits the pal data into two categories: "Player" and "Pal", and saves them using their unique identifier.
- `ImportPals` | `node Lantern.js ImportPals ./Level.sav.json ./Output.json`
  - Imports the files created by `ExportPals` and writes it to a new JSON file. (The formatting of the new file is atrocious; Please do not try to view it in an editor.)

---

To use, install the `JSONStream` package with `npm install` and then use the commands listed above. Super easy.