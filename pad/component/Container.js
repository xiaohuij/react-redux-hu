import React, { Component, PropTypes } from 'react';
import Container_ from './Container_.styl';

class Container extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className={Container_.container} >
        {this.props.children}
      </div>
    );
  }
}

export default Container;
