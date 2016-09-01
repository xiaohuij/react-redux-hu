import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Thought_ from './Thought_.styl';
import classNames from 'classnames';
import withSession from 'modules/entities/composers/withSession';
import moment from 'moment';

@withSession
class Thought extends Component {
  static propTypes = {
    push: PropTypes.func,
  };


  handleClick = () => {
    this.props.push({
      pathname: '/next',
      state: {
        kongfuId: 1,
      },
    });
  };

  render() {
    return (
      <div className={Thought_.container} >
        <div className={Thought_.next} onClick={this.handleClick}>CLICK</div>
      </div>
    );
  }
}

export default Thought;
