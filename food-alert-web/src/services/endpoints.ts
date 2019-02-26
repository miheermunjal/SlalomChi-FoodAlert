import { template } from 'lodash';

export const config = {
  api: 'https://us-central1-slalom-chicago-sandbox.cloudfunctions.net',
};

export default {
  foodMetrics: template(`${config.api}/foodAlertGetMetrics`),
  bandits: template(`${config.api}/foodAlertGetBandits`),
};
