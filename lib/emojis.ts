import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const emotesFile = path.join(process.cwd(), "data", "yutoji.yaml");

export interface EmoteData {
    image: string;
    shortcode: string | string[];
    definition?: string | string[];
}
export type YutojiData = EmoteData[];
export function getYutojiData(): YutojiData {
    const file = fs.readFileSync(emotesFile, 'utf8');
    const data = YAML.parse(file);
    return data;
}
