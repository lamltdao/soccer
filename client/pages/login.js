import React from 'react';
import Head from 'next/head';
import Layout from '../layouts/Layout';
import { Grid } from '@material-ui/core';
import AuthBackground from '../components/auth/AuthBackground';
import LoginForm from '../components/auth/LoginForm';
import buildClient from '../axios/build-client';

const login = ({ user }) => {
  return (
    <div>
      <Head>
        <title>Soccerr</title>
        <meta name="description" content="Developed in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        <Grid container>
          <Grid item xs={6}>
            {/* <AuthBackground /> */}
          </Grid>
          <Grid item xs={6}>
            <LoginForm />
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
};

login.getInitialProps = async (ctx, client, user) => {
  if (ctx.res && user) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
  }
  return {};
};

export default login;
