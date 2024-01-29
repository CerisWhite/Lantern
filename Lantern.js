// Lantern, a Palworld save "manager", made with <3 by Ceris

const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

const PalName = JSON.parse(fs.readFileSync(path.join(__dirname, "Data", "PalList.json")));
const ItemName = JSON.parse(fs.readFileSync(path.join(__dirname, "Data", "ItemList.json")));

const SavePath = path.join(__dirname, "Save");
if (!fs.existsSync(SavePath)) { fs.mkdirSync(SavePath); }
const DefStructID = "00000000-0000-0000-0000-000000000000";

function ExportPal(CharacterData) {
	const PalData = CharacterData['value']['RawData']['value']['object']['SaveParameter']['value'];
	let CraftCompatibility = [];
	for (let y in PalData['CraftSpeeds']['value']['values']) {
		CraftCompatibility.push({
			'Type': PalData['CraftSpeeds']['value']['values'][y]['WorkSuitability']['value']['value'],
			'Level': PalData['CraftSpeeds']['value']['values'][y]['Rank']['value']
		});
	}
	let StatAllocations = [];
	for (let z in PalData['GotStatusPointList']['value']['values']) {
		StatAllocations.push({
			'Value': PalData['GotStatusPointList']['value']['values'][z]['StatusName']['value'],
			'Count': PalData['GotStatusPointList']['value']['values'][z]['StatusPoint']['value']
		});
	}
	let EntryData = {}
	if (PalData['IsPlayer'] != undefined && PalData['IsPlayer']['value'] == true) {
		EntryData = {
			'PalType': "Player",
			'PlayerID': CharacterData['key']['PlayerUId']['value'],
			'InstanceID': CharacterData['key']['InstanceId']['value'],
			'GroupID': CharacterData['value']['RawData']['value']['group_id'],
			'Name': PalData['NickName']['value'],
			'Level': 0,
			'EXP': 0,
			'MaxHP': 0,
			'HP': 0,
			'MaxShield': 0,
			'Shield': 0,
			'MaxStamina': 0,
			'Sanity???': 0,
			'UnusedStatusPoints': 0,
			'UsedStatusPoints': StatAllocations,
			'Stomach': PalData['FullStomach']['value'],
			'Support': PalData['Support']['value'],
			'CraftSpeed': PalData['CraftSpeed']['value'],
			'CraftCompatibility': CraftCompatibility,
			'VoiceID': PalData['VoiceID']['value']
		}
		
		if (PalData['Level'] != undefined) {
			EntryData['Level'] = PalData['Level']['value'];
		}
		if (PalData['Exp'] != undefined) {
			EntryData['EXP'] = PalData['Exp']['value']
		}
		if (PalData['MaxHP'] != undefined) {
			EntryData['MaxHP'] = PalData['MaxHP']['value']['Value']['value'];
		}
		if (PalData['HP'] != undefined) {
			EntryData['HP'] = PalData['HP']['value']['Value']['value'];
		}
		if (PalData['ShieldMaxHP'] != undefined) {
			EntryData['MaxShield'] = PalData['ShieldMaxHP']['value']['Value']['value'];
		}
		if (PalData['ShieldHP'] != undefined) {
			EntryData['Shield'] = PalData['ShieldHP']['value']['Value']['value'];
		}
		if (PalData['MaxSP'] != undefined) {
			EntryData['MaxStamina'] = PalData['MaxSP']['value']['Value']['value'];
		}
		if (PalData['SanityValue'] != undefined) {
			EntryData['Sanity???'] = PalData['SanityValue']['value'];
		}
		if (PalData['UnusedStatusPoint'] != undefined) {
			EntryData['UnusedStatusPoints'] = PalData['UnusedStatusPoint']['value'];
		}
	}
	else {
		EntryData = {
			'PalType': "Pal",
			'PlayerID': CharacterData['key']['PlayerUId']['value'],
			'InstanceID': CharacterData['key']['InstanceId']['value'],
			'GroupID': CharacterData['value']['RawData']['value']['group_id'],
			'InternalName': PalData['CharacterID']['value'],
			'DisplayName': PalName[PalData['CharacterID']['value']],
			'Nickname': "",
			'Gender': "",
			'Level': 0,
			'EXP': 0,
			'EquippedSkills': PalData['EquipWaza']['value']['values'],
			'LearnedSkills': PalData['MasteredWaza']['value']['values'],
			'MaxHP': 0,
			'HP': 0,
			'MP???': 0,
			'TalentValues': {},
			'UsedStatusPoints': StatAllocations,
			'MaxStomach': 0,
			'Stomach': 0,
			'CraftSpeed': PalData['CraftSpeed']['value'],
			'CraftCompatibility': CraftCompatibility,
			'PassiveSkills': [],
			'CaughtTime': PalData['OwnedTime']['value'],
			'OwnerID': PalData['OwnerPlayerUId']['value'],
			'PreviousOwnerIDs': PalData['OldOwnerPlayerUIds']['value']['values'],
			'EquipItemID': PalData['EquipItemContainerId']['value']['ID']['value'],
			'SlotID': {
				'SlotType': PalData['SlotID']['value']['ContainerId']['value']['ID']['value'],
				'SlotIndex': PalData['SlotID']['value']['SlotIndex']['value']
			},
			'IsLuckyPal': false,
			'IsAlphaPal': false
		}
		if (PalData['NickName'] != undefined && PalData['NickName']['value'] != "") {
			EntryData['Nickname'] = PalData['NickName']['value'];
		}
		if (PalData['Gender'] != undefined) {
			EntryData['Gender'] = PalData['Gender']['value']['value'];
		}
		if (PalData['Level'] != undefined) {
			EntryData['Level'] = PalData['Level']['value'];
		}
		if (PalData['Exp'] != undefined) {
			EntryData['EXP'] = PalData['Exp']['value'];
		}
		if (PalData['MaxHP'] != undefined) {
			EntryData['MaxHP'] = PalData['MaxHP']['value']['Value']['value'];
		}
		if (PalData['HP'] != undefined) {
			EntryData['HP'] = PalData['HP']['value']['Value']['value'];
		}
		if (PalData['MP'] != undefined) {
			EntryData['MP???'] = PalData['MP']['value']['Value']['value'];
		}
		if (PalData['MaxFullStomach'] != undefined) {
			EntryData['MaxStomach'] = PalData['MaxFullStomach']['value'];
		}
		if (PalData['FullStomach'] != undefined) {
			EntryData['Stomach'] = PalData['FullStomach']['value'];
		}
		if (PalData['Talent_HP'] != undefined) {
			EntryData['TalentValues']['HP'] = PalData['Talent_HP']['value'];
		}
		if (PalData['Talent_Melee'] != undefined) {
			EntryData['TalentValues']['Melee'] = PalData['Talent_Melee']['value'];
		}
		if (PalData['Talent_Shot'] != undefined) {
			EntryData['TalentValues']['Range'] = PalData['Talent_Shot']['value'];
		}
		if (PalData['Talent_Defense'] != undefined) {
			EntryData['TalentValues']['Defense'] = PalData['Talent_Defense']['value'];
		}
		if (PalData['PassiveSkillList'] != undefined) {
			EntryData['PassiveSkills'] = PalData['PassiveSkillList']['value']['values'];
		}
		if (PalData['CharacterID']['value'].startsWith("BOSS_") || PalData['CharacterID']['value'].startsWith("Boss_")) {
			const RealName = PalData['CharacterID']['value'].slice(5);
			if (PalData['IsRarePal'] != undefined && PalData['IsRarePal']['value'] == true) {
				EntryData['IsLuckyPal'] = true;
			}
			else {
				EntryData['IsAlphaPal'] = true;
			}
		}
	}
	return EntryData;
}

