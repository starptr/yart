import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export interface YutojiProps {

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
    </Layout>;
};
