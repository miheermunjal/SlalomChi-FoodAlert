import { map } from 'lodash';

export const constructQueryParams = (options?: {}): string => {
  const esc = encodeURIComponent;
  return map(options, (value, key) => {
    return `${esc(key)}=${esc(value.toString())}`;
  }).join('&');
};
