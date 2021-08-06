import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export interface AboutProps {};

export default function About(props: AboutProps) {
    return (
        <Layout>
            <Head>
                <title>about — {siteTitle}</title>
            </Head>
            <h1>about</h1>
            <p>
                Yart is a collection of interesting pieces of (mostly personal) data that I assembled into webpages. Alternatively, you can call them Yuto's Trinkets.
            </p>
        </Layout>
    );
};
