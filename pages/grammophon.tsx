import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { Line, Year, Season, Group, List, Title, Artist, Album, Link as GLink } from '../components/grammophon';
import { GetStaticProps } from 'next';
import { getTimelineData, TimelineData, Row, Song } from "../lib/songs";

// Convert song data to a bullet point
function songToJsx(song: Song) {
    // when title exists
    return <li>
        {song.title ? <Title>{song.title}</Title> : <Album>{song.album}</Album>}
        {" "}
        <Artist>{song.artist}</Artist>
        {song.title && song.album && <>
            <Album>{song.album}</Album>
        </>}
        {" "}
        {song.links && Object.entries(song.links).map(([icon, link]) => <GLink link={link} icon={icon} />)}
		<style jsx>{`
		    li {
		        padding-bottom: 0.2em;
		    }
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
