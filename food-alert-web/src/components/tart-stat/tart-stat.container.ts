import { Action, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TartStatComponent } from 'components/tart-stat/tart-stat.component';
import { AppState } from 'redux/store';
import { getFood, getBandits } from 'redux/actions/food.action';

const mapStateToProps = (state: AppState) => ({
  blueberryMetrics: state.food.blueberryMetrics,
  strawberryMetrics: state.food.strawberryMetrics,
  blueberryBandits: state.food.blueberryBandits,
  strawberryBandits: state.food.strawberryBandits,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  getFood,
  getBandits,
}, dispatch);

export const TartStat = connect(mapStateToProps, mapDispatchToProps)(TartStatComponent);
