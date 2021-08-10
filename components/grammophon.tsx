import Image from 'next/image';
import styles from './grammophon.module.scss';
import utilStyles from '../styles/utils.module.css';
import { GrYoutube, GrSoundcloud, GrSpotify } from 'react-icons/gr';
import { SiTiktok } from 'react-icons/si';
import Meme from '../public/images/lol.png';
import { IconContext } from 'react-icons';

export function Title(props: { children: string }) {
    return <>🎶&nbsp;{props.children}</>;
};

export function Artist(props: { children: string }) {
    return <>🎨&nbsp;{props.children}</>;
};

export function Album(props: { children: string }) {
    return <>💽&nbsp;{props.children}</>;
};

export const iconJsxMapping = {
    "youtube": <span className={`${styles.icon} ${styles.youtube}`}><GrYoutube /></span>,
    "spotify": <span className={`${styles.icon} ${styles.spotify}`}><GrSpotify /></span>,
    "soundcloud": <span className={`${styles.icon} ${styles.soundcloud}`}><GrSoundcloud /></span>,
    "douyin": <span className={`${styles.icon} ${styles.douyin}`}><SiTiktok /></span>,
    "tiktok": <span className={`${styles.icon} ${styles.tiktok}`}><SiTiktok /></span>,
    "meme": <span className={`${styles.icon}`}><Image src={Meme} width="20" height="20" /></span>,
};
export interface LinkProps {
    icon: string;
    link: string | boolean;
};
export function Link(props: LinkProps) {
    if (typeof props.link === "boolean") return iconJsxMapping[props.icon];
    return <a href={props.link}>
        {iconJsxMapping[props.icon]}
    </a>;
};

function Segment(props: any) {
    return <div {...props} className={styles.line} />;
};

function DotCell(props: any) {
    return <div {...props} className={styles.dotCell} />;
};

export interface LineProps {
    isDot?: boolean;
    isBig?: boolean;
    isFilled?: boolean;
    isFirst?: boolean;
};

// Multipurpose element that make up Timeline
export function Line(props: LineProps) {
    if (!props.isDot) return <Segment />;

    return (
        <DotCell>
	    	<Segment />
	        <div className={`${styles.circleWrapper} ${utilStyles.centerV}`}>
	    	    <div className={`
	    	        ${props.isBig ? styles.big : styles.small}
	    	        ${props.isFilled ? styles.fill : ""}
	    	        ${styles.circle}`}
	    	    />
	        </div>
	    </DotCell>
	);
};

export interface YearProps {
    children: React.ReactNode;
};
export function Year(props: YearProps) {
    return <div className={`${utilStyles.centerH}`}>
        <h2 className={`${styles.text} ${utilStyles.headingXl} ${utilStyles.light}`}>{ props.children }</h2>
	</div>;
};

export interface SeasonProps {
	children: React.ReactNode;
    grayed?: string;
};
export function Season(props: SeasonProps) {
    return <div className={`${utilStyles.centerH}`}>
        <h2 className={`${styles.seasonContainer} ${styles.text} ${utilStyles.headingMd} ${utilStyles.light}`}>
			{props.children}
            {props.grayed && <span className={styles.season}> {props.grayed}</span>}
        </h2>
	</div>;
};

export interface GroupProps {
	children: React.ReactNode;
};
export function Group(props: GroupProps) {
	return <div className={`${utilStyles.centerH}`}>
        <p className={`${styles.text} ${utilStyles.headingMd} ${utilStyles.bold}`}>{ props.children }</p>
	</div>;
};

export interface ListProps {
    children: React.ReactNode;
};
export function List(props: ListProps) {
    return <div>
        <ul className={`${styles.text} ${styles.list}`}>
            { props.children }
        </ul>
	</div>;
};
