import { Action, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { HomeComponent } from 'components/home/home.component';
import { AppState } from 'redux/store';

const mapStateToProps = (state: AppState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
}, dispatch);

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
