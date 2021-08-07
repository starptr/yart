import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Card from '../components/card';

export interface HomeProps {
    mdSlugDict: {[key: string]: string};
};

export default function Home(props: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className={utilStyles.centerV}>
            <p>Yuto's Amazing Rad Trinkets</p>
        </div>
      </section>
      <section className={`grid`}>
        <Card href="/about" subtitle="what's YART?">about</Card>
        <Card href="/about" subtitle="Yuto's Amazing Rad Trinkets">YART</Card>
        <Card href="/grammophon" subtitle="musical timeline">Grammophon</Card>
        <Card href="/watchtime" subtitle="best-of youtube">watchtime</Card>
        <Card href="/yutoji" subtitle="custom emojis">yutoji</Card>
        <Card href="/pen" subtitle="tooling">pen</Card>
      </section>
      <style jsx>{`
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 500px) {
            .grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </Layout>
  )
}
