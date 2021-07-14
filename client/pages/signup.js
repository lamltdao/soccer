import Layout from "../layouts/Layout";
import { Grid } from "@material-ui/core";
import AuthBackground from "../components/auth/AuthBackground";
import SignupForm from "../components/auth/SignupForm";

const signup = ({ user }) => {
  return (
    <Layout user={user}>
      <Grid container>
        <Grid item xs={6}>
          {/* <AuthBackground /> */}
        </Grid>
        <Grid item xs={6}>
          <SignupForm />
        </Grid>
      </Grid>
    </Layout>
  );
};

signup.getInitialProps = async (ctx, client, user) => {
  if (ctx.res && user) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
  }
  return {};
}
export default signup;
