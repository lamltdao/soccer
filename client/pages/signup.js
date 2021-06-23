import Layout from '../layouts/Layout';
import { Grid } from '@material-ui/core';
import AuthBackground from '../components/auth/AuthBackground';
import SignupForm from '../components/auth/SignupForm';

const signup = props => {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={6}>
          {/* <AuthBackground /> */}
        </Grid>
        <Grid item xs={6}>
        <SignupForm />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default signup
