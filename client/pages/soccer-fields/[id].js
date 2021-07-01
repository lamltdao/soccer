import React from 'react';
import Head from 'next/head';
import Layout from '../../layouts/Layout';
import SoccerFieldDescription from '../../components/soccer-fields/SoccerFieldDescription';
import Schedules from '../../components/soccer-fields/Schedules';
import { Grid } from '@material-ui/core';

const SoccerFieldShow = ({ soccerField }) => {
  return (
    <div>
      <Head>
        <title>Soccer field Detail</title>
        <meta name="description" content="Developed in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout stickToSide={false}>
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <SoccerFieldDescription soccerFieldId={soccerField.id} description={soccerField.description} />
          </Grid>
          <Grid item>
            <Schedules soccerFieldId={soccerField.id} schedules={soccerField.schedules} />
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  // fetch data by id
  // Use string representation of Date so that it is JSON serializable
  const soccerField = {
    id,
    description: {
      name: 'San bong HN_AMS',
      address: '1 Hoang Minh Giam Str, Cau Giay Distr, Hanoi',
      contact: {
        email: 'lamdao@gmail.com',
        phoneNumber: '0972742002'
      }
    },
    schedules: [
      {
        time: [Date(new Date(Date.now() + 60*60*1000)), Date(new Date(Date.now() + 2*60*60*1000))], // 1 hour
        teams: [
          {
            userId: '1',
            name: 'HALAH FC'
          },
          {
            userId: '2',
            name: 'MU'
          },
        ],
        status: 'Full',
      },
      {
        time: [Date(new Date(Date.now() + 100*60*60*1000)), Date(new Date(Date.now() + 102*60*60*1000))], // 1 hour
        teams: [
          {
            userId: '3',
            name: 'ABC FC'
          },
        ],
        status: 'Vacant'
      }
    ]
  }
  return {
    props: {
      soccerField
    }
  }
}

export default SoccerFieldShow;
