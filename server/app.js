/* eslint-disable no-console */
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import winston from '@s-config/winston';

// Importando el Router principal
import router from '@s-routes/index';

// Importing configurations
import configTemplateEngine from '@s-config/template-engine';

// Webpack modules
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../webpack.dev.config';

// Consultar el modo en que se esta ejecutando la aplicación
const env = process.env.NODE_ENV || 'development';

const app = express();

// Se crea la aplicacion express
if (env === 'development') {
  console.log('> Executing in Development Mode: Webpack Hot Reloading');
  // 1. Agregando la ruta del HMR
  // Reload = true: Habilita la recarga del front end cuando hay cambios en el código
  // Fuente del front end
  // Timeout = 1000: Tiempo de espera entre la recarga de la página
  webpackDevConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout:1000',
    webpackDevConfig.entry,
  ];

  // 2. Agregando el plugin
  webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // 3. Crea el compilador
  const compiler = webpack(webpackDevConfig);

  // 4. Agregando el middleware a la cadena de middlewares de nuestra aplicación
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
    }),
  );

  // 5. Agregando el Webpack Hot Middleware
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log('> Executing in Production Mode...');
}

// view engine setup
configTemplateEngine(app);

app.use(morgan('dev', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(
  '/SextoEjercicio',
  (req, res, next) => {
    console.log('Este es el sexto ejercicio');
    next();
  },
  (req, res) => {
    res.send('Revisar el logger en la terminal de la consola');
  },
);

// Instalanado el enrutador principal a
// la aplicación express
router.addRoutes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // Log
  winston.error(
    `Code: 404, Message: Page Not found, URL: ${req.originalUrl}, Method: ${req.method}, IP: ${req.ip}`,
  );
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Loggeando con Winston
  winston.error(
    `Status: ${err.status || 500} Message: ${err.message} Method: ${
      req.method
    } IP:${req.ip}`,
  );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
