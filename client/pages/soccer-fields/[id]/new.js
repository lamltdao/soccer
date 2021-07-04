import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import Layout from "../../../layouts/Layout";
import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import BackButton from "../../../components/common/BackButton";
import NewScheduleForm from "../../../components/soccer-fields/NewScheduleForm";

const ScheduleNew = (props) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Soccer field Detail</title>
        <meta name="description" content="Developed in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Grid container direction="column">
          <Grid item>
            <BackButton onClick={() => router.back()} />
          </Grid>
          <Grid item>
            <NewScheduleForm />
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
};

ScheduleNew.propTypes = {};

export default ScheduleNew;
