import { ServiceBroker } from 'moleculer';
import brokerOptions from './moleculer.config';
import ApiGatewayService from 'moleculer-web';
import { routes } from './moleculer.routes';

const broker: ServiceBroker = new ServiceBroker(brokerOptions);

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
  },
});

export default broker;
