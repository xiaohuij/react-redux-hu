import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import _ from 'lodash';

import withDataReady from 'modules/entities/utils/withDataReady';
import * as actions from 'modules/entities/actions/index';

const withAttendees = (BaseComponent) => _.flowRight(
  connect((state) => ({
    push: null,
    goBack: null,
    kongfu: ((state) => {
      return state.entities.kongfu;
    })(state),
  }), {
    fetchKongfu: actions.fetchKongfu,
    push: routerActions.push,
    goBack: routerActions.goBack,
  }),
  withDataReady(
    null,
    ({ fetchKongfu, location }) => fetchKongfu(location.state.kongfuId)
  )
)(BaseComponent);

export default withAttendees;
