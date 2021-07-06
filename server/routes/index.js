// Importando el router de home
import home from './home';

// Importando el router de home
import userRouter from './users';

const addRoutes = (app) => {
  app.use('/', home);
  app.use('/users', userRouter);

  return app;
};

export default {
  addRoutes,
};
