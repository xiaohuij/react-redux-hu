import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import _ from 'lodash';
import withDataReady from 'modules/entities/utils/withDataReady';

const withSession = (BaseComponent) => _.flowRight(
  connect((state) => ({
    push: null,
  }), {
    push: routerActions.push,
  }),
  withDataReady(
    null,
    null
  )
)(BaseComponent);

export default withSession;
