import Image from 'next/image';
import styles from './card.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export interface CardProp {
    href: string;
    children: string;
    subtitle?: string;
    image?: undefined;
    bgColor?: undefined;
};

export default function Card({ href, children, subtitle, image, bgColor }: CardProp) {
    return <Link href={href} className={`${styles.link}`}>
        <div
            className={`${styles.container} ${utilStyles.centerV} ${utilStyles.box}`}
        >
            <h1 className={`${styles.title} ${utilStyles.headingMd}`}>{children}</h1>
            {subtitle && (<p className={styles.subtitle}>{subtitle}</p>)}
        </div>
    </Link>;
}
