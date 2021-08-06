import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Card from '../components/card';
import { Line, Year, Season, List } from '../components/grammophon';
import { GetStaticProps } from 'next';
import grammophonData from "../public/grammophon.json";

function grammophonJsonToArray(data) {
    let yr = (new Date()).getFullYear();
    // Skip current year if nonexistent
    if (!data.hasOwnProperty(yr.toString())) yr--;

    let ans = [];
    // Until the year is too old
    while (data.hasOwnProperty(yr.toString())) {
        ans.push({data: data[yr.toString()], yr});
        yr--;
    }
    return ans;
};

// Convert song data to a bullet point
function songToJsx(song) {
    let trackName: string;
    if (song.title && song.album) {
        trackName = `${song.title} by ${song.artist} from ${song.album}`;
    } else if (song.title) {
        trackName = `${song.title} by ${song.artist}`;
    } else if (song.album) {
        trackName = `${song.album} by ${song.artist}`;
    }
    return <li>{ trackName }</li>;
}

function Timeline(props) {
    const data = grammophonJsonToArray(props.data);
    return <section className={`grid`}>
        {data.map(({data, yr}) => <>
            <Line isDot isBig />
            <Year>{ yr }</Year>
            {data.map((data, i) => <>
                <Line isDot />
                <Season seasonIndex={i} />
                <Line />
                <List>
                    {data.map(song => songToJsx(song))}
                </List>
            </>)}
        </>)}
		<style jsx>{`
            ::marker {
                font-size: 12pt;
            }

			.grid {
				display: grid;
				grid-template-columns: auto minmax(0, 1fr);
			    overflow: hidden;
			}
		`}</style>
	</section>;
};

export interface GrammophonProps {};

export default function Grammophon(props: GrammophonProps) {
	return (
		<Layout>
			<Head>
				<title>Grammophon — {siteTitle}</title>
			</Head>
			<h1 style={{ textAlign: "center" }} className={utilStyles.heading2Xl}>Grammophon</h1>
			<Timeline data={grammophonData} />
		</Layout>
	);
};
