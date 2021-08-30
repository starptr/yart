import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/layout';
import { getYutojiData, YutojiData, EmoteData } from '../lib/emojis';
import utilStyles from '../styles/utils.module.css';

// Convert emote data to jsx
function emoteToJsx(emote: EmoteData) {
    let shortcode;
    if (Array.isArray(emote.shortcode)) {
        shortcode = <div>
            <ul>
                {emote.shortcode.map(code => <li>{code}</li>)}
            </ul>
        </div>;
    } else {
        shortcode = <div>{emote.shortcode}</div>;
    }

    let definition;
    if (Array.isArray(emote.definition)) {
        definition = <div>
            <ul>
                {emote.definition.map(def => <li>{def}</li>)}
            </ul>
        </div>;
    } else {
        definition = <div>{emote.definition}</div>;
    }

    return <>
        <Image
            src={`/images/yutojis/${emote.image}`}
            height={48}
            width={48}
            alt={emote.image}
        />
        {shortcode}
        {definition}
    </>;
}

export interface YutojiProps {
    data: YutojiData;
};

export default function Yutoji(props: YutojiProps) {
    return <Layout>
        <Head>
            <title>Yutoji - {siteTitle}</title>
        </Head>
        <h1 style={{ textAlign: "center" }} className={`${utilStyles.heading2Xl} ${utilStyles.bold}`}>Yutoji</h1>
        <div className={utilStyles.centerV}>
            <p>the definitions of emojis and emotes as I use them</p>
        </div>
        <section className={`grid`}>
            {props.data.map(emote => emoteToJsx(emote))}
        </section>
        <style jsx>{`
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }
        `}</style>
    </Layout>;
};

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            data: getYutojiData(),
        },
    };
};
