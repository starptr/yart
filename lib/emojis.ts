import fs from "fs";
import path from "path";
import YAML from "yaml";

const emotesFile = path.join(process.cwd(), "data", "yutoji.yaml");

export interface EmoteData {
	image: string;
	shortcode: string | string[];
	definition?: string | string[];
}
export type YutojiData = EmoteData[];
export function getYutojiData(): YutojiData {
	const file = fs.readFileSync(emotesFile, "utf8");
	let data = YAML.parse(file) as YutojiData;
	// Sort emoji by first shortcode
	data.sort((emote1, emote2) => {
		const { shortcode: shortcode1 } = emote1;
		const { shortcode: shortcode2 } = emote2;
		const primaryShortcode1 = Array.isArray(shortcode1) ? shortcode1[0] : shortcode1;
		const primaryShortcode2 = Array.isArray(shortcode2) ? shortcode2[0] : shortcode2;
		return primaryShortcode1.toLowerCase() < primaryShortcode2.toLowerCase() ? -1 : 1;
	});
	return data;
}
