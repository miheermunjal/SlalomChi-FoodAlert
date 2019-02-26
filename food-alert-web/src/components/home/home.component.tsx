import * as React from 'react';

import { TartStat } from 'components/tart-stat/tart-stat.container';
import { FoodKind } from 'models/food-kind.enum';

interface HomeProps {
}

interface HomeState {
}

export class HomeComponent extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    require('./home.component.scss');
  }

  public render() {
    return (
      <div className="home-component">
        <TartStat type={FoodKind.STRAWBERRY} />
        <TartStat type={FoodKind.BLUEBERRY} />
      </div>
    );
  }
}
