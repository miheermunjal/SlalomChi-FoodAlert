import { Action, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BanditsComponent } from 'components/bandits/bandits.component';
import { AppState } from 'redux/store';

const mapStateToProps = (state: AppState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  // getBandits
}, dispatch);

export const BanditsContainer = connect(mapStateToProps, mapDispatchToProps)(BanditsComponent);
