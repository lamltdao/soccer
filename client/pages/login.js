import React from "react";
import Head from "next/head";
import Layout from "../layouts/Layout";
import { Grid } from "@material-ui/core";
import AuthBackground from "../components/auth/AuthBackground";
import LoginForm from "../components/auth/LoginForm";

const login = () => {
  return (
    <div>
      <Head>
        <title>Soccerr</title>
        <meta name="description" content="Developed in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
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

export const getServerSideProps = async ({ req, res }) => {
  // check if user is logged in by, say, taking a look at the session
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};

export default login;
