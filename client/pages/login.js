import Layout from '../layouts/Layout';
import { Grid } from '@material-ui/core';
import AuthBackground from '../components/auth/AuthBackground';
import LoginForm from '../components/auth/LoginForm';

const login = props => {
  return (
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
  )
}

export default login
