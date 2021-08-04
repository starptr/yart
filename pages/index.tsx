import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Card from '../components/card';

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
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
        <Card href="/pages/about" subtitle="what's YART?">about</Card>
        <Card href="/pages/about" subtitle="Yuto's Amazing Rad Trinkets">YART</Card>
        <Card href="/pages/grammophon" subtitle="musical timeline">Grammophon</Card>
        <Card href="/pages/watchtime" subtitle="best-of youtube">watchtime</Card>
        <Card href="/pages/yutoji" subtitle="custom emojis">yutoji</Card>
        <Card href="/pages/pen" subtitle="tooling">pen</Card>
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
