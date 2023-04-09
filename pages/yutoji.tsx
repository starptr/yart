import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import { Shortcode } from "../components/yutoji";
import { getYutojiData, YutojiData, EmoteData } from "../lib/emojis";
import utilStyles from "../styles/utils.module.css";

// Convert emote data to jsx
function emoteToJsx(emote: EmoteData) {
	return (
		<>
			<div className={`cell emoji`}>
				<img src={`/images/yutojis/${emote.image}`} alt={emote.image} width="64px" />
			</div>
			<div className={`cell`}>
				{Array.isArray(emote.shortcode) ? (
					<ul className={`list`}>
						{emote.shortcode.map(code => (
							<li>
								<Shortcode>{code}</Shortcode>
							</li>
						))}
					</ul>
				) : (
					<Shortcode>{emote.shortcode}</Shortcode>
				)}
			</div>
			<div className={`cell`}>
				{Array.isArray(emote.definition) ? (
					<ul className={`list`}>
						{emote.definition.map(def => (
							<li>{def}</li>
						))}
					</ul>
				) : (
					emote.definition
				)}
			</div>
			<style jsx>{`
				.emoji {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.list {
					padding-left: 0;
					margin: 0;
				}
				.cell {
					padding: 1em;
					border-top: 1px solid #d0d0d0;
					border-left: 1px solid #d0d0d0;
					overflow-wrap: anywhere;
				}

				.cell:nth-child(-n + 3) {
					border-top: none;
				}

				.cell:nth-child(3n + 1) {
					border-left: none;
				}
			`}</style>
		</>
	);
}

export interface YutojiProps {
	data: YutojiData;
}

export default function Yutoji(props: YutojiProps) {
	return (
		<Layout>
			<Head>
				<title>Yutoji - {siteTitle}</title>
			</Head>
			<h1
				style={{ textAlign: "center" }}
				className={`${utilStyles.heading2Xl} ${utilStyles.bold}`}
			>
				Yutoji
			</h1>
			<div className={utilStyles.centerV}>
				<p>the definitions of emojis and emotes as I use them</p>
			</div>
			<section className={`grid`}>
				<div className={`col-head`}>
					<h2 className={`${utilStyles.headingMd}`}>Image</h2>
				</div>
				<div className={`col-head`}>
					<h2 className={`${utilStyles.headingMd}`}>Shortcode</h2>
				</div>
				<div className={`col-head`}>
					<h2 className={`${utilStyles.headingMd}`}>Definition</h2>
				</div>
				{props.data.map(emote => emoteToJsx(emote))}
			</section>
			<style jsx>{`
				.col-head {
					border-left: 1px solid #d0d0d0;
					text-align: center;
				}
				.col-head:first-child {
					border-left: none;
				}
				.grid {
					display: grid;
					grid-template-columns: auto 1fr 1.5fr;
				}
			`}</style>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = () => {
	return {
		props: {
			data: getYutojiData(),
		},
	};
};
