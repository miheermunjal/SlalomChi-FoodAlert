import { map } from 'lodash';

import { constructQueryParams } from 'util/query-param.util';
import { FoodKind } from 'models/food-kind.enum';
import { FoodMetric } from 'models/food-metric.model';
import { FoodBandit } from 'models/food-bandit.model';
import { get, handleError } from 'services/http-client.service';
import endpoints from 'services/endpoints';

interface FoodOptions {
  latest?: boolean;
  kind?: FoodKind;
}

const getLatest = (): Promise<FoodMetric[]> => {
  const options = {
    latest: true,
    kind: FoodKind.BLUEBERRY
  };

  return getMetrics(options);
};

const getMetrics = (options?: FoodOptions): Promise<FoodMetric[]> => {
  const url = `${endpoints.foodMetrics()}?${constructQueryParams(options)}`;

  return get(url)
    .catch((err: Response) => handleError(err))
    .then((res: FoodMetric[]) => {
      return map(res, data => new FoodMetric(data));
    });
};

const getBandits = (options?: FoodOptions): Promise<FoodBandit[]> => {
    const url = `${endpoints.bandits()}?${constructQueryParams(options)}`;

    return get(url)
        .catch((err: Response) => handleError(err))
        .then((res: FoodBandit[]) => {
            return map(res, data => new FoodBandit(data));
        });
};

export default {
  getLatest,
  getMetrics,
  getBandits,
};
