import broker from './infrastructure/broker/service-broker';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env.prod') });

broker.start();
