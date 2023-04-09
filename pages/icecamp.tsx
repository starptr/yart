import React, { ReactNode, useState } from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

interface PersonProps {
	children: ReactNode;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}
function Person(props: PersonProps) {
	return (
		<li>
			{props.children} <input type="button" value="❌" onClick={props.onClick} />
		</li>
	);
}

export interface IcecampProps {}
export default function Icecamp(props: IcecampProps) {
	const [nameInput, setNameInput] = useState("");
	const [names, setNames] = useState([]);
	const [rollFace, setRollFace] = useState("");

	function removeName(index: number) {
		setNames(names => {
			names.splice(index, 1);
			return [...names];
		});
	}

	function enterName(name: string) {
		function addName(name: string) {
			setNames(names => [...names, name]);
		}

		addName(name);
		setNameInput(() => "");
	}

	function handleRoll(_e: React.MouseEvent<HTMLButtonElement>) {
		setRollFace(rollFace => {
			if (names.length < 2) return rollFace;

			let newRollFace = "";
			do {
				const rngIdx = Math.floor(Math.random() * names.length);
				newRollFace = names[rngIdx];
			} while (rollFace === newRollFace);
			return newRollFace;
		});
	}

	return (
		<Layout>
			<Head>
				<title>Icecamp - {siteTitle}</title>
			</Head>
			<h1
				style={{ textAlign: "center" }}
				className={`${utilStyles.heading2Xl} ${utilStyles.bold}`}
			>
				{" "}
				Icecamp
			</h1>
			<label>Name: </label>
			<input
				type="text"
				value={nameInput}
				onChange={e => setNameInput(e.target.value)}
				onKeyDown={e => {
					if (e.key === "Enter") {
						enterName(nameInput);
					}
				}}
			/>{" "}
			<input type="button" value="Add" onClick={_e => enterName(nameInput)} />
			<ul>
				{names.map((name, idx) => (
					<Person key={idx} onClick={_e => removeName(idx)}>
						{name}
					</Person>
				))}
			</ul>
			<input
				type="button"
				value="Roll Icecube"
				disabled={names.length === 0}
				onClick={handleRoll}
			/>
			{rollFace !== "" && <p>{rollFace}, you are holding the ice cube!</p>}
			<div style={{ marginTop: "2em" }}>
				<details>
					<summary>What is this?</summary>
					<p>
						This is a tool to do{" "}
						<a href="https://ja.wikipedia.org/wiki/%E4%BA%BA%E5%BF%97%E6%9D%BE%E6%9C%AC%E3%81%AE%E3%81%99%E3%81%B9%E3%82%89%E3%81%AA%E3%81%84%E8%A9%B1">
							this Japanese TV show
						</a>{" "}
						in real life.
					</p>
				</details>
			</div>
		</Layout>
	);
}
