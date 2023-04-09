import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export interface YuttoProps {

}
export default function Yutto(props: YuttoProps) {
  return (
    <Layout>
      <Head>
        <title>Yutto - {siteTitle}</title>
        <h1
				  style={{ textAlign: "center" }}
				  className={`${utilStyles.heading2Xl} ${utilStyles.bold}`}
        >
        
        </h1>
      </Head>
    </Layout>
  )
}
