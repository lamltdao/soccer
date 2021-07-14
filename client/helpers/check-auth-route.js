export const checkAuthRoute = async (ctx) => {
  let isAuth = false;
  try {
    const { data } = await buildClient(ctx)
      .get('/api/auth/currentUser')
    if (data) {
      isAuth = true;
    }
  } catch {}
  return isAuth;
}