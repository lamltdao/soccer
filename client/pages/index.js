import Head from 'next/head';
import Description from '../components/index/Description';
import Features from '../components/index/Features';
import Layout from '../layouts/Layout';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Soccer</title>
        <meta name="description" content="Developed in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <>
          <Description />
          <Features />
        </>
      </Layout>
    </div>
  );
};

export default Home;
