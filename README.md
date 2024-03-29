# Lantern, a Palworld save-splitting/importing tool
This is a NodeJS script made for assisting with the modification of Palworld save data by extracting parts of the massive (usually >1GB) JSON file produced by [Cheahjs' converter](https://github.com/cheahjs/palworld-save-tools) into smaller and far easier to manage files.

Currently this supports the following options:
- `ExportPals` | `node Lantern.js ExportPals ./Level.sav.json`
  - Splits the pal data into two categories: "Player" and "Pal", and saves them using their unique identifier.
- `ImportPals` | `node Lantern.js ImportPals ./Level.sav.json ./Output.json`
  - Imports the files created by `ExportPals` and writes it to a new JSON file. (The formatting of the new file is atrocious; Please do not try to view it in an editor.)
- `ExportInventory` | `node Lantern.js ExportInventory ./Level.sav.json ./Player.sav`
  - Exports the inventory containers for the selected character to `Save/Items/<Player Name>`

#### Note: While the command `ImportInventory` exists, and works on normal items, it will break armor and weapons due to not setting data such as durability. Please do not use this until it is fixed unless you absolutely must.
---

To use, run `npm install` and then use the commands listed above. Super easy.
