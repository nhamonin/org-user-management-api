const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { userRouter, visualizeRouter } = require('#routes');
const config = require('#config');
const connectDB = require('#database');
const { errorHandler } = require('#middleware');
const { checkEnvironmentVariables } = require('#utils');
const specs = require('./swaggerDefinition');

checkEnvironmentVariables();

const app = express();

connectDB();

app.set('trust proxy', true);
app.use(express.json());

app.use('/users', userRouter);
app.use('/visualize', visualizeRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () => {
    console.log(`Server started and listening on port ${config.PORT}`);
  });
}

module.exports = app;
