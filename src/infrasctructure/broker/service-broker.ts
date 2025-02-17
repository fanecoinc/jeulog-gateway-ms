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
});

export default broker;
