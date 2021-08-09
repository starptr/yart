import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { Line, Year, Season, Group, List } from '../components/grammophon';
import { GetStaticProps } from 'next';
import { getTimelineData, TimelineData, Row, Song } from "../lib/songs";

// Convert song data to a bullet point
function songToJsx(song: Song) {
    let trackName: string;
    if (song.title && song.album) {
        trackName = `${song.title} by ${song.artist} from ${song.album}`;
    } else if (song.title) {
        trackName = `${song.title} by ${song.artist}`;
    } else if (song.album) {
        trackName = `${song.album} by ${song.artist}`;
    }
    return <li>
        { trackName }
		<style jsx>{`
            ::marker {
                font-size: 12pt;
            }
		`}</style>
    </li>;
}

function Timeline(props: { data: Row[]}) {
    //const data = grammophonJsonToArray(props.data);
	const data = props.data;
    return <section className={`grid`}>
		{data.map((row, index) => {
		    // TODO: change first Line styling
			if (row.year) return <>
				<Line isDot isBig isFirst={index === 0} />
				<Year>{ row.year }</Year>
			</>;
			if (row.season) return <>
				<Line isDot />
				<Season grayed={row.seasonText}>{ row.season }</Season>
			</>;
			if (row.group) return <>
				<Line isDot isFilled />
				<Group>{ row.group }</Group>
			</>;
			if (row.songs) return <>
				<Line />
				<List>
					{row.songs.map(songToJsx)}
				</List>
			</>;
		})}
		<style jsx>{`
			.grid {
				display: grid;
				grid-template-columns: auto minmax(0, 1fr);
			    overflow: hidden;
			}
		`}</style>
	</section>;
};

export interface GrammophonProps {
	data: TimelineData;
};

export default function Grammophon(props: GrammophonProps) {
	return (
		<Layout>
			<Head>
				<title>Grammophon — {siteTitle}</title>
			</Head>
			<h1 style={{ textAlign: "center" }} className={`${utilStyles.heading2Xl} ${utilStyles.bold}`}>Grammophon</h1>
			<Timeline data={props.data} />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = () => {
	const data = getTimelineData();
	return {
		props: {
			data,
		},
	};
};
