import { config } from 'dotenv';

before(async () => {
  config({ path: '.env.test' });
});
