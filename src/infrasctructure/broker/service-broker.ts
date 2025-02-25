import { ServiceBroker, Context, Errors } from 'moleculer';
import brokerOptions from './moleculer.config';
import ApiGatewayService from 'moleculer-web';
import { routes } from './moleculer.routes';
import { JWT_SECRET } from '../database/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import OpenApiService from './OpenapiService';
import { ServiceSchema } from 'moleculer';

const broker: ServiceBroker = new ServiceBroker(brokerOptions);

broker.createService(OpenApiService as ServiceSchema);

interface CustomJwtPayload extends JwtPayload {
  user: any;
}

interface Meta {
  user?: any;
  $statusCode?: number;
  $responseType?: string;
}

interface RequestParams {
  req: any;
}

broker.createService({
  name: 'gateway',
  mixins: [ApiGatewayService],
  settings: {
    port: 3000,
    routes,
  },
  cors: {
    origin: '*',
  },
  methods: {
    onError(_req, res, err) {
      const statusCode = err.code ?? 500;

      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: err.type || 'UNKNOWN_ERROR',
          message: err.message || 'Erro desconhecido',
        })
      );
    },

    async authorize(ctx: Context<RequestParams, Meta>) {
      if (!ctx.params?.req) {
        throw new Errors.MoleculerClientError('Token não enviado', 401);
      }
      const req = ctx.params.req;
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Errors.MoleculerClientError('Token inválido', 401);
      }

      const token = authHeader.split(' ')[1];

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
        ctx.meta.user = decoded.user;
      } catch (error) {
        throw new Errors.MoleculerClientError('Token inválido', 401);
      }

      return ctx;
    },

    async checkPermission(ctx: Context<RequestParams, Meta>, req: any) {
      const permissions = ctx.meta.user?.permissions || [];
      const routePermissions = this.settings.routes.find(
        (r: any) => r.path === req.$route.path
      )?.requiredPermissions;

      if (!routePermissions) {
        return;
      }

      const validationKey = `${req.$alias.method} ${req.$alias.path}`;

      const requiredPermission = routePermissions[validationKey];

      if (requiredPermission === undefined) {
        return;
      }

      if (permissions.includes(requiredPermission)) {
        return;
      }

      if (!permissions.includes(requiredPermission)) {
        throw new Errors.MoleculerClientError(
          'Usuário não tem permissão para acessar o recurso',
          403
        );
      }
    },
  },
});

export default broker;
