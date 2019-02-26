import { push, RouterAction } from 'react-router-redux';

import { routes } from 'routes';

export const routeToHome = (): RouterAction => push(routes.HOME);