function ImportPal(EntryData) {
	let ConvertedEntry = {
		'key': {
			'PlayerUId': {
				'struct_type': "Guid",
				'struct_id': DefStructID,
				'id': null,
				'value': EntryData['PlayerID'],
				'type': "StructProperty"
			},
			'InstanceId': {
				'struct_type': "Guid",
				'struct_id': DefStructID,
				'id': null,
				'value': EntryData['InstanceID'],
				'type': "StructProperty"
			},
			'DebugName': {
				'id': null,
				'value': "",
				'type': "StrProperty"
			}
		},
		'value': {
			'RawData': {
				'array_type': "ByteProperty",
				'id': null,
				'value': {
					'object': {
						'SaveParameter': {
							'struct_type': "PalIndividualCharacterSaveParameter",
							'struct_id': DefStructID,
							'id': null,
							'value': {},
							'type': "StructProperty"
						}
					},
					'unknown_bytes': [ 0, 0, 0, 0 ], // always all zero?
					'group_id': EntryData['GroupID']
				},
				'type': "ArrayProperty",
				'custom_type': ".worldSaveData.CharacterSaveParameterMap.Value.RawData"
			}
		}
	}
	let ConvertedCraftCompatibility = [];
	for (let y in EntryData['CraftCompatibility']) {
		ConvertedCraftCompatibility.push({
			'WorkSuitability': {
				'id': null,
				'value': {
					'type': "EPalWorkSuitability",
					'value': EntryData['CraftCompatibility'][y]['Type']
				},
				'type': "EnumProperty"
			},
			'Rank': {
				'id': null,
				'value': EntryData['CraftCompatibility'][y]['Level'],
				'type': "IntProperty"
			}
		});
	}
	let ConvertedStatAllocation = [];
	for (let z in EntryData['UsedStatusPoints']) {
		ConvertedStatAllocation.push({
			'StatusName': {
				'id': null,
				'value': EntryData['UsedStatusPoints'][z]['Value'],
				'type': "NameProperty"
			},
			'StatusPoint': {
				'id': null,
				'value': EntryData['UsedStatusPoints'][z]['Count'],
				'type': "IntProperty"
			}
		});
	}

	if (EntryData['PalType'] == "Player") {
		ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value'] = {
			'Level': { 'id': null, 'value': EntryData['Level'], 'type': "IntProperty" },
			'Exp': { 'id': null, 'value': EntryData['EXP'], 'type': "IntProperty" },
			'NickName': { 'id': null, 'value': EntryData['Name'], 'type': "StrProperty" },
			'IsPlayer': { 'id': null, 'value': true, 'type': "BoolProperty" },
			'MaxHP': {
				'struct_type': "FixedPoint64",
				'struct_id': DefStructID,
				'id': null,
				'value': {
					'Value': { 'id': null, 'value': EntryData['MaxHP'], 'type': "Int64Property" }
				},
				'type': "StructProperty"
			},
			// TWFkZSB3aXRoID
			'HP': {
				'struct_type': "FixedPoint64",
				'struct_id': DefStructID,
				'id': null,
				'value': {
					'Value': { 'id': null, 'value': EntryData['HP'], 'type': "Int64Property" }
				},
				'type': "StructProperty"
			},
			'GotStatusPointList': {
				'array_type': "StructProperty",
				'id': null,
				'value': {
					'prop_name': "GotStatusPointList",
					'prop_type': "StructProperty",
					'values': ConvertedStatAllocation,
					'type_name': "PalGotStatusPoint",
					'id': DefStructID
				},
				'type': "ArrayProperty"
			},
			'FullStomach': { 'id': null, 'value': EntryData['Stomach'], 'type': "FloatProperty" },
			'Support': { 'id': null, 'value': EntryData['Support'], 'type': "IntProperty" },
			'CraftSpeed': { 'id': null, 'value': EntryData['CraftSpeed'], 'type': "IntProperty" },
			'CraftSpeeds': {
				'array_type': "StructProperty",
				'id': null,
				'value': {
					'prop_name': "CraftSpeeds",
					'prop_type': "StructProperty",
					'values': ConvertedCraftCompatibility,
					'type_name': "PalWorkSuitabilityInfo",
					'id': DefStructID
				},
				'type': "ArrayProperty"
			},
			'VoiceID': { 'id': null, 'value': EntryData['VoiceID'], 'type': "IntProperty" }
		}
			
		if (EntryData['MaxShield'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['ShieldMaxHP'] = {
				'struct_type': "FixedPoint64",
				'struct_id': DefStructID,
				'id': null,
				'value': {
					'Value': { 'id': null, 'value': EntryData['MaxShield'], 'type': "Int64Property" }
				},
				'type': "StructProperty"
			}
		}
		if (EntryData['Shield'] != 0) {
		ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['ShieldHP'] = {
				'struct_type': "FixedPoint64",
				'struct_id': DefStructID,
				'id': null,
				'value': {
					'Value': { 'id': null, 'value': EntryData['Shield'], 'type': "Int64Property" }
				},
				'type': "StructProperty"
			}
		}
		if (EntryData['MaxStamina'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['MaxSP'] = {
				'struct_type': "FixedPoint64",
				'struct_id': DefStructID,
				'id': null,
				'value': {
					'Value': { 'id': null, 'value': EntryData['MaxStamina'], 'type': "Int64Property" }
				},
				'type': "StructProperty"
			}
		}
		if (EntryData['Sanity???'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['SanityValue'] = { 'id': null, 'value': EntryData['Sanity???'], 'type': "FloatProperty" }
		}
		if (EntryData['UnusedStatusPoints'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['UnusedStatusPoint'] = { 'id': null, 'value': EntryData['UnusedStatusPoints'], 'type': "IntProperty" }
		}
	}
	else {
		ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value'] = {
			'CharacterID': { 'id': null, 'value': EntryData['InternalName'], 'type': "NameProperty" },
			'EquipWaza': {
				'array_type': "EnumProperty",
				'id': null,
				'value': {
					'values': EntryData['EquippedSkills']
				},
				'type': "ArrayProperty"
			},
			'MasteredWaza': {
				'array_type': "EnumProperty",
				'id': null,
				'value': {
					'values': EntryData['LearnedSkills']
				},
				'type': "ArrayProperty"
			},
			'GotStatusPointList': {
				'array_type': "StructProperty",
				'id': null,
				'value': {
					'prop_name': "GotStatusPointList",
					'prop_type': "StructProperty",
					'values': ConvertedStatAllocation,
					'type_name': "PalGotStatusPoint",
					'id': DefStructID
				},
				'type': "ArrayProperty"
			},
			'CraftSpeed': { 'id': null, 'value': EntryData['CraftSpeed'], 'type': "IntProperty" },
			'CraftSpeeds': {
				'array_type': "StructProperty",
				'id': null,
				'value': {
					'prop_name': "CraftSpeeds",
					'prop_type': "StructProperty",
					'values': ConvertedCraftCompatibility,
					'type_name': "PalWorkSuitabilityInfo",
					'id': DefStructID
				},
				'type': "ArrayProperty"
			},
			'OwnedTime': {
				'struct_type': "DateTime",
				'struct_id': DefStructID,
				'id': null,
				'value': EntryData['CaughtTime'],
				'type': "StructProperty"
			},
			'OwnerPlayerUId': {
				'struct_type': "Guid",
				'struct_id': DefStructID,
				'id': null,
				'value': EntryData['OwnerID'],
				'type': "StructProperty"
			},
			// wzIGJ5IENlcmlzIQ==
			'OldOwnerPlayerUIds': {
				'array_type': "StructProperty",
				'id': null,
				'value': {
					'prop_name': "OldOwnerPlayerUIds",
					'prop_type': "StructProperty",
					'values': EntryData['PreviousOwnerIDs'],
					'type_name': "Guid",
					'id': DefStructID
				},
				'type': "ArrayProperty"
			},
			'EquipItemContainerId': {
				'struct_type': "PalContainerId",
				'struct_id': DefStructID,
				'id': null,
				'value': {
					'ID': {
						"struct_type": "Guid",
						"struct_id": DefStructID,
						'id': null,
						'value': EntryData['EquipItemID'],
						'type': "StructProperty"
					}
				},
				'type': "StructProperty"
			},
			'SlotID': {
				'struct_type': "PalCharacterSlotId",
				'struct_id': DefStructID,
				'id': null,
				'value': {
					'ContainerId': {
						'struct_type': "PalContainerId",
						'struct_id': DefStructID,
						'id': null,
						'value': {
							'ID': {
								'struct_type': "Guid",
								'struct_id': DefStructID,
								'id': null,
								'value': EntryData['SlotID']['SlotType'],
								'type': "StructProperty"
							}
						},
						'type': "StructProperty"
					},
					"SlotIndex": { 'id': null, 'value': EntryData['SlotID']['SlotIndex'], 'type': "IntProperty" }
				},
				'type': "StructProperty"
			}
		}
		
		if (EntryData['Nickname'] != "") {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['NickName'] = { 'id': null, 'value': EntryData['Nickname'], 'type': "StrProperty" };
		}
		if (EntryData['Gender'] != "") {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['Gender'] = {
				'id': null,
				'value': {
					'type': "EPalGenderType",
					'value': EntryData['Gender']
				},
				'type': "EnumProperty"
			};
		}
		if (EntryData['Level'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['Level'] = { 'id': null, 'value': EntryData['Level'], 'type': "IntProperty" };
		}
		if (EntryData['EXP'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['Exp'] = { 'id': null, 'value': EntryData['EXP'], 'type': "IntProperty" };
		}
		if (EntryData['MaxHP'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['MaxHP'] = {
				'struct_type': "FixedPoint64",
				'struct_id': DefStructID,
				'id': null,
				'value': {
					'Value': { 'id': null, 'value': EntryData['MaxHP'], 'type': "Int64Property" }
				},
				'type': "StructProperty"
			}
		}
		if (EntryData['HP'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['HP'] = {
				'struct_type': "FixedPoint64",
				'struct_id': DefStructID,
				'id': null,
				'value': {
					'Value': { 'id': null, 'value': EntryData['HP'], 'type': "Int64Property" }
				},
				'type': "StructProperty"
			}
		}
		if (EntryData['MP???'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['MP'] = {
				'struct_type': "FixedPoint64",
				'struct_id': DefStructID,
				'id': null,
				'value': {
					'Value': { 'id': null, 'value': EntryData['MP???'], 'type': "Int64Property" }
				},
				'type': "StructProperty"
			}
		}
		if (EntryData['MaxStomach'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['MaxFullStomach'] = { 'id': null, 'value': EntryData['MaxStomach'], 'type': "FloatProperty" };
		}
		if (EntryData['Stomach'] != 0) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['FullStomach'] = { 'id': null, 'value': EntryData['Stomach'], 'type': "FloatProperty" };
		}
		if (EntryData['TalentValues']['HP'] != undefined) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['Talent_HP'] = { 'id': null, 'value': EntryData['TalentValues']['HP'], 'type': "IntProperty" };
		}
		if (EntryData['TalentValues']['Melee'] != undefined) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['Talent_Melee'] = { 'id': null, 'value': EntryData['TalentValues']['Melee'], 'type': "IntProperty" };
		}
		if (EntryData['TalentValues']['Range'] != undefined) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['Talent_Shot'] = { 'id': null, 'value': EntryData['TalentValues']['Range'], 'type': "IntProperty" };
		}
		if (EntryData['TalentValues']['Defense'] != undefined) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['Talent_Defense'] = { 'id': null, 'value': EntryData['TalentValues']['Defense'], 'type': "IntProperty" };
		}
		if (EntryData['PassiveSkills'] != []) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['PassiveSkillList'] = { 
				'array_type': "NameProperty",
				'id': null,
				'value': {
					'values': EntryData['PassiveSkills']
				},
				'type': "ArrayProperty"
			}
		}
		if (EntryData['IsLuckyPal'] == true) {
			ConvertedEntry['value']['RawData']['value']['object']['SaveParameter']['value']['IsRarePal'] = { 'id': null, 'value': true, 'type': "BoolProperty" };
		}
	}
	return ConvertedEntry;
}

function ExportItemSlot(ItemData) {
	const EntryData = {
		'ID': ItemData['key']['ID']['value'],
		'GroupID': ItemData['value']['BelongInfo']['value']['GroupID']['value'],
		'SlotData': [],
		'RawData': ItemData['value']['RawData']['value']['values'],
		'UnknownID': ItemData['value']['Slots']['value']['id']
	}
	const SlotInfo = ItemData['value']['Slots']['value']['values'];
	for (let s in SlotInfo) {
		EntryData['SlotData'].push({
			'InternalName': SlotInfo[s]['ItemId']['value']['StaticId']['value'],
			'DisplayName': ItemName[SlotInfo[s]['ItemId']['value']['StaticId']['value']],
			'SlotIndex': SlotInfo[s]['SlotIndex']['value'],
			'Count': SlotInfo[s]['StackCount']['value']
		});
	}
	return EntryData;
}

let Parser = "";
let Stringifier = "";
let SaveFile = "";
let SaveData = "";
let CaseBypass = 0;
switch(process.argv[2]) {
	case "ExportPals":
		if (!fs.existsSync(path.join(SavePath, "PalData"))) { fs.mkdirSync(path.join(SavePath, "PalData")); }
		if (!fs.existsSync(path.join(SavePath, "PalData", "Player"))) { fs.mkdirSync(path.join(SavePath, "PalData", "Player")); }
		if (!fs.existsSync(path.join(SavePath, "PalData", "Pal"))) { fs.mkdirSync(path.join(SavePath, "PalData", "Pal")); }
		Parser = JSONStream.parse("properties.worldSaveData.value.CharacterSaveParameterMap.value");
		SaveFile = fs.createReadStream(process.argv[3]);
		SaveFile.pipe(Parser);
		Parser.on('data', (SaveData) => {
			for (let x in SaveData) {
				const Parsed = ExportPal(SaveData[x]);
				fs.writeFileSync(path.join(SavePath, "PalData", Parsed['PalType'], Parsed['InstanceID'] + ".json"), JSON.stringify(Parsed, null, 2));
			}
		});
	break;
	case "ImportPals":
		let FileList = [];
		const PlayerList = fs.readdirSync(path.join(SavePath, "PalData", "Player"));
		const PalList = fs.readdirSync(path.join(SavePath, "PalData", "Pal"));
		for (let p in PlayerList) { FileList.push(path.join(SavePath, "PalData", "Player", PlayerList[p])); }
		for (let p in PalList) { FileList.push(path.join(SavePath, "PalData",  "Pal", PalList[p])); }
		
		let NewParamMap = [];
		for (let x in FileList) {
			const EntryData = JSON.parse(fs.readFileSync(FileList[x]));
			NewParamMap.push(ImportPal(EntryData));
		}
		
		Parser = JSONStream.parse("*");
		Stringifier = JSONStream.stringify(open="", sep="\n,\n", close="");
		SaveFile = fs.createReadStream(process.argv[3]);
		SaveFile.pipe(Parser);
		
		let Counter = 0;
		let NewSave = {};
		Parser.on('data', (SaveData) => {
			if (Counter == 0) {
				NewSave['header'] = SaveData;
			}
			else if (Counter == 1) {
				NewSave['properties'] = SaveData;
				NewSave['properties']['worldSaveData']['value']['CharacterSaveParameterMap']['value'] = NewParamMap;
			}
			else if (Counter == 2) {
				NewSave['trailer'] = SaveData;
				OutputFile = fs.createWriteStream(process.argv[4]);
				Stringifier.write(NewSave);
			}
			Counter++;
		});
		Stringifier.on('data', (data) => {
			OutputFile.write(data);
		});
	break;
	case "SplitSave":
		if (!fs.existsSync(path.join(__dirname, "Split"))) { fs.mkdirSync(path.join(__dirname, "Split")); }
		Parser = JSONStream.parse("properties.worldSaveData.value");
		SaveFile = fs.createReadStream(process.argv[3]);
		SaveFile.pipe(Parser);
		
		Parser.on('data', (SaveData) => {
			const ObjectList = Object.keys(SaveData);
			for (let l in ObjectList) {
				const OutputName = ObjectList[l] + '.json';
				const OutputFile = fs.writeFileSync(path.join(__dirname, "Split", OutputName), JSON.stringify(SaveData[ObjectList[l]], null, '\t'));
			}
		});
	break;
	case "ExportInventory":
		if (!fs.existsSync(path.join(SavePath, "Items"))) { fs.mkdirSync(path.join(SavePath, "Items")); }
		Parser = JSONStream.parse("properties.worldSaveData.value");
		SaveFile = fs.createReadStream(process.argv[3]);
		SaveFile.pipe(Parser);
		Parser.on('data', (Data) => {
			const ItemData = Data['ItemContainerSaveData']['value'];
			const PlayerData = JSON.parse(fs.readFileSync(process.argv[4]));
			const PlayerInstanceID = PlayerData['properties']['SaveData']['value']['IndividualId']['value']['InstanceId']['value'];
			const PlayerInventoryIDList = PlayerData['properties']['SaveData']['value']['inventoryInfo']['value'];
			const PlayerParameterIndex = Data['CharacterSaveParameterMap']['value'].findIndex(x => x.key.InstanceId.value == PlayerInstanceID);
			if (PlayerParameterIndex == -1) { console.log("Player not found in world."); return; }
			const PlayerName = Data['CharacterSaveParameterMap']['value'][PlayerParameterIndex]['value']['RawData']['value']['object']['SaveParameter']['value']['NickName']['value'];
			if (!fs.existsSync(path.join(SavePath, "Items", PlayerName))) { fs.mkdirSync(path.join(SavePath, "Items", PlayerName)); }
			const InventoryID = [
				{'Type': "Common", 'ID': PlayerInventoryIDList['CommonContainerId']['value']['ID']['value']},
				{'Type': "DropSlot", 'ID': PlayerInventoryIDList['DropSlotContainerId']['value']['ID']['value']},
				{'Type': "Essential", 'ID': PlayerInventoryIDList['EssentialContainerId']['value']['ID']['value']},
				{'Type': "Weapon", 'ID': PlayerInventoryIDList['WeaponLoadOutContainerId']['value']['ID']['value']},
				{'Type': "Armor", 'ID': PlayerInventoryIDList['PlayerEquipArmorContainerId']['value']['ID']['value']},
				{'Type': "Food", 'ID': PlayerInventoryIDList['FoodEquipContainerId']['value']['ID']['value']}
			]
			for (let i in InventoryID) {
				const ItemContainerIndex = ItemData.findIndex(x => x.key.ID.value == InventoryID[i]['ID']);
				const Parsed = ExportItemSlot(ItemData[ItemContainerIndex]);
				fs.writeFileSync(path.join(SavePath, "Items", PlayerName, InventoryID[i]['Type'] + ".json"), JSON.stringify(Parsed, null, 2));
			}
		});
	break;
	case "Help":
		CaseBypass = 0;
	case "help":
		CaseBypass = 0;
	case "-h":
		CaseBypass = 0;
	case "--help":
		CaseBypass = 0;
	case "/?":
		console.log("Lantern, a Palworld save editor, made with <3 by Ceris");
		console.log("");
		console.log("Usage:");
		console.log("	ExportPals <path to Level.sav.json>");
		console.log("	ImportPals <path to Level.sav.json> <output path>");
		console.log("	ExportInventory <path to Level.sav.json> <path to Player.sav>");
	break;
}
