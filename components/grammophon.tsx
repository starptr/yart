import styles from './grammophon.module.scss';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

function Segment(props) {
    return <div {...props} className={styles.line} />;
}

function DotCell(props) {
    return <div {...props} className={styles.dotCell} />;
}

export interface LineProps {
    isDot?: boolean;
    isBig?: boolean;
};

// Multipurpose element that make up Timeline
export function Line(props: LineProps) {
    if (!props.isDot) return <Segment />;

    return (
        <DotCell>
	    	<Segment />
	        <div className={`${styles.circleWrapper} ${utilStyles.centerV}`}>
	    	    <div className={`${props.isBig ? styles.big : styles.small} ${styles.circle}`} />
	        </div>
	    </DotCell>
	);
};

export interface YearProps {
    children: React.ReactNode;
};
export function Year(props: YearProps) {
    return <div className={`${utilStyles.centerH}`}>
        <h2 className={`${styles.text} ${utilStyles.headingXl}`}>{ props.children }</h2>
	</div>;
};

export interface SeasonProps {
	children: React.ReactNode;
    grayed?: string;
};
export function Season(props: SeasonProps) {
    return <div className={`${utilStyles.centerH}`}>
        <h2 className={`${styles.seasonContainer} ${styles.text} ${utilStyles.heading2Md}`}>
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
        <p className={`${styles.text} ${utilStyles.headingMd}`}>{ props.children }</p>
	</div>;
};

export interface ListProps {
    children: React.ReactNode;
};
export function List(props: ListProps) {
    return <div>
        <ul className={styles.text}>
            { props.children }
        </ul>
	</div>;
};
