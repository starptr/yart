import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const songsFile = path.join(process.cwd(), "data", "grammophon.yaml");

export interface Song {
	title?: string;
	album?: string;
	artist: string;
	links?: { [key: string]: string; };
};

export interface Row {
	year?: number;
	season?: string;
	seasonText?: string;
	group?: string;
	songs?: Song[];
};

export type TimelineData = Row[];

const seasons = ["winter", "autumn", "summer", "spring"];
const seasonTexts = [
    "hiver 冬 winter зима 겨울 talvi dunra fa",
    "automne 秋 herbst осень 가을 syksy critu si",
    "été 夏 sommer лето 여름 kesä crisa la",
    "printemps 春 frühling весна 봄 kevät vensa sol",
];
export function getTimelineData(): TimelineData {
	const file = fs.readFileSync(songsFile, 'utf8');
	const unorgData = YAML.parse(file);
	let data: TimelineData = [];
	let yr = (new Date()).getFullYear();
    // Skip current year if nonexistent
	if (!unorgData.hasOwnProperty(yr.toString())) yr--;

	while (unorgData.hasOwnProperty(yr.toString())) {
		data.push({ year: yr });
		let seasonsOrGroups = unorgData[yr.toString()];
		if (Array.isArray(seasonsOrGroups)) {
			// TODO: we have groups
		} else {
			for (let i = 0; i < seasons.length; i++) {
				if (!seasonsOrGroups.hasOwnProperty(seasons[i])) continue;

				data.push({ season: seasons[i], seasonText: seasonTexts[i] });
				let groups = seasonsOrGroups[seasons[i]];
				groups.forEach(group => {
					let [[groupName, songs]] = Object.entries(group);
					data.push({ group: groupName });
					data.push({ songs });
				});
			}
		}

		yr--;
	}
	return data;
};
