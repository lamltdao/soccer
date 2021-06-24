import React from 'react';
import Head from 'next/head';
import Layout from '../../layouts/Layout';
import Map from '../../components/soccer-fields/Map';

const SFIndex = () => {
  return (
    <div>
      <Head>
        <title>Soccer fields</title>
        <meta name="description" content="Developed in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <>
          <Map />
          <h1>Search for soccer field</h1>
        </>
      </Layout>
    </div>
  );
};

export default SFIndex;
