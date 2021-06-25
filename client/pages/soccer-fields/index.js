import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../../layouts/Layout';
import Map from '../../components/soccer-fields/Map';
import SoccerFieldsTable from '../../components/soccer-fields/SoccerFieldsTable';

const SFIndex = () => {
  /** Interface for element in soccerFields fetched from DB
   * name: string;
   * position?: {
   *  lat: Number,
   *  lng: Number
   * },
   * color?: string
   */
   const [soccerFields, setSoccerFields] = useState([]);
   return (
    <div>
      <Head>
        <title>Soccer fields</title>
        <meta name="description" content="Developed in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <>
          {/* <Map soccerFields={soccerFields} setSoccerFields={setSoccerFields}/> */}
          <SoccerFieldsTable soccerFields={soccerFields} />
        </>
      </Layout>
    </div>
  );
};

export default SFIndex;
