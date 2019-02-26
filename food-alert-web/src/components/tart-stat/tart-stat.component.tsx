import { AnyAction } from 'redux';
import { LinearProgress, Button } from 'material-ui';
import { GridList, GridListTile } from 'material-ui/GridList';
import * as React from 'react';

import { FoodMetric } from 'models/food-metric.model';
import { FoodBandit } from 'models/food-bandit.model';
import { SimpleDialog } from 'components/dialog/dialog.component';
import { FoodKind, getFoodKindName } from 'models/food-kind.enum';

interface TartStatProps {
  blueberryBandits: FoodBandit[];
  blueberryMetrics: FoodMetric[];
  getBandits: ((payload: FoodKind) => AnyAction);
  getFood: ((payload: FoodKind) => AnyAction);
  strawberryBandits: FoodBandit[];
  strawberryMetrics: FoodMetric[];
  type: FoodKind;
}

interface TartStatState {
  open: boolean;
}

// tslint:disable-next-line:no-any
export class TartStatComponent extends React.Component<TartStatProps, TartStatState> {
  constructor(props: TartStatProps) {
    super(props);
    require('./tart-stat.component.scss');

    this.state = {
      open: false,
    };

    this.props.getFood(this.props.type);
    this.props.getBandits(this.props.type);
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  public render() {
    const { type } = this.props;

    const metrics = this.getMetricsFromProps();
    const bandits = this.props.blueberryBandits;

    return (
      <div className="tart-component">
        <h1>
          <span className={this.getClassName()}>
            {getFoodKindName(type)}
          </span> POP TART LEVEL
        </h1>

        <p>
          <Button
            color={this.props.type === FoodKind.BLUEBERRY ? 'primary' : 'accent'}
            raised={true}
            disabled={!metrics.length}
            onClick={this.handleClickOpen}
          >View History
          </Button>
        </p>

        <SimpleDialog
          open={this.state.open}
          metrics={metrics}
          type={this.props.type}
          onRequestClose={this.handleRequestClose}
        />

        {this.renderIndicator(metrics)}
        {this.renderFaces(bandits)}
      </div>
    );
  }

  public getMetricsFromProps = (): FoodMetric[] => {
    return this.props.type === FoodKind.BLUEBERRY ?
      this.props.blueberryMetrics :
      this.props.strawberryMetrics;
  }

  public getBanditsFromProps = (): FoodBandit[] => {
    return this.props.type === FoodKind.BLUEBERRY ?
      this.props.blueberryBandits :
      this.props.strawberryBandits;
  }

  public getClassName(): string {
    return this.props.type === FoodKind.BLUEBERRY ?
      'blueberry' :
      'strawberry';
  }

  public getIndicatorColor(): 'primary' | 'accent' {
    return this.props.type === FoodKind.BLUEBERRY ?
      'primary' :
      'accent';
  }

  // tslint:disable-next-line:no-any
  public renderIndicator(metrics: FoodMetric[]): any {
    if (!metrics.length) return;

    const latest: FoodMetric = metrics[0];
    return (
      <div className="indicator-container">
        <LinearProgress
          color={this.getIndicatorColor()}
          className="indicator"
          mode="determinate"
          value={latest.percentage}
        />

        <p className="percentage">{`${latest.percentage}%`} @ {latest.formattedDate}</p>
      </div>
    );
  }

  // tslint:disable-next-line:no-any
  public renderFaces(bandits: FoodBandit[]): any {
    if (!bandits.length) return;

    return (
      <div>
        <h2>Bandits</h2>

        <div className="root">
          <GridList cellHeight={160} className="grid-list" cols={3}>
            {bandits.map(bandit => (
              <GridListTile key={bandit.timestamp} cols={1}>
                <img src={bandit.image} alt={bandit.label} />
                <span className="time-stamp">{bandit.formattedDate}</span>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}
