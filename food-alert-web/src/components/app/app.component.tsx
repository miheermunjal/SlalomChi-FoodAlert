import { MuiThemeProvider } from 'material-ui/styles';
import { History } from 'history';
import { Switch, Route } from 'react-router';
import * as React from 'react';

import { HeaderBar } from 'components/header-bar/header-bar.component';
import { HomeContainer } from 'components/home/home.container';
import { NotFoundComponent } from 'components/not-found/not-found.component';
import { theme } from 'components/app/app.component.theme';
import { routes } from 'routes';
import { BanditsContainer } from 'components/bandits/bandits.container';

interface AppProps {
  history: History;
  user?: {};
}

export class AppComponent extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  public render() {
    require('./app.component.scss');

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <HeaderBar title={'Food Alert'} />

          <main className="app">
            <Switch>
              <Route exact={true} path={routes.HOME} component={HomeContainer} />
              <Route exact={true} path={routes.BANDITS} component={BanditsContainer} />
              <Route component={NotFoundComponent} />
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}
