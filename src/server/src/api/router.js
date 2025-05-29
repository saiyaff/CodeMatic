import { Router as ExpressRouter } from 'express';
import swaggerUI from 'swagger-ui-express'

export default function createRouter({ chatController, constants, swaggerSpec }) {
  const router = ExpressRouter();

  const apiBasePath = '/v1';
  console.log(`API base URL: http://localhost:3001${apiBasePath}`);

  // Serve Swagger JSON
  router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  router.use(`${apiBasePath}/swagger`, swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  router.use(`${apiBasePath}/chat`, chatController.getRouter());

  return router;
}
