import { useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import PropTypes from "prop-types";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { theme } from "../global/theme";
import buildClient from "../axios/build-client";
import { AuthProvider } from "../contexts/AuthProvider";

const MyApp = ({ Component, pageProps, user }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const threeScript = document.createElement("script");
    threeScript.setAttribute("id", "threeScript");
    threeScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
    );
    document.getElementsByTagName("head")[0].appendChild(threeScript);
    return () => {
      if (threeScript) {
        threeScript.remove();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MuiThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <Component {...pageProps} user={user} />
        </AuthProvider>
      </MuiThemeProvider>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (appContext) => {
  // check authentication
  const client = await buildClient(appContext.ctx);
  let user = null;
  try {
    const { data } = await client.get("/api/auth/currentUser");
    if (data) user = data.currentUser;
  } catch {}

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const pageProps = appContext.Component.getInitialProps
    ? await appContext.Component.getInitialProps(appContext.ctx, client, user)
    : {};

  return { ...pageProps, user };
};

export default MyApp;
