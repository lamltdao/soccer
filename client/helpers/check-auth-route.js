// used in getServerSideProps
const checkAuthRoute = (ctx) => {
  let isAuth = null;
  try {
    const { data } = await buildClient(ctx)
      .get('/api/auth/currentUser')
    if (data) {
      isAuth = true;
    }
  } catch (err) {
    isAuth = false;
  }
  return isAuth;
}