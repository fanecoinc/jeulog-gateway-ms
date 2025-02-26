import { userRoutes } from './routes/user.routes';
import { registerRoutes } from './routes/register.routes';

const standardRoutes = [
  {
    path: '/v1/docs',
    aliases: {
      'GET /': 'openapi.ui',
    },
    authorization: false,
  },
  {
    path: '/openapi.json',
    aliases: {
      'GET /': 'openapi.generateDocs',
    },
    authorization: false,
  },
];

const routes = [...standardRoutes, ...userRoutes, ...registerRoutes];

export { routes };
