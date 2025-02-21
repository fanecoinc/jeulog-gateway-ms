import { ServiceBroker, Context, Errors } from 'moleculer';
import brokerOptions from './moleculer.config';
import ApiGatewayService from 'moleculer-web';
import { routes } from './moleculer.routes';
import { JWT_SECRET } from '../database/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const broker: ServiceBroker = new ServiceBroker(brokerOptions);

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
  },
  started() {
    this.settings.routes.forEach((route: any) => {
      if (route.authorization) {
        route.onBeforeCall = (ctx: any, _route: any, req: any, res: any) =>
          this.authorize(ctx, req, res);
      }
    });
  },
});

export default broker;
