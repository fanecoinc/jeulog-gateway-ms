import { BrokerOptions } from 'moleculer';

const brokerOptions: BrokerOptions = {
  nodeID: 'gateway-service-node',
  transporter: process.env.NATS_URL || 'nats://localhost:4222',
  logLevel: 'info',
  requestTimeout: 5000,
  retryPolicy: {
    enabled: true,
    retries: 3,
    delay: 2000,
  },
};

export default brokerOptions;
