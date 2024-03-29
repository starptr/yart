import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "YART";
export const siteTitle = "Yart";

export interface LayoutProp {
	children: React.ReactNode;
	home?: boolean;
}

export default function Layout({ children, home }: LayoutProp) {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<header className={styles.header}>
				{home ? (
					<>
						<h1 className={`${utilStyles.heading2Xl} ${utilStyles.bold}`}>{name}</h1>
					</>
				) : (
					<>
						<h2 className={`${utilStyles.headingLg} ${utilStyles.bold}`}>
							<Link href="/" legacyBehavior>
								<a className={utilStyles.colorInherit}>{name}</a>
							</Link>
						</h2>
					</>
				)}
			</header>
			<main>{children}</main>
			{!home && (
				<div className={styles.backToHome}>
					<Link href="/" legacyBehavior>
						<a>← Back to home</a>
					</Link>
				</div>
			)}
		</div>
	);
}
